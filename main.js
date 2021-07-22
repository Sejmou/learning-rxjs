const { Observable, of, ajax: { ajax }, operators: { map, mergeMap, concatMap, switchMap, exhaustMap } } = rxjs;

const nums = of(1, 2, 3, 4, 5, 6, 7);
const numsWithDelay = new Observable(subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
        subscriber.next(4);
        subscriber.next(5);
        subscriber.next(6);
        subscriber.next(7);
        subscriber.complete();
    }, 1250);
});
const getNum = (num) => ajax({
    url: 'http://localhost:3000',
    method: 'POST',
    body: num.toString()
}).pipe(
    map(res => res.response),
    map(numStr => +numStr)
);
const processNum = (num) => new Observable(subscriber => {
    subscriber.next(num + '_1');
    setTimeout(() => {
        subscriber.next(num + '_2');
        setTimeout(() => {
            subscriber.next(num + '_3');
            subscriber.complete();
        }, Math.random() * 1000);
    }, Math.random() * 2000);
});

// Goal: for every number n of nums, make an httpCall using getNum(n)

//wrong solution
nums.pipe(
    map(n => getNum(n))// this won't work as expected!
    // we only map each number emitted to an Observable
    // -> we DON'T invoke the Observable and get its result (emitted value)!
).subscribe(val => console.log('value', val));

// -> we need an operator to invoke the Observable instead and map the value it emits
// This use case is an example for a use case of an inner Observable
// mergeMap, concatMap, exhaustMap and switchMap are operators for dealing with inner Observables!
// They listen to inner Observables created by a mapping function and push their values to the subscriber whenever they become available
// The operators differ in the way they do this

//Proper solution: use mergeMap!
nums.pipe(
    mergeMap(n => getNum(n))// this calls getNum() for each value emitted by nums and emits the returned values in order of completion of the resulting inner Observables
    // note that the order is not guaranteed; whatever inner Observable completes first (whatever http request is done first) gets emitted to the subscriber first
).subscribe(val => console.log('value', val));
// general use cases for mergeMap: as many operations as possible, order of completion/emission of results not important
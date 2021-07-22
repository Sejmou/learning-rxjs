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


nums.pipe(
    exhaustMap(n => getNum(n))// this will only log 1 (result of getNum() for first num of nums)!
    //reason: each new value emitted by the Observable is ignored as long as the Observable for the currently handled value hasn't completed 
    // as the values of nums arrive practically synchronously, only for the first value an http request is made
    // (all other values arrive before the http request for the first one is done) 
).subscribe(val => console.log('nums -> getNum value', val));

numsWithDelay.pipe(
    exhaustMap(n => getNum(n))// there's a delay between getting the first 3 and following 4 of the total 7 nums emitted by numsWithDelay -> we get 1 and 4
).subscribe(val => console.log('numsWithDelay -> getNum value', val));

// use case for exhaustMap: whenever we want to make sure an emitted value is handled completely and ignore the ones that arrive while it is being handled? 
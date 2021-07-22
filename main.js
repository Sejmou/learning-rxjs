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
    concatMap(n => getNum(n))// note: the order of elements is maintained!
    // concatMap listens to source and processes incoming values one-by-one
    // it waits until the generated inner Observable for the current value completes!
    // this means if for example getNum for a num would never complete, concatMap would be stuck too!
).subscribe(val => console.log('value', val));
// general use cases for concatMap: we need to preserve order; each operation has to finish before the next one is triggered
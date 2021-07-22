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
    switchMap(n => getNum(n))// this will only log 7 (result of getNum() for last num of nums)!
    //reason: each inner observable got cancelled as soon as a new value arrived in the value stream of nums
    // as the values of nums arrive practically synchronously, each http request except for the last one (for 7) got cancelled before it could complete 
).subscribe(val => console.log('nums -> getNum value', val));

numsWithDelay.pipe(
    switchMap(n => getNum(n))// there's a delay between getting the first 3 and following 4 of the total 7 nums emitted by numsWithDelay -> we get 3 and 7
).subscribe(val => console.log('numsWithDelay -> getNum value', val));

// use case for switchMap: whenever we only care about the latest value emitted by an Observable
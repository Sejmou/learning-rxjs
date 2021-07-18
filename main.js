const { Observable, ajax: { ajax }, fromEvent, of, interval, from } = rxjs;

const fromObs1 = from([1, 2, 3]);

fromObs1.subscribe(val => console.log(val));

const fromObs2 = from(new Promise(resolve => resolve('one')));

fromObs2.subscribe(val => console.log(val));
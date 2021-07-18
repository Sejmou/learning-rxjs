const { Observable, ajax: { ajax }, fromEvent, of, interval } = rxjs;

const delayedValsObs = interval(1000);

delayedValsObs.subscribe(val => console.log(val));
const { Observable, ajax: { ajax }, fromEvent, of } = rxjs;

const simpleObs = of(1, 2, 3, 'some text');

simpleObs.subscribe(val => console.log(val));
const { Observable, ajax: { ajax }, fromEvent } = rxjs;

const clickObs = fromEvent(document.getElementById('test-btn'), 'click');

clickObs.subscribe(event => console.log('click event', event));

const textObs = fromEvent(document.getElementById('test-input'), 'input');

textObs.subscribe(event => console.log('input value', event.target.value));
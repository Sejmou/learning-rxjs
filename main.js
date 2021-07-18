const { Observable, fromEvent, operators: { map } } = rxjs;

// Observable -> operator_1 -> ... -> operator_n -> Observable

const inputObs = fromEvent(document.getElementById('test-input'), 'input');

const inputTextObs = map(e => e.target.value)(inputObs);

inputTextObs.subscribe(text => console.log(text));
const { Observable, fromEvent, operators: { map, filter } } = rxjs;

// Observable -> operator_1 -> ... -> operator_n -> Observable

// this is a bit hard to read...
// const filteredTextObs = filter(text => text.length > 3)(
//     map(e => e.target.value)(
//         fromEvent(document.getElementById('test-input'), 'input')
//     ));

// pipe operator to the rescue!
const filteredTextObs = fromEvent(document.getElementById('test-input'), 'input').pipe(
    map(e => e.target.value),
    filter(text => text.length > 3)
);

filteredTextObs.subscribe(text => console.log(text));
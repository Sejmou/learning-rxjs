const { Observable, fromEvent, operators: { map, filter } } = rxjs;

// Observable -> operator_1 -> ... -> operator_n -> Observable

const filteredTextObs = filter(text => text.length > 3)(
    map(e => e.target.value)(
        fromEvent(document.getElementById('test-input'), 'input')
    ));

filteredTextObs.subscribe(text => console.log(text));
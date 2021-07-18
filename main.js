const { Observable, fromEvent } = rxjs;

// Observable -> operator_1 -> ... -> operator_n -> Observable

function map(mappingFn) {
    return function operator(source) {
        return new Observable(subscriber => {
            source.subscribe(val => {
                subscriber.next(mappingFn(val));
            });
        });
    }
}

const inputObs = fromEvent(document.getElementById('test-input'), 'input');

const inputTextObs = map(e => e.target.value)(inputObs);

inputTextObs.subscribe(text => console.log(text));
const { Observable, fromEvent } = rxjs;

// Observable -> operator_1 -> ... -> operator_n -> Observable

function inputValOp(source) {// source is an Observable!
    return new Observable(subscriber => {
        source.subscribe(val => {
            subscriber.next(val.target.value);
        });
    });
}

const inputObs = fromEvent(document.getElementById('test-input'), 'input');

const inputTextObs = inputValOp(inputObs);

inputTextObs.subscribe(text => console.log(text));
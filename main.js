const { Observable } = rxjs;


const simpleObs = new Observable(subscriber => {
    console.log('a simple observable is "executed"');

    let nextVal = 1;

    const interval = setInterval(() => {
        console.log('Observable will return new value');
        subscriber.next(nextVal++);

        if (nextVal === 3) {
            subscriber.complete();
            subscriber.next(4);// this won't have any effect
        }
    }, 1500);

    return () => {// it is really important that we cleanup Observables here, otherwise it is never deleted properly
        console.log(`Subscriber unsubscribed, Observable completed, or Observable emitted error, cleaning up...`);
        clearInterval(interval);
        console.log(`Observable won't emit any more values`);
    }
})

const sub = simpleObs.subscribe(val => {
    console.log('got a value:', val);
    if (val == 4) {
        console.log('unsubscribing from subscription');
        sub.unsubscribe();
    }
}, err => console.warn('received an error from Observable', err), () => console.log('looks like Observable is done!'));
const { Observable } = rxjs;

//subscribers of an Observable don't have to care about any details, they just get values over time
const simpleObs = new Observable(subscriber => {
    // this code will be executed for each subscription (every call to subscribe())!
    console.log('a simple observable is "executed"');
    subscriber.next(1);
    subscriber.next(2);

    // demonstrating that Observables "emit values over time"
    setTimeout(() => subscriber.next(3), 1000);

    let nextVal = 4;
    setInterval(() => {
        console.log('Observable will return new value');
        subscriber.next(nextVal++);
    }, 1500);
})

// we can choose to unsubscribe later by storing the subscription and calling unsubscribe() on it
const subscription = simpleObs.subscribe(val => {
    console.log('got a value from subscription:', val);
    if (val == 4) {
        console.log('unsubscribing from subscription');
        subscription.unsubscribe();
    }
});

//... however, this doesn't "kill" the Observable, it still keeps on emitting values...
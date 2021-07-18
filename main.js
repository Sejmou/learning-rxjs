const { Observable } = rxjs;


const simpleObs = new Observable(subscriber => {
    console.log('a simple observable is "executed"');
    subscriber.next(1);
    subscriber.next(2);

    setTimeout(() => subscriber.next(3), 1000);

    let nextVal = 4;
    const interval = setInterval(() => {
        console.log('Observable will return new value');
        subscriber.next(nextVal++);
    }, 1500);

    // we can return a function that cleans up the Observable after the subscriber unsubscribed 
    return () => {
        console.log('Subscriber unsubscribed, will not emit any more values');
        clearInterval(interval);
    }
})

const subscription = simpleObs.subscribe(val => {
    console.log('got a value from subscription:', val);
    if (val == 4) {
        console.log('unsubscribing from subscription');
        subscription.unsubscribe();// note: this doesn't "kill" the Observable, it still keeps on emitting values...
    }
});
const { Observable } = rxjs;


const simpleObs = new Observable(subscriber => {
    console.log('a simple observable is "executed"');

    let nextVal = 1;

    const interval = setInterval(() => {
        console.log('Observable will return new value');
        subscriber.next(nextVal++);

        if (nextVal === 3) subscriber.error('oops, we f*cked up');
    }, 1500);

    return () => {
        console.log(`Subscriber unsubscribed (or an error occurred), won't emit any more values`);
        clearInterval(interval);
    }
})

const subWithoutErrHandling = simpleObs.subscribe(val => {
    console.log('subWithoutErrHandling got a value:', val);
    if (val == 4) {
        console.log('subWithoutErrHandling unsubscribing from subscription');
        subWithoutErrHandling.unsubscribe();
    }
});

const subWithErrHandling = simpleObs.subscribe(val => {
    console.log('subWithErrHandling got a value from subscription:', val);
    if (val == 4) {
        console.log('subWithErrHandling unsubscribing from subscription');
        subWithErrHandling.unsubscribe();
    }
}, err => console.warn(`subWithErrHandling received error ${err}`));
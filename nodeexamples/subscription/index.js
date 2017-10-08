const Rx = require('rxjs/Rx');

var myFirstObservable = Rx.Observable.create((observer) => {
        observer.next(1);
        setTimeout(() => {
            observer.next(2);
        }, 1000);
        setTimeout(() => {
            observer.next(3);
        }, 2000);
        setTimeout(() => {
            observer.complete();
        }, 3000);
    });

// Subscribe like normal, but let's store our subscription inside a variable
var myFirstSubscription = myFirstObservable
    .subscribe(
        (result) => {
            console.log(`Output: ${result}`);
        }
    );

// Add (Poorly named function) allows us to register an event when the subscription is unsubscribed
myFirstSubscription.add(() => {
    console.log(`The subscription was cancelled.`);
})

// After 1500 milliseconds, let's unsubscribe
setTimeout(() => {
    // Checked that we haven't already closed out subscription
    if (!myFirstSubscription.closed) {
        myFirstSubscription.unsubscribe();
    }
}, 1500);
const Rx = require('rxjs/Rx');

// Creating an Observable
var myFirstObservable = Rx.Observable.create((observer) => {

    // Send the first value of the stream
    observer.next(1);

    // Wait 1 second then send the second value
    setTimeout(() => {
        observer.next(2);
    }, 1000);

    // Wait 2 seconds then send the 3rd value
    setTimeout(() => {
        observer.next(3);
    }, 2000);

    setTimeout(() => {

        // Complete the observable with success
        observer.complete();

    }, 3000);

});


myFirstObservable
    .subscribe(
        (result) => {
            console.log(`Output: ${result}`);
        }
    );
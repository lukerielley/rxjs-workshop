const Rx = require('rxjs/Rx');

// Creating an Observable
var mySecondObservable = Rx.Observable.create((observer) => {

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

        // Complete the observable with an error
        // observer.error('Something went wrong');

    }, 3000);

});

var outputCount = 0;

mySecondObservable

    .delay(1000)

    .finally(() => {

        console.log(`The observable's lifespan has ended. It could have been success or failure. It emitted ${outputCount} item(s).`);
    })

    .do((item) => {
        // This .do is BEFORE the map function, so it gets the item as it was emitted by the inner observable
        console.log(`.do BEFORE: ${item}`);
        outputCount++;
    })

    .map((item) => {
        console.log(`.map:  ${item}`);
        return item * 10;
    })

    .do((item) => {
        // This .do is AFTER the map function, so it gets the transformed (mapped) item
        console.log(`.do AFTER: ${item}`);
    })

    .subscribe(
        (result) => {
            console.log(`Output: ${result}`);
        },
        (error) => {
            console.log(`An error occured`);
        },
        () => {
            console.log(`Successful completion`);
        }
);
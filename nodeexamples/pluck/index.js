const Rx = require('rxjs/Rx');

// Creating an Observable
var myFirstObservable = Rx.Observable.from(
    [
        {
            "account": "123",
            "address": {
                "street": "Victoria",
                "suburb": "Brunswick"
            }
        },
        {
            "account": "234",
            "address": {
                "street": "Collins",
                "suburb": "Docklands"
            }
        },
        {
            "account": "345",
            "address": {}
        },
        {
            "account": "456",
            "address": {
                "street": "Flinders",
                "suburb": "Melbourne"
            }
        }
    ]
);

console.log(`Outputting a list of the suburbs of our customers`);
myFirstObservable
    // Pluck works like a .map, and allows us to specify the path of an object that we wish to get
    .pluck('address', 'suburb')
    .subscribe(
        (result) => {
            if (result) {
                console.log(`\t - ${result}`);
            } else {
                console.log(`\t - No suburb found for this customer`);
            }
        }
    );
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
            "account": "456"
        }
    ]
);

console.log(`Outputting a list of the suburbs of our customers`);
myFirstObservable
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
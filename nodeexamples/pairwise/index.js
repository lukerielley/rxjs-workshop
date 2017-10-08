const Rx = require('rxjs/Rx');


randomArray = (length, max) => [...new Array(length)]
    .map(() => Math.round(Math.random() * max));

// Create an observable that emits 10 items of random numbers
var pairObservable = Rx.Observable.from(randomArray(10, 100));

pairObservable
    .pairwise()
    .subscribe((resultPair) => {
        let firstItem = resultPair[0];
        let secondItem = resultPair[1];
        let different = firstItem - secondItem;
        console.log(`Data pair: ${firstItem} & ${secondItem}. Difference: ${different}`);
    });
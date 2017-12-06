const Rx = require('rxjs/Rx');

randomArray = (length, max) => [...new Array(length)]
    .map(() => Math.round(Math.random() * max));

// Create an observable that emits 10 items of random numbers
var pairObservable = Rx.Observable.from(randomArray(10, 100));

pairObservable
    .pairwise()
    .subscribe((resultPair) => {
        // Grab the first item from the pair
        let firstItem = resultPair[0];
        // Grab the second item from the pair
        let secondItem = resultPair[1];
        // Perform the math calculation on the 2 items from the pair
        let different = firstItem - secondItem;
        // Output the result
        console.log(`Data pair: ${firstItem} & ${secondItem}. Difference: ${different}`);
    });
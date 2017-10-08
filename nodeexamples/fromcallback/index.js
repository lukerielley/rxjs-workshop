const fs = require('fs');
const Rx = require('rxjs/Rx');

console.log(`Welcome to the example`);

let simple = Rx.Observable.from([1,2,3]);

simple.subscribe((x) => {
    console.log(`Simple output: ${x}`);
});

// Natural Callback Example
fs.exists("./samplefile.txt", function (exists) {
    console.log(`Does 'samplefile.txt' exist? = ${exists}`);
});


// RxJS Wrapper of a Callback
var exists = Rx.Observable.bindCallback(fs.exists);
exists('./samplefile.txt').subscribe((exists) => {
    console.log('RxJS Wrapper of a callback: ', exists);
});
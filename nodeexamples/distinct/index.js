const Rx = require('rxjs/Rx');

var pairObservable = Rx.Observable.from(
    [
        'L',
        'U',
        'K',
        'E',
        'R',
        'I',
        'E',
        'L',
        'L',
        'E',
        'Y'
    ]
);

console.log(`distinct():`);
pairObservable
    .distinct()
    .subscribe((result) => {
        console.log(`result: ${result}`);
    });

console.log(`distinctUntilChanged():`);
pairObservable
    .distinctUntilChanged()
    .subscribe((result) => {
        console.log(`result: ${result}`);
    });
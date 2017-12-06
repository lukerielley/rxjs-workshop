const Rx = require('rxjs/Rx');

var pairObservable = Rx.Observable.from(
    [
        3,
        4,
        6,
        7,
        9,
        12,
        56,
        4,
        8
    ]
);

pairObservable
    .filter((x) => {
        return x > 7; 
    })
    .map((item) => {
        return item * 10;
    })
    .subscribe((result) => {
        console.log(result);
    });
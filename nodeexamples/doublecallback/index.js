const fs = require('fs');
const Rx = require('rxjs/Rx');

function open(filename) {
   return Rx.Observable
    .bindCallback(fs.readFile)(`./${filename}`)
    .map(([error, buffer]) => {
        if (!error && buffer) {
            try {
                let model = JSON.parse(buffer);
                if (model.data) {
                    return model.data;
                }
            } catch (err) {
                Rx.Observable.throw(err);
            }
        }
        Rx.Observable.throw();
    })
}

function process() {
    let calls = [
        open('a.json'),
        open('b.json'),
        open('c.json')
    ];
    return Rx.Observable
        .forkJoin(calls);
}

process().subscribe(
    ([fileA, fileB, fileC]) => {
        console.log(fileA);
        console.log(fileB);
        console.log(fileC);
    },
    (error) => {
        console.log(`Error :(`);
    }
)
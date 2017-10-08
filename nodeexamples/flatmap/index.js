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

function createModel() {
    return loadAccount()
        .flatMap((accountNumber) => {
            if (accountNumber == 45) {
                let calls = [
                    open(`./${accountNumber}/a.json`),
                    open(`./${accountNumber}/b.json`),
                    open(`./${accountNumber}/c.json`)
                ];
                return Rx.Observable
                    .forkJoin(calls)
                    .map((results) => {
                        var model = {};
                        model['accountNumber'] = accountNumber;
                        model['customers'] = [];
                        results.forEach((result) => {
                            model.customers.push(result);
                        });
                        return model;
                    });
            } else {
                return Rx.Observable.of(null);
            }
        });
}

function loadAccount() {
    return open('account.json')
            .map((data) => {
                return data
            });
}

createModel().subscribe(
    (result) => {
        if (result) {
            console.log(`\nRESULT:\n`);
            console.log(JSON.stringify(result, null, 4));
            console.log('\n\n');
        } else {
            console.log(`Result is empty :(`);
        }
    }
);
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

            console.log(`Account number is ${accountNumber}`);

            /*
                This example simulates having to make an async call, and 
                with it's result make subsequent async calls that require a
                param from the initial call (In this case, the account number)
            */

            if (accountNumber == 45) {

                // Define our async calls into an array
                let calls = [
                    open(`./${accountNumber}/a.json`),
                    open(`./${accountNumber}/b.json`),
                    open(`./${accountNumber}/c.json`)
                ];

                // Return the result of the forkJoin calls, but with a map 
                return Rx.Observable
                    .forkJoin(calls)
                    .map((results) => {

                        // Here we can create our data model

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
            .delay(1000)
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
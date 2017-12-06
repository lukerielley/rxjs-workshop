(function (global, $, Rx) {

    function main() {
        var results = $('#results');

        var btnObservable = Rx.Observable.fromEvent($('#btn-demo'), 'click')

        btnObservable.subscribe(() => {
            results.append (`<li>Clicked!</li>`);
        })
    }

    $(main);
    
}(window, jQuery, Rx));
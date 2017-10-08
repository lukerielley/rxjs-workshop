(function (global, $, Rx) {

    function main() {
        var clickMeButton = $('#btn-demo');
        var results = $('#results');
        var btnObservable = Rx.Observable.fromEvent(clickMeButton, 'click')
        btnObservable.subscribe(() => {
            results
            .append (`<li>Clicked!</li>`);
        })
    }

    $(main);
    
}(window, jQuery, Rx));
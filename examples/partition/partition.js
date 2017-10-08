(function (global, $, Rx) {

    var isOpen = false;
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var clicksOnFloaterSubscription;
    var clicksElsewhereSubscription;

    function main() {

        var clickToOpenArea = $(".custom-drop-down");
        var floater = $("#floater");

        Rx.Observable.fromEvent(clickToOpenArea, 'click').subscribe((x) => {
            if (!isOpen) {
                openDropDownList();
                floater.show();
            } else {
                floater.hide();
            }
            isOpen = !isOpen;
        });

    }

    function openDropDownList(result) {
        console.log(`Registering clicks...`);
        
        var parts = clicks.partition(ev => ev.target.id === 'floater');
        var clicksOnFloater = parts[0];
        var clicksElsewhere = parts[1];
        clicksOnFloaterSubscription = clicksOnFloater.subscribe((x) => {
            console.log(`Clicked on the floater`);
        });
        clicksElsewhereSubscription = clicksElsewhere.subscribe((x) => {
            console.log(`Clicked somewhere other than the floater`);
        });
    }


    $(main);

}(window, jQuery, Rx));
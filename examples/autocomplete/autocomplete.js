(function (global, $, Rx) {

  // Search Wikipedia for a given term
  function searchWikipedia (term) {
    return $.ajax({
      url: 'http://en.wikipedia.org/w/api.php',
      dataType: 'jsonp',
      data: {
        action: 'opensearch',
        format: 'json',
        search: term
      }
    }).promise();
  }

  function main() {
    var $input = $('#textInput'),
        $results = $('#results');

    // Get all distinct key up events from the input and only fire if long enough and distinct
    var keyup = Rx.Observable.fromEvent($input, 'keyup')
      .map(function (e) {
        // Map allows us to take the inner observable and 'transform' it
        // console.log(`Key pressed`, e);
        return e.target.value;
      })
      // .do((x) => {
      //   console.log(`Key has changed: ${x}`);
      // })
      .filter(function (text) {
        // Filter using the predicate (text length must be greater than 2)
        return text.length > 2;
      })
      // .do((x) => {
      //   console.log(`Has text longer than 2 '${x}'`);
      // })
      // Debounce for 750 milliseconds
      .debounce(750)
      // .do(() => {
      //   console.log(`Time is up :)`);
      // })
      // Only if the value has changed
      .distinctUntilChanged();

    var searcher = keyup.flatMapLatest(searchWikipedia);

    searcher.subscribe(
      function (data) {
        $results
          .empty()
          .append ($.map(data[1], function (v) { return $('<li>').text(v); }));
      },
      function (error) {
        $results
          .empty()
          .append($('<li>'))
          .text('Error:' + error);
      });
  }

  $(main);

}(window, jQuery, Rx));

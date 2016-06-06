console.log('loaded: product-view.js');
$(document).ready(function() {
    // -------------------------------------------------------------------------
    // GLOBALS -----------------------------------------------------------------
    // -------------------------------------------------------------------------

    // fetch orders in last hour
    var $trendStateDiv = $('#trendStateDiv');
    var currentProductId = $('#currentProduct').val();
    var getOrdersAPIstring = '/api/products/' + currentProductId + '/orders';
    var geProductAPIstring = '/api/products/' + currentProductId;
    var currentState = {};
    var pollInterval = 2000;


    var getPreviousDataByTime = function (data, milliseconds) {
        var dateLimit = new Date().getTime() - milliseconds;
        return data.filter(function(item) {
            var dateInItem = new Date(item.created_at).getTime();
            return (dateInItem > dateLimit);
        });
    }

    var orderPoll = function() {
        setTimeout(function() {
            $.ajax({
                  url: getOrdersAPIstring,
                  dataType: 'json',
                  cache: false,
                  success: function(newState) {
                        console.log(getPreviousDataByTime(newState, 5000));
                        orderPoll()
                  },
                  error: function(xhr, status, err) {
                  }
            });
        }, pollInterval);
    };

    var productPoll = function() {
        setTimeout(function() {
            $.ajax({
                  url: geProductAPIstring,
                  dataType: 'json',
                  cache: false,
                  success: function(newState) {
                      productPoll();
                  },
                  error: function(xhr, status, err) {}
            });
        }, pollInterval);
    }




    // -------------------------------------------------------------------------
    // EVENTS -----------------------------------------------------------------
    // -------------------------------------------------------------------------

    productPoll();
    orderPoll();

})

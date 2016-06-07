console.log('loaded: product-view.js');
$(document).ready(function() {
    // -------------------------------------------------------------------------
    // GLOBALS -----------------------------------------------------------------
    // -------------------------------------------------------------------------

    // fetch orders in last hour
    var $trendStateDiv = $('#trendState');
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

    var getCurrentTrend = function (data) {
        var orderCount = data.length;
        var trendMessage = '';
        if (orderCount > 2) {
            trendMessage = 'INCREASING PRICE';
            console.log(trendMessage);
        } else {
            trendMessage = 'DECREASING PRICE';
            console.log(trendMessage);
        }
        return trendMessage;
    }

    var renderTrendState = function (value) {
        $trendStateDiv.text(value);
    }

    var pollHandler = function (newState) {
        var ordersInPast = getPreviousDataByTime(newState, 8000);
        var currentTrend = getCurrentTrend(ordersInPast);
        renderTrendState(currentTrend);
    }

    var orderPoll = function() {
        setTimeout(function() {
            $.ajax({
                  url: getOrdersAPIstring,
                  dataType: 'json',
                  cache: false,
                  success: function(newState) {
                        pollHandler(newState);
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

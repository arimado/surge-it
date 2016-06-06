console.log('loaded: product-view.js');
$(document).ready(function() {
    // -------------------------------------------------------------------------
    // GLOBALS -----------------------------------------------------------------
    // -------------------------------------------------------------------------

    // fetch orders in last hour
    var currentProductId = $('#currentProduct').val();
    var getOrdersAPIstring = '/api/products/' + currentProductId + '/orders';
    var geProductAPIstring = '/api/products/' + currentProductId;

    var productPoll = function () {
        setTimeout(function() {
            $.ajax({
                  url: getProductURI,
                  dataType: 'json',
                  cache: false,
                  success: function(data) {
                      $('#currentPrice').html('<strong> AJAX Current Price: </strong> ' + data.price);
                      productPoll();;
                  },
                  error: function(xhr, status, err) {
                  }
            });
        }, 1000);
    };

    // -------------------------------------------------------------------------
    // EVENTS -----------------------------------------------------------------
    // -------------------------------------------------------------------------

    productPoll();

})

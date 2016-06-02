console.log('loaded product-view.js');

// JUST A POLLING THING THAT GETS ME THE PRODUCTS CURRENT PRICE

var currentProductId = $('#currentProduct').val();

var getOrdersAPIstring = '/api/products/' + currentProductId

function poll() {
    setTimeout(function() {
        $.ajax({
              url: getOrdersAPIstring,
              dataType: 'json',
              cache: false,
              success: function(data) {
                  $('#currentPrice').html('<strong> AJAX Current Price: </strong> ' + data.price);
                  poll();
              },
              error: function(xhr, status, err) {
              }
        });
    }, 1000);
};

poll();

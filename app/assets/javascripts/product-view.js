console.log('loaded product-view.js');



$('#order').click(function(e){

    var data = [{data: 'Hello server!'}];

    $.ajax({
          url: '/products/api/orders',
          dataType: 'json',
          method: 'POST',
          data: data,
          cache: false,
          success: function(response) {
             console.log(response);
          },
          error: function(xhr, status, err) {
          }
    });
})

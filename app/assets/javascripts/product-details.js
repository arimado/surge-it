console.log('loaded: script.js');

$(document).ready(function(){

    // CHART.JS AND SCATTER JS STUFF

    var mapDatesAndPrices = function (data, value) {
        return data.map(function(item) {
                    result = {};
                    result.x = new Date(item.created_at);
                    result.y = parseFloat(item[value]);
                    return result;
                })
    };

    var setInitialDataOnChart = function(data) {
        var args = Array.prototype.slice.call(arguments);
        var dataPoints = args.slice(1, args.length);
        dataPoints.forEach(function(dataPoint, index) {
            mapDatesAndPrices(data, dataPoint).forEach(function(price){
                myDateLineChart.datasets[index].addPoint(price.x, price.y);
            })
        });
    }

    var setNewDataOnChart = function() {
        // all i need to do is to appen a point really
    }

    var chartData = [
                       {
                           label: 'Temp',
                           strokeColor: '#A31515',
                           data: []
                       },
                       {
                           label: 'Total Revenue',
                           strokeColor: '#1581a3',
                           data: []
                       },
                       {
                           label: 'Surge Revenue',
                           strokeColor: 'rgb(227, 184, 33)',
                           data: []
                       },
                       {
                           label: 'Base Revenue',
                           strokeColor: 'rgb(122, 40, 177)',
                           data: []
                       }
                   ];

    var options = {
        bezierCurve: true,
        showTooltips: true,
        scaleShowHorizontalLines: true,
        scaleShowLabels: true,
        scaleType: "date",
        scaleLabel: "$<%=value%>",
        responsive: true,
        datasetFill : true,
        fillColor: "rgba(151,187,205,1)",
        backgroundColor: "rgba(151,187,205,1)",
        fill: true
    }

    var myDateLineChart

     var ctx = document.getElementById("productChart").getContext("2d");
     myDateLineChart = new Chart(ctx).Scatter(chartData, options);

    //  EVENTS

    var currentProductId = $('#currentProduct').val();
    
    $('#fetch').click(function(e){
        e.preventDefault();
        $.ajax({
              url: '/products/api/orders',
              dataType: 'json',
              cache: false,
              success: function(data) {
                 console.log('success')
                 console.log();
                 setInitialDataOnChart(data, 'price', 'revenue', 'revenue_base', 'revenue_surge');
                 myDateLineChart.update();
              },
              error: function(xhr, status, err) {
              }
        });
    })

    // LISTENER


});


(function poll() {

    console.log('hi');

    // setTimeout(function() {
    //     $.ajax({
    //           url: '/products/api/orders',
    //           dataType: 'json',
    //           cache: false,
    //           success: function(data) {
    //               // do stuff here
    //               console.log('success');
    //               myDateLineChart.destroy();
    //               setInitialDataOnChart(data, 'price', 'revenue', 'revenue_base', 'revenue_surge');
    //               myDateLineChart.update();
    //               poll();
    //           },
    //           error: function(xhr, status, err) {
    //           }
    //     });
    // }, 5000);
})();

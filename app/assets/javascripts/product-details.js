console.log('loaded: script.js');


$(document).ready(function(){

    var ctx = document.getElementById("productChart").getContext("2d");

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

     var myDateLineChart = new Chart(ctx).Scatter(chartData, options);


    $('#fetch').click(function(e){
        e.preventDefault();
        $.ajax({
              url: '/products/api/orders',
              dataType: 'json',
              cache: false,
              success: function(data) {
                 console.log('success')
                 console.log();
                //  myDateLineChart.datasets[1] = data;

                console.log(mapDatesAndPrices(data, 'price'));

                 mapDatesAndPrices(data, 'price')
                    .forEach(function(price) {
                         myDateLineChart.datasets[0].addPoint(price.x, price.y);
                     })
                 mapDatesAndPrices(data, 'revenue')
                    .forEach(function(price) {
                         myDateLineChart.datasets[1].addPoint(price.x, price.y);
                     })
                 mapDatesAndPrices(data, 'revenue_surge')
                    .forEach(function(price) {
                         myDateLineChart.datasets[2].addPoint(price.x, price.y);
                     })
                     mapDatesAndPrices(data, 'revenue_base')
                        .forEach(function(price) {
                             myDateLineChart.datasets[3].addPoint(price.x, price.y);
                         })

                 myDateLineChart.update();

              },
              error: function(xhr, status, err) {
              }
        });
    })

    var mapDatesAndPrices = function (data, value) {
        return data.map(function(item) {
                    result = {};
                    result.x = new Date(item.created_at);
                    result.y = parseFloat(item[value]);
                    return result;
                })
    };





})

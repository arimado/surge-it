console.log('loaded: script.js');

$(document).ready(function(){

    // CHART.JS AND SCATTER JS STUFF

    var chartData = [
        {
           label: 'Temp',
           strokeColor: '#A31515'
        },
        {
           label: 'Total Revenue',
           strokeColor: '#1581a3'
        },
        {
           label: 'Surge Revenue',
           strokeColor: 'rgb(227, 184, 33)'
        },
        {
           label: 'Base Revenue',
           strokeColor: 'rgb(122, 40, 177)'
        }
    ];

    var options = {
        bezierCurve: false,
        showTooltips: true,
        scaleShowVerticalLines: false,
        scaleShowHorizontalLines: false,
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

    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------

    var currentState = {};
    var currentProductId = $('#currentProduct').val();
    var $surgePrice = $('#surgePrice');
    var $basePrice = $('#basePrice');
    var $totalPrice = $('#totalPrice');
    var $todayOrderTotal = $('#todayOrderTotal');
    var $todayOrderCount = $('#todayOrderCount');
    var todayOrderTotal = 0;
    var todayOrderCount = 0;

    var getOrdersAPIstring = '/api/products/' + currentProductId + '/orders';
    var geProductAPIstring = '/api/products/' + currentProductId;

    var mapDatesAndPrices = function (data, value) {
        return data.map(function(item) {
                    result = {};
                    result.x = new Date(item.created_at);
                    result.y = parseFloat(item[value]);
                    return result;
                })
    };

    // setInitialDataOnChart(data, string1, string2 ...)
    // this function takes the data object returned from the server and then a
    // number of strings. These strings are the reference to which key will be
    // mapped on the y axis.

    // in dataPoints.forEach
    // for every different data point or different key we are referencing we
    // will loop through the mapped array of objects and add it to the chart

    var setInitialDataOnChart = function (data) {
        var args = Array.prototype.slice.call(arguments);
        var dataPoints = args.slice(1, args.length);
        dataPoints.forEach(function(dataPoint, index) {
            mapDatesAndPrices(data, dataPoint).forEach(function(price){
                myDateLineChart.datasets[index].addPoint(price.x, price.y);
            })
        });
    }

    var findNewData = function(currentState, newState) {
        var newValues = [];
        if (newState.length > currentState.length) {
            newValues = newState.slice(currentState.length, newState.length);
        }
        return newValues;
    }

    // set data on chart

    var setNewDataOnChart = function(newData, chart) {
        if (newData.length > 0) {
            var args = Array.prototype.slice.call(arguments);
            var dataPoints = args.slice(2, args.length);
            dataPoints.forEach(function(dataPoint, index) {
                mapDatesAndPrices(newData, dataPoint).forEach(function(price){
                    chart.datasets[index].addPoint(price.x, price.y);
                })
            })
            chart.update();
            return newData;
        } else {
            return currentState;
        }
    }

    var updateProductDash = function(data) {
        $surgePrice.html(data.price - data.price_base);
        $basePrice.html(data.price_base);
        $totalPrice.html(data.price);
    }

    var findTodaysOrders = function (data) {
        var startOfToday = new Date().setHours(0, 0, 0, 0);
        var endOfToday = new Date().setHours(23,59,59,999);
        return data.filter(function(order) {
            var currentTime = new Date(order.created_at).getTime();
            if (currentTime >= startOfToday && currentTime <= endOfToday) {
                return true;
            } else {
                return false;
            }
        });
    }; 

    var findLastWeeksOrders = function (data) {
        var startTime = new Date().setHours(0, 0, 0, 0);
        var endTime = new Date().setHours(23,59,59,999);
        return data.filter(function(order) {
            var currentTime = new Date(order.created_at).getTime();
            if (currentTime >= startTime && currentTime <= endTime) {
                return true;
            } else {
                return false;
            }
        });
    };

    var getTotalPriceOfOrders = function (data) {
        return data.reduce(function(prevOrder, nextOrder) {
            if (typeof prevOrder !== "number") {
                return parseFloat(prevOrder.price) + parseFloat(nextOrder.price);
            } else {
                return prevOrder + parseFloat(nextOrder.price);
            }
        })
    }

    var updateOrderDash = function(previousState, newState) {

        console.log('updating order dasg');

        $todayOrderCount.html(newState.length);

        // I wont be able to just reference total revenue, i'm going to have to
        // filter than reduce to todays revenue

        // var startOrderTotal = previousState[previousState.length - 1].revenue;
        // var targetOrderTotal = newState[newState.length - 1].revenue;
        //
        // var startOrderCount = previousState.length;
        // var targetOrderCount = newState.length;

        // filter for today
            // reduce
            // count

        var todaysPreviousOrders = findTodaysOrders(previousState);
        var todaysNewOrders = findTodaysOrders(newState);

        var startOfTodaysOrderCount = todaysPreviousOrders.length;
        var targetOfTodaysOrderCount = todaysNewOrders.length;

        var startOfTodaysOrderTotal = getTotalPriceOfOrders(todaysPreviousOrders);
        var targetOfTodaysOrderTotal = getTotalPriceOfOrders(todaysNewOrders);;

        console.log('startOfTodaysOrderCount: ' + startOfTodaysOrderCount);
        console.log('targetOfTodaysOrderCount: ' + targetOfTodaysOrderCount);
        console.log('startOfTodaysOrderTotal: ' + startOfTodaysOrderTotal);
        console.log('targetOfTodaysOrderTotal: ' + targetOfTodaysOrderTotal);

        // filter for day before or week before
            // reduce
            // count





        $todayOrderTotal
            .prop('number', startOfTodaysOrderTotal)
            .animateNumber(
                {
                    number: targetOfTodaysOrderTotal,
                    numberStep: function(now, tween) {
                        var floored_number = now.toLocaleString('en-IN', { maximumFractionDigits: 2 });
                        var target = $(tween.elem);
                        target.text('$' + floored_number);
                    }
                },
                1000
            );



    }




    var orderPoll = function() {
        setTimeout(function() {
            $.ajax({
                  url: getOrdersAPIstring,
                  dataType: 'json',
                  cache: false,
                  success: function(newState) {

                        var newData = findNewData(currentState, newState);

                        setNewDataOnChart(newData, myDateLineChart, 'price', 'revenue', 'revenue_base', 'revenue_surge');

                        if (newData.length > 0) {
                            updateOrderDash(currentState, newState);
                            currentState = newState;
                            // update orders


                        }
                        orderPoll();
                  },
                  error: function(xhr, status, err) {
                  }
            });
        }, 1000);
    };

    var productPoll = function() {
        setTimeout(function() {
            $.ajax({
                  url: geProductAPIstring,
                  dataType: 'json',
                  cache: false,
                  success: function(data) {
                      updateProductDash(data);
                      productPoll();
                  },
                  error: function(xhr, status, err) {
                  }
            });
        }, 1000);
    }


    // -------------------------------------------------------------------------
    // EVENTS ------------------------------------------------------------------
    // -------------------------------------------------------------------------

    // INITIALISE POLLING
    orderPoll();
    productPoll();

    // INITIALISE BOARD
    $.ajax({
          url: getOrdersAPIstring,
          dataType: 'json',
          cache: false,
          success: function(data) {
             console.log('success')
             console.log();
             setInitialDataOnChart(data, 'price', 'revenue', 'revenue_base', 'revenue_surge');
             myDateLineChart.update();
             currentState = data;
             todayOrderTotal = data[data.length - 1].revenue;
             todayCountTotal = data.length;
          },
          error: function(xhr, status, err) {
          }
    });

    $('#fetch').click(function(e){
        $.ajax({
              url: '/api/products/22/orders/create',
              dataType: 'json',
              method: 'POST',
              cache: false,
              success: function(data) {

              },
              error: function(xhr, status, err) {
              }
        });

        // e.preventDefault();
        // $.ajax({
        //       url: '/api/products/' + currentProductId + '/orders',
        //       dataType: 'json',
        //       cache: false,
        //       success: function(data) {
        //          console.log('success')
        //          console.log();
        //          setInitialDataOnChart(data, 'price', 'revenue', 'revenue_base', 'revenue_surge');
        //          myDateLineChart.update();
        //       },
        //       error: function(xhr, status, err) {
        //       }
        // });
    })

});

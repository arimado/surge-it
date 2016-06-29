console.log('loaded: product-details.js');

$(document).ready(function(){

    // -------------------------------------------------------------------------
    // GLOBALS -----------------------------------------------------------------
    // -------------------------------------------------------------------------

    var currentState = {};
    var currentDataPoint = '';

    var currentProductId = $('#currentProduct').val();
    var $surgePrice = $('#surgePrice');
    var $basePrice = $('#basePrice');
    var $totalPrice = $('#totalPrice');
    var $todayOrderTotal = $('#todayOrderTotal');
    var $todayOrderCount = $('#todayOrderCount');
    var $lastWeeksOrderTotal = $('#lastWeeksOrderTotal');
    var $lastWeeksOrderCount = $('#lastWeeksOrderCount');
    var $chartRadioPrice = $('#chartRadioPrice');
    var $chartRadioRevenue = $('#chartRadioRevenue');
    var $chartRadioOrders = $('#chartRadioOrders');

    var getOrdersAPIstring = '/api/products/' + currentProductId + '/orders';
    var geProductAPIstring = '/api/products/' + currentProductId;

    // -------------------------------------------------------------------------
    // CHART.JS INITIALISE -----------------------------------------------------
    // -------------------------------------------------------------------------

    var chartData = [{
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

    var myDateLineChart;

    var ctx = document.getElementById("productChart").getContext("2d");
    myDateLineChart = new Chart(ctx).Scatter(chartData, options);

    // -------------------------------------------------------------------------
    // CHART FUNCTIONS ---------------------------------------------------------
    // -------------------------------------------------------------------------

    var mapDatesAndPrices = function (data, value) {
        var normalisedData = normaliseData(data, 49000)
        debugger;
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

    // notes ...................................................................

    // GOAL: to only show a single data point at a time
    // instead of looping through every forEach - just loop through the one you
    // want

    // end notes ...............................................................


    var getDataInRange = function (data, start, end) {
        return data.filter(function (eachThing) {
            var currentDate = new Date(eachThing.created_at).getTime();
            return currentDate >= start && currentDate <= end;
        })
    }

    var getAverageInRange = function (range, time) {

        if (range.length <= 0) return null;

        var avgPrice = range.map(function (order) {
            return parseFloat(order.price)
        }).reduce(function (current, next) {
            return current + next;
        }, 0);

        return {
            x: new Date(time),
            y: avgPrice
        }
    }

    var normaliseData = function (data, interval) {

        // within each interval you need to get the average of all points
        // so have three things for each interval
            // end number
            // middle number (where you place average)
            // start number

        //the timeRange
            // how much intervals fit in this?
            // probs do a loop and do a check if time range is still greater
            // if not
                // then just do the final point on that interval

        var results = [];

        var intervalCounter = interval
        var start =  new Date(data[0].created_at).getTime();
        var end = new Date(data[data.length - 1].created_at).getTime()
        var range = end - start;
        var startRange;
        var prevAverage = null;

        for ( let i = start; i < end; i += interval) {

            var currentDatePoint = i - (interval/2)
            // GET START RANGE

            if (i >= interval * 2) {
                startRange = i - interval;
            } else {
                startRange = 0;
            }

            var range = getDataInRange(data, startRange, i);
            var average = getAverageInRange(range, i);
            if(average === null){
                average = prevAverage;
            }
            results.push(average);
            prevAverage = average;
        }

        return results;
    }

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

    // -------------------------------------------------------------------------
    // DASHBOARD FUNCTIONS -----------------------------------------------------
    // -------------------------------------------------------------------------

    //  updateProductDash() simply recieves data from polling the product itself
    //  rather than the details
    //  this is called in productPoll()

    var updateProductDash = function(data) {
        $surgePrice.html(data.price - data.price_base);
        $basePrice.html(data.price_base);
        $totalPrice.html(data.price);
    }

    //  below are functions for parsing and displaying data related to orders
    //  updateOrderDash() is called in orderPoll()

    var findOrdersByStartEndTime = function (data, startTime, endTime) {
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
        if (data.length === 0) return 0;
        return data.reduce(function(prevOrder, nextOrder) {
            if (typeof prevOrder !== "number") {
                return parseFloat(prevOrder.price) + parseFloat(nextOrder.price);
            } else {
                return prevOrder + parseFloat(nextOrder.price);
            }
        })
    };

    var renderNewNumber = function (jqueryElement, startNumber, targetNumber, numberStepFunc, interval) {
        jqueryElement
            .prop('number', startNumber)
            .animateNumber(
                {
                    number: targetNumber,
                    numberStep: numberStepFunc
                },
                interval
            );
    }

    var updateOrderDash = function(previousState, newState) {

        var thisTimeLastWeek = new Date().getTime() - (7 * 24 * 60 * 60 * 1000);
        var thisTimeYesterday = new Date().getTime() - (24 * 60 * 60 * 1000);
        var startOfToday = new Date().setHours(0, 0, 0, 0); //setHours returns the miliseconds
        var timeNow = new Date().getTime();

        var todaysPreviousOrders = findOrdersByStartEndTime(previousState, startOfToday, timeNow);
        var todaysNewOrders = findOrdersByStartEndTime(newState, startOfToday, timeNow);
        var lastWeeksPrevOrders = findOrdersByStartEndTime(previousState, thisTimeLastWeek, thisTimeYesterday);
        var lastWeeksNewOrders = findOrdersByStartEndTime(newState, thisTimeLastWeek, thisTimeYesterday);
        var todaysPrevOrderTotal = getTotalPriceOfOrders(todaysPreviousOrders);
        var todaysNewOrderTotal = getTotalPriceOfOrders(todaysNewOrders);
        var lastWeeksPrevOrdersTotal = getTotalPriceOfOrders(lastWeeksPrevOrders);
        var lastWeeksNewOrdersTotal = getTotalPriceOfOrders(lastWeeksNewOrders);

        // RENDER CHANGES TO DOM USING animateNumber.js

        renderNewNumber($todayOrderTotal, todaysPrevOrderTotal, todaysNewOrderTotal,
            function(now, tween) {
                var floored_number = now.toLocaleString('en-IN', { maximumFractionDigits: 2 });
                var target = $(tween.elem);
                target.text('$' + floored_number);
            },
        1000);

        renderNewNumber($todayOrderCount, todaysPreviousOrders.length, todaysNewOrders.length,
            function(now, tween) {
                var floored_number = Math.round(now);
                var target = $(tween.elem);
                target.text(floored_number);
            },
        1000);

        renderNewNumber($lastWeeksOrderTotal, lastWeeksPrevOrdersTotal, lastWeeksNewOrdersTotal,
            function(now, tween) {
                var floored_number = now.toLocaleString('en-IN', { maximumFractionDigits: 2 });
                var target = $(tween.elem);
                target.text('$' + floored_number);
            },
        1000);

        renderNewNumber($lastWeeksOrderCount, lastWeeksPrevOrders.length, lastWeeksNewOrders.length,
            function(now, tween) {
                var floored_number = Math.round(now);
                var target = $(tween.elem);
                target.text(floored_number);
            },
        1000);

    }

    // Polling functions

    var orderPoll = function() {
        setTimeout(function() {
            $.ajax({
                  url: getOrdersAPIstring,
                  dataType: 'json',
                  cache: false,
                  success: function(newState) {
                        var newData = findNewData(currentState, newState);
                        setNewDataOnChart(newData, myDateLineChart, 'price');
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
                  success: function(newState) {
                      updateProductDash(newState);
                      productPoll();
                  },
                  error: function(xhr, status, err) {
                  }
            });
        }, 1000);
    }

    $chartRadioPrice.click(function() {
        // on click destroy the chart and change the reverence for the chart
        // initialisation functions
        currentDataPoint = 'price';
        console.log(currentDataPoint);
        myDateLineChart.destroy();
        myDateLineChart = new Chart(ctx).Scatter(chartData, options);
        setNewDataOnChart(currentState, myDateLineChart, currentDataPoint);
        console.log(myDateLineChart);

    });

    $chartRadioRevenue.click(function() {
        currentDataPoint = 'revenue';
        myDateLineChart.destroy();
        myDateLineChart = new Chart(ctx).Scatter(chartData, options);
        setNewDataOnChart(currentState, myDateLineChart, currentDataPoint);
        console.log(myDateLineChart);
    });

    $chartRadioOrders.click(function() {
        currentDataPoint = 'orders';
        console.log(currentDataPoint);

    });

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
             console.log(data);
             setInitialDataOnChart(data, 'price');
             updateOrderDash(data, data);
             myDateLineChart.update();
             currentState = data;
            //  debugger;
          },
          error: function(xhr, status, err) {
          }
    });


});

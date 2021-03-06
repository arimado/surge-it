console.log('loaded: product-details.js');

var myDateLineChart;
var currentState = {};
var currentNormalisedState = [];
var normaliseInterval = 24000;

var updatePointOnChart = function(chart, index, value) {
    // chart.datasets[index].
    // debugger;
    var lastPointIndex = chart.datasets[index].points.length;
    chart.datasets[index].points[lastPointIndex - 1].value = value;
    chart.update();
}

var addPresentPoint = function (dataset, interval) {

    // Currently gets last element of the array and
    // appends a copy with time being increased by an interval

    var newDataset = dataset;
    var lastDataPoint = newDataset[newDataset.length - 1]
    var lastDate = new Date(lastDataPoint.x).getTime();
    var presentDate = new Date(lastDate + interval);

    var presentDataPoint = {
        x:            presentDate,
        y:            lastDataPoint.y,
        presentPoint: true,
    }

    newDataset.push(presentDataPoint);

    return newDataset;
}

$(document).ready(function(){

    // -------------------------------------------------------------------------
    // GLOBALS -----------------------------------------------------------------
    // -------------------------------------------------------------------------


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

    var startingData = {
      labels: [1, 2, 3, 4, 5, 6, 7],
      datasets: [
          {
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
    }

    var options = {
        bezierCurve: true,
        showTooltips: true,
        scaleShowVerticalLines: true,
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

    var ctx = document.getElementById("productChart").getContext("2d");
    myDateLineChart = new Chart(ctx).Scatter(chartData, options);
    // myDateLineChart = new Chart(ctx).Line(startingData, {animationSteps: 15});

    // -------------------------------------------------------------------------
    // CHART FUNCTIONS ---------------------------------------------------------
    // -------------------------------------------------------------------------

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

    // notes ...................................................................

    // GOAL: to only show a single data point at a time
    // instead of looping through every forEach - just loop through the one you
    // want

    // end notes ...............................................................

    var duplicateObject = (object, customAttributes) => {
        var obj = {}
        for (var key in object) {
            obj[key] = object[key]
        }
        // if customAttributes object has been passed in add/replace them into
        // the new object
        if (customAttributes) {
            for (var key in customAttributes) {
                obj[key] = customAttributes[key]
            }
        }
        return obj;
    }

    // getDataInRange()
    // return an array of obejcts between the start & end dates

    var getDataInRange = function (data, start, end) {
        return data.filter(function (eachThing) {
            var currentDate = new Date(eachThing.created_at).getTime();
            return currentDate >= start && currentDate <= end;
        })
    }

    // getHighestInRange()
    // reduces a range of objects into a single object
    // id there are no obects passed in it returns null

    var getHighestInRange = function (range, interval, datePoint) {

        // if there is no data
        if (range.length <= 0) {
            return null;
        }

        // console.log(range);

        var avgPrice = range.map(function (order) {
            // console.log('mapped: ', order);
            return parseFloat(order.price)
        }).reduce(function (current, next) {

            // console.log('current: ', current, 'next: ', next);

            if ( current > next ) {
                // console.log('highest: ', current);
                return current;
            }
            // console.log('highest: ', next);
            return next;
        }, 0);

        var mostExpensiveOrder = {
            x: new Date(datePoint),
            y: avgPrice,
            startRange: datePoint - (interval / 2),
            endRange: datePoint + (interval / 2),
        }

        return mostExpensiveOrder;
    }

    // normaliseData()
    // returns an array of data
    // each element represent a range of data within the current interval
    // each dataObject requires a created_at property

    var normaliseData = function (data, interval) {

        // console.log('Data to normalise', data);

        var results = [];

        // if there is only a point of data than create the correct data for the
        // normalise function to handle it. Because normalise data needs more
        // than one piece of data to work with

        if (data.length === 1) {
            results.push({
                x: new Date(data[0].created_at),
                y: data[0].price,
                startRange: new Date(data[0].created_at).getTime() - (interval / 2),
                endRange: new Date(data[0].created_at).getTime() + (interval / 2),
            })

        } else {

            var start =  new Date(data[0].created_at).getTime();
            var end = new Date(data[data.length - 1].created_at).getTime()
            var range = end - start;
            var startRange;
            var prevAverage = null;

            // loop
            // this will loop through each interval and create a average for all
            // the orders in that inerval

            for ( var i = start; i < end; i += interval) {

                console.log('looping');


                var currentDatePoint = i - (interval / 2);
                // GET START RANGE

                // gets start range
                if (i >= interval * 2) {
                    startRange = i - interval;
                } else {
                    startRange = 0;
                }

                var currentDataInRange = getDataInRange(data, startRange, i);
                var average = getHighestInRange(currentDataInRange, interval, currentDatePoint);

                console.log('average: ', average);

                if ( average === null ){

                    // if the average null
                    // add the previous attributes
                    // but update the ranges and time

                    // console.log('duping');
                    prevAverage = duplicateObject( prevAverage, {
                        x: new Date(currentDatePoint),
                        startRange: currentDatePoint - (interval / 2),
                        endRange: currentDatePoint + (interval / 2),
                    });

                    average = prevAverage;
                }

                var currentDifference = average.endRange - average.startRange;

                //  console.log('currentDifference: ', currentDifference)

                results.push(average);
                prevAverage = duplicateObject(average);
            }

            console.log('results: ', results)
        }

        // add present loop
        // this loop will add a dataset of orders from the last order to present
        // it will take the last order
        // then the present time
        // loop through the intervals till then and now

        var lastOrder = results[results.length - 1];

        for (var i = lastOrder.x.getTime(); i < Date.now(); i += interval ) {

            console.log('looping');

            results.push(duplicateObject(lastOrder, {
                    x: new Date(i + interval),
                    startRange: i + (interval / 2),
                    endRange: i + (interval / 2) * 3 ,
            }));
        }

        // // SHOW RANGES
        // results.forEach(
        //     order => console.log('startRange: ', order.startRange,
        //                          'endRange:', order.endRange,
        //                          'difference: ', order.endRange - order.startRange));
        // results = addPresentPoint(results, interval)



        return results;
    }

    var setInitialDataOnChart = function (data, chart) {

        var normalisedData = [];

        var args = Array.prototype.slice.call(arguments);
        var dataPoints = args.slice(2, args.length);
        dataPoints.forEach(function(dataPoint, index) {

            // mapDatesAndPrices(data, dataPoint).forEach(function(price){
            //     myDateLineChart.datasets[index].addPoint(price.x, price.y);
            // })

            var currentData = {}

            currentData.index = index;
            currentData.dataPoint = dataPoint;
            currentData.data = normaliseData(data, normaliseInterval);

            currentData.data.forEach(function(price){
                chart.datasets[index].addPoint(price.x, price.y);
            });

            normalisedData.push(currentData);
        });

        return normalisedData;
    }

    var findNewData = function(currentState, newState) {
        var newValues = [];
        if (newState.length > currentState.length) {
            newValues = newState.slice(currentState.length, newState.length);
            // console.log('new Values found: ', newValues)
        }
        return newValues;
    }

    // updateDataOnChart()
    // updateDataOnChart(newData, currentNormalisedState, myDateLineChart, 'price');

    var updateDataOnChart = function (newData, normalisedData, chart) {
        if (newData.length > 0) {

            // store string params in dataPoints
            var args = Array.prototype.slice.call(arguments);
            var dataPoints = args.slice(3, args.length);


            var lastDataObjectOnChart = normalisedData[0].data[normalisedData[0].data.length - 1];


            dataPoints.forEach(function(dataPoint, index) {

                console.log('----- start datapoint (', dataPoint, ') --------')

                var matchesExisting = [];
                var matchesNew = [];

                // newData.forEach()
                // finds the data that is within any of the current time ranges and updates that
                // but if it is beyond the time range it should add new data

                newData.forEach(function (data) {

                    console.log('current new data ', data)
                    console.log('time: ', new Date(data.created_at));

                    // find out if it is wiithin range
                    // loop through

                    var currentTime = new Date(data.created_at).getTime();


                    // Look for updated data that is within current time ranges:

                    normalisedData.forEach(function (normalData) {
                        // if the new data does not belong do not show it on the chart
                        if (normalData.dataPoint !== dataPoint) return;


                        console.log('normalisedData length: ', normalData.data.length);

                        normalData.data.forEach(function(order, normIndex) {

                            if ( currentTime >= order.startRange
                                && order.endRange >= currentTime ) {

                                console.log('index: ', normIndex, '@@match: ', order.x,
                                            'difference: ', order.endRange - order.startRange);

                                    matchesExisting.push({
                                        index: normIndex,
                                        data: data,
                                    });
                            }
                        })
                    })

                    // look for updated data that is beyond the current time range
                    if (currentTime > lastDataObjectOnChart.endRange) {
                        console.log('new data is beyond scope of current data');
                        console.log('currently adding to matches new')
                        matchesNew.push(data);
                    }


                });



                console.log('matchesExisting: ', matchesExisting);


                if (matchesExisting.length > 0 ) {
                    matchesExisting.forEach(function (match) {

                        console.log('dataset to change: ',chart.datasets[0].points[match.index]);
                        console.log('with: ', match.data);
                        var value = parseInt(match.data.price);

                        // instead of just updating that value, update all next ones too?
                        chart.datasets[0].points[match.index].value = value;
                        chart.datasets[0].points[match.index].valueLabel = '$' + value;
                    })

                }

                if (matchesNew.length > 0) {
                    console.log(normaliseData)
                    console.log('new matches found ------------------- ')
                    var normalisedNewData = normaliseData(matchesNew, normaliseInterval)
                    setNewDataOnChart(normalisedNewData, myDateLineChart, 'price');
                    // normalise the data here
                    // debugger;
                }



                console.log('----- end datapoint (', dataPoint, ') --------')
            });

            chart.update();
            return newData;
        } else {
            return currentState;
        }

    }

    var setNewDataOnChart = function(newData, chart /* , [followed by datapoint stirngs] */) {

        if (newData.length > 0) {
            // store string params in dataPoints
            var args = Array.prototype.slice.call(arguments);
            var dataPoints = args.slice(2, args.length);
            dataPoints.forEach(function(dataPoint, index) {
                newData.forEach(function(price) {
                    // add it at consisentent intervals right
                    chart.datasets[index].addPoint(price.x, price.y);
                });
            });
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
                    numberStep: numberStepFunc,
                }
            );
    }

    var updateOrderDash = function(previousStateParam, newStateParam) {

        var previousState = _.filter(previousStateParam, {system_order: null});
        var newState = _.filter(newStateParam, {system_order: null});

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

    // -------------------------------------------------------------------------
    // POLLING FUNCTIONS -------------------------------------------------------
    // -------------------------------------------------------------------------

    var orderPoll = function() {
        setTimeout(function() {
            $.ajax({
                  url: getOrdersAPIstring,
                  dataType: 'json',
                  cache: false,
                  success: function(newState) {
                        var newData = findNewData(currentState, newState);
                        // setNewDataOnChart(newData, myDateLineChart, 'price');
                        updateDataOnChart(newData, currentNormalisedState, myDateLineChart, 'price');

                        // IF NEW ORDERS
                        if (newData.length > 0) {
                            updateOrderDash(currentState, newState);
                            currentState = newState;
                            // update orders
                        } else {
                        // IF NO NEW ORDERS
                            // checkCurrentProductPrice

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
             if (data.length > 0) {
                 currentNormalisedState = setInitialDataOnChart(data, myDateLineChart, 'price');
                 updateOrderDash(data, data);
                 myDateLineChart.update();
                 currentState = data;
             }
          },
          error: function(xhr, status, err) {
          }
    });


});

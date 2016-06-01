console.log('loaded: script.js');

var ctx = document.getElementById("myChart").getContext("2d");

var data = [
            {
        	label: 'Temp',
        	strokeColor: '#A31515',
        	data: [{ x: new Date('2011-04-11T11:45:00'), y: 25 },
        		   { x: new Date('2011-04-11T12:51:00'), y: 28 },
        		   { x: new Date('2011-04-11T14:10:00'), y: 22 },
                   { x: new Date('2011-04-11T15:15:00'), y: 18 },
        		   { x: new Date('2011-04-11T17:00:00'), y: 25 },
        		   { x: new Date('2011-04-11T21:00:00'), y: 24 },
        		   { x: new Date('2011-04-12T13:00:00'), y: 24 }
        	      ]
            },
            {
            label: 'Temp',
            data: [{ x: new Date('2011-04-11T11:45:00'), y: 10 },
                   { x: new Date('2011-04-11T12:51:00'), y: 10 },
                   { x: new Date('2011-04-11T14:10:00'), y: 11 },
                   { x: new Date('2011-04-11T15:15:00'), y: 11 },
                   { x: new Date('2011-04-11T17:00:00'), y: 10 },
                   { x: new Date('2011-04-11T21:00:00'), y: 24 },
                   { x: new Date('2011-04-12T13:00:00'), y: 20 }
               ],
             fillColor: "rgba(151,187,205,0.2)",
             strokeColor: "rgba(151,187,205,1)",
             pointColor: "rgba(151,187,205,1)",
             pointStrokeColor: "#fff",
             pointHighlightFill: "#fff",
             pointHighlightStroke: "rgba(151,187,205,1)"
            }

        ];

var options = {
    bezierCurve: true,
    showTooltips: true,
    scaleShowHorizontalLines: true,
    scaleShowLabels: true,
    scaleType: "date",
    scaleLabel: "<%=value%>°C",
    responsive: true
}

var myDateLineChart = new Chart(ctx).Scatter(data, options);

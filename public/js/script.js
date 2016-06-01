console.log('loaded: script.js');

var ctx = document.getElementById("myChart").getContext("2d");

var data3 = [
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
            strokeColor: '#A31515',
            data: [{ x: new Date('2011-04-11T11:45:00'), y: 10 },
                   { x: new Date('2011-04-11T12:51:00'), y: 2 },
                   { x: new Date('2011-04-11T14:10:00'), y: 11 },
                   { x: new Date('2011-04-11T15:15:00'), y: 11 },
                   { x: new Date('2011-04-11T17:00:00'), y: 5 },
                   { x: new Date('2011-04-11T21:00:00'), y: 24 },
                   { x: new Date('2011-04-12T13:00:00'), y: 90 }
            ]
        }

        ];

var myDateLineChart = new Chart(ctx).Scatter(data3, {
    bezierCurve: true,
    showTooltips: true,
    scaleShowHorizontalLines: true,
    scaleShowLabels: true,
    scaleType: "date",
    scaleLabel: "<%=value%>°C",
    responsive: true
});

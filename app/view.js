const d3 = require("d3");
var Chart = require('chart.js');
function chartDisplay() {


    Chart.defaults.global.defaultFontFamily = 'Roboto';
    Chart.defaults.global.defaultFontColor = '#333';


    d3.csv('Internet.csv')
        .then(makeChart);

    function makeChart(players) {
        var Time = players.map(function (d) { return d.time });
        var ping = players.map(function (d) { return +d.ping });
        var download = players.map(function (d) { return +d.download });
        var upload = players.map(function (d) { return +d.upload });
        var len = upload.length;
        var chart = new Chart('chart', {
            type: 'line',
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    // data:['Ping','Download','Upload']
                },
                scales: {
                    xAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: 'Time',
                                fontSize: 16
                            }
                        }
                    ],
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: 'Ping(ms) / Speed(Mbps)',
                                fontSize: 16
                            }
                        }
                    ]
                },
                elements: {
                    line: {
                        tension: 0 // disables bezier curves
                    }
                }
            },
            data: {
                labels: Time.slice(len - 50, len),
                datasets: [
                    {
                        data: ping.slice(-50, len),
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        borderColor: '#00308F',
                        label: 'Ping'
                    },
                    {
                        data: download.slice(-50, len),
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        borderColor: '#007D5B',
                        label: 'Download'
                    },
                    {
                        data: upload.slice(-50, len),
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        borderColor: '#F15F36',
                        label: 'Upload'
                    }
                ]

            },
        })
    }
}
Highcharts.chart('GaugeContainer', {

    chart: {
      type: 'gauge',
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false
    },
  
    title: {
      text: 'Boiler Flow Temp'
    },
  
    pane: {
      startAngle: -150,
      endAngle: 150,
      background: [{
        backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, '#FFF'],
            [1, '#333']
          ]
        },
        borderWidth: 0,
        outerRadius: '109%'
      }, {
        backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, '#333'],
            [1, '#FFF']
          ]
        },
        borderWidth: 1,
        outerRadius: '107%'
      }, {
        // default background
      }, {
        backgroundColor: '#DDD',
        borderWidth: 0,
        outerRadius: '105%',
        innerRadius: '103%'
      }]
    },
  
    // the value axis
    yAxis: {
      min: 0,
      max: 120,
  
      minorTickInterval: 'auto',
      minorTickWidth: 1,
      minorTickLength: 10,
      minorTickPosition: 'inside',
      minorTickColor: '#666',
  
      tickPixelInterval: 30,
      tickWidth: 2,
      tickPosition: 'inside',
      tickLength: 10,
      tickColor: '#666',
      labels: {
        step: 2,
        rotation: 'auto'
      },
      title: {
        text: '°C'
      },
      
      plotBands: [{
        from: 0,
        to: 40,
        color: '#0761f2' // blue
      }, {
        from: 40,
        to: 60,
        color: '#55BF3B' // green
      }, {
        from: 60,
        to: 75,
        color: '#DDDF0D' // yellow
      }, {
        from: 75,
        to: 120,
        color: '#DF5353' // red
      }]
    },
  
    series: [{
      name: 'Temp',
      data: [0],
      tooltip: {
        valueSuffix: ' °C'
      }
    }]
  
  },
  // Add some life
  function (chart) {
    if (!chart.renderer.forExport) {
      setInterval(async function () {

        var point = chart.series[0].points[0];
      
        const response = await fetch('https://api-5-2.herokuapp.com/sensors');
        const data = await response.json();
        const apitemp = data[1].value;
        point.update(apitemp);
        
      }, 1000);
    }
  });


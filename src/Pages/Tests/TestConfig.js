

// <block:animation:1>
const totalDuration = 10000;
const delayBetweenPoints = totalDuration ;
const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
const animation = {
  x: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: NaN, // the point is initially skipped
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.xStarted) {
        return 0;
      }
      ctx.xStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  },
  y: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: previousY,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.yStarted) {
        return 0;
      }
      ctx.yStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  }
};
// </block:animation>

// <block:config:0>

  
 const options = {
    animation,
    interaction: {

      intersect: false
    },
    
    tooltips: {
      mode: 'label'
    },
    plugins: {
         mode: 'index',
      legend: false
    },
    scales: {
      x: {
        type: 'linear'
      },
      yAxes: [{
        stacked: true,
        position: "left",
        id: "y-axis-0",
        ticks: {
          
          fontSize: 14
        }
         
      }, {
        stacked: false,
        position: "right",
        id: "y-axis-1",
        ticks: {
          fontColor: 'black',
          fontSize: 14
        }
      }]
    },
     
  }

// </block:config>

module.exports = {
  options
};
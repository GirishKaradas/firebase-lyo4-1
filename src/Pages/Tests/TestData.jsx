import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2";

const TestData = ({ data}) => {
  let time = []
  let temp = []
  let stillTime = []
  let pressure = []
  let delta =  []
  let deltaP =[]
  const [timeData, setTimeData] = useState([])
  const [stillTimeData, setStillTimeData] = useState([])
  const [tempData, setTempData] = useState([])
  const [pressureData, setPressureData] = useState([])
  const [deltaData, setDeltaData] = useState([])
  const [deltaDataPressure, setDeltaDataPressure] = useState([])
const totalDuration = 10000;
const delayBetweenPoints = totalDuration / data.length;
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
  
  useEffect(() => {
      var x, y, z;
      var randomTemp;
      let currTemp=25; let currPressure= 800; let currTime = 0;
    for (let index = 0; index < data.length; index++) {
      x = (data[index].temp1 - currTemp)/data[index].time1
      y = (data[index].pressure - currPressure)/data[index].time1
     
      for (let j = 0; j < data[index].time1 ; j++) {
          currTime++;
          currTemp = currTemp + x;
        
          currPressure = currPressure + y
          time.push(currTime)
          temp.push(currTemp)
          pressure.push(currPressure)
          
          
      }

      for (let k = 0; k < data[index].time2; k++) {
          currTime++
          time.push(currTime)
          temp.push(currTemp)
          pressure.push(currPressure)
         
          
      }
    }
  setTimeData(time)
  setTempData(temp)
  setStillTimeData(stillTime)
  setPressureData(pressure)
  setDeltaData(delta)
  setDeltaDataPressure(deltaP)
  })

  const dataTwo = {
  labels: timeData,
  datasets: [
    {
      yAxisID: "y-axis-0",
      label: 'Temprature',
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#ff7a00',
      borderColor: '#ff7a00',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#ff7a00',
      pointBackgroundColor: '#ff7a00',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#ff7a00',
      pointHoverBorderColor: '#7868e6',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: tempData
    },
     {
       yAxisID: "y-axis-1",
       position: "right",
      label: 'Pressure',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'orange',
      borderColor: 'orange',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'orange',
      pointBackgroundColor: 'orange',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'orange',
      pointHoverBorderColor: '#7868e6',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: pressureData
    }
  
  ]
};
  
  const options =  {
     legend: {
       position: 'bottom',
        labels: {
                  fontColor: 'white'
         }
              },
    title: {
      display: true,
      text: "Graph Data for The respective Batch"
    },
    
    tooltips: {
      mode: 'label'
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    responsive: true,
    scales: {
      xAxes: [{
        display: true,
        stacked: true,
        ticks: {
          autoSkip: true,
          maxTicksLimit: 12,
          fontColor: 'white',
          fontSize: 10,
          animation: {
            duration: delayBetweenPoints,
            easing: 'linear'
          }
        }
        
      }],
       ticks: {
            major: {
              fontStyle: 'bold',
              fontColor: '#FF0000'
            }
          },
      yAxes: [{
        stacked: true,
        position: "left",
        id: "y-axis-0",
        ticks: {
          autoSkip: true,
          maxTicksLimit: 12,
          fontColor: 'white',
          fontSize: 14
        },
        animation
         
      }, {
        stacked: false,
        position: "right",
        id: "y-axis-1",
        fontColor: 'white',
        ticks: {
          autoSkip: true,
          maxTicksLimit: 12,
          fontColor: 'white',
          fontSize: 14
        },
         animation
      }]
    } 
  }


    return (
        <Container
        style={{
          background: "black",
          color: "white",
         marginBottom: "20px"
        }}

        >
        <Line  data={dataTwo} options={options}/>
        {/* <Line  data={dataOne}/> */}
        </Container>
    )
}

export default TestData

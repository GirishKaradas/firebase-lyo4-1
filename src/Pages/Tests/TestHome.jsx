import { Container } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import Chart from 'react-apexcharts'
const TestHome = ({data}) => {
   let time = []
  let temp = []
  let stillTime = []
  let pressure = []
  let delta =  []
  let deltaP =[]
  const [timeData, setTimeData] = useState([])
  const [stillTimeData, setStillTimeData] = useState([])
  const [deltaTemp, setDeltaTemp] = useState([])
  const [deltaPressure, setDeltaP] = useState([])
  const [tempData, setTempData] = useState([])
  const [pressureData, setPressureData] = useState([])
useEffect(() => {
      var x, y, z;
      var randomTemp, randomPressure;
      let currTemp=25; let currPressure= 800; let currTime = 0;
    for (let index = 0; index < data.length; index++) {
      x = (data[index].temp1 - currTemp)/data[index].time1
      y = (data[index].pressure - currPressure)/data[index].time1
     
      for (let j = 0; j < data[index].time1 ; j++) {
          currTime++;
          currTemp = currTemp + x;
          randomTemp = currTemp + Math.floor(Math.random() * x)
          currPressure = currPressure + y
           randomPressure = currPressure+ Math.floor(Math.random() * y)
          time.push(currTime)
          temp.push(currTemp)
          pressure.push(currPressure)
          delta.push(randomTemp)
          deltaP.push(randomPressure)
          
      }

      for (let k = 0; k < data[index].time2; k++) {
          currTime++
          time.push(currTime)
          delta.push(randomTemp + Math.random() * x)
          deltaP.push (randomPressure + Math.random()*y)
          temp.push(currTemp)
          pressure.push(currPressure)
         
         
     
      }
    }
  setTimeData(time)
  setTempData(temp)
  setStillTimeData(stillTime)
  setPressureData(pressure)
  setDeltaP(deltaP)
  setDeltaTemp(delta)

  }, [])

   const options = {
      chart: {
    foreColor: "#fff",
    toolbar: {
      show: false
    }},
    fill: {
    type: "gradient",
    gradient: {
      gradientToColors: ["#F55555", "e84545", "#6094ea"]
    }
  },
    stroke: {
      curve: 'smooth'
    },
    markers: {
      size: 0
    },
    colors: ["#ffcc29", "#f58634", "#f02fc2"],
    xaxis: {
    axisTicks: {
      color: "#333"
    },
      labels: {
        show: false
      },
      categories: timeData
    },
    animations: {
        enabled: true,
        easing: 'linear',
        speed: 800,
        animateGradually: {
            enabled: true,
            delay: 150
        },
        animateGradually: {
          enabled: true,
          delay: 200,
        },
      
        dynamicAnimation: {
            enabled: true,
            speed: 350
        }
      
    },
     dropShadow: {
      enabled: true,
      opacity: 0.3,
      blur: 5,
      left: -7,
      top: 22
    },
    
    yaxis: [
    
  {
    tickAmount: 6,
    min: -50,
    max: 40,
  fontColor:'#f8f5f1',
    title: {
      text: "Temprature"
    },
  },
  {
    fontColor:'#f8f5f1',
    tickAmount: 6,
    min: 500,
    opposite: true,
    title: {
      text: "Pressure"
    }
  }]
  };
  const series = [
   
    {
      
      name: 'Temprature',
      data: tempData
    },
    {
      
      name: 'Pressure',
      data: pressureData
    }
  ];

  return (
     <Container style={{background: '#132c33'}}>
      <Chart options={options} series={series} type="line" />
    </Container>
  )
}

export default TestHome

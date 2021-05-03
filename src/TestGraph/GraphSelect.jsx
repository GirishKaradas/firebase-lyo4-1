import React, { useEffect, useRef, useState } from "react";
import Chartjs from "chart.js";
import { db } from "../firebase";
import { firebaseLooper } from "../utils/tools";
import { Button, Container } from "@material-ui/core";
import TimelineIcon from '@material-ui/icons/Timeline';


const chartConfig = {
  type: "line",
  data: {
    labels: [],

    datasets: [
      {
          fill: 'false',
        label: "Temprature",
         yAxisID: "y-axis-0",
        data: [],
        borderWidth: 1,
        lineTension: 0.1,
      backgroundColor: 'yellow',
      borderColor: 'yellow',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'yellow',
      pointBackgroundColor: 'yellow',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#ff7a00',
      pointHoverBorderColor: '#7868e6',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      },
        {
       
          fill: 'false',
           yAxisID: "y-axis-1",
        label: "Pressure",
        data: [],
        lineTension: 0.1,
      backgroundColor: 'orangered',
      borderColor: 'orangered',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'orangered',
      pointBackgroundColor: 'orangered',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#ff7a00',
      pointHoverBorderColor: '#7868e6',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
        borderWidth: 1
      },
      {
       yAxisID: "y2",
      
      label: 'RealTime',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'green',
      borderColor: 'green',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'green',
      pointBackgroundColor: 'green',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'green',
      pointHoverBorderColor: '#7868e6',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    },
     

    ]
  },
  options: {
     legend: {
       position: 'bottom',
        labels: {
                  fontColor: 'white'
         }
              },
    title: {
      display: true,
      text: "Select/Change The Required to Showcase Data"
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
        stacked: false,
        ticks: {
          autoSkip: true,
          maxTicksLimit: 15,
          fontColor: 'white',
          fontSize: 10,
          animation: {
            
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
        title: 'Temp Set Point',
        ticks: {
         
          steps: 10,
          max: 50,
          fontColor: 'white',
          fontSize: 14,
           min: -100
        },
      
         
      },
       {
        stacked: false,
        display: false,
        position: "left",
        id: "y2",
        title: 'Realtime',
        ticks: {
         
          steps: 10,
        max: 50,
          fontColor: 'white',
          fontSize: 14,
          min: -100
        },
      
         
      },
      {
        stacked: false,
        position: "right",
        id: "y-axis-1",
        fontColor: 'white',
        ticks: {
         steps: 100,
          
          fontColor: 'white',
          fontSize: 14
        },
        
        
      },
    
      // {
      //   stacked: false,
      //   display: false,
      //   position: "right",
      //   id: "y3",
      //   ticks: {
      //     autoSkip: true,
      //     maxTicksLimit: 12,
      //     fontColor: 'white',
      //     fontSize: 14
      //   },
      
         
      // },
      
     ]
    } 
  }
};

const GraphSelect = ({realData,rData}) => {
     let time = []
  let temp = []
  let stillTime = []
  let pressure = []
  let delta =  []
  let deltaP =[]
 
  const [stillTimeData, setStillTimeData] = useState([])
  const [deltaTemp, setDeltaTemp] = useState([])
  const [deltaPressure, setDeltaP] = useState([])
  const [tempData, setTempData] = useState([])
  const [pressureData, setPressureData] = useState([])
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  const updateDataset = (time, newData, pressure) => {
      chartInstance.data.labels = time
    chartInstance.data.datasets[0].data = newData;
    chartInstance.data.datasets[1].data = pressure;
     chartInstance.data.datasets[2].data = realData;
    chartInstance.update();
  };

  const onButtonClick = (e) => {
      var x, y, z;
      var randomTemp, randomPressure;
      let currTemp=0; let currPressure= 800; let currTime = 0;
    for (let index = 0; index < rData.length; index++) {
      x = (rData[index].temp1 - currTemp)/rData[index].time1
      y = (rData[index].pressure - currPressure)/rData[index].time1
     
      for (let j = 0; j < rData[index].time1 ; j++) {
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

      for (let k = 0; k < rData[index].time2; k++) {
          currTime++
          time.push(currTime)
          delta.push(randomTemp + Math.random() * x)
          deltaP.push (randomPressure + Math.random()*y)
          temp.push(currTemp)
          pressure.push(currPressure)
         
         
     
      }
    }
 
  setTempData(temp)
  setStillTimeData(stillTime)
  setPressureData(pressure)
  setDeltaP(deltaP)
  setDeltaTemp(delta)

    
    updateDataset(time, temp, pressure);
  };

  return (
    <Container  style={{marginTop: '10px'}}>
       
       <div>
         <Button startIcon={<TimelineIcon/>} style={{color:'white', backgroundImage: 'linear-gradient(to right top, #6b75d1, #6373d3, #5a70d6, #4f6ed8, #426cdb, #3d66d1, #3960c7, #345abd, #364fa5, #35448e, #323a78, #2d3063)', marginBottom: '7px'}}  onClick={onButtonClick}>Set Graph</Button>
     
       </div>
         
      <canvas style={{background: 'black'}} ref={chartContainer} />
    </Container>
  );
};

export default GraphSelect;
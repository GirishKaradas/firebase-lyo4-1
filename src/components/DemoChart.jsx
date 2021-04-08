import ApexChart from 'react-apexcharts'
  import React, { useEffect, useState } from 'react'


  
  const DemoChart = ({data}) => {

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

    const [chartValues, setChartValues] = useState(
    {
          
            series: [{
              name: 'Income',
              type: 'column',
              data: tempData
            }, {
              name: 'Cashflow',
              type: 'column',
              data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
            }, {
              name: 'Revenue',
              type: 'line',
              data: [20, 29, 37, 36, 44, 45, 50, 58]
            }],
            options: {
              chart: {
                height: 350,
                type: 'line',
                stacked: false
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                width: [1, 1, 4]
              },
              title: {
                text: 'XYZ - Stock Analysis (2009 - 2016)',
                align: 'left',
                offsetX: 110
              },
              xaxis: {
                categories: timeData,
              },
              yaxis: [
                {
                  axisTicks: {
                    show: true,
                  },
                  axisBorder: {
                    show: true,
                    color: '#008FFB'
                  },
                  labels: {
                    style: {
                      colors: '#008FFB',
                    }
                  },
                  title: {
                    text: "Income (thousand crores)",
                    style: {
                      color: '#008FFB',
                    }
                  },
                  tooltip: {
                    enabled: true
                  }
                },
                {
                  seriesName: 'Income',
                  opposite: true,
                  axisTicks: {
                    show: true,
                  },
                  axisBorder: {
                    show: true,
                    color: '#00E396'
                  },
                  labels: {
                    style: {
                      colors: '#00E396',
                    }
                  },
                  title: {
                    text: "Operating Cashflow (thousand crores)",
                    style: {
                      color: '#00E396',
                    }
                  },
                },
                {
                  seriesName: 'Revenue',
                  opposite: true,
                  axisTicks: {
                    show: true,
                  },
                  axisBorder: {
                    show: true,
                    color: '#FEB019'
                  },
                  labels: {
                    style: {
                      colors: '#FEB019',
                    },
                  },
                  title: {
                    text: "Revenue (thousand crores)",
                    style: {
                      color: '#FEB019',
                    }
                  }
                },
              ],
              tooltip: {
                fixed: {
                  enabled: true,
                  position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                  offsetY: 30,
                  offsetX: 60
                },
              },
              legend: {
                horizontalAlign: 'left',
                offsetX: 40
              }
            },
          
          
          }
        
  )
    return (
      <div>
        <ApexChart height={400} width={500} options={chartValues.options} series={chartValues.series}/>
      </div>
    )
  }
  
  export default DemoChart
  
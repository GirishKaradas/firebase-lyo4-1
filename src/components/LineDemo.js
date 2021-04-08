import { Card, Container } from '@material-ui/core';
import React, {Component} from 'react';
import { Line, Bar, Radar} from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', "Aug", 'Sep'],
  datasets: [
    {
      label: 'Dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#ff7a00',
      borderColor: '#ff7a00',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'white',
      pointBackgroundColor: 'white',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#ff7a00',
      pointHoverBorderColor: '#7868e6',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40, 76, 12]
    }
  ]
};

const dataTwo = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', "Aug", 'Sep'],
  datasets: [
    {
      label: 'Dataset',
      fill: true,
      lineTension: 0.1,
      backgroundColor: '#ff7a00',
      borderColor: 'white',
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
      data: [45, 75, 80, 20, 49, 55, 40, 76, 12]
    }
  ]
};

export default class LineDemo extends Component {
  render() {
    return (
      <>
      <Container style={{background: "#292929", color: "white"}}  >
        
          <Line ref="chart" data={data}/>
        
      </Container>
   
      </>
    );
  }

  componentDidMount() {
    const { datasets } = this.refs.chart.chartInstance.data
    console.log(datasets[0].data);
  }
}





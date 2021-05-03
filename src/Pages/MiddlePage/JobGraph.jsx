import { Card, Container, InputLabel, Select, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from 'react'
import { Doughnut, Pie } from 'react-chartjs-2';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';
import LinearIndeterminate from './LinearInderminate';

const JobGraph = () => {
    const [pending, setPending] = useState([])
    const [machines, setMachines] = useState([])
    const [completed, setCompleted] = useState([])

    useEffect(() => {
       db.collection('machineData').onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setMachines(data)
        })
        db.collection('jobData').where('status', '==', false).onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setPending(data)
        })

        db.collection('jobData').where('status', '==', true).onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setCompleted(data)
        })
    },[])

    const handleChange = (e) => {
      let mid = e.target.value
       db.collection('jobData').where('status', '==', false).where('mid', '==', `${mid}`).onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setPending(data)
        })

        db.collection('jobData').where('status', '==', true).where('mid', '==', `${mid}`).onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setCompleted(data)
        })
    }

    const data = {
  labels: [
    'Completed',
    'Pending',
    
  ],
  datasets: [
    {
      
      fill: false,
      lineTension: 0.1,
      backgroundColor: [
      '#10B90A',
      '#FF9A40'
    ],
    hoverOffset: 4,
      borderColor: 'white',
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
      data: [completed.length, pending.length]
    },
    
  ]
}

    return (
      <div className='bg-grey-100'>
        
        <Card >
            <Typography variant='h1' align='center' gutterBottom><b>Job Data</b></Typography>
            <div style={{width: '40%', border: '2px solid black', marginLeft: '25%'}}>
               <select onChange={handleChange} fullWidth >
                <option value="" disabled selected hidden>Select Machine</option>
          {
            machines.map(data => (
              
              <option value={data.id}>{data.title}</option>
              // <Button style={{color: 'orangered'}} href={`/machine-data/Job/${data.id}/Job`}><LaunchIcon/></Button>
              
            ))
          }
         
          </select>
            </div>
            
            <Doughnut data={data}/>
            <br/>
            <Alert severity='warning'>Pending Jobs</Alert>
            <br/>
            <Alert severity='success'>Completed Jobs</Alert>
            <br/>
            <Alert severity='info'>Change Machines for individual data</Alert>
            <br/>
          
          
        </Card>
       
      </div>
        
    )
}

export default JobGraph

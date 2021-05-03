import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Select,
  Typography
} from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import PeopleIcon from '@material-ui/icons/People';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import WorkIcon from '@material-ui/icons/Work';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools'
import LinearProgress from '@material-ui/core/LinearProgress';
import LinearIndeterminate from './LinearInderminate';
import LaunchIcon from '@material-ui/icons/Launch';

const JobsBox = (props) =>{ 
    const [machines, setMachines] = useState([])
    const [jobs, setJobs] = useState([])
    const [dataId, setdataId] = useState('')
    const [disabled, setDisabled] = useState(true)
    useEffect(() => {
      db.collection('machineData').onSnapshot(doc => {
        const data = firebaseLooper(doc)
        setMachines(data)
      })
        db.collection('jobData').onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setJobs(data)
        })
    }, [])

    const handleChange = (e) => {
      setdataId(e.target.value)
      setDisabled(false)
    }
    return (
    
  <Card  style={{height: '130px'}} {...props}>
    <CardContent>
      
        <Grid
        container
        spacing={3}
        style={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <div style={{display: 'flex', jusstifyContent: 'space-evenly'}}>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h5"
          >
            TOTAL JOBS
          </Typography>

         
      </div>
      

          <Typography
            color="textPrimary"
            variant="h3"
          >
            {jobs.length}
          </Typography>
        </Grid>
        <Grid item style={{display: 'flex'}}>
          
          <Avatar
            style={{
              backgroundImage: 'linear-gradient(to left bottom, #fa630f, #fc8218, #fd9d29, #feb63f, #ffce59)',
              height: 56,
              width: 56
            }}
          >
            <WorkIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        style={{
          alignItems: 'center',
          display: 'flex',
          paddingTop: 2
        }}
      >
        <InsertChartIcon style={{ marginTop: '5%'}}/>
         <select style={{border: '2px solid whitesmoke'}} onChange={handleChange} fullWidth >
           <option value="" disabled selected hidden>Select Machine</option>
          {
            machines.map(data => (
              
              <option value={data.id}>{data.title}</option>
              // <Button style={{color: 'orangered'}} href={`/machine-data/Job/${data.id}/Job`}><LaunchIcon/></Button>
              
            ))
          }
         
          </select>
      <Button disabled={disabled} href={`/machine-data/Job/${dataId}/Job`}>Open</Button>
         
      </Box>
      
    </CardContent>
  </Card>
);
}
export default JobsBox;
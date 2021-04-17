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
    useEffect(() => {
      db.collection('machineData').onSnapshot(doc => {
        const data = firebaseLooper(doc)
        setMachines(data)
      })
        db.collection('jobData').where('status', '==', false).onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setJobs(data)
        })
    }, [])

    const handleChange = (e) => {
      setdataId(e.target.value)
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
              backgroundColor: orange[600],
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
         <Select onChange={handleChange} fullWidth >
          {
            machines.map(data => (
              
              <option value={data.id}>{data.title}</option>
              // <Button style={{color: 'orangered'}} href={`/machine-data/Job/${data.id}/Job`}><LaunchIcon/></Button>
              
            ))
          }
          
          </Select>
      <Button href={`/machine-data/Job/${dataId}/Job`}>Open</Button>
         
      </Box>
      
    </CardContent>
  </Card>
);
}
export default JobsBox;
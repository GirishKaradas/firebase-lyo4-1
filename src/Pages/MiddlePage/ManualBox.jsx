import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  InputLabel,
  Select,
  Typography
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import WorkIcon from '@material-ui/icons/Work';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';
import LaunchIcon from '@material-ui/icons/Launch';

const ManualBox = (props) =>{ 
    const [machines, setMachines] = useState([])
    const [manuals, setManuals] = useState([])
    const [dataId, setDataId] = useState('')
    useEffect(() => {
       db.collection('machineData').onSnapshot(doc => {
        const data = firebaseLooper(doc)
        setMachines(data)
       })
        db.collection('manualData').onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setManuals(data)
        })
    }, [])

    const handleChange = (e) => {
     setDataId(e.target.value)
    }
    return (
    
  <Card style={{height: '130px'}} {...props}>
    <CardContent>
      <Grid
        container
        spacing={3}
        style={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
          >
            TOTAL MANUALS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            {manuals.length}
          </Typography>
        </Grid>
        <Grid item style={{display: 'flex'}}>
         
          <Avatar
            style={{
              backgroundColor: 'darkblue',
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
        <InsertChartIcon style={{marginTop: 6}}/>
        
         <Select onChange={handleChange} fullWidth >
          {
            machines.map(data => (
             
              <option value={data.id}>{data.title}</option>
              // <Button style={{color: 'orangered'}} href={`/machine-data/Manuals/${data.id}/Manuals`}><LaunchIcon/></Button>
             
            ))
          }
          </Select>
        <Button href={`/machine-data/Manuals/${dataId}/Manuals`}>Open</Button>
      </Box>
    </CardContent>
  </Card>
);
}
export default ManualBox;
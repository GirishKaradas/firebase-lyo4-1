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
import MenuBookIcon from '@material-ui/icons/MenuBook';
const ManualBox = (props) =>{ 
    const [machines, setMachines] = useState([])
    const [manuals, setManuals] = useState([])
    const [dataId, setDataId] = useState('')
     const [disabled, setDisabled] = useState(true)
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
     setDisabled(false)
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
              backgroundImage: 'linear-gradient(to left bottom, #7a51f4, #4d58e0, #225ac8, #0057ac, #09528e)',
              height: 56,
              width: 56
            }}
          >
            <MenuBookIcon/>
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
        
         <select style={{border: '2px solid whitesmoke'}} onChange={handleChange} fullWidth >
            <option value="" disabled selected hidden>Select Machine</option>
          {
            machines.map(data => (
             
              <option value={data.id}>{data.title}</option>
              // <Button style={{color: 'orangered'}} href={`/machine-data/Manuals/${data.id}/Manuals`}><LaunchIcon/></Button>
             
            ))
          }
          </select>
        <Button disabled={disabled} href={`/machine-data/Manuals/${dataId}/Manuals`}>Open</Button>
      </Box>
    </CardContent>
  </Card>
);
}
export default ManualBox;
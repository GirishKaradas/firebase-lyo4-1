import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import { red } from '@material-ui/core/colors';
import { useEffect, useState } from 'react';
import { firebaseLooper } from '../../utils/tools';
import { db } from '../../firebase';

const MachineBox = (props) =>{ 
    const [machines, setMachines] = useState([])
    useEffect(() => {
        db.collection('machineData').onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setMachines(data)
        })
    }, [])
    return(
  <Card
    style={{ height: '100%' }}
    {...props}
  >
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
              TOTAL MACHINES
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            {machines.length}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            style={{
              backgroundColor: red[600],
              height: 56,
              width: 56
            }}
          >
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        style={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ArrowDownwardIcon sx={{ color: red[900] }} />
        <Typography
          style={{
            color: red[900],
            mr: 1
          }}
          variant="body2"
        >
         List of Machines!
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
          align='justify'
        >
       <Button  style={{color: "red"}} href="/machine-data"> Open</Button>
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
}
export default MachineBox;
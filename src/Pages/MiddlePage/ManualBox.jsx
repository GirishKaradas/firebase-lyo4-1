import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import WorkIcon from '@material-ui/icons/Work';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';

const ManualBox = (props) =>{ 
    
    const [manuals, setManuals] = useState([])
    useEffect(() => {
        db.collection('manualData').onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setManuals(data)
        })
    }, [])
    return (
    
  <Card {...props}>
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
        <Grid item>
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
          pt: 2
        }}
      >
        <InsertChartIcon/>
        <Typography
          variant="body2"
          style={{
            color: 'darkblue',
            mr: 1
          }}
        >
        List of Manuals
        </Typography>
        
      </Box>
    </CardContent>
  </Card>
);
}
export default ManualBox;
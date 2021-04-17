import React, { useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';
import ContentDashboardLayout from '../../components/ContentSidebar/ContentDashboardLayout';
import { Card, makeStyles, Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  layoutRoot: {
    backgroundColor: 'white',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#141256',
  },
 wrapper: {
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 256
  },
   
  },
  container: {
      display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
  },
  content: {
     
      flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
    },
}));

const CallLogs = ({match}) => {
    const classes = useStyles()
    const [callLogData, setCallLogData] = useState([])
    useEffect(() => {
        db.collection('CallLogData').where('machine_id', '==', `${match.params.id}`).onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setCallLogData(data)
            console.log(data)
        })
    }, [])
  const data = {
    columns: [
      {
        label: 'Manual ',
        field: 'manual_name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Step',
        field: 'step',
        sort: 'asc',
        width: 270
      },
      {
        label: 'User',
        field: 'user_id',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Time',
        field: 'time',
        sort: 'asc',
        width: 100
      },
      
    ],
    rows: callLogData
  };

  return (
      <>
      <ContentDashboardLayout match={match}/>
       <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
               <div>
          <Typography variant='h2' align='center'><b>--- Call Logs ---</b></Typography>
          <Typography variant='body1' align='center'>- List of Calls Made ! -</Typography>
             </div>
             <br/>
            <MDBDataTable
                striped
                bordered
               responsive
               sortable
               
                data={data}
                />
          </Card>
        </div>
      </div>
    
    </>
  );
}

export default CallLogs;
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

const CallLogs = () => {
    const classes = useStyles()
    const [callLogData, setCallLogData] = useState([])
    useEffect(() => {
        db.collection('CallLogData').onSnapshot(doc => {
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
      
     
          <Card >
              <b>CALL LOGS</b>
             <br/>
            <MDBDataTable
                striped
               hover={true}
               responsive
               sortable
               entriesOptions={[ 5, 10, 15 ]}
                data={data}
                />
          </Card>
        
    
    </>
  );
}

export default CallLogs;
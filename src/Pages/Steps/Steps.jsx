import { Button, Card, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import StepItem from './StepItem';
import {Link, useHistory} from 'react-router-dom';
import {db, storageRef } from '../../firebase'
import { firebaseLooper } from '../../utils/tools';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Page from '../../components/Page';
import ManualDashboardLayout from '../../components/ManualSidebar/ManualDashboardLayout'
import OutlinedTimeline from './Timeline';

const useStyles = makeStyles((theme) =>( {
    add: {
     
    backgroundImage: 'linear-gradient(to left bottom, #fa630f, #fc8218, #fd9d29, #feb63f, #ffce59)',
    borderRadius: '20px',
    margin: theme.spacing(3, 0, 2),
 
    },
    backButton: {
        backgroundColor: "black",
        color: "white",
        borderRadius: "20px",
        marginRight: "30px",
        marginLeft: "20px",
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
}))


const Steps = ({match}) => {
    const classes = useStyles();
    const history=useHistory()
     const [mTitle, setMTitle] = useState('')
    const [steps, setSteps] = useState([{}])
    const dbRef =   db.collection('stepData').where('manual_id', '==', `${match.params.id}`)

    const handleReturn = () => {
        history.push('/machine-data')
    }
    useEffect(() => {

         db.collection('manualData')
       .doc(match.params.id)
        .onSnapshot(doc => {
         setMTitle(doc.data().title)
        })
        
      dbRef.onSnapshot((snapshot) => {
            const stepData = firebaseLooper(snapshot)
            stepData.sort(function(a,b) {
                return(a.index-b.index)
            })
            setSteps(stepData)
            
        })

    }, [])
    


    return (
        <Page title="Steps">
            <ManualDashboardLayout match={match}/>
           
            <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
              <br/>
                <Typography variant='h2' align='center' gutterBottom><b>{mTitle}</b></Typography>
             <hr/>
                {steps&&
                    steps.map((data) => (
                        <StepItem key={data.id} data={data} />
                        
                    ))
                   
                }
          </Card>
        </div>
      </div>
           
        </Page>
    )
}

export default Steps
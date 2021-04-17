import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';
import ContentDashboardLayout from '../../components/ContentSidebar/ContentDashboardLayout';
import { Card, Checkbox, Typography } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



export default function JobsList({match}) {

     const [job, setJob] = useState([])
    useEffect(() => {
        db.collection('jobData').where('mid', '==', `${match.params.id}`).onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setJob(data)
        })
    }, [])
  const classes = useStyles();

  return (
      <>
      <ContentDashboardLayout match={match}/>
       <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
            <div>
              <Typography align='center' variant='h1'><b>--Jobs--</b></Typography>
               <Typography align='center' variant='body2' >- These are all the Job status -</Typography>
              </div>
              <br/>
                 <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
              <TableCell><b><Checkbox/></b></TableCell>
            <TableCell><b>Title</b></TableCell>
            <TableCell align="right"><b>Description</b></TableCell>
            <TableCell align="right"><b>Status</b></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {job.map((row) => (
            <TableRow key={row.id}>
             <TableCell><b><Checkbox/></b></TableCell>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.desc}</TableCell>
              <TableCell align="right">{row.status ?
               <b style={{color: '#9ede73', display: 'flex', justifyContent: 'flex-end'}}><DoneIcon style={{color: '#9ede73'}}/>Completed</b> :
               <b style={{color: 'orange', display: 'flex', justifyContent: 'flex-end'}}><ErrorOutlineIcon style={{color: '#ff7a00d'}}/> Pending</b>}
               </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </Card>
        </div>
      </div> 
   
    </>
  );
}
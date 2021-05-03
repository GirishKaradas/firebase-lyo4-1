import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Button, Card, Container, Dialog, Grid, InputLabel, Select, TablePagination, TextField, Typography } from '@material-ui/core';
 import ContentDashboardLayout from '../../components/ContentSidebar/ContentDashboardLayout';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';



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



export default function CallLogs() {
  const classes = useStyles();
  const [title, setTitle] = useState('')
  const [open, setOpen] = useState(false)
  const [batch, setBatch] = useState([])
  const [machines, setMachines] = useState([])
  useEffect(() => {
    db.collection('machineData').onSnapshot(doc => {
      const data = firebaseLooper(doc)
       setMachines(data)
     console.log(data)
    })
    db.collection('CallLogData').onSnapshot(doc => {
      const data = firebaseLooper(doc)
       setBatch(data)
     console.log(data)
    })
    
  }, [])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (e) => {
    const mid = e.target.value
    db.collection('CallLogData').where('machine_id', '==', `${mid}`).onSnapshot(doc => {
      const data = firebaseLooper(doc)
       setBatch(data)
     console.log(data)
    })
  }
  return (
    <div>
   
      
      <div >
        <div >
          <Card className={classes.content}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
               <Typography variant='h4'><b>Call Logs</b></Typography>
            </div>
         
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
            
              <select
             style={{width:"200px", border: '2px solid whitesmoke' }}
              onChange={handleChange}
              >
                <option value="" disabled selected hidden>Select Machine</option>
                {
                  machines.map(data => (
                    <option value={data.id}>{data.title}</option>
                  ))
                }
              </select>
              
       
   
        <div className="relative"> <input style={{ border: '2px solid whitesmoke'}} onChange={(e) => setTitle(e.target.value)} type="text" className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search anything..."/>
            <div className="absolute top-4 right-3"> <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i> </div>
        </div>

              </div>
              <br/>
               <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{backgroundColor: '#43425D', color: 'white'}}><b>Manual</b></TableCell>
            <TableCell style={{backgroundColor: '#43425D', color: 'white'}} align="left"><b>User</b></TableCell>
            
            <TableCell style={{backgroundColor: '#43425D', color: 'white'}} align="left"><b>Step</b></TableCell>
           <TableCell style={{backgroundColor: '#43425D', color: 'white'}} align="right"><b>Date & Time</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {batch.
          filter((data) => {
              if(title === ""){
                  return data
              } else if (data.manual_name.toLowerCase().includes(title.toLocaleLowerCase())){
                      return data
              }else if (data.user_id.toLowerCase().includes(title.toLocaleLowerCase())){
                      return data
              }else if (data.step.toLowerCase().includes(title.toLocaleLowerCase())){
                      return data
              }
              
            })
          .slice(0,7).map((row) => (
            <TableRow key={row.id}>
              <TableCell style={{backgroundColor: 'whitesmoke'}} component="th" scope="row">
                {row.manual_name}
              </TableCell>
              <TableCell align="left">{row.user_id}</TableCell>
              
              <TableCell align="left">{row.step}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
         
         
      </div>
      <div style={{width: '100%'}}>
           
      </div>
    </TableContainer>
          </Card>
        </div>
      </div>
      
    </div>
   
  )
}

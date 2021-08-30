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
import { Card, Checkbox, TextField, Typography, Button, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import DatePicker from 'react-date-picker';
import SearchIcon from '@material-ui/icons/Search';
import JobView from './JobView'
import Page from '../../components/Page';



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
     padding: '20px',
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
     const [mTitle, setMTitle] = useState('')
     const [date, setDate] = useState('')
     const [users, setUsers] = useState([])
     const [title, setTitle] = useState('')
    const [user, setUser] = useState('')
    useEffect(() => {
      db.collection('machineData')
       .doc(match.params.id)
        .onSnapshot(doc => {
         setMTitle(doc.data().title)
        })
        db.collection('users').onSnapshot(snap => {
          const data = firebaseLooper(snap)
          setUsers(data)
        })
        db.collection('jobData').where('mid', '==', `${match.params.id}`).onSnapshot(doc => {
            const data = firebaseLooper(doc)
            data.sort(function(a,b){
              return(b.date - a.date)
            })
            setJob(data)
        })
    }, [])
  const classes = useStyles();
  
  function userHandleChange(e){
      const temp = e.target.value
      if(temp === ""){
        db.collection('jobData').where('mid', '==', `${match.params.id}`).onSnapshot(doc => {
          const data = firebaseLooper(doc)
          data.sort(function(a,b){
            return(b.date - a.date)
          })
          setJob(data)
      })
      }else {
         db.collection('jobData').where('mid', '==', `${match.params.id}`).where('email', '==', `${temp}`).onSnapshot(doc => {
        const data = firebaseLooper(doc)
        data.sort(function(a,b){
          return(b.date - a.date)
        })
        setJob(data)
    })
      }
     
  }

  function pendingCheck(e){
    const temp = e.target.value
    if(temp === ""){
      db.collection('jobData').where('mid', '==', `${match.params.id}`).onSnapshot(doc => {
        const data = firebaseLooper(doc)
        data.sort(function(a,b){
          return(b.date - a.date)
        })
        setJob(data)
    })
    }else{
      db.collection('jobData').where('mid', '==', `${match.params.id}`).where('status', '==', temp).onSnapshot(doc => {
      const data = firebaseLooper(doc)
      data.sort(function(a,b){
        return(b.date - a.date)
      })
      setJob(data)
  })
    }
    
  }
  const handleClick = () => {
    db.collection('jobData').where('mid', '==', `${match.params.id}`).onSnapshot(doc => {
      const data = firebaseLooper(doc)
      data.sort(function(a,b){
        return(b.date - a.date)
      })
      setJob(data)
  })
  }

  // function handleChange(event) {
  //   db.collection('jobData').where('mid', '==', `${match.params.id}`).onSnapshot(doc => {
  //     const data = firebaseLooper(doc)
  //     data.sort(function(a,b){
      
  //       return(b.date - a.date)
  //     })
  //    data.filter(data => {
  //      if(data.date.toDate().toString().substring(0,15) === date.toDateString()){
  //        return data 
  //      }
  //    })
  //     setJob(data)
  // })
  // }
  
  return (
 
      <Page title='Jobs | LyoIms'>
      <ContentDashboardLayout match={match}/>
       <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
            
            <div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              {/* <Typography style={{marginRight: '15px'}} variant='h1' align='center'><b>{mTitle} : </b></Typography> */}
              <div>
                 <Typography variant='h1' align='center'><b>JOBS</b></Typography>
               <Typography align='center' variant='body2' >- These are all the Job status -</Typography>
              </div>
             <div>
             <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '30px'}}>
             <div className="relative mr-3"> 
            <input style={{ border: '2px solid whitesmoke'}} onChange={(e) => setTitle(e.target.value)} type="text" className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search Jobs..."/>
             <div className="absolute top-4 right-3"><SearchIcon style={{opacity: '0.5'}}/>  </div>
         </div>
              
              <FormControl style={{width: '140px', marginRight: '2%'}} variant='outlined'>
                <InputLabel variant='outlined'>Assignee</InputLabel>
                <Select onChange={userHandleChange} label="Assignee">
                <MenuItem value="">All</MenuItem>
                {users.map((data) => (
                  <MenuItem value={data.email}>{data.firstName} {data.lastName}</MenuItem>
                ))}
              </Select>
              </FormControl>
              <FormControl style={{width: '140px'}} variant='outlined'>
                <InputLabel variant='outlined'>Status</InputLabel>
                <Select onChange={pendingCheck} label="Status">
                <MenuItem value="">All</MenuItem>
                <MenuItem value={true}>Completed</MenuItem>
                <MenuItem value={false}>Pending</MenuItem>
               
              </Select>
              </FormControl>
            
              {/* <DatePicker
        onChange={onChange}
        value={value}

      />
             <b>{value?.toString().substring(0,15)}</b>
             <Button onClick={handleClick}>Reset</Button> */}
              
               
                
              </div>
             </div>
            </div>
              
              </div>
              <br/>
              
           
                 <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
                 
          <TableRow>  
            <TableCell  style={{backgroundColor: '#d8e3e7'}}><b>Title</b></TableCell>
            <TableCell style={{backgroundColor: '#d8e3e7'}} align="left"><b>Description</b></TableCell>
            
            <TableCell   style={{backgroundColor: '#d8e3e7'}} align="left"><b>Assignee</b></TableCell>
            <TableCell  style={{backgroundColor: '#d8e3e7'}} align="left"><b>Date</b></TableCell>
            <TableCell   style={{backgroundColor: '#d8e3e7'}} align="right"><b>Status</b></TableCell>
            <TableCell   style={{backgroundColor: '#d8e3e7'}} align="right"><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {job.filter((row) => {
            if(title === "" ){
              return row
            } else if (row.title.toLowerCase().includes(title.toLocaleLowerCase())){
              return row
            }
           
          }).map((row) => (
           <JobView key={row.id} row={row} match={match} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </Card>
        </div>
      </div> 
   
    </Page>
 
  );
}
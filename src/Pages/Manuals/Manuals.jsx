import React, { Fragment, useEffect, useState } from 'react';
import './Manuals.css'
import { Grid, Card, CardContent, Button, makeStyles, Typography, Container, TextField } from '@material-ui/core';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';
import ContentDashboardLayout from '../../components/ContentSidebar/ContentDashboardLayout';
import ManualItem from './ManualItem';
import Page from '../../components/Page';
import { NavLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  layoutRoot: {
    backgroundColor: 'white',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
     background:'linear-gradient(#f3f3f3, #e7e7e7)' 
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
     padding: '20px',
      flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
    },
}));

export default function Manuals({match}) {
    const classes = useStyles()
    const [manuals, setManuals] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [mTitle, setMTitle] = useState('')
    useEffect(() => {
      db.collection('machineData')
       .doc(match.params.id)
        .onSnapshot(doc => {
         setMTitle(doc.data().title)
        })
        db.collection('manualData').where('mid', '==', `${match.params.id}`).onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setManuals(data)
        })
    },[])



  return (
    <Page title='Manuals | LyoIms'>
        <ContentDashboardLayout match={match}/>
        <Container maxWidth={false} className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.content}>
            {/* <div style={{display: 'flex', justifyContent: 'space-between'}}> 
                <div style={{paddingLeft: "2.5rem"}}>
             
              <Typography variant='h1' align='left'><b>Manuals Data</b></Typography>
              <Typography variant='body2' align='left' gutterBottom >These are all your Manuals</Typography>
            </div>
              <div style={{display: 'flex', justifyContent: 'flex-end'}}>
               
                 <div className="relative"> 
                 
                 <input style={{ border: '2px solid whitesmoke'}} onChange={(e) => setSearchTerm(e.target.value)} type="text" className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search Manuals..."/>
                  <div className="absolute top-4 right-3"> <SearchIcon style={{opacity: '0.5'}}/> </div>
              </div>
               <Button component={NavLink} to={`/machine-data/${match.params.id}/Add-Manuals`} color='primary' variant='contained' style={{width: '150px', marginLeft: '4%', marginRight: '6%',color: 'white'}}>Add </Button>
              </div>
            </div> */}
           <div style={{display: 'flex', justifyContent: 'space-between'}}>
              {/* <Typography style={{marginRight: '15px'}} variant='h1' align='center'><b>{mTitle} : </b></Typography> */}
              <div style={{paddingLeft: '2.5rem'}}
              >
                 <Typography variant='h1' align='left'><b>Manuals</b></Typography>
                  <Typography align='left' variant='body2' > These are all the required Manuals and data </Typography>
              </div>
              <div>
              <div style={{display: 'flex', justifyContent: 'flex-end'}}>
               
               <div className="relative"> 
            <input style={{ border: '2px solid whitesmoke'}} onChange={(e) => setSearchTerm(e.target.value)} type="text" className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search Manuals..."/>
             <div className="absolute top-4 right-3"><SearchIcon style={{opacity: '0.5'}}/>  </div>
         </div>
               <Button color='primary' variant='contained' style={{width: '150px', marginLeft: '4%', marginRight: '2%',  color: 'white'}} component={NavLink} to={`/machine-data/${match.params.id}/Add-Manuals`}>ADD New </Button>
       
       <hr/>
         </div>
              </div>
            </div>
              
              
            <br/>
            {/* <b>{searchTerm}</b> */}
            <Grid container spacing={3}>
                <>
                     {
                        manuals
                        
                        .filter((data) => {
                           if(searchTerm === ""){
                               return data
                           } else if (data.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
                                   return data
                                   }
                                   else if (data.desc.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
                                    return data
                                    }

                       })
                        .map((data) => (
                          <ManualItem key={data.id} data={data}/>
                        ))
                        
                }
                </>
                </Grid>
          </div>
        </div>
        
      </Container> 
     
    </Page>

  );
}
import { Button, CircularProgress, Container, Fade, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import UserList from './UserList';
import {Link, useHistory} from 'react-router-dom';
import { db } from '../../firebase';
import {firebaseLooper} from '../../utils/tools'
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useAuth } from '../context/AuthContext';
import LogIn from '../LogIn/LogIn';
import UserItem from './UserItem';
const useStyles = makeStyles((theme) =>( {
    add: {
     
    backgroundImage: 'linear-gradient(to left bottom, #fa630f, #fc8218, #fd9d29, #feb63f, #ffce59)',
    borderRadius: '20px',
    margin: theme.spacing(3, 0, 2),

    },
    backButton: {
        backgroundColor: "#A997DF",
        color: "white",
        borderRadius: "20px",
       
    }
}))
const Users = () => {
    const count = 0
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([{}]);
    const {currentUser} = useAuth()
    const [admin, setAdmin] = useState(false)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const history = useHistory()
    useEffect(() => {

        db.collection('users').orderBy('role', 'asc').onSnapshot(snapshot => {
            const userData = firebaseLooper(snapshot)
            setUsers(userData)
            setIsLoading(false)
        })

    }, [])

    const handleReturn = () => {
      history.push('/')
  }
    return (
        <Paper>
        <Container style={{background: '#FFFFFF 0% 0% no-repeat padding-box', boxShadow: '0px 2px 6px #0000000A'}}>
            
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <div>
                      <Typography variant='h1'><b>Users</b></Typography>
              <Typography variant='h5'>List of available users</Typography>
                  </div>
         
        {error && <Typography variant="h6">{error}</Typography>}
                
           <Button 
           startIcon={<AddIcon/>}
            variant="contained"
            color="primary" className={classes.add}>
               <Link style={{color: "white" ,textDecoration: "none"}} to="/users/add-user">
                    Add user
               </Link>
               </Button>
              </div>
             <br/>
           
                              
             
              
                  <section class="text-gray-700 ">
                   
                    <div class="container">
                        <div class="flex flex-wrap text-left">
                           
                                   { users.map((users) => (
                                     
                                           <UserItem users={users} />   
                                      
                 
                        ))
                            
                        } 
                        </div>
                    </div>
                </section>
                                             
                
               
               {isLoading && 
                    <CircularProgress  />
                   }
          
        </Container>
        
        </Paper>
    )
}

export default Users

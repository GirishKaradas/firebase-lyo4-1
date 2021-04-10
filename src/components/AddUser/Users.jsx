import { Button, CircularProgress, Container, Fade, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import UserList from './UserList';
import {Link, useHistory} from 'react-router-dom';
import { db } from '../../firebase';
import {firebaseLooper} from '../../utils/tools'
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useAuth } from '../context/AuthContext';
import LogIn from '../LogIn/LogIn';
const useStyles = makeStyles((theme) =>( {
    add: {
     
    background:'#141256',
    borderRadius: '20px',
    margin: theme.spacing(3, 0, 2),

    },
    backButton: {
        backgroundColor: "#A997DF",
        color: "white",
        borderRadius: "20px",
        marginRight: "30px",
        marginLeft: "20px",
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
        <>
        <Container xs={12}>
             <Button startIcon={<ArrowBackIcon/>} className={classes.backButton}
            onClick={handleReturn}
            >Go back</Button>
        {error && <Typography variant="h6">{error}</Typography>}
       
           <Button 
           startIcon={<AddIcon/>}
            variant="contained"
            color="primary" className={classes.add}>
               <Link style={{color: "white" ,textDecoration: "none"}} to="/users/add-user">
                    Add user
               </Link>
               </Button>
               
               <UserList users={users} /> 
               {isLoading && 
                    <CircularProgress  />
                   }
          
        </Container>
        
        </>
    )
}

export default Users

import { Box, Button, CircularProgress, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import MachineList from './MachineList';
import {Link} from 'react-router-dom';
import Machine from './Machine';
import {db} from '../../firebase';
import {firebaseLooper} from '../../utils/tools'
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Page from '../Page';

const useStyles = makeStyles((theme) =>( {
    add: {
    background:'#ff7a00',
    borderRadius: '20px',
    margin: theme.spacing(3, 0, 2),
    },
   backButton: {
        backgroundColor: "black",
        width: "100px",
        color: "white",
        borderRadius: "20px",
        marginRight: "30px",
        marginLeft: "20px",
    },
}))
const Machines = () => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [machines, setMachines] = useState([{}]);
    const [error, setError] = useState(null)
    
    useEffect(() => {

        db.collection('machineData').onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setMachines(data)
            setIsLoading(false);
        })
    
    }, [])
    return (
        <Page title="Machines">
            <Box
            py={3}
            style={{
                backgroundColor: 'background.default',
                minHeight: '100%',
            }}
    >
        <Container maxWidth={false} >
                    <Button startIcon={<HomeIcon/>} href="/" className={classes.backButton}>Home</Button>
                {error && <Typography variant="h6">{error}</Typography>}
               
                <Button
                startIcon={<AddIcon/>} 
                    variant="contained"
                    color="primary" className={classes.add}>
                    <Link style={{color: "white" ,textDecoration: "none"}} to="/add-machine">
                            Add Machine
                    </Link>
                    </Button>
                     {isLoading && <Typography variant="h3">
                    Loading...<CircularProgress size={50}/> 
                    </Typography>}
                      <Box pt={3}>
                           <Grid
                           
                        container
                        spacing={3}
                    >
                        {
                        machines.map((data) => (
                            <Grid
                            style={{
                            margin: "3%"
                           }}
                            key={data.id}
                            lg={4}
                            md={6}
                            xs={12}
                            
                            >
                              <Machine key={data.id} data={data}/>   
                            </Grid>
                                    
                        ))
                
                }
                    </Grid>
                      </Box>
                    
                            
                    
         
                
                </Container>
        </Box>
        </Page>
       
    )
}

export default Machines

import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import StepItem from './StepItem';

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottomColor: "black",
    backgroundColor: theme.palette.background.dark,
   
  },
}));


const StepList = ({ steps}) => {

    const classes = useStyles();
    return (
    <Container className={classes.root} >
      
        {steps.map((steps) => (
       
          <StepItem key={steps.id} steps={steps}/>
          
        ))}
        
    </Container>
    )
}

export default StepList

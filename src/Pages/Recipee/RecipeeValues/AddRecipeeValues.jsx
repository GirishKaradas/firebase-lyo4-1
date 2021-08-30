import { Button, Card, CardActions, CardContent, FormHelperText, makeStyles, Slider, TextField, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import StepDashboardLayout from '../../../components/StepSidebar/StepDashboardLayout';
import { db } from '../../../firebase';
import { firebaseLooper } from '../../../utils/tools';



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
  }
  },
  container: {
      display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  height: '100%'
  },
  content: {
    margin: '15%',
    marginTop: '68px',
      flex: '1 1 auto',
      width: '75%',
  overflow: 'auto'
    },
}));


const AddRecipeeValues = ({match}) => {
    const classes = useStyles()
    const [rid, setRid] = useState(`${match.params.id}`)
    const [step, setStep] = useState('')
    const [recipe, setRecipe] = useState([])
    const [error, setError] = useState('')
    const [time1, setTime] = useState('')
    const [message, setMessage] = useState('')
     const [time2, setKeepTime] = useState('')
      const [temp1, setTemp] = useState('')
       const [pressure, setPressure] = useState('')
    const history = useHistory()

    useEffect(() => {
          db.collection('recipeeData').where('rid', '==', `${match.params.id}`).onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setRecipe(data)
        })
    }, [])
    async function handleSubmit(e)  {
      e.preventDefault()
      if(step?.trim().length === 0){
        return setError("Empty strings are not accepted as valid inputs ! Please try again with a valid input")
      }
      if(step.length > 20){
        return setError("Step length should be less than 20 characters")
      }

      if(temp1 > 100 || temp1 < -100){
        return setError("Temperature should be between -100 to 100 deg C")
      }

      if(pressure > 2000 || pressure < -2000){
        return setError("Pressure should be between -2000 to 2000 mT")
      }

      if(time1 < 0 || time1 > 300){
        return setError("Time shuld be between 0 to 300 mins")
      }

      if(time2 < 0 || time2 > 300){
        return setError("Keep Time shuld be between 0 to 300 mins")
      }

        const index = recipe.length 
        const data = {rid, step, temp1, time1, time2, pressure, index}
      try {
         await db.collection('recipeeData').add(data).then(() => {
           setMessage("Step for Recipe added successfully! You can close the window OR add another")
           setKeepTime("")
           setPressure("")
           setTime("")
           setStep("")
           setTemp("")
         })
     
      } catch (error) {
        setError("Failed")
      }
     
        
    }
    return (
        <>
        {/* <StepDashboardLayout match={match}/> */}
         <div  >
        <div  >
          <Card  >
              
             <CardContent >
                 <Typography variant='button' component='h1' align='center'><b>Add Recipe</b></Typography>
                 {error && <Alert severity="error" >{error}</Alert>}
                 {message && <Alert severity="success" >{message}</Alert>}
                   <form style={{width: '100%', alignItems: "center"}} onSubmit={handleSubmit}>
                     <TextField 
                    variant="outlined"
                    margin="normal"
                    label='Recipe ID'
                    value={rid}
                    disabled
                    fullWidth
                        onChange={(e) => setRid(e.target.value)}
                    />
                    <TextField 
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label='Step'
                    value={step}
                
                        onChange={(e) => setStep(e.target.value)}
                    />
                    <FormHelperText>Step length should be less than 20 characters</FormHelperText>
                    <TextField 
                    variant="outlined"
                    margin="normal"
                    required
                    type='number'
                   
                    fullWidth
                    label='Temperature (deg C)'
                    value={temp1}
                  
                        onChange={(e) => setTemp(e.target.value)}
                    />
                   <FormHelperText>Temperature should be between -100 to 100 deg C</FormHelperText>
                    <TextField 
                    variant="outlined"
                    margin="normal"
                    required
                    type='number'
                    fullWidth
                    label='Pressure (mT)'
                    value={pressure}
                   
                        onChange={(e) => setPressure(e.target.value)}
                    />
                    <TextField 
                    variant="outlined"
                    margin="normal"
                    required
                    type='number'
                    fullWidth
                    label='Time (mins)'
                   value={time1}
                        onChange={(e) => setTime(e.target.value)}
                    />
                    <TextField 
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    type='number'
                    label='KeepTime (mins)'
                    value={time2}
                    
                        onChange={(e) => setKeepTime(e.target.value)}
                    />
                   
                <CardActions>
                    <Button type="submit" fullWidth variant='contained' color="primary" >Add New Recipe</Button>
                 </CardActions>
              
                </form> 
             </CardContent>
              
          </Card>
        </div>
      </div>
      </>
    )
}

export default AddRecipeeValues

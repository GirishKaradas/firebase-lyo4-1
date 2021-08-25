import { FormHelperText, TextField } from '@material-ui/core';
import { Button, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react'
import { db } from '../../../firebase';

const AddMaterial = ({match}) => {

     const [name, setName] = useState('')
     const [desc, setDesc] = useState('')
     const [ message, setMessage] = useState('')
     const [error, setError] = useState('')
    const [mid, setMid] = useState(`${match.params.id}`)

  
    

     function handleSubmit(e){
      e.preventDefault()
      if(name?.trim().length === 0 || desc?.trim().length === 0){
       return  setError("Empty strings are not valid inputs ! Please try again with a valid input")
      }
        db.collection('DQNew').add({name,desc,mid}).then(data => {
          const key= data.id
          setMessage("Added successfully! You can close the window or add another")
            setName("")
            setDesc("")
          db.collection('DQNew').doc(data.id).update({key}).then(() => {
            setMessage("Added successfully! You can close the window or add another")
            setName("")
            setDesc("")
            setError("")
          })
        })
     }
    return (
        <div>
           
          <div class="container items-center px-4 py-12 ">
              
            <form  class="flex flex-col w-full transition duration-500 ease-in-out transform  rounded-lg  " onSubmit={handleSubmit}>
             <Typography variant='h3' align='center'><b>Add New report</b></Typography> 
            
              { message && <Alert severity='success'>{message}</Alert> }
              {error && <Alert severity='error'>{error}</Alert>}
              <div class="relative pt-4">
                <TextField variant='outlined' required fullWidth label="Name" value={name}  error={name.length > 40} onChange={(e) => setName(e.target.value)} type="text"  placeholder="Enter Name" />
                <FormHelperText style={{marginBottom: '25px'}}>Name must be {name.length}/40 characters maximum</FormHelperText>

              </div>
              
                 
                  <TextField value={desc} error={desc > 300 } label="Description" fullWidth rows={5} variant="outlined" multiline onChange={(e) => setDesc(e.target.value)} />
              
              
              <FormHelperText>Description must be {desc.length}/300 characters maximum</FormHelperText>
              
              <div class="flex items-center w-full pt-4">
                <Button disabled={ desc>300 || name > 40} fullWidth style={{background: 'orange', color: 'white'}} type="submit" > Add DQ  </Button>
              </div>
            </form>
          </div>
      
        </div>
    )
}

export default AddMaterial

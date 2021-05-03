import { Dialog, DialogActions, DialogContent, DialogTitle, TableCell, TableRow, TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { db } from '../../../firebase'
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

import EditIcon from '@material-ui/icons/Edit';
const ItemRow= ({row}) => {

    const [step, setStep] = useState(row.step)
    const [time1, setTime] = useState(row.time1)
    const [time2, setKeepTime] = useState(row.time2)
    const [temp1, setTemp] = useState(row.temp1)
    const [pressure, setPressure] = useState(row.pressure)
    const [openEdit, setOpenEdit] = useState(false)
    const [loading, setLoading] = useState(false)
      const handleEditOpen = () => {
      setOpenEdit(true)
    }
    const handleEditClose = () => {
      setOpenEdit(false)
    }

     const handleDelete = (id) => {
    db.collection('recipeeData').doc(id).delete()
}
const updateRecipeValues=(id) => {
    setLoading(true)
    const recipeValues = {time1, time2, step, pressure, temp1}
    db.collection('recipeeData').doc(id).update(recipeValues).then((data) => {
        console.log(data)
       
        setLoading(false)
    })
    
  }

    return (
         <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.step}
              </TableCell>
              <TableCell align="right">{row.time1}</TableCell>
              <TableCell align="right">{row.time2}</TableCell>
              <TableCell align="right">{row.temp1}</TableCell>
              <TableCell align="right">{row.pressure}</TableCell>
              <TableCell align="right">
                  <Button onClick={() => handleEditOpen()}><EditIcon/></Button>
                  <Button onClick={() => handleDelete(row.id)}><DeleteSweepIcon/></Button>
                  
                  </TableCell>
                 <Dialog
                    open={openEdit}
                    onClose={handleEditClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{`Edit ${step}`}</DialogTitle>
                    <DialogContent>
                     
                    <form   >
                        <TextField
                        label="Step"
                        defaultValue={step}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="title"
                          name="title"
                          autoFocus
                          onChange={(e) => setStep(e.target.value)}
                        />

                       <TextField
                        label="Time"
                        defaultValue={time1}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="title"
                          name="title"
                          autoFocus
                          onChange={(e) => setTime(e.target.value)}
                        />
                       <TextField
                        label="Keep Time"
                        defaultValue={time2}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="title"
                          name="title"
                          autoFocus
                          onChange={(e) => setKeepTime(e.target.value)}
                        />
                        <TextField
                        label="Temprature"
                        defaultValue={temp1}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="title"
                          name="title"
                          autoFocus
                          onChange={(e) => setTemp(e.target.value)}
                        />
                           
                        <TextField
                        label="Pressure"
                        defaultValue={pressure}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="title"
                          name="title"
                          autoFocus
                          onChange={(e) => setPressure(e.target.value)}
                        />

                       
                    
                    <DialogActions>
                      <Button color="secondary" onClick={handleEditClose}>Cancel</Button>
                       {!loading && <Button
                          type="submit"
                          fullWidth
                          variant="outlined"
                          color="primary"
                         
                          onClick={(e)=> {
                              updateRecipeValues(row.id)
                                handleEditClose()
                            }}
                        >
                          Update
                          </Button>}
                      {
                        loading && <Button
                          type="submit"
                          fullWidth
                          variant="outlined"
                          color="primary"
                          disabled
                          
                        >Updating values...</Button>
                      }   
                    </DialogActions>
                     
                  </form>
                    </DialogContent>
                </Dialog>
            </TableRow>
    )
}

export default ItemRow

import { Button, Checkbox, Dialog, DialogActions, DialogContent, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select, TableCell, TableRow, TextField, Typography } from "@material-ui/core"
import DoneIcon from '@material-ui/icons/Done';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import EditIcon from '@material-ui/icons/Edit';
import { firebaseLooper } from "../../utils/tools";
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { Alert, AlertTitle } from "@material-ui/lab";
function JobView({row, match}) {

    const [users, setUsers] = useState([])
   const [status, setStatus] = useState(row.status)
    const [email, setEmail] = useState(row.email)
    const [title, setTitle] = useState(row.title)
    const [desc, setDesc] = useState(row.desc)
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
 useEffect(() => {
        db.collection('users').onSnapshot((snap) => {
            const data = firebaseLooper(snap)
            setUsers(data)
        })
    }, [])

    function handleSubmit(e){
        e.preventDefault()
        db.collection('jobData').doc(row.id).update({email,title,desc,status}).then(() => setOpenEdit(false))
    }
    function handleDelete(e){
        db.collection('jobData').doc(row.id).delete()
    }
    return (
       <>
             <TableRow key={row.id}>

<TableCell style={{width: 160, backgroundColor: '#e8ffff'}} component="th" scope="row">
 <b> {row.title}</b>
</TableCell>
<TableCell align="left">{row.desc}</TableCell>

 <TableCell align="left">{row.email}</TableCell>
 <TableCell align="left">{row.date.toDate().toString().substring(0,15)}</TableCell>
 <TableCell align="right">{row.status ?
 <b style={{color: '#9ede73', display: 'flex', justifyContent: 'flex-end'}}><DoneIcon style={{color: '#9ede73'}}/>Completed</b> :
 <b style={{color: 'orange', display: 'flex', justifyContent: 'flex-end'}}><ErrorOutlineIcon style={{color: '#ff7a00d'}}/> Pending</b>}
 </TableCell>
 <TableCell align="right">
    <IconButton>
        <EditIcon onClick={(e) => setOpenEdit(!openEdit)} />
    </IconButton>
    <IconButton>
        <DeleteSweepIcon onClick={(e) => setOpen(!open)}/>
    </IconButton>
    
 </TableCell>
</TableRow>
<Dialog fullWidth open={openEdit} onClose={(e) => setOpenEdit(false)} >
    <Typography style={{marginTop:'15px'}} variant="h3" align="center" gutterBottom ><b>Edit {title}</b></Typography>
    <form action="" onSubmit={handleSubmit}>
         <DialogContent>
        <TextField  required  label="Title" value={title} onChange={(e) => setTitle(e.target.value)}  fullWidth variant="outlined" />
        <FormHelperText style={{marginBottom: '3%'}}>Title should be max {title.length}/40</FormHelperText>
        <TextField value={desc} onChange={(e) => setDesc(e.target.value)} style={{marginBottom: '3%'}} required  label=" Description "   fullWidth variant="outlined" />
       <FormControl required style={{marginBottom: '3%'}} variant='outlined' fullWidth>
        <InputLabel variant='outlined'> Select Assignee</InputLabel>
        <Select value={email} onChange={(e) => setEmail(e.target.value)} label='Select Assignee'>
            {
                users.map((user) => (
                    <MenuItem value={user.email}>{user.firstName} {user.lastName}</MenuItem>
                ))
                 
            }
           
        </Select>
       </FormControl>
       <div style={{display: 'flex'}}>
             <Checkbox checked={status} onChange={(e) => setStatus(!status)}/>
             <Typography>{status ? <b style={{color: 'green'}}> Completed</b> : <b className='text-yellow-800'>Pending</b>} </Typography>
       </div>
    
    </DialogContent>
    <DialogActions>
            <Button onClick={(e) => setOpenEdit(false)}>Cancel</Button>
            <Button type="submit" style={{color: 'white', backgroundColor: 'orange'}}> Update</Button>
    </DialogActions>
    </form>
   
</Dialog>
<Dialog fullWidth open={open} onClose={(e) => setOpen(false)} >
    <DialogContent>
       
         <Alert variant="filled" severity='error'>
         <AlertTitle>
            Delete
        </AlertTitle>
            Are you sure you want to delete this Job ? Once deleted can't be recovered. 
  </Alert>
    </DialogContent>
 
  <DialogActions>
      <Button onClick={(e) => setOpen(false)}color='primary' >Cancel</Button>
      <Button onClick={handleDelete} style={{backgroundColor: 'red' , color: 'white'}}>Delete</Button>
  </DialogActions>
</Dialog>
       </>
    )
}

export default JobView

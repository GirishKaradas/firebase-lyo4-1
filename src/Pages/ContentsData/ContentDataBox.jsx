import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import {db} from '../../firebase'
import EditIcon from '@material-ui/icons/Edit';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Alert, AlertTitle } from '@material-ui/lab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles((theme) => ({
  root: {
    borderBottomColor: "black",
    backgroundColor: theme.palette.background.dark,
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  dataBox:{
      borderRadius: "20px",
      boxShadow: "10px 20px 30px #f8f1f1",
      marginBottom: "50px",
      alignItems: "center",
      justifyContent: "center",
      justifyItems: "center"
  },
  divButton: {
      backgroundColor: "#32e0c4",
      marginRight: "20px",
      color: "white",
      borderRadius: "10px"

  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
      border: "#141256",
      borderRadius: '20px',
      margin: theme.spacing(3, 0, 2),
  }
}));

const ContentDataBox = ({data}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [title, setContentName] = useState(data.title)
    const [value, setValue] = useState(data.value);
    const [desc, setDesc] = useState(data.desc);
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState()
   const history = useHistory();

   const handleEdit = () => {
      setOpenEdit(true)
    }
    const handleEditClose = () => {
      setOpenEdit(false)
    }

    const handleClickOpen = () => {
    setOpen(true);
  };

   const handleClose = () => {
    setOpen(false);
  };

        

  
  const handleDelete = (id) => {
    db.collection('moduleData').doc(id).delete()
}

  const updateContent=(id) => {
    setLoading(true)
    db.collection('moduleData').doc(id).update({title,desc}).then((data) => {
        console.log(data)
        window.location.reload()
        setLoading(false)
    })
    
  }


    return (
        <Grid className='bg-white' item xs={12} sm={6} md={4} key={data.id}>
             <div className={classes.dataBox}>
               <Container maxWindth="sm" sm={12}>
              
      {/* <Table  aria-label="custom pagination table">
        <TableBody>
        
            <TableRow key={data.id}>
              <TableCell component="th" scope="row">
               <b> {data.title} </b>
              </TableCell>
              <TableCell style={{ width: 220 }} align="right">
                {data.desc}
              </TableCell>
              <TableCell style={{ width: 140 }} align="right">
              <Button style={{ marginRight: "20%", marginTop: '0', marginBottom: '0'}} startIcon={<EditIcon/>} onClick={handleEdit}   color="primary">Edit</Button>
              </TableCell>
              <TableCell style={{ width: 140}} align="right">
                <Button style={{ marginLeft: "20%"}} onClick={handleClickOpen}  color="secondary" startIcon={<DeleteIcon/>}>Delete</Button>
           
              </TableCell>
               <TableCell style={{ width: 140 }} align="right">
                <Button style={{ marginLeft: "20%", color: 'orangered'}} href={`/Module/${data.id}/Components`}  startIcon={<ArrowForwardIosIcon/>}>Open</Button>
           
              </TableCell>

            </TableRow>
        </TableBody>
      </Table> */}
            <div>
            
            <div className="flex items-center justify-between">
              <h1 style={{color: '#43425D'}} className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">{data.title}</h1>
            
            <a style={{background: '#0C03EB'}}  href={`/Module/${data.id}/Components`} className="px-3 py-1 text-xs text-white uppercase bg-indigo-700 rounded-full dark:bg-indigo-300 dark:text-indigo-900">Components</a>
        </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{data.desc}</p>
        </div>

        <div>
            

            <div className="flex items-center justify-center mt-4">
                <button onClick={() => handleEdit()} class="mr-2 text-gray-800 cursor-pointer dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
                </button>

                <button onClick={() => handleClickOpen()} className="mr-2 text-gray-800 cursor-pointer dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                  </svg>
                </button>
            </div>
        </div>
      <br />
        
           <div style={{marginLeft: '25%'}}>
             
            {/* <Button style={{marginRight: "20%"}} startIcon={<AccountTreeIcon/>} variant="contained" className={classes.divButton}><Link to={`/Content/${data.id}/Steps`} style={{color: "white" ,textDecoration: "none"}}> Steps</Link></Button> */}
           
           </div>
            
                {/* Dialogs */}

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                  <Alert severity="error" variant="filled">
                    <AlertTitle><strong>Delete</strong></AlertTitle>
                    <DialogTitle id="alert-dialog-title">{"Are You Sure You Want To Delete?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText color="white" id="alert-dialog-description">
                        Deleting will be a permanent action and data pervailing will be permanently deleted and can not be retrieved back.
                    </DialogContentText>
                    </DialogContent>
                    </Alert>
                    <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="primary">
                        Disagree
                    </Button>
                    <Button
                    variant="outlined"
                       onClick={(e)=>{
                        handleDelete(data.id);
                         handleClose()}} color="secondary" autoFocus>
                        Agree
                    </Button>
                    
                    </DialogActions>
                    
                </Dialog>
                <Dialog
                    open={openEdit}
                    onClose={handleEditClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{`Edit ${title}`}</DialogTitle>
                    <DialogContent>
                      <Alert severity="info" variant="standard">You are currently editing Contents data</Alert>
                    <form className={classes.form}  >
                        <TextField
                        label="Content Name"
                        defaultValue={title}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="title"
                          name="title"
                          autoFocus
                          onChange={(e) => setContentName(e.target.value)}
                        />
                        <TextField
                        label="Description"
                        defaultValue={desc}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          multiline
                          rows={5}
                          id="desc"
                          name="desc"
                          autoFocus
                          onChange={(e) => setDesc(e.target.value)}
                        />
                    
                    <DialogActions>
                      <Button color="secondary" onClick={handleEditClose}>Cancel</Button>
                       {!loading && <Button
                          type="submit"
                          fullWidth
                          variant="outlined"
                          color="primary"
                          className={classes.submit}
                          onClick={(e)=> updateContent(data.id)}
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
                          className={classes.submit}
                        >Updating values...</Button>
                      }   
                    </DialogActions>
                     
                  </form>
                    </DialogContent>
                </Dialog>
            </Container>
            </div>
          
        </Grid>
    )
}

export default ContentDataBox

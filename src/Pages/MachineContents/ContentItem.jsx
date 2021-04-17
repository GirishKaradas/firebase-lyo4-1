import React, { useEffect, useState } from 'react';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import {db} from '../../firebase'


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
      boxShadow: "10px 20px 30px whitesmoke",
      marginBottom: "50px",
      alignItems: "center"
  },
  divButton: {
      backgroundColor: "#A68BA5",
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

export default function ContentItem({content}) {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [title, setContentName] = useState(content.title)
    const [desc, setContentDescription] = useState(content.desc);
    const [createdAt, setCreatedAt] = useState(content.createdAt);
   const [loading, setLoading] = useState(false);
   
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
    
      fetch(`http://localhost:5000/content/${id}`, {
        method: 'DELETE'
      }).then(() => {
        window.location.reload()
        history.push('/machine-content')
      })
}

  const updateContent=(id) => {
    setLoading(true)

    const data = {title,desc,createdAt}
      fetch(`http://localhost:5000/content/${id}`,{
        method: 'PUT',
         headers: {
         'Accept': 'application/json',
         "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).then((res) => {
        res.json().then((resp) => {
        setLoading(false)
        window.location.reload()
        history.push('/machine-content')
        })
       })
  }
  

    
    
    return (
        
        <div>
         
           <div className={classes.dataBox}>
            <Grid xs={12}>
                 <Typography align="center" variant="subtitle1">{content.contents[0].title}</Typography>
                 <Typography align="center" variant="body2">{content.desc}</Typography> 
                 <Grid
                className={classes.statsItem}
                item
                 >
                  
                <AccessTimeIcon
                className={classes.statsIcon}
                color="action"
                />
                <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
                >
                  
                </Typography>
          </Grid>   
            </Grid>
            <div >
            <Button onClick={handleEdit}  color="primary">Edit</Button>
            <Button href="/machine-content/steps" variant="contained" className={classes.divButton}> Steps</Button>
            <Button onClick={handleClickOpen} variant="contained" color="secondary">Delete</Button>
            
             </div>
            

              <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are You Sure You Want To Delete?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting will be a permanent action and data pervailing will be permanently deleted and can not be retrieved back.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Disagree
                    </Button>
                    <Button   onClick={(e)=>{
                        handleDelete(content.id);
                         handleClose()}} color="primary" autoFocus>
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
                    <DialogTitle id="alert-dialog-title">{"Edit Content"}</DialogTitle>
                    <DialogContent>
                    
                    <form className={classes.form}  >
                        <TextField
                        defaultValue={title}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidt
                          id="title"
                          name="title"
                          autoFocus
                          onChange={(e) => setContentName(e.target.value)}
                        />
                        <TextField
                        defaultValue={desc}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="desc"
                          onChange={(e) => setContentDescription(e.target.value)}
                          id="desc"
                          multiline
                        />
                        <TextField
                        defaultValue={createdAt}
                        
                          id="date"
                          label="Created At"
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setCreatedAt(e.target.value)}
                        />
                    <DialogActions>
                      <Button color="secondary" onClick={handleEditClose}>Cancel</Button>
                       {!loading && <Button
                          type="submit"
                          fullWidth
                          variant="outlined"
                          color="primary"
                          className={classes.submit}
                          onClick={(e)=> updateContent(content.id)}
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
            </div>
           
        </div>
    )
}


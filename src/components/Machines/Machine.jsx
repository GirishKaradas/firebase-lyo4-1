import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom'
import {db} from '../../firebase'
import {firebaseLooper} from '../../utils/tools'
import OpenWithIcon from '@material-ui/icons/OpenWith';
import {
  
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  TextField,
  Container,
  
} from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import{Alert, AlertTitle} from '@material-ui/lab';
import { useAuth } from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: "100%",
    backgroundColor: theme.palette.background.dark,
    marginLeft: "50px",
    marginBottom: "50px"
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const Machine= ({data, ...rest}) => {

  const classes = useStyles();
   const [isLoading, setIsLoading] = useState(true);
    const [machines, setMachines] = useState();
   const {currentUser} = useAuth()
    const [openEdit, setOpenEdit] = useState(false)
    const [open, setOpen] = useState(false)
   const [title, setTitle] = useState(data.title)
  const [location, setLocation] = useState(data.location);
  const [createdBy, setCreatedBy] = useState(data.createdBy);
  const [media, setMedia] = useState({
    mediaData: null ,
    url: "",
  })
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('')
  
  const history = useHistory();
  const handleReturn = () => {
    history.go(-1)
  }
      const handleClickOpen = () => {
    setOpen(true);
  };

   const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
      setOpenEdit(true)
    }
  const handleEditClose = () => {
      setOpenEdit(false)
    }


 const updateMachine=(id) => {
    setLoading(true)
    const data = {title,location}
      db.collection('machineData').doc(id).update(data).then(()=>{
        setLoading(false)
        const notify = `${currentUser.email} has Updated ${data.title}`
          db.collection('notifications').add(notify).then(() => {
           console.log('notify added')
          })
      })
  }

    const handleDelete = (id) => {
        db.collection('machineData').doc(id).delete().then(() => {
          const notify = `${currentUser.email} has deleted ${data.title}`
          db.collection('notifications').add(notify).then(() => {
           console.log('notify added')
          })
        })
    }

   
  return (
      <Card 
      style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
      >
       <CardContent>               
           
            <Box
            pb={3}
            sx={{
            display: 'flex',
            justifyContent: 'center',
            
            }}
            >
              <Avatar>M</Avatar>
            </Box>
                
               
                <Typography
                  align="center"
                  color="textPrimary"
                  gutterBottom
                  variant="h3"
                >
                  {data.title} 
                
                </Typography>
                <Typography
                  align="center"
                  color="textPrimary"
                  variant="body1"
                >
                  {data.location}
                </Typography>
             
               </CardContent>
              <Box flexGrow={1} />
              <Divider />
              <Box p={2}>
                <Grid
                  container
                  justify="space-between"
                  spacing={2}
                >
                  <Grid
                    style={{
                      alignItems: "center",
                      display: "flex"
                    }}
                    item
                  >
                    <SupervisorAccountIcon
                      className={classes.statsIcon}
                      color="action"
                    />
                    <Typography
                      color="textSecondary"
                      display="inline"
                      variant="body2"
                    >
                     {data.createdBy}
                    </Typography>
                  </Grid>
                  <Grid
                  item
                  style={{
                    alignItems: "center",
                    display: "flex"
                  }}
                  >
                     <Button startIcon={<OpenWithIcon/>} variant="contained" style={{width:"120px",backgroundColor: "#ff7a00", color:"white", margin: "2%"}}><Link style={{color: "white" ,textDecoration: "none"}} to={`/machine-data/${data.id}/Module`}>Open</Link></Button>
                    <Button startIcon={<EditIcon/>} onClick={handleEdit} variant="contained" style={{width:"120px",backgroundColor: "#4a47a3", color:"white", margin: "2%"}}>Edit</Button>
                    <Button startIcon={<DeleteForeverIcon/>} onClick={handleClickOpen} variant="contained" style={{width:"120px",backgroundColor: "#e40017", color:"white", margin: "2%"}}>Delete</Button>
                  </Grid>
               
                </Grid>
              </Box>
           {/* Dialog */}
            <div>
              <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                ><Alert variant="filled" severity="error">
                  <AlertTitle>Delete</AlertTitle>
                    <DialogTitle id="alert-dialog-title">{"Are You Sure You Want To Delete?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText color="white" id="alert-dialog-description">                         
                         Deleting will be a permanent action and data pervailing will be permanently deleted and can not be retrieved back. 
                         
                    </DialogContentText>
                    </DialogContent>
                    </Alert>
                    <DialogActions>
                    <Button
                    style={{width: "100px", backgroundColor: "blue"}}
                     variant="contained" onClick={handleClose} color="secondary">
                        Disagree
                    </Button>
                    <Button 
                     style={{width: "100px", backgroundColor: "red"}}
                    variant="contained"
                      onClick={(e)=>{
                        handleDelete(data.id);
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
                    <DialogTitle id="alert-dialog-title">{`Edit ${data.title}`}</DialogTitle>
                    <DialogContent>
                    <Alert severity="info">You are currently editing Machine data!</Alert>
                    <form className={classes.form}  >
                        <TextField
                        defaultValue={title}
                        label="Machine Name"
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="title"
                          name="title"
                          autoFocus
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                        label="Machine Location"
                        style={{marginBottom: "20px"}}
                        defaultValue={location}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="desc"
                          onChange={(e) => setLocation(e.target.value)}
                          id="desc"
                          multiline
                        />
                        
                        <TextField
                      
                        defaultValue={createdBy}
                        disabled
                        fullWidth
                        variant="outlined"
                          label="Created By"
                          onChange={(e) => setCreatedBy(e.target.value)}
                        />
                    <DialogActions>
                      <Button color="secondary" onClick={handleEditClose}>Cancel</Button>
                       {!loading && <Button
                          type="submit"
                          fullWidth
                          variant="outlined"
                          color="primary"
                          className={classes.submit}
                          onClick={(e)=> updateMachine(data.id)}
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
        
         
           
    </Card>
  );
};
 


export default Machine;
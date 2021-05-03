import React, { useEffect, useState } from 'react';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, InputLabel, makeStyles, Select, Snackbar, TextField, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { db, storageRef } from '../../firebase';
import { Alert, AlertTitle } from '@material-ui/lab';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useStepStorage } from '../../utils/useStepStorage';
const useStyles = makeStyles((theme) => ({
  root: {
    borderBottomColor: "black",
    backgroundColor: 'white',
   
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
      background: 'white',
      marginBottom: "50px",
      alignItems: "center"
  },
  divButton: {
      color: "#32e0c4",
      
  }
}));

const StepItem = ({ data})  => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openView, setOpenView] = useState(false)
    const [title, setTitle] = useState(data.title)
    const [desc, setDesc] = useState(data.desc)
     const [file, setFile] = useState(null)
     const [format, setFormat] = useState(data.format)
    const [createdAt, setCreatedAt] = useState(data.createdAt)
     const [type, setType] = useState(data.type);
    const [error,setError] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false);
    const types = ["image/png", "image/jpeg", "image/jpg"];
    const videoTypes = ["video/mp4", "video/mkv", "video/mov"];
   const audioTypes = ["audio/mp3", "audio/mpeg"]
       const handleChange = (e) => {
        let selectedFile = e.target.files[0]
        setDisabled(false)
           if (selectedFile) {
          if(format === 'image'){
             if (types.includes(selectedFile.type)) {
                setError(null);
                setFile(selectedFile);
            } else {
                setFile(null);
                setError("Please select an image file (png or jpg)");
            }
          }else if(format === 'video'){
            if (videoTypes.includes(selectedFile.type)) {
                setError(null);
                setFile(selectedFile);
            } else {
                setFile(null);
                setError("Please select a video file (mp4 or mkv)");
            }
          }else if(format === 'audio'){
            if (audioTypes.includes(selectedFile.type)) {
                setError(null);
                setFile(selectedFile);
            } else {
                setFile(null);
                setError("Please select an audi file (mp3 )");
            }
          }
           
        }
      }
          const { progress, url } = useStepStorage(file);

          function getMedia(){
            if (format === 'image'){
              return <img height='300px' width='450px' src={data.url}/>
            }else if(format === 'video'){
              return  (<video height='300px' width='450px' controls>
                <source src={data.url}/>
              </video>)
            }else if(format === 'audio'){
              return (<audio controls>
             <source src={data.url}/>
              </audio>)
            }
          }

    const handleView = () => {
      setOpenView(true)
      
    }

    const handleViewClose = () => {
      setOpenView(false)
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

  const handleDelete = (id) => {
    db.collection('stepData').doc(id).delete().then((data) => {
      return(
        <Snackbar ></Snackbar>
      )
    })
}
const handleImageUpdate = (id) => {
  const reqData = {url}
      db.collection('stepData').doc(id).update(reqData).then((data)=>{
        setLoading(false)
      
        console.log(data)
      })
}
const updateStep=(id) => {
    setLoading(true)
    
    const reqData = {title,desc,type,format}
      db.collection('stepData').doc(id).update(reqData).then((data)=>{
        setLoading(false)
        
        console.log(data)
      })
  }
    return (
        
        <Container>
            <div className={classes.dataBox}>
            <Grid xs={12}>
                 <Typography align="center" variant="h4">{data.title}</Typography>
                 <Typography align="center" variant="body2">{data.desc}</Typography> 
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
              {data.type}
                </Typography>
          </Grid>   
            </Grid>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%',}}>
            <Button startIcon={<EditIcon/>}  onClick={handleEdit}  color="primary">Edit</Button>
            <Button startIcon={<VisibilityIcon/>} 
            onClick={() =>
             {handleView()}} 
             className={classes.divButton}>View</Button>
            <Button startIcon={<DeleteForeverIcon/>}  onClick={handleClickOpen}  color="secondary">Delete</Button>
            </div>
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
                        Deleting will be a permanent action and data pervailing will be permanently deleted and can not be retrieved back.                    </DialogContentText>
                    </DialogContent>
                    </Alert>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary" variant="outlined">
                        Disagree
                    </Button>
                    <Button   onClick={(e)=>{
                        handleDelete(data.id);
                         handleClose()}} color="secondary" variant="outlined" autoFocus>
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
                    <DialogTitle id="alert-dialog-title">{<b>Edit {title}</b>}</DialogTitle>
                    <DialogContent>
                 
                    <form className={classes.form}  >
                        <TextField
                       
                        defaultValue={title}                       
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
                        defaultValue={desc}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="desc"
                          onChange={(e) => setDesc(e.target.value)}
                          id="desc"
                          multiline
                        />
                        <InputLabel>Select Type</InputLabel>
                        <Select
                        variant='outlined'
                        value={type}                      
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setType(e.target.value)}
                          style={{marginBottom: '15px'}}
                        >
                          <option value='info'>Info</option>
                          <option value='camera'>Camera</option>
                            <option value='critical'>Critical</option>
                            <option value='normal'>Normal</option>
                        </Select>
                        <br/>
                        <InputLabel >Select Format </InputLabel>
                          <Select
                          variant='outlined'
                          value={format}
                            label="Select Format"
                          required
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={(e) => setFormat(e.target.value)}
                          >
                            <option value='image'>Image</option>
                            <option value='video'>Video</option>
                              <option value='audio'>Audio</option>
                              
                          </Select>
                          {getMedia()}
                         <Alert>To Update Media Click <b>'Update Media'</b> After uploading a new Media file</Alert>
                        <InputLabel>Replace the current Media file</InputLabel>
                         <input type="file"  onChange={handleChange} />
                         {
                           <div>
                              <h4>{progress}% uploaded</h4>
                           </div>
                          
                         }
                       <Button disabled={disabled} style={{color: 'orangered'}} variant='outlined' fullWidth onClick={() => handleImageUpdate(data.id)}>Update Media</Button>
                    <DialogActions>
                      <Button color="secondary" onClick={handleEditClose}>Cancel</Button>
                       {!loading && <Button
                          type="submit"
                          
                          variant="outlined"
                          color="primary"
                          className={classes.submit}
                          onClick={(e)=> 
                            {updateStep(data.id);
                               handleEditClose();
                          }}
                        >
                          Update
                          </Button>}
                      {
                        loading && <Button
                          type="submit"
                         
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
                <Dialog
                    open={openView}
                    onClose={handleViewClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"View Data"}</DialogTitle>
                    <DialogContent>
                    
                    <form className={classes.form}  >
                        <TextField
                        defaultValue={title}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="title"
                          name="title"
                          autoFocus
                          disabled
                        />
                        <TextField
                        defaultValue={desc}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="desc"
                          disabled
                          id="desc"
                          multiline
                        />
                        {getMedia()}
                    <DialogActions>
                      <Button color="secondary" onClick={handleViewClose}>Cancel</Button>
                    </DialogActions>
                     
                  </form>
                    </DialogContent>
                </Dialog>
            </div>
            
        </Container>
    )
}

export default StepItem
import { Button, Card, Container, FormHelperText, makeStyles, TextField, Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import ContentDashboardLayout from '../../components/ContentSidebar/ContentDashboardLayout';
import  {db} from '../../firebase'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#141256',
  },
  form: {
    alignItems: "center",
    justifyContent: "center",
    width: '90%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
      backgroundImage: 'linear-gradient(to left bottom, #fa630f, #fc8218, #fd9d29, #feb63f, #ffce59)',
      color: "white",
      borderRadius: '20px',
      margin: theme.spacing(3, 0, 2),
  },
    wrapper: {
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 256
  },
  
  },
  container: {
      display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
  },
  content: {

      flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
    },
}));


const AddManuals = ({match}) => {
  const classes= useStyles();
  const [title, setContentName] = useState('')
  const [error, setError] = useState('')
  const [desc, setDesc] = useState('')
  const [loading, setLoading] = useState(false);
  const [mid, setMid] = useState(match.params.id)
  const history = useHistory();

    
    const handleSubmit = (e) => {
    e.preventDefault();
    if(title?.trim().length===0 || desc?.trim().length===0){
      return  setError("Empty Spaces are not accepted as inputs! Please try again with a valid input!")
    }
    const manuals = {title, mid, desc}
    setLoading(true);
      db.collection('manualData').add(manuals).then((data) =>{
        console.log(data)
        history.push(`/machine-data/Manuals/${match.params.id}/Manuals`)
      })

  }
 
    return (
      <>
      <ContentDashboardLayout match={match}/>
        <div>   
          <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
           <div className={classes.paper}>
            <Alert severity="info">You are currently adding a new Manual</Alert>
            <br/>
            <Typography align='center' component="h1" variant="h2">
          <b>Add Manuals</b>
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          {error && <Alert severity='error'>{error}</Alert>}
          <TextField value={mid}
           fullWidth
           variant="outlined"
           margin="normal"
           label="Machine id"
           disabled
           onChange ={(e) => setMid(e.target.value)}
           />
           
          <TextField
          value={title}
          error={title.length > 30}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="content_name"
          label="Manual Title"
          name="content_name"
          autoFocus
          onChange={(e) => setContentName(e.target.value)}
            
          />
          <FormHelperText>Title should be max {title.length}/ 30 characters</FormHelperText>
           <TextField
           rows={5}
           multiline
           value={desc}
           variant="outlined"
           margin="normal"
           required
           fullWidth
           id="content_name"
           label="Manual Description"
           name="content_name"
           error={desc.length > 150}
           onChange={(e) => setDesc(e.target.value)}
            
          />
              <FormHelperText>Description should be max {desc.length}/150 characters </FormHelperText>
          
         {!loading && <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={desc.length > 150 || title.length > 30} 
            className={classes.submit}
          >
            Add Manual
            </Button>}
         {
           loading && <Button
            type="submit"
            fullWidth
            variant="contained"
            
            disabled
            className={classes.submit}
          >Adding Manual...</Button>
         }   
          </form>
          </div>
          </Card>
        </div>
      </div>
      
           
         
          
        </div>
        </>
    )
}

export default AddManuals
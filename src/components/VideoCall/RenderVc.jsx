import React, { useEffect, useState } from 'react';
import '@opentok/client';
import './index.css';
import './polyfills';
import {

  API_KEY,
  SESSION_ID,
  TOKEN
} from './config';
import VideoCall from './VideoCall';
import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputLabel, Select, TextField } from '@material-ui/core';
import { db } from '../../firebase';
import { useAuth } from '../context/AuthContext';
import { firebaseLooper } from '../../utils/tools';
import { useVideoStorage } from '../../utils/useVideoStorage';
import OpenTokPage from '../../Pages/VideoCallPage/OpenTokPage';
import config from '../../Pages/VideoCallPage/config';
import { SettingsBackupRestoreSharp } from '@material-ui/icons';
import ListUsers from './ListUsers';

const credentials = {
  apiKey: API_KEY,
    sessionId: SESSION_ID,
    token: TOKEN,}

export default function RenderVc() {
   const [file, setFile] = useState(null);
   const [error, setError] = useState("")
   const [call_id, setCallId] = useState('')
   const [currentCall, setCurrentCall] = useState([])
    const [format, setFormat] = useState('')
    const [configData, setConfigData] = useState([])
    const [disabled, setDisabled] = useState(true)
    const [open, setOpen] = useState(false)
    const [token, setToken] = useState(`${config.TOKEN}`)
    const [session_id, setSessionId] = useState(`${config.SESSION_ID}`)
    const types = ["image/png", "image/jpeg", "image/jpg"];
     const videoTypes = ["video/mp4", "video/mkv", "video/mov"];
   const audioTypes = ["audio/mp3", "audio/mpeg"]

     useEffect(() => {

      db.collection('OpenTokConfig').get().then(snapshot => {
      const data = firebaseLooper(snapshot)
      console.log(data[0])
      setConfigData(data[0])
      
    })

    db.collection('CallCurrent').onSnapshot(snapshot => {
      const callData = firebaseLooper(snapshot)
        callData.sort(function(a,b){
          return(a.index-b.index)
        })
      setCurrentCall(callData[callData.length -1])
      setCallId(callData[callData.length-1].call_id)
      
    })

  }, [])

  const handleChange = (e) => {
        let selectedFile = e.target.files[0];
          
           if (selectedFile) {
          if(format === 'image'){
             if (types.includes(selectedFile.type)) {
                setError(null);
                setFile(selectedFile);
                setDisabled(false)
            } else {
                setFile(null);
                setError("Please select an image file (png or jpg)");
                
            }
          }else if(format === 'video'){
            if (videoTypes.includes(selectedFile.type)) {
                setError(null);
                setFile(selectedFile);
                 setDisabled(false)
            } else {
                setFile(null);
                setError("Please select a video file (mp4 or mkv)");
            }
          }else if(format === 'audio'){
            if (audioTypes.includes(selectedFile.type)) {
                setError(null);
                setFile(selectedFile);
                 setDisabled(false)
            } else {
                setFile(null);
                setError("Please select an audio file (mp3 )");
            }
          }
           
        }
    }
    let { progress, url } = useVideoStorage(file);

    const handleSubmit = () => {
      db.collection('CallMedia').add({call_id,url, format}).then(() => {
        setFile(null)
        setDisabled(true)
      })
    }
    const handleSession = () => {
      setSessionId(configData.session_id)
      setToken(configData.token)
    }
    const handleClickOpen = () => {
      setOpen(true)
    }
    const handleClose = () => {
      setOpen(false)
    }
  return(
    <Container >
      
      {/* <div style={{display: 'flex', justifyContent: 'space-evenly'}}>    
        <TextField disabled value={call_id}></TextField>
      </div>
     

    <Grid container spacing={4} style={{display: 'flex', justifyContent: 'space-evenly',  border: 'black'}}>
       <Grid
       item
            lg={6}
            sm={6}
            xl={3}
            xs={12}
       >
          <InputLabel >Select Format </InputLabel>
                <Select
               style={{width:'50%'}}
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
        </Grid>
        <Grid
        item
            lg={6}
            sm={6}
            xl={3}
            xs={12}
        >
           <InputLabel>Send a File</InputLabel>
           
       <input onChange={handleChange} type='file' aria-label='Share file'/>
      {file && <p>{progress}% uploaded</p>}
       <Button disabled={disabled} color= 'primary' onClick={handleSubmit}>Submit File</Button>
        </Grid>
    

</Grid>
<div style={{display: 'flex' , justifyContent: 'flex-end'}}>
  <Button onClick={handleClickOpen}>Invite Users</Button>
</div>
<Button onClick={handleSession}>Join Call</Button>
         <OpenTokPage
        apiKey={config.API_KEY}
        sessionId={config.SESSION_ID}
        token={config.TOKEN}
        />
    <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title"><b>Invite Users</b></DialogTitle>
            <DialogContent>
              <ListUsers call_id={call_id}/>
            <DialogActions>
              <Button color="secondary" onClick={handleClose}>Cancel</Button>
              
            </DialogActions>        
            </DialogContent>
        </Dialog> */}


    <section className="bg-gray-100 dark:bg-gray-900 lg:py-12 lg:flex lg:justify-center">
        <div className="bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
            <Grid container spacing={5}>
              
                {/* <img className="h-64 bg-cover lg:rounded-lg lg:h-full" src='https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80'/> */}
              
                 <Grid item>
                   <div className="lg:w-1/2">
                    <OpenTokPage
                apiKey={config.API_KEY}
        sessionId={config.SESSION_ID}
        token={config.TOKEN}/>
         </div> 
                 </Grid>
               
            </Grid>

            <div className="max-w-xl px-6 py-12 lg:max-w-5xl lg:w-1/2">

                <h2 className="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl">Share Media </h2>
                 <select
               style={{ border: '2px solid whitesmoke', margin: '2%'}}
                
                value={format}
                  
                required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setFormat(e.target.value)}
                >
                  <option value='' selected hidden>Select a Format</option>
                  <option value='image'>Image</option>
                  <option value='video'>Video</option>
                    <option value='audio'>Audio</option>
                    
                </select>
                {/* file upload */}
                
                <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-black rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-black hover:text-black">
                    <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span class="mt-2 text-base leading-normal">Select a file</span>
                    <input onChange={handleChange} type='file' class="hidden" />
                </label>
            
                {file && <p>{progress}% uploaded</p>}
                <p className="mt-4 text-gray-600 dark:text-gray-400"></p>
                
                <div className="mt-8">
                    <button style={{backgroundColor: 'orange'}} disabled={disabled} href="#" className="px-5 py-2 font-semibold text-gray-100 transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-700">Send Now</button>
                </div>
            </div>
        </div>
    </section> 

     </Container>
)
}


import React, { useEffect, useState } from 'react';
import '@opentok/client';
import './index.css';
import './polyfills';
import {
  SAMPLE_SERVER_BASE_URL,
  API_KEY,
  SESSION_ID,
  TOKEN
} from './config';
import VideoCall from './VideoCall';
import { Button } from '@material-ui/core';
import { db } from '../../firebase';
import { useAuth } from '../context/AuthContext';
import { firebaseLooper } from '../../utils/tools';

export default function RenderVc() {

  const [credentials, setCredentials] = useState({
    apiKey: API_KEY,
    sessionId: SESSION_ID,
    token: TOKEN
  })
  const [disabled, setDisabled] = useState(false)
  const {currentUser} = useAuth()
  const [notifyData, setNotify] = useState([])
  const notification = `${currentUser.email} has started a new Joint Call! Join Now?`
  const  link =`video-call`
  useEffect(() => {
    db.collection('notifications').onSnapshot(doc => {
      const data = firebaseLooper(doc)
      setNotify(data)
    })
  })
    const handleInvite = () => {
      var index = notifyData.length
      const notify ={notification, link, index}
      db.collection('notifications').add(notify).then(() => {
        setDisabled(true)
      })
    }
  return(
    <div >
      <Button style={{marginLeft: '45%', color: 'orangered', marginBottom: '3%', marginTop: '2%'}} disabled={disabled} onClick={handleInvite} variant='outlined' >Start a Joint Call</Button>
    <VideoCall credentials={credentials} />
    
    </div>
)
}


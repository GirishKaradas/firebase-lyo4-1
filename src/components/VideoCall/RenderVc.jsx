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

const credentials = {
  apiKey: API_KEY,
    sessionId: SESSION_ID,
    token: TOKEN,}

export default function RenderVc() {
 
  return(
    <div >

    <VideoCall credentials={credentials} />
    
    </div>
)
}


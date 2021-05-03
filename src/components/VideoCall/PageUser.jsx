import { Avatar, Button, ListItem, ListItemText } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { firebaseLooper } from '../../utils/tools'
import { useAuth } from '../context/AuthContext'

const PageUser = ({user, callId}) => {
    const {currentUser} = useAuth()
    const [vData, setVData] = useState([])
    const callerId = currentUser.email
    useEffect(() => {
         db.collection('videoCallData').onSnapshot(doc => {
             const data = firebaseLooper(doc)
             setVData(data)
         })
    }, [])
    const handleInvite = () => {
        const index = vData.length
        const receiverId = user.email
        const call_id = callId
        const message = 'has invited you'
       const  status='waiting'
        const data = {index, receiverId, callerId, call_id, message, status}
        db.collection('videoCallData').add(data)
    }
    return (
       <ListItem
         
          key={user.id}
        >
          <Avatar 
          style={{width: '6%', height: '6%'}}
          src={user.url} />
          
          <ListItemText
          style={{marginLeft: '2%'}}
            primary={user.firstName}
           
          />
        {user.email}
        <Button onClick={handleInvite} style={{color:'#00917c',marginLeft: '2%'}}> Invite</Button>
        </ListItem>
    )
}

export default PageUser

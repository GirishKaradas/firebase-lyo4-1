import { v4 as uuid } from 'uuid';
import moment from 'moment';
import {
    Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';
import PageUser from './PageUser';

const ListUsers = ({call_id}) =>{
    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    useEffect(() => {
        
        db.collection('users').get().then(snapshot => {
            const user = firebaseLooper(snapshot);
            setUsers(user)            
            
        }).catch(err => {
            console.log(err)
        })
    }, [])

  return (
  <Card >
    <CardHeader
      subheader={`${users.length} in total`}
      title="Users"
    />
    <Divider />
    <TextField fullWidth onChange={(e) => setSearchTerm(e.target.value)} label='Search User'/>
    <List>
      {users.
       filter((data) => {
                                if(searchTerm === ""){
                                    return data
                                } else if (data.email.toLowerCase().includes(searchTerm.toLowerCase())){
                                        return data
                               }else if (data.firstName.toLowerCase().includes(searchTerm.toLowerCase())){
                                        return data
                               }
                               else if (data.lastName.toLowerCase().includes(searchTerm.toLowerCase())){
                                        return data
                               }else if (data.phone.toLowerCase().includes(searchTerm.toLowerCase())){
                                        return data
                                }
                                      
                            })
      .slice(0,10).map((user, i) => (
        <PageUser user={user} callId={call_id}/>
      ))}
    </List>
    <Divider />
    <Box
    p={2}
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        
      }}
    >
    </Box>
  </Card>
)};

export default ListUsers;
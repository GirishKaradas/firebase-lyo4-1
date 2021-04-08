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
  ListItemText
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';

const ListUsers = (props) =>{
    const [users, setUsers] = useState([])

    useEffect(() => {
        
        db.collection('users').get().then(snapshot => {
            const user = firebaseLooper(snapshot);
            setUsers(user)            
            
        }).catch(err => {
            console.log(err)
        })
    })

  return (
  <Card {...props}>
    <CardHeader
      subheader={`${users.length} in total`}
      title="Users"
    />
    <Divider />
    <List>
      {users.slice(0,5).map((user, i) => (
        <ListItem
          divider={i < users.length - 1}
          key={user.id}
        >
          <Avatar >
              <PeopleAltIcon/>
          </Avatar>
          <ListItemText
            primary={user.firstName}
            secondary={`~>  ${user.email}`}
          />
          <IconButton
            edge="end"
            size="small"
          >
            <MoreVertIcon />
          </IconButton>
        </ListItem>
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
      <Button
      href='/users'
        color="primary"
        endIcon={<ArrowRightIcon />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box>
  </Card>
)};

export default ListUsers;
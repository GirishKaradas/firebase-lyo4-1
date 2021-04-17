import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';

const UsersBox = (props) =>{ 
    
    const [users, setUsers] = useState([])
    useEffect(() => {
        db.collection('users').onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setUsers(data)
        })
    }, [])
    return (
    
  <Card style={{height: '130px'}} {...props}>
    <CardContent>
      <Grid
        container
        spacing={3}
        style={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
          >
            TOTAL USERS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            {users.length}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            style={{
              backgroundColor: green[600],
              height: 56,
              width: 56
            }}
          >
            <PeopleIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        style={{
          alignItems: 'center',
          display: 'flex',
          paddingTop: 2
        }}
      >
        <ArrowUpwardIcon sx={{ color: green[900] }} />
        <Typography
          variant="body2"
          style={{
            color: green[900],
            mr: 1
          }}
        >
         List of Users
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
        <Button  style={{color: "green"}}  href="/users"> Open</Button>

        </Typography>
      </Box>
    </CardContent>
  </Card>
);
}
export default UsersBox;
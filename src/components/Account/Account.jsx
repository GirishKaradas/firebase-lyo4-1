import React, { useEffect, useState } from 'react';
import Page from '../Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import { db } from '../../firebase';
import { useAuth } from '../context/AuthContext';
import { firebaseLooper } from '../../utils/tools';
import {
  Box,
  Container,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = () => {
  const [account, setAccount] = useState([{}])
  const [accountTwo, setAccountTwo] = useState([{}])
  const classes = useStyles();
  const {currentUser} = useAuth()

  useEffect(() => {
    db.collection('users').where('email', '==', currentUser.email ).get().then(snapshot => {
      const accountData = firebaseLooper(snapshot)
      setAccount(accountData[0])
      setAccountTwo(accountData[0])
    })
  })
 
  
  return (
    <Page
      className={classes.root}
      title="Account"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Profile account={account} />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetails accountb={account} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Account;
import React from 'react';
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from './Sidebar';
import Notifications from './Notifications';
import VideoPlayer from './VideoPlayer.jsx';
import { ContextProvider } from './Context';




const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid black',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

const RenderVchat = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.wrapper}>
      <VideoPlayer />
      <Sidebar>
        <Notifications />
      </Sidebar>
    </div>
    </>
    
  );
};

export default RenderVchat;
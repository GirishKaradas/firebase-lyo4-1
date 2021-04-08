import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Sidebar from '../../components/Sidebar/Sidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
      
    
  }
}));

const DashboardLayout = ({children}) => {
  const classes = useStyles();
 

  return (
    <div >
     <Sidebar />
      <div >
        <div>
          <div className={classes.content}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
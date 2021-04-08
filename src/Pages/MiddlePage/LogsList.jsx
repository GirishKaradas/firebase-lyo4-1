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
import CustomerListView from '../../components/LogsData/Logs';

const LogsList = (props) =>{

  return (
  <Card {...props}>
    <CardHeader
      title="Call Logs"
    />
    <Divider />
    <CustomerListView/>
    
  </Card>
)};

export default LogsList;
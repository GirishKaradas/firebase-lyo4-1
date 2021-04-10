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
  Typography
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import BuildIcon from '@material-ui/icons/Build';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';

const ListMachines = (props) =>{
    const [machines, setMachines] = useState([])

    useEffect(() => {
        
        db.collection('machineData').onSnapshot(snapshot => {
            const machine = firebaseLooper(snapshot);
            setMachines(machine)            
            
        })
    }, [])

  return (
  <Card {...props}>
    <CardHeader
      subheader={`${machines.length} in total`}
      title="Latest Machines"
    />
    <Divider />
    <List>
      {machines.slice(0,4).map((machine, i) => (
        <ListItem
          divider={i < machines.length - 1}
          key={machines.id}
          
        >
          <Avatar >
              <BuildIcon/>
          </Avatar>
          
             
               <ListItemText
              primary={machine.title}
              style={{marginLeft: '3%', fontWeight: '900'}}
            />
            
            
            {machine.location}
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
      href='/machine-data'
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

export default ListMachines;
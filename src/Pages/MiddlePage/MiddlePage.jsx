import { Helmet } from 'react-helmet';
import {
  Box,
  Button,
  Container,
  fade,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Typography
} from '@material-ui/core';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../components/context/AuthContext';
import ListMachines from './ListMachines';
import LineDemo from '../../components/LineDemo';
import ListUsers from './ListUsers';
import CustomerListView from '../../components/LogsData/Logs';
import LogsList from './LogsList';
import RecipeeList from './Graph/RecipeeList';
import JobGraph from './JobGraph';
import WorkFlow from './WorkFlow';
import MachineBox from './MachineBox';
import UsersBox from './UsersBox';
import JobsBox from './JobsBox';
import ManualBox from './ManualBox';
import { db } from '../.././firebase'
import { firebaseLooper } from '../.././utils/tools'
import TestData from '../Tests/TestData';
import GraphData from './Graph/GraphData';
import Skeleton from '@material-ui/lab/Skeleton';
import TestHome from '../Tests/TestHome';
import GraphDataRecipee from './Graph/GraphDataRecipee';
import TestGraph from '../../TestGraph/TestGraph';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

 
const updateChart = (title) => {
      let gData = []
          
       console.log(gData)
        return(
          <TestData data={gData}/>
        )
      }

const MiddlePage = () =>{
 
 
   const [rData, setRData] = useState([])
  
   const [title, setTitle] = useState('')
    const history = useHistory()

     
  useEffect(() => {
         db.collection('recipeeData').onSnapshot(doc => {
          const data = firebaseLooper(doc)
            setRData(data)
            
          })
      },[])

     
    return (
      <Paper className='bg-gray-200'>
    <Helmet>
      <title>Dashboard | LyoIMS</title>
    </Helmet>
    <Box
    className='bg-gray-100'
    py={3}
      style={{
        backgroundColor: 'background.default',
        minHeight: '100%',
      }}
    >
      <Container className='bg-gray-100' maxWidth={false}>
        

        <Grid
          container
          spacing={3}
          className='bg-grey-100'
        >
          <Grid
          style={{height: '100%'}}
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
            className='bg-grey-100'
          >
            <MachineBox />
            {/*  */}
          </Grid>
          <Grid
          style={{height: '100%'}}
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
            className='bg-grey-100'
          >
            <UsersBox/>
          </Grid>
          <Grid
          style={{height: '100%'}}
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
            className='bg-grey-100'
          >
           <JobsBox/>
          </Grid>
          <Grid
         className='bg-grey-100'
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <ManualBox/>
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
            className='bg-grey-100'
          >
           
              {/* <GraphData data={rData} /> */}
              {/* <RecipeeList/>
                <Skeleton variant="circle" width={40} height={40} />
              <Skeleton variant="rect" style={{width: '100%'}} height={360} /> */}
              {/* <FormControl style={{width: '100%'}} >
        <InputLabel id="demo-simple-select-label">Recipee Name</InputLabel>
        <Select
          value={title}
          defaultValue=''
          onChange={(e) => setTitle(e.target.value)}
        >
          {
            rData.map((data) => (
              <MenuItem value={data.id}>{data.title}</MenuItem>
            ))
          }
      
        </Select>
      </FormControl> */}
      
        {/* <h1>{title}</h1> */}
        
       <TestGraph/>
            
           {/* <GraphDataRecipee data={gData}/> */}
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
            className='bg-grey-100'
          >  
         
           <JobGraph/>
            
          </Grid>
           <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
            className='bg-grey-100'
          >
            {/* <WorkFlow/> */}
            <LogsList/>
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
            className='bg-grey-100'
          >

         <ListUsers style={{height: "100%"}}/>
          </Grid>
         
        </Grid>
      </Container>
    </Box>
  </Paper>
    )
}

export default MiddlePage

import { Helmet } from 'react-helmet';
import {
  Box,
  Button,
  Container,
  fade,
  Grid,
  makeStyles
} from '@material-ui/core';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import BuildIcon from '@material-ui/icons/Build';
import PhoneCallbackIcon from '@material-ui/icons/PhoneCallback';
import VideoCallIcon from '@material-ui/icons/VideoCall'
import { database } from '../../firebase';
import { firebaseLooperTwo } from '../../utils/tools';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../components/context/AuthContext';
import ListMachines from './ListMachines';
import LineDemo from '../../components/LineDemo';
import ListUsers from './ListUsers';
import CustomerListView from '../../components/LogsData/Logs';
import LogsList from './LogsList';
 

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

const MiddlePage = () => {
  const classes = useStyles()
  const [values, setValues] = useState([])

  
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }


    return (
      <>
    <Helmet>
      <title>Dashboard | LyoIMS</title>
    </Helmet>
    <Box
    py={3}
      style={{
        backgroundColor: 'background.default',
        minHeight: '100%',
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Button startIcon={<BuildIcon/>} style={{backgroundColor: "#ff7a00",width:"150px", marginRight: "30px", marginTop: "3%"}} color="primary" variant="contained" href="/machine-data"> Machines</Button>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Button startIcon={<GroupIcon/>} style={{backgroundColor: "#ff7a00",width:"150px",marginRight: "30px", marginTop: "3%"}} color="primary" variant="contained" href="/users"> Users</Button>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Button startIcon={<PhoneCallbackIcon/>} style={{backgroundColor: "#ff7a00",width:"150px",marginRight: "30px", marginTop: "3%"}} color="primary" variant="contained" href="/call-logs"> Call Logs</Button>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Button startIcon={<VideoCallIcon/>} style={{backgroundColor: "#ff7a00",width:"150px",marginRight: "30px", marginTop: "3%"}} color="primary" variant="contained" href="/video-call"> Video Call</Button>
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
             <LineDemo style={{height: "100%"}}/>
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
           <ListMachines style={{height: "100%"}}/>
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            
           <ListUsers style={{height: "100%"}}/>
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LogsList/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
    )
}

export default MiddlePage

import { useEffect, useState } from 'react';
import { Link as RouterLink, Redirect, useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  PhoneCall as PhoneIcon,
  Video as VideoIcon,
  LogOut as LogOutIcon
} from 'react-feather';
import VideoCallIcon from '@material-ui/icons/VideoCall'
import NavItem from './NavItem';
import { useAuth } from '../components/context/AuthContext';
import { db } from '../firebase';
import { firebaseLooper } from '../utils/tools';



const items = [
  {
    href: '/',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/users',
    icon: UsersIcon,
    title: 'Users'
  },
  {
    href: '/machine-data',
    icon: ShoppingBagIcon,
    title: 'Machines'
  },
  {
    href: '/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/video-call',
    icon: VideoIcon,
    title: 'Video Call'
  },
 {
    href: '/call-logs',
    icon: PhoneIcon,
    title: 'Call Logs'
  },

];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const {currentUser, logout} = useAuth()
  const [userData, setUserData] = useState([])
  const [error, setError] = useState('')
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
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    if(currentUser){
      db.collection('users').where('email', '==', `${currentUser.email}`).onSnapshot(doc => {
      const data = firebaseLooper(doc)
      setUserData(data[0])
    })
    } else {
      <Redirect to='/login'/>
    }
    
  }, [location.pathname]);

  const content = (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
      m={2}
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
         
        }}
      >
        <Avatar
          component={RouterLink}
          src={userData.url? `${userData.url}`: ''}
          style={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
         {userData.firstName} {userData.lastName}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {userData.role}
        </Typography>
      </Box>
      <Divider />
      <Box m={2} >
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box style={{ flexGrow: 1 }} />
      <Box
      m={2}
      p={2}
        style={{
          backgroundColor: 'whitesmoke',
          
        }}
      >
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          Want to Logout?
        </Typography>
        <Box
        pt= {2}
          style={{
            display: 'flex',
            justifyContent: 'center',
            
          }}
        >
          <Button
          style={{backgroundColor: "red", color: "white"}}
          startIcon={<LogOutIcon/>}
            component="a"
            variant="contained"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            style: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
     
      </Hidden>
        
      <Hidden smDown>
        <Drawer
          anchor="left"
          variant="persistent"
          open
          PaperProps={{
            style: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
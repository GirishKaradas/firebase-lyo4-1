import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from '../components/Logo';
import { db } from '../firebase';
import { firebaseLooper } from '../utils/tools';
import AllOutIcon from '@material-ui/icons/AllOut';


const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
 const [open, setOpen] = useState(false)
 const [anchorE1, setAnchorE1] = useState(null)
  const [notifications, setNotifications] = useState([])
  useEffect(() => {
    db.collection('notifications').orderBy('index', 'desc').onSnapshot(doc => {
      const data = firebaseLooper(doc)
      setNotifications(data)
    })
  }, [])

  function handleOpen(e){
    setOpen(true)
    setAnchorE1(e.currentTarget)
  }
  function handleClose(){
    setOpen(false)
    setAnchorE1(null)
  }
  return (
    <>
    <AppBar
    style={{backgroundColor: "black"}}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/" style={{textDecoration: "none", color: "white", display: "flex"}}>
       <Logo/>
       <Typography style={{margin: "10px",}} variant="button"><b>ARIZON Systems</b></Typography>
        </RouterLink>
        <Box style={{ flexGrow: 1 }} />
        <Hidden smDown>
          <IconButton  aria-controls='simple-menu' aria-haspopup="true" onClick={handleOpen} color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          
          </IconButton>
           
          <IconButton href='/machine-data' color="inherit">
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton  aria-controls='simple-menu' aria-haspopup="true" onClick={handleOpen} color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          
          </IconButton>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
          
        </Hidden>
      </Toolbar>
    </AppBar>
       <Menu
       anchorEl={anchorE1}
        id="simple-menu"
        keepMounted
        open={Boolean(anchorE1)}
        onClose={handleClose}
      >{
        notifications.slice(0, 4).map(data => (
          <div style={{display: 'flex', justifyContent: 'space-between'}} key={data.id}>
          <MenuItem onClick={handleClose}>{data.notification} </MenuItem>
          <Button color="primary" href={`/${data.link}`}>Open <AllOutIcon/></Button>
          </div>
        ))
      }
        
      </Menu>
    </>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar
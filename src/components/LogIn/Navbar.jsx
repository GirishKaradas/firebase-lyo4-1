import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import BuildIcon from '@material-ui/icons/Build';
import HomeIcon from '@material-ui/icons/Home'
import Logo from '../Logo';

const Navbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);

  return (
    <AppBar
    style={{backgroundColor: "black"}}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/login" style={{textDecoration: "none", color: "white", display: "flex"}}>
         <Logo/>
       <Typography style={{margin: "10px"}} variant="button">ARIZON Systems</Typography>
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default Navbar;
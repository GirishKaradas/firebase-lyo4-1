import { useEffect, useState } from 'react';
import { Link as RouterLink, NavLink, useLocation } from 'react-router-dom';
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
  BarChart as BarChartIcon,
   Activity as ActivityIcon,
  Home as HomeIcon
} from 'react-feather';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ReportIcon from '@material-ui/icons/Report';
import AssessmentIcon from '@material-ui/icons/Assessment';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import NavItem from './NavItem';
import { useAuth } from '../context/AuthContext';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';
import PhoneCallbackIcon from '@material-ui/icons/PhoneCallback';
import AmpStoriesIcon from '@material-ui/icons/AmpStories';

const items = [
  
  {
        title: 'Manuals',
        href: '/machine-data/Manuals',
        icon: AssessmentIcon

    },
    {
        title: 'Recipes',
        href: '/machine-data/Reports',
        icon: ReceiptIcon
    },
    {
        title: 'Job',
        href: '/machine-data/Job',
        icon: WorkOutlineIcon

    },
     {
        title: 'Batch',
        href: '/machine-data/Batch',
        icon: BarChartIcon

    },
        {
        title: 'DQ-New',
        href: '/machine-data',
        icon: AmpStoriesIcon

    },
    {
        title: 'DQ-New-Reports',
        href: '/machine-data',
        icon: AmpStoriesIcon

    },
    {
        title: 'Call-Logs',
        href: '/machine-data',
        icon: PhoneCallbackIcon

    },
    
     {
        title: 'IQ',
        href: '/machine-data',
        icon: AccountTreeIcon

    },
  

    
];

const DashboardSidebar = ({ onMobileClose,match, openMobile }) => {
  const location = useLocation();
   const [navbar, setNavbar] = useState([])
  const {currentUser} = useAuth()
  const [userData, setUserData] = useState([])

  useEffect(() => {
     db.collection('company').doc('navbar').onSnapshot(snapshot => {
      const data = snapshot.data()
      setNavbar(data)
    })
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    db.collection('users').where('email', '==', `${currentUser.email}`).onSnapshot(doc => {
      const data = firebaseLooper(doc)
      setUserData(data[0])
    })
  }, [location.hrefname]);

  const content = (
    <Box
      style={{
        
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <a style={{textDecoration: 'none', color:'white', backgroundColor: 'black'}} className="flex items-center w-full px-3 mt-3" href="#">
			
                 <img
    alt="Logo"
    width="50px"
    src={navbar.url}
   
  />
			<span className="ml-2 text-sm font-bold uppercase ">{navbar.name}</span>

		</a>
      <Divider />
      <Box m={2} >
        <List>        
        <Button component={NavLink} style={{textDecoration: 'none', color:'orange'}} className="flex items-center w-full h-12 px-3 mt-2 text-gray-200 bg-black rounded" to="/">
                    <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
 				</svg>
					
					<span className="ml-2 text-sm font-medium">DASHBOARD</span>
 			</Button>
              {items.map((item) => (
              <div key={item.title} className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
            <NavItem
              href={`${item.href}/${match.params.id}/${item.title}`}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
            </div>
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
          Back To Machines?
        </Typography>
        <Box
        pt= {2}
          style={{
            display: 'flex',
            justifyContent: 'center',
            
          }}
        >
          <Button
          component={NavLink}
          to='/machine-data'
          style={{backgroundImage: 'linear-gradient(to left bottom, #fa630f, #fc8218, #fd9d29, #feb63f, #ffce59)', color: "white", width: "150px"}}
          
            variant="contained"
          >
            Machine
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
              width: 256,
              backgroundColor: '#43425D'
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
             backgroundColor: '#43425D'
             
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
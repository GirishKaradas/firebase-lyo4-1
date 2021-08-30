import {
  NavLink as RouterLink,
  matchPath,
  useLocation
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, ListItem } from '@material-ui/core';

const NavItem = ({
  href,
  icon: Icon,
  title,
  ...rest
}) => {
  const location = useLocation();

  const active = href ? !!matchPath({
    path: href,
    end: false
  }, location.pathname) : false;

  return (
    <>
    {location.pathname == href?
    
       <ListItem
      disableGutters
      style={{
        display: 'flex',
        color: 'white',
          fontWeight: 'medium',
          justifyContent: 'flex-start',
          background: 'orange',
          borderRadius: "0.25rem"
       
      }}
      {...rest}
    >
      
      <Button
      
        component={RouterLink}
        style={{
          color: 'white',
          fontWeight: 'medium',
          justifyContent: 'flex-start',
          background: 'orange',
          letterSpacing: 0,
          py: 1.25,
          textTransform: 'none',
          width: '100%',
          
        }}
        to={href}
      >
        {Icon && (
          <Icon size="20" />
        )}
        <span>
          
            <b className='ml-2'>{title}</b> 
         
        </span>
      </Button>
      </ListItem> 
    
   : 
      <ListItem
      disableGutters
      style={{
        display: 'flex',
        py: 0
      }}
      {...rest}
      >
        <Button
      
        component={RouterLink}
        style={{
          color: 'white',
          fontWeight: 'medium',
          justifyContent: 'flex-start',
          letterSpacing: 0,
          py: 1.25,
          textTransform: 'none',
          width: '100%',
          ...(active && {
            color: 'blue'
          }),
        }}
        to={href}
      >
        {Icon && (
          <Icon size="20" />
        )}
        <span>
          
            <b className='ml-2'>{title}</b> 
         
        </span>
      </Button>
      </ListItem>
      
      }
           
    
    </>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string
};

export default NavItem;
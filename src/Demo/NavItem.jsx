import {
  NavLink as RouterLink,
  matchPath,
  useLocation
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, ListItem } from '@material-ui/core';
import { useAuth } from '../components/context/AuthContext';

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
      <ListItem
      className='navbar navbar-default navbar-static-top'
      disableGutters
      
      {...rest}
    >
      <Button
        activeClassName="active"
        component={RouterLink}
        style={{
          color: 'white',
          fontWeight: 'medium',
          justifyContent: 'flex-start',
         
        }}
        to={href}
      >
        {Icon && (
          <Icon size="20" />
        )}
        <span className="ml-2 text-sm font-medium">{title}</span>
      </Button>
    </ListItem>
    </>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string
};

export default NavItem;
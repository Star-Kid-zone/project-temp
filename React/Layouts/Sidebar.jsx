import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Person, Restaurant, Add,
   BusinessCenter, 
  Settings, Login, HowToReg, LockReset, Dialpad, Error,
  ExpandLess, ExpandMore, MenuBook 
} from '@mui/icons-material';
import { 
  Box, Collapse, Divider, List, ListItemButton, 
  ListItemIcon, ListItemText, Typography, styled 
} from '@mui/material';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const [adminOpen, setAdminOpen] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);

  const StyledListItem = styled(ListItemButton)(({ theme, active }) => ({
    borderRadius: 8,
    marginBottom: 4,
    backgroundColor: active ? '#e8f5e9' : 'transparent',
    color: active ? '#2e7d32' : theme.palette.text.primary,
    '&:hover': { backgroundColor: active ? '#e8f5e9' : '#f5f5f5' },
    '& .MuiListItemIcon-root': { color: active ? '#2e7d32' : theme.palette.text.secondary },
  }));

  return (
    <Box sx={{
      width: 240,
      height: '100vh',
      bgcolor: 'background.paper',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 100,
      boxShadow: 3,
      transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.3s ease-in-out',
      overflowY: 'auto',
    }}>
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <img src="./public/assets/freshcart-logo.svg" alt="Logo" style={{ width: '160px' }} />
      </Box>

      <List component="nav">
        <StyledListItem component={Link} to="/" active={location.pathname === '/'}>
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Home" />
        </StyledListItem>
        
        <Divider sx={{ my: 1 }} />

        <ListItemButton onClick={() => setAdminOpen(!adminOpen)}>
          <ListItemText primary={<Typography variant="subtitle2" color="textSecondary">ADMIN MANAGEMENT</Typography>} />
          {adminOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        
        <Collapse in={adminOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {[
              { path: '/admin/home', icon: <Person />, text: 'Admin Home' },
              { path: '/admin/listmenu', icon: <Restaurant />, text: 'Menu List' },
              { path: '/admin/addmenu', icon: <Add />, text: 'Add Menu' },
              { path: '/admin/listreview', icon: <List />, text: 'Reviews List' },
              { path: '/admin/addreview', icon: <Add />, text: 'Add Review' },
              { path: '/admin/businesslist', icon: <BusinessCenter />, text: 'Business List' },
              { path: '/admin/addbusiness', icon: <Add />, text: 'Add Business' },
              { path: '/admin/listsettings', icon: <Settings />, text: 'Settings List' },
              { path: '/admin/addsetting', icon: <Add />, text: 'Add Setting' },
            ].map((item) => (
              <StyledListItem 
                key={item.path}
                component={Link}
                to={item.path}
                active={location.pathname === item.path}
                sx={{ pl: 3 }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </StyledListItem>
            ))}
          </List>
        </Collapse>
        
        <Divider sx={{ my: 1 }} />

        <ListItemButton onClick={() => setAuthOpen(!authOpen)}>
          <ListItemText primary={<Typography variant="subtitle2" color="textSecondary">AUTHENTICATION</Typography>} />
          {authOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        
        <Collapse in={authOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {[
              { path: '/login', icon: <Login />, text: 'Login' },
              { path: '/register', icon: <HowToReg />, text: 'Register' },
              { path: '/forgotpassword', icon: <LockReset />, text: 'Forgot Password' },
              { path: '/otp', icon: <Dialpad />, text: 'OTP' },
              { path: '/resetpassword', icon: <LockReset />, text: 'Reset Password' },
              { path: '/error404', icon: <Error />, text: 'Error 404' },
              { path: '/admin/menulevel', icon: <MenuBook />, text: 'Menu Level' },
            ].map((item) => (
              <StyledListItem 
                key={item.path}
                component={Link}
                to={item.path}
                active={location.pathname === item.path}
                sx={{ pl: 3 }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </StyledListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </Box>
  );
};

export default Sidebar;
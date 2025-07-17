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
              { path: '/admin/addqrcode', icon: <Person />, text: 'Add Qr Code' },
              { path: '/admin/listmenu', icon: <Restaurant />, text: 'Menu List' },
              { path: '/admin/addmenu', icon: <Add />, text: 'Add Menu' },
              { path: '/admin/listreview', icon: <List />, text: 'Reviews List' },
              { path: '/admin/addreview', icon: <Add />, text: 'Add Review' },
              { path: '/admin/Listpayment', icon: <List />, text: 'Payment List' },
              { path: '/admin/Addpayment', icon: <Add />, text: 'Add Payment' },
              { path: '/admin/listbuisness', icon: <BusinessCenter />, text: 'Business List' },
              { path: '/admin/addbusiness', icon: <Add />, text: 'Add Business' },
              { path: '/admin/listsetting', icon: <Settings />, text: 'Settings List' },
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


      </List>
    </Box>
  );
};

export default Sidebar;
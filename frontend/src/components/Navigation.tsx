import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Box, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, Home as HomeIcon, Person as PersonIcon, Work as WorkIcon, AdminPanelSettings as AdminIcon } from '@mui/icons-material';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Login', icon: <PersonIcon />, path: '/login' },
    { text: 'Register', icon: <PersonIcon />, path: '/register' },
    { text: 'Service Request', icon: <WorkIcon />, path: '/service-request' },
    { text: 'Customer Dashboard', icon: <PersonIcon />, path: '/customer-dashboard' },
    { text: 'Provider Dashboard', icon: <WorkIcon />, path: '/provider-dashboard' },
    { text: 'Admin Dashboard', icon: <AdminIcon />, path: '/admin-dashboard' },
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem
          button
          key={item.text}
          onClick={() => {
            navigate(item.path);
            setDrawerOpen(false);
          }}
          selected={location.pathname === item.path}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home Services
          </Typography>
          {!isMobile && (
            <Box>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  onClick={() => navigate(item.path)}
                  sx={{
                    mx: 1,
                    backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Navigation; 
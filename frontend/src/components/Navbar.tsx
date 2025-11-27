import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useMediaQuery,
  Fade,
  Box,
  Container,
  Divider,
  Tooltip,
  Badge,
  Collapse,
  ListItemButton,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HandymanIcon from '@mui/icons-material/Handyman';
import HelpIcon from '@mui/icons-material/Help';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/Button';
import { Avatar } from './ui/Avatar';
import { Menu as LucideMenu, Bell as LucideBell, LogOut as LucideLogOut, User as LucideUser, Settings as LucideSettings, Heart as LucideHeart, Receipt as LucideReceipt, LayoutDashboard } from 'lucide-react';

// Define CSS variables for professional colors
const cssVariables = {
  primaryColor: '#2c3e50',
  secondaryColor: '#34495e',
  accentColor: '#3498db',
  accentHoverColor: '#2980b9',
  textColor: '#ecf0f1',
  borderColor: 'rgba(236, 240, 241, 0.1)',
  navBackground: 'rgba(44, 62, 80, 0.95)',
};

// Styled components with professional optimizations
const ProfessionalAppBar = styled(AppBar)(({ theme }) => ({
  background: cssVariables.navBackground,
  backdropFilter: 'blur(5px)',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
  borderBottom: `1px solid ${cssVariables.borderColor}`,
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 600,
  color: cssVariables.textColor,
  fontSize: '1.4rem',
  letterSpacing: '0.5px',
}));

const StyledNavLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
}));

const NavItem = styled(Button)(({ theme }) => ({
  color: cssVariables.textColor,
  margin: '0 4px',
  padding: '6px 16px',
  borderRadius: '4px',
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.9rem',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
}));

const AccentButton = styled(Button)(({ theme }) => ({
  background: cssVariables.accentColor,
  color: 'white',
  padding: '6px 16px',
  textTransform: 'none',
  borderRadius: '4px',
  fontWeight: 500,
  '&:hover': {
    background: cssVariables.accentHoverColor,
  },
}));

const ProfileButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '4px 8px 4px 4px',
  borderRadius: '100px',
  cursor: 'pointer',
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  border: `1px solid ${cssVariables.borderColor}`,
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
}));

interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  authRequired?: boolean;
  roleRequired?: string;
  tooltip?: string;
  children?: NavItem[];
}

// Function to throttle scroll events
const useThrottle = (callback: Function, delay: number) => {
  const lastRun = useRef(Date.now());
  
  return useCallback((...args: any[]) => {
    const now = Date.now();
    if (now - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = now;
    }
  }, [callback, delay]);
};

const Navbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, userRole, logout } = useAuth();
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState<null | HTMLElement>(null);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState<null | HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const prevScrollPos = useRef(0);
  const [visible, setVisible] = useState(true);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset;
    
    // Determine if we should show/hide the navbar
    setVisible(prevScrollPos.current > currentScrollPos || currentScrollPos < 50);
    prevScrollPos.current = currentScrollPos;
    
    // Add background when scrolled
    setScrolled(currentScrollPos > 50);
  }, []);
  
  const throttledScrollHandler = useThrottle(handleScroll, 100);

  // Listen for scroll events with throttling
  useEffect(() => {
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', throttledScrollHandler);
  }, [throttledScrollHandler]);

  // Memoize nav items to prevent recreating on each render
  const navItems: NavItem[] = useMemo(() => [
    { 
      title: 'Home', 
      path: '/', 
      icon: <HomeIcon />,
      tooltip: 'Back to homepage' 
    },
    { 
      title: 'Services', 
      path: '/services', 
      icon: <CleaningServicesIcon />,
      tooltip: 'Browse all available services',
      children: [
        { title: 'Cleaning', path: '/services?category=cleaning', icon: <CleaningServicesIcon /> },
        { title: 'Handyman', path: '/services?category=handyman', icon: <HandymanIcon /> },
        { title: 'All Services', path: '/services', icon: <CleaningServicesIcon /> }
      ]
    },
    { 
      title: 'Book Now', 
      path: '/booking', 
      icon: <BookOnlineIcon />, 
      authRequired: true,
      tooltip: 'Schedule a service appointment' 
    },
    { 
      title: 'About', 
      path: '/about', 
      icon: <InfoIcon />,
      tooltip: 'Learn about our company'
    },
    { 
      title: 'FAQ', 
      path: '/faq', 
      icon: <HelpIcon />,
      tooltip: 'Find answers to common questions'
    },
    { 
      title: 'Contact', 
      path: '/contact', 
      icon: <ContactSupportIcon />,
      tooltip: 'Get in touch with us'
    },
  ], []);

  // Handlers with useCallback to prevent recreation on each render
  const handleDrawerToggle = useCallback(() => {
    setDrawerOpen(prev => !prev);
  }, []);

  const handleProfileMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuOpen(event.currentTarget);
  }, []);

  const handleProfileMenuClose = useCallback(() => {
    setProfileMenuOpen(null);
  }, []);

  const handleNotificationMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setNotificationMenuOpen(event.currentTarget);
  }, []);

  const handleNotificationMenuClose = useCallback(() => {
    setNotificationMenuOpen(null);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    handleProfileMenuClose();
    navigate('/');
  }, [logout, navigate, handleProfileMenuClose]);

  const handleSubMenuToggle = useCallback((title: string) => {
    setOpenSubMenu(prev => prev === title ? null : title);
  }, []);

  const handleNavigate = useCallback((path: string) => {
    navigate(path);
    handleProfileMenuClose();
  }, [navigate, handleProfileMenuClose]);

  // Memoize the drawer to prevent recreation on each render
  const drawer = useMemo(() => (
    <Box sx={{ width: 250, height: '100%', background: 'rgba(18, 18, 18, 0.95)' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
        <Box 
          component="img" 
          src="/images/logo.png" 
          alt="Home Services Logo"
          sx={{ 
            height: 40, 
            width: 40, 
            marginRight: 1,
            filter: 'drop-shadow(0 0 8px rgba(255, 81, 43, 0.5))',
          }} 
        />
        <LogoText variant="h6">HomeServices</LogoText>
      </Box>
      <Divider sx={{ background: 'rgba(255, 255, 255, 0.1)' }} />
      <List>
        {navItems.map((item) => (
          (!item.authRequired || isAuthenticated) && (!item.roleRequired || userRole === item.roleRequired) && (
            <React.Fragment key={item.title}>
              {item.children ? (
                <>
                  <ListItemButton
                    onClick={() => handleSubMenuToggle(item.title)}
                    sx={{
                      my: 0.5,
                      mx: 1,
                      borderRadius: '8px',
                      background: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.05)',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'white' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.title}
                      primaryTypographyProps={{
                        sx: {
                          color: 'white',
                          fontWeight: location.pathname === item.path ? 600 : 400,
                        }
                      }} 
                    />
                    {openSubMenu === item.title ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openSubMenu === item.title} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.children.map((child) => (
                        <ListItem
                          button
                          key={child.title}
                          component={Link}
                          to={child.path}
                          onClick={handleDrawerToggle}
                          sx={{
                            pl: 4,
                            my: 0.5,
                            mx: 1,
                            borderRadius: '8px',
                            background: location.pathname === child.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                            '&:hover': {
                              background: 'rgba(255, 255, 255, 0.05)',
                            },
                          }}
                        >
                          <ListItemIcon sx={{ color: location.pathname === child.path ? 'primary.main' : 'white' }}>
                            {child.icon}
                          </ListItemIcon>
                          <ListItemText 
                            primary={child.title}
                            primaryTypographyProps={{
                              sx: {
                                color: 'white',
                                fontWeight: location.pathname === child.path ? 600 : 400,
                              }
                            }} 
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <ListItem
                  button
                  component={Link}
                  to={item.path}
                  onClick={handleDrawerToggle}
                  sx={{
                    my: 0.5,
                    mx: 1,
                    borderRadius: '8px',
                    background: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.05)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'white' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.title}
                    primaryTypographyProps={{
                      sx: {
                        color: 'white',
                        fontWeight: location.pathname === item.path ? 600 : 400,
                      }
                    }} 
                  />
                </ListItem>
              )}
            </React.Fragment>
          )
        ))}
        
        {!isAuthenticated && (
          <>
            <ListItem
              button
              component={Link}
              to="/login"
              onClick={handleDrawerToggle}
              sx={{
                my: 0.5,
                mx: 1,
                borderRadius: '8px',
                background: location.pathname === '/login' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === '/login' ? 'primary.main' : 'white' }}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Login" 
                primaryTypographyProps={{
                  sx: {
                    color: 'white',
                    fontWeight: location.pathname === '/login' ? 600 : 400,
                  }
                }}
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/register"
              onClick={handleDrawerToggle}
              sx={{
                my: 0.5,
                mx: 1,
                borderRadius: '8px',
                background: location.pathname === '/register' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === '/register' ? 'primary.main' : 'white' }}>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Sign Up" 
                primaryTypographyProps={{
                  sx: {
                    color: 'white',
                    fontWeight: location.pathname === '/register' ? 600 : 400,
                  }
                }}
              />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  ), [navItems, isAuthenticated, userRole, location.pathname, openSubMenu, handleDrawerToggle, handleSubMenuToggle]);
  
  // Simple navbar animation properties
  const navbarAnimations = {
    initial: { y: -50, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100
      }}
      className="navbar-container"
    >
      <motion.div
        initial={navbarAnimations.initial}
        animate={navbarAnimations.animate}
      >
        <ProfessionalAppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ height: '64px' }}>
              {/* Logo */}
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
                <StyledNavLink to="/">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box 
                      component="img" 
                      src="/images/logo.png" 
                      alt="Home Services Logo"
                      sx={{ height: 32, width: 32, mr: 1.5 }} 
                    />
                    <LogoText variant="h6">HomeServices</LogoText>
                  </Box>
                </StyledNavLink>
              </Box>

              {/* Navigation links - desktop */}
              {!isMobile && (
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                  {navItems.map((item) => (
                    (!item.authRequired || isAuthenticated) && (!item.roleRequired || userRole === item.roleRequired) && (
                      <Tooltip key={item.title} title={item.tooltip || ''} arrow>
                        <StyledNavLink to={item.path}>
                          <NavItem
                            sx={{
                              borderBottom: location.pathname === item.path ? 
                                `2px solid ${cssVariables.accentColor}` : '2px solid transparent',
                              backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                            }}
                          >
                            {item.title}
                          </NavItem>
                        </StyledNavLink>
                      </Tooltip>
                    )
                  ))}
                </Box>
              )}

              {/* Auth & Actions - desktop */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {isAuthenticated ? (
                  <>
                    {!isMobile && (
                      <>
                        {/* Notification icon */}
                        <Tooltip title="Notifications" arrow>
                          <IconButton
                            size="small"
                            onClick={handleNotificationMenuOpen}
                            sx={{ 
                              color: cssVariables.textColor,
                              mr: 1.5,
                              backgroundColor: 'rgba(255, 255, 255, 0.08)',
                              '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                              }
                            }}
                          >
                            <Badge 
                              badgeContent={3} 
                              color="error"
                              sx={{ 
                                '& .MuiBadge-badge': { 
                                  backgroundColor: cssVariables.accentColor,
                                  color: 'white' 
                                } 
                              }}
                            >
                              <LucideBell size={18} />
                            </Badge>
                          </IconButton>
                        </Tooltip>

                        {/* Admin dashboard button */}
                        {userRole === 'admin' && (
                          <StyledNavLink to="/admin" style={{ marginRight: '12px' }}>
                            <Tooltip title="Admin Dashboard" arrow>
                              <Button
                                variant="default"
                                sx={{
                                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                  color: cssVariables.textColor,
                                  textTransform: 'none',
                                  '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                  }
                                }}
                                startIcon={<LayoutDashboard size={16} />}
                              >
                                Dashboard
                              </Button>
                            </Tooltip>
                          </StyledNavLink>
                        )}
                      </>
                    )}

                    {/* User profile menu */}
                    <Tooltip title="Account" arrow>
                      <ProfileButton
                        onClick={handleProfileMenuOpen}
                        aria-controls="profile-menu"
                        aria-haspopup="true"
                      >
                        <Avatar 
                          size="sm"
                          alt={user?.firstName || 'User'}
                          fallback={user?.firstName?.charAt(0) || 'U'}
                        />
                        {!isMobile && (
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: cssVariables.textColor,
                              marginRight: '8px'
                            }}
                          >
                            {user?.firstName || 'User'}
                          </Typography>
                        )}
                      </ProfileButton>
                    </Tooltip>

                    <Menu
                      id="profile-menu"
                      anchorEl={profileMenuOpen}
                      open={Boolean(profileMenuOpen)}
                      onClose={handleProfileMenuClose}
                      TransitionComponent={Fade}
                      MenuListProps={{ 'aria-labelledby': 'profile-button' }}
                      sx={{ mt: 1 }}
                    >
                      <MenuItem onClick={() => handleNavigate('/profile')}>
                        <ListItemIcon>
                          <LucideUser size={18} />
                        </ListItemIcon>
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleLogout} data-testid="logout-menu-item">
                        <ListItemIcon>
                          <LucideLogOut size={18} />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    {!isMobile && (
                      <>
                        <StyledNavLink to="/login" style={{ marginRight: '12px' }}>
                          <Button
                            variant="ghost"
                            sx={{ 
                              color: cssVariables.textColor,
                              textTransform: 'none'
                            }}
                          >
                            Sign In
                          </Button>
                        </StyledNavLink>
                        <StyledNavLink to="/register">
                          <AccentButton>
                            Register
                          </AccentButton>
                        </StyledNavLink>
                      </>
                    )}
                  </>
                )}

                {/* Mobile menu toggle */}
                {isMobile && (
                  <IconButton
                    onClick={handleDrawerToggle}
                    sx={{
                      color: cssVariables.textColor,
                      ml: 1,
                    }}
                  >
                    <LucideMenu size={24} />
                  </IconButton>
                )}
              </Box>
            </Toolbar>
          </Container>
        </ProfessionalAppBar>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: 260,
              background: cssVariables.navBackground,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            }
          }}
        >
          {/* Update drawer content to match professional style */}
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box 
                component="img" 
                src="/images/logo.png" 
                alt="Home Services Logo"
                sx={{ height: 24, width: 24, mr: 1.5 }} 
              />
              <LogoText variant="subtitle1">HomeServices</LogoText>
            </Box>
            <Divider sx={{ background: cssVariables.borderColor, mb: 2 }} />
            <List>
              {navItems.map((item) => (
                (!item.authRequired || isAuthenticated) && (!item.roleRequired || userRole === item.roleRequired) && (
                  <React.Fragment key={item.title}>
                    {item.children ? (
                      <>
                        <ListItemButton
                          onClick={() => handleSubMenuToggle(item.title)}
                          sx={{
                            borderRadius: '4px',
                            mb: 0.5,
                            backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                          }}
                        >
                          <ListItemIcon sx={{ color: cssVariables.textColor, minWidth: '40px' }}>
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText 
                            primary={item.title}
                            primaryTypographyProps={{
                              sx: {
                                color: cssVariables.textColor,
                              }
                            }} 
                          />
                          {openSubMenu === item.title ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openSubMenu === item.title} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            {item.children.map((child) => (
                              <ListItem
                                button
                                key={child.title}
                                component={Link}
                                to={child.path}
                                onClick={handleDrawerToggle}
                                sx={{
                                  pl: 4,
                                  py: 0.5,
                                  borderRadius: '4px',
                                  backgroundColor: location.pathname === child.path ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                                }}
                              >
                                <ListItemIcon sx={{ color: cssVariables.textColor, minWidth: '40px' }}>
                                  {child.icon}
                                </ListItemIcon>
                                <ListItemText 
                                  primary={child.title}
                                  primaryTypographyProps={{
                                    sx: {
                                      color: cssVariables.textColor,
                                    }
                                  }} 
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Collapse>
                      </>
                    ) : (
                      <ListItem
                        button
                        component={Link}
                        to={item.path}
                        onClick={handleDrawerToggle}
                        sx={{
                          borderRadius: '4px',
                          mb: 0.5,
                          backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                        }}
                      >
                        <ListItemIcon sx={{ color: cssVariables.textColor, minWidth: '40px' }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText 
                          primary={item.title}
                          primaryTypographyProps={{
                            sx: {
                              color: cssVariables.textColor,
                            }
                          }} 
                        />
                      </ListItem>
                    )}
                  </React.Fragment>
                )
              ))}
              
              {!isAuthenticated && (
                <>
                  <ListItem
                    button
                    component={Link}
                    to="/login"
                    onClick={handleDrawerToggle}
                    sx={{
                      borderRadius: '4px',
                      mb: 0.5,
                    }}
                  >
                    <ListItemIcon sx={{ color: cssVariables.textColor, minWidth: '40px' }}>
                      <LucideUser size={20} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Sign In"
                      primaryTypographyProps={{
                        sx: {
                          color: cssVariables.textColor,
                        }
                      }} 
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={Link}
                    to="/register"
                    onClick={handleDrawerToggle}
                    sx={{
                      borderRadius: '4px',
                      mb: 0.5,
                      backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    }}
                  >
                    <ListItemIcon sx={{ color: cssVariables.textColor, minWidth: '40px' }}>
                      <LucideUser size={20} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Register"
                      primaryTypographyProps={{
                        sx: {
                          color: cssVariables.textColor,
                        }
                      }} 
                    />
                  </ListItem>
                </>
              )}

              {isAuthenticated && (
                <ListItem button onClick={handleLogout} sx={{ borderRadius: '4px', mb: 0.5 }}>
                  <ListItemIcon sx={{ color: cssVariables.textColor, minWidth: '40px' }}>
                    <LucideLogOut size={20} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Logout"
                    primaryTypographyProps={{ sx: { color: cssVariables.textColor } }}
                  />
                </ListItem>
              )}
            </List>
          </Box>
        </Drawer>
      </motion.div>
    </Box>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(Navbar); 
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Avatar,
  Button,
  Tab,
  Tabs,
  Card,
  CardContent,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAuth } from '../contexts/AuthContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

interface EditableUserData {
  firstName: string;
  lastName: string;
  email: string;
}

interface BookingHistory {
  id: number;
  service: string;
  date: string;
  status: string;
  price: string;
}

const bookingHistory: BookingHistory[] = [
  {
    id: 1,
    service: 'House Cleaning',
    date: '2024-04-10T10:00:00',
    status: 'Completed',
    price: '$120',
  },
  {
    id: 2,
    service: 'Plumbing Repair',
    date: '2024-04-15T14:30:00',
    status: 'Scheduled',
    price: '₹180',
  },
  {
    id: 3,
    service: 'Electrical Services',
    date: '2024-04-05T09:00:00',
    status: 'Completed',
    price: '150',
  },
];

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editableData, setEditableData] = useState<EditableUserData>({ 
    firstName: '',
    lastName: '', 
    email: ''
  });

  React.useEffect(() => {
    if (user) {
      setEditableData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);
      // Make API call to update profile
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editableData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      // Reload the page to show updated data
      window.location.reload();
      handleCloseDialog();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h5" align="center">
          Please log in to view your profile
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Paper sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: 'primary.main',
                fontSize: '3rem',
              }}
            >
              {user.firstName ? user.firstName.charAt(0) : 'U'}
            </Avatar>
            <Box>
              <Typography variant="h4" gutterBottom>
                {user.firstName} {user.lastName}
              </Typography>
              <Typography color="text.secondary">
                {user.email}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Tabs Section */}
        <Grid item xs={12}>
          <Paper sx={{ width: '100%' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="profile tabs"
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab icon={<PersonIcon />} label="Personal Info" />
              <Tab icon={<HistoryIcon />} label="Booking History" />
              <Tab icon={<SettingsIcon />} label="Settings" />
            </Tabs>

            {/* Personal Info Tab */}
            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Contact Information
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography>{user.email}</Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Name
                    </Typography>
                    <Typography>{user.firstName} {user.lastName}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Role
                    </Typography>
                    <Typography>{user.role}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Account Actions
                  </Typography>
                  <Button 
                    variant="outlined" 
                    sx={{ mr: 2, mb: 2 }}
                    onClick={handleEditClick}
                  >
                    Edit Profile
                  </Button>
                  <Button variant="outlined" color="error">
                    Change Password
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>

            {/* Booking History Tab */}
            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" gutterBottom>
                Recent Bookings
              </Typography>
              <Grid container spacing={3}>
                {bookingHistory.map((booking) => (
                  <Grid item xs={12} key={booking.id}>
                    <Card>
                      <CardContent>
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item xs={12} sm={4}>
                            <Typography variant="h6">{booking.service}</Typography>
                            <Typography color="text.secondary">
                              {new Date(booking.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <Typography variant="h6">{booking.price}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <Chip
                              label={booking.status}
                              color={booking.status === 'Completed' ? 'success' : 'primary'}
                            />
                          </Grid>
                          <Grid item xs={12} sm={2}>
                            <Button variant="outlined" size="small">
                              Details
                            </Button>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            {/* Settings Tab */}
            <TabPanel value={tabValue} index={2}>
              <Typography variant="h6" gutterBottom>
                Account Settings
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Notifications
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Button variant="outlined" sx={{ mr: 2, mb: 2 }}>
                    Manage Notifications
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Privacy
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Button variant="outlined" sx={{ mr: 2, mb: 2 }}>
                    Privacy Settings
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Account Management
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Button variant="outlined" color="error">
                    Delete Account
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="First Name"
              value={editableData.firstName}
              onChange={(e) => setEditableData({ ...editableData, firstName: e.target.value })}
              fullWidth
            />
            <TextField
              label="Last Name"
              value={editableData.lastName}
              onChange={(e) => setEditableData({ ...editableData, lastName: e.target.value })}
              fullWidth
            />
            <TextField
              label="Email"
              value={editableData.email}
              onChange={(e) => setEditableData({ ...editableData, email: e.target.value })}
              fullWidth
              disabled
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSaveProfile} 
            variant="contained" 
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit Profile Dialog */}
      <Dialog open={isEditDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="First Name"
              value={editableData.firstName}
              onChange={(e) => setEditableData({ ...editableData, firstName: e.target.value })}
              fullWidth
            />
            <TextField
              label="Last Name"
              value={editableData.lastName}
              onChange={(e) => setEditableData({ ...editableData, lastName: e.target.value })}
              fullWidth
            />
            <TextField
              label="Email"
              value={editableData.email}
              onChange={(e) => setEditableData({ ...editableData, email: e.target.value })}
              fullWidth
              disabled
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSaveProfile} 
            variant="contained" 
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile; 
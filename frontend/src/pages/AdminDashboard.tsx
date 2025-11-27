import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Grid, Button, Tabs, Tab, Card, CardContent, CardActions, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    type: 'Service Provider',
    status: 'Active',
    services: ['Cleaning', 'Plumbing'],
  },
  {
    id: 2,
    name: 'Alice Smith',
    email: 'alice@example.com',
    type: 'Customer',
    status: 'Active',
    services: [],
  },
];

const mockServices = [
  {
    id: 1,
    type: 'Cleaning',
    provider: 'John Doe',
    customer: 'Alice Smith',
    date: '2024-03-20',
    status: 'In Progress',
  },
  {
    id: 2,
    type: 'Plumbing',
    provider: 'Mike Johnson',
    customer: 'Bob Wilson',
    date: '2024-03-21',
    status: 'Scheduled',
  },
];

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'in progress':
        return 'primary';
      case 'scheduled':
        return 'info';
      case 'inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" gutterBottom>
              Admin Dashboard
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ width: '100%' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Users" />
                <Tab label="Services" />
                <Tab label="Analytics" />
              </Tabs>
              <TabPanel value={tabValue} index={0}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Services</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mockUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.type}</TableCell>
                          <TableCell>
                            <Chip
                              label={user.status}
                              color={getStatusColor(user.status) as any}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            {user.services.join(', ')}
                          </TableCell>
                          <TableCell>
                            <IconButton size="small" color="primary">
                              <EditIcon />
                            </IconButton>
                            <IconButton size="small" color="error">
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Service Type</TableCell>
                        <TableCell>Provider</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mockServices.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell>{service.type}</TableCell>
                          <TableCell>{service.provider}</TableCell>
                          <TableCell>{service.customer}</TableCell>
                          <TableCell>{service.date}</TableCell>
                          <TableCell>
                            <Chip
                              label={service.status}
                              color={getStatusColor(service.status) as any}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton size="small" color="primary">
                              <EditIcon />
                            </IconButton>
                            <IconButton size="small" color="error">
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card>
                      <CardContent>
                        <Typography color="text.secondary" gutterBottom>
                          Total Users
                        </Typography>
                        <Typography variant="h4">
                          1,234
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card>
                      <CardContent>
                        <Typography color="text.secondary" gutterBottom>
                          Active Services
                        </Typography>
                        <Typography variant="h4">
                          56
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card>
                      <CardContent>
                        <Typography color="text.secondary" gutterBottom>
                          Service Providers
                        </Typography>
                        <Typography variant="h4">
                          89
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card>
                      <CardContent>
                        <Typography color="text.secondary" gutterBottom>
                          Total Revenue
                        </Typography>
                        <Typography variant="h4">
                          $12,345
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminDashboard; 
import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Grid, Button, Tabs, Tab, Card, CardContent, CardActions, Chip, Switch, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

const mockServiceRequests = [
  {
    id: 1,
    serviceType: 'Cleaning',
    date: '2024-03-20',
    time: '10:00 AM',
    status: 'Pending',
    customer: 'Alice Johnson',
    address: '123 Main St, City',
  },
  {
    id: 2,
    serviceType: 'Plumbing',
    date: '2024-03-21',
    time: '02:00 PM',
    status: 'Accepted',
    customer: 'Bob Smith',
    address: '456 Oak Ave, City',
  },
];

const mockCompletedServices = [
  {
    id: 3,
    serviceType: 'Electrical',
    date: '2024-03-15',
    time: '11:00 AM',
    status: 'Completed',
    customer: 'Carol White',
    address: '789 Pine Rd, City',
    rating: 5,
  },
  {
    id: 4,
    serviceType: 'Painting',
    date: '2024-03-10',
    time: '09:00 AM',
    status: 'Completed',
    customer: 'Dave Brown',
    address: '321 Elm St, City',
    rating: 4,
  },
];

const ServiceProviderDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAvailabilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAvailable(event.target.checked);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'accepted':
        return 'primary';
      case 'pending':
        return 'warning';
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
              Service Provider Dashboard
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={isAvailable}
                  onChange={handleAvailabilityChange}
                  color="primary"
                />
              }
              label={isAvailable ? "Available for Services" : "Not Available"}
            />
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ width: '100%' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Service Requests" />
                <Tab label="Completed Services" />
              </Tabs>
              <TabPanel value={tabValue} index={0}>
                <Grid container spacing={3}>
                  {mockServiceRequests.map((request) => (
                    <Grid item xs={12} sm={6} key={request.id}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" component="div">
                            {request.serviceType}
                          </Typography>
                          <Typography color="text.secondary">
                            Date: {request.date}
                          </Typography>
                          <Typography color="text.secondary">
                            Time: {request.time}
                          </Typography>
                          <Typography color="text.secondary">
                            Customer: {request.customer}
                          </Typography>
                          <Typography color="text.secondary">
                            Address: {request.address}
                          </Typography>
                          <Box sx={{ mt: 2 }}>
                            <Chip
                              label={request.status}
                              color={getStatusColor(request.status) as any}
                            />
                          </Box>
                        </CardContent>
                        <CardActions>
                          {request.status === 'Pending' && (
                            <>
                              <Button size="small" color="primary">
                                Accept
                              </Button>
                              <Button size="small" color="error">
                                Decline
                              </Button>
                            </>
                          )}
                          {request.status === 'Accepted' && (
                            <>
                              <Button size="small">Start Service</Button>
                              <Button size="small">Contact Customer</Button>
                            </>
                          )}
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <Grid container spacing={3}>
                  {mockCompletedServices.map((service) => (
                    <Grid item xs={12} sm={6} key={service.id}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" component="div">
                            {service.serviceType}
                          </Typography>
                          <Typography color="text.secondary">
                            Date: {service.date}
                          </Typography>
                          <Typography color="text.secondary">
                            Time: {service.time}
                          </Typography>
                          <Typography color="text.secondary">
                            Customer: {service.customer}
                          </Typography>
                          <Typography color="text.secondary">
                            Address: {service.address}
                          </Typography>
                          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                            <Chip
                              label={service.status}
                              color={getStatusColor(service.status) as any}
                            />
                            <Chip
                              label={`Rating: ${service.rating}/5`}
                              color="warning"
                            />
                          </Box>
                        </CardContent>
                        <CardActions>
                          <Button size="small">View Details</Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ServiceProviderDashboard; 
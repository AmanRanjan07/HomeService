import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Grid, Button, Tabs, Tab, Card, CardContent, CardActions, Chip } from '@mui/material';
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

const mockActiveRequests = [
  {
    id: 1,
    serviceType: 'Cleaning',
    date: '2024-03-20',
    time: '10:00 AM',
    status: 'In Progress',
    provider: 'John Doe',
  },
  {
    id: 2,
    serviceType: 'Plumbing',
    date: '2024-03-21',
    time: '02:00 PM',
    status: 'Scheduled',
    provider: 'Mike Smith',
  },
];

const mockHistory = [
  {
    id: 3,
    serviceType: 'Electrical',
    date: '2024-03-15',
    time: '11:00 AM',
    status: 'Completed',
    provider: 'Sarah Johnson',
    rating: 5,
  },
  {
    id: 4,
    serviceType: 'Painting',
    date: '2024-03-10',
    time: '09:00 AM',
    status: 'Completed',
    provider: 'David Wilson',
    rating: 4,
  },
];

const CustomerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'in progress':
        return 'primary';
      case 'scheduled':
        return 'info';
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
              Customer Dashboard
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/service-request')}
            >
              Book New Service
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ width: '100%' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Active Requests" />
                <Tab label="History" />
              </Tabs>
              <TabPanel value={tabValue} index={0}>
                <Grid container spacing={3}>
                  {mockActiveRequests.map((request) => (
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
                            Provider: {request.provider}
                          </Typography>
                          <Box sx={{ mt: 2 }}>
                            <Chip
                              label={request.status}
                              color={getStatusColor(request.status) as any}
                            />
                          </Box>
                        </CardContent>
                        <CardActions>
                          <Button size="small">Track Service</Button>
                          <Button size="small">Contact Provider</Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <Grid container spacing={3}>
                  {mockHistory.map((request) => (
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
                            Provider: {request.provider}
                          </Typography>
                          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                            <Chip
                              label={request.status}
                              color={getStatusColor(request.status) as any}
                            />
                            <Chip
                              label={`Rating: ${request.rating}/5`}
                              color="warning"
                            />
                          </Box>
                        </CardContent>
                        <CardActions>
                          <Button size="small">View Details</Button>
                          <Button size="small">Rate Service</Button>
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

export default CustomerDashboard; 
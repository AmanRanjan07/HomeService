import React, { useState, useEffect } from 'react';
import { Alert, Snackbar, Button } from '@mui/material';
import { getIsUsingMockData } from '../services/api';

const ServerStatusChecker: React.FC = () => {
  const [isUsingMockData, setIsUsingMockData] = useState<boolean>(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    // Check if using mock data
    setIsUsingMockData(getIsUsingMockData());
    
    // Set up interval to check periodically
    const interval = setInterval(() => {
      setIsUsingMockData(getIsUsingMockData());
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  if (!isUsingMockData || !open) {
    return null;
  }

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert 
        severity="warning"
        variant="filled"
        sx={{ 
          width: '100%', 
          mb: 3, 
          backgroundColor: 'rgba(211, 47, 47, 0.9)',
          color: '#ffffff',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          '& .MuiAlert-icon': {
            color: '#ffffff',
          }
        }}
        action={
          <Button 
            color="inherit" 
            size="small" 
            onClick={handleClose}
            sx={{ fontWeight: 'bold' }}
          >
            Dismiss
          </Button>
        }
        onClose={handleClose}
      >
        Server is not responding. Using offline mode with local data storage.
      </Alert>
    </Snackbar>
  );
};

export default ServerStatusChecker; 
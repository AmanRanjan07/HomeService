import React, { useState, useEffect } from 'react';
import { Alert, Box, Chip } from '@mui/material';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import { getIsUsingMockData } from '../services/api';

const OfflineBanner: React.FC = () => {
  const [isUsingMockData, setIsUsingMockData] = useState<boolean>(false);

  useEffect(() => {
    // Check if using mock data
    setIsUsingMockData(getIsUsingMockData());
    
    // Set up interval to check periodically
    const interval = setInterval(() => {
      setIsUsingMockData(getIsUsingMockData());
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  if (!isUsingMockData) {
    return null;
  }

  return (
    <Box sx={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 9999 }}>
      <Alert 
        severity="info" 
        icon={<WifiOffIcon />}
        sx={{ 
          borderRadius: 0,
          backgroundColor: 'rgba(3, 4, 94, 0.9)',
          color: 'white',
          '& .MuiAlert-icon': {
            color: 'white',
          }
        }}
        action={
          <Chip 
            label="OFFLINE MODE" 
            size="small" 
            color="primary" 
            sx={{ 
              backgroundColor: '#ff512b',
              fontWeight: 'bold'
            }} 
          />
        }
      >
        Using mock data - Backend server is not running. All interactions are stored locally.
      </Alert>
    </Box>
  );
};

export default OfflineBanner; 
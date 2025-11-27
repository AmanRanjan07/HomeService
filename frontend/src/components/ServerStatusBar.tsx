import React, { useEffect, useState } from 'react';
import { getIsUsingMockData } from '../services/api';
import { Box, Alert, AlertTitle, Button, Typography, Stack, Link, Divider } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const ServerStatusBar: React.FC = () => {
  const [isMockData, setIsMockData] = useState<boolean>(getIsUsingMockData());
  const [dismissed, setDismissed] = useState<boolean>(false);
  const [checkCount, setCheckCount] = useState<number>(0);

  useEffect(() => {
    // Update status every 3 seconds
    const interval = setInterval(() => {
      setIsMockData(getIsUsingMockData());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleStartServer = () => {
    // Create a dummy anchor to open file in a new window
    const a = document.createElement('a');
    a.href = `file:///D:/Coding/PROJECTS/Home_ServiceApp/StartServer.bat`;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    setCheckCount(prev => prev + 1);
    
    // Show a message to refresh the page after starting the server
    setTimeout(() => {
      alert("After starting the server, please refresh this page to connect.");
    }, 1000);
  };

  if (!isMockData || dismissed) {
    return null;
  }

  return (
    <Alert 
      severity="warning"
      sx={{ 
        width: '100%', 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        zIndex: 9999,
        borderRadius: 0,
      }}
      action={
        <Button 
          color="inherit" 
          size="small" 
          onClick={() => setDismissed(true)}
        >
          Dismiss
        </Button>
      }
    >
      <AlertTitle>Server is not responding. Using offline mode with local data storage.</AlertTitle>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="body2">
          To connect to the backend server, please run the <strong>StartServer.bat</strong> file in the root directory.
        </Typography>
        <Divider orientation="vertical" flexItem />
        <Stack direction="row" spacing={1}>
          <Button 
            variant="contained" 
            size="small" 
            color="primary" 
            startIcon={<PlayArrowIcon />}
            onClick={handleStartServer}
          >
            Start Server
          </Button>
          <Button 
            variant="outlined" 
            size="small" 
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </Stack>
      </Stack>
      {checkCount > 0 && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          If the server is running but still showing this message, please check that port 5000 is not blocked by a firewall or in use by another application.
        </Typography>
      )}
    </Alert>
  );
};

export default ServerStatusBar; 
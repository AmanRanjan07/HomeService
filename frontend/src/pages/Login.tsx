import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  padding: '2.5rem',
}));

const GradientText = styled('span')({
  background: 'linear-gradient(45deg, #FF512B 30%, #DD2476 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block'
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    color: '#ffffff',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.23)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FF512B',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-focused': {
      color: '#FF512B',
    },
  },
  '& .MuiInputAdornment-root .MuiSvgIcon-root': {
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

const GradientButton = styled(Button)({
  background: 'linear-gradient(45deg, #FF512B 30%, #DD2476 90%)',
  borderRadius: '30px',
  padding: '12px 24px',
  color: '#ffffff',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  '&:hover': {
    background: 'linear-gradient(45deg, #FF6B45 30%, #E93B8C 90%)',
  },
});

const PageContainer = styled(Box)({
  minHeight: 'calc(100vh - 64px)', // Subtract navbar height
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(45deg, #000000 30%, #1a1a1a 90%)',
  padding: '2rem 0',
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      const user = await login(email, password);
      // Navigate based on user role
      if (user?.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else if (user?.role === 'SERVICE_PROVIDER') {
        navigate('/provider/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to sign in. Please check your credentials or ensure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StyledPaper>
            <Typography 
              component="h1" 
              variant="h4" 
              align="center" 
              gutterBottom 
              sx={{ 
                fontWeight: 700, 
                color: '#ffffff',
                mb: 4,
              }}
            >
              Welcome <GradientText>Back</GradientText>
            </Typography>
            
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3, 
                  bgcolor: 'rgba(211, 47, 47, 0.1)', 
                  color: '#ff8a80',
                  border: '1px solid rgba(211, 47, 47, 0.3)',
                  '& .MuiAlert-icon': {
                    color: '#ff8a80',
                  }
                }}
              >
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <StyledTextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <StyledTextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                        sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <GradientButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ mt: 4, mb: 3 }}
                  disabled={loading}
                  startIcon={<LoginIcon />}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </GradientButton>
              </motion.div>
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Don't have an account?{' '}
                  <Link 
                    component={RouterLink} 
                    to="/register" 
                    sx={{ 
                      color: '#FF512B',
                      textDecoration: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        textDecoration: 'underline',
                      }
                    }}
                  >
                    Sign Up
                  </Link>
                </Typography>
              </Box>
            </Box>
          </StyledPaper>
        </motion.div>
      </Container>
    </PageContainer>
  );
};

export default Login; 
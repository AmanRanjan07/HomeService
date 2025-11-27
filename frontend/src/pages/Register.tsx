import React, { useState, useEffect } from 'react';
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
  Grid,
  InputAdornment,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

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

const OutlinedButton = styled(Button)({
  borderRadius: '30px',
  padding: '12px 24px',
  color: '#ffffff',
  borderColor: 'rgba(255, 255, 255, 0.3)',
  '&:hover': {
    borderColor: '#FF512B',
    backgroundColor: 'rgba(255, 81, 43, 0.1)',
  },
});

const PageContainer = styled(Box)({
  minHeight: 'calc(100vh - 64px)', // Subtract navbar height
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(45deg, #000000 30%, #1a1a1a 90%)',
  padding: '2rem 0',
});

const StyledStepper = styled(Stepper)({
  '& .MuiStepLabel-label': {
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-active': {
      color: '#ffffff',
    },
    '&.Mui-completed': {
      color: '#FF512B',
    },
  },
  '& .MuiStepIcon-root': {
    color: 'rgba(255, 255, 255, 0.2)',
    '&.Mui-active': {
      color: '#FF512B',
    },
    '&.Mui-completed': {
      color: '#DD2476',
    },
  },
});

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, user, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    role: 'USER',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Account Details', 'Personal Information'];

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    if (activeStep === 0) {
      // Validate first step
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all required fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
    }
    setError('');
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBackStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        role: formData.role,
      });
      if (user) {
        if (user.role === 'ADMIN') {
          navigate('/admin/dashboard');
        } else if (user.role === 'USER') {
          navigate('/dashboard');
        } else if (user.role === 'SERVICE_PROVIDER') {
          navigate('/provider/dashboard');
        }
      }
    } catch (err) {
      setError('Failed to create an account');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StyledTextField
                required
                fullWidth
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
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
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleToggleConfirmPasswordVisibility}
                        edge="end"
                        sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                select
                fullWidth
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                sx={{
                  '& .MuiSelect-select': {
                    color: '#ffffff'
                  },
                  '& .MuiMenuItem-root': {
                    color: '#000000'
                  }
                }}
              >
                <MenuItem value="USER">User</MenuItem>
                <MenuItem value="ADMIN">Admin</MenuItem>
                <MenuItem value="SERVICE_PROVIDER">Service Provider</MenuItem>
              </StyledTextField>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                required
                fullWidth
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                required
                fullWidth
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                name="phone"
                label="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                name="address"
                label="Address"
                multiline
                rows={3}
                value={formData.address}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        );
      default:
        return null;
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
                mb: 2,
              }}
            >
              Create Your <GradientText>Account</GradientText>
            </Typography>

            <StyledStepper activeStep={activeStep} alternativeLabel sx={{ mb: 4, mt: 3 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </StyledStepper>
            
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
              {renderStepContent(activeStep)}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                {activeStep > 0 && (
                  <OutlinedButton
                    onClick={handleBackStep}
                    variant="outlined"
                  >
                    Back
                  </OutlinedButton>
                )}
                <Box sx={{ flex: '1 1 auto' }} />
                {activeStep < steps.length - 1 ? (
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <GradientButton
                      onClick={handleNextStep}
                      variant="contained"
                    >
                      Next
                    </GradientButton>
                  </motion.div>
                ) : (
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <GradientButton
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      startIcon={<AppRegistrationIcon />}
                    >
                      {loading ? 'Signing up...' : 'Sign Up'}
                    </GradientButton>
                  </motion.div>
                )}
              </Box>

              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Already have an account?{' '}
                  <Link 
                    component={RouterLink} 
                    to="/login" 
                    sx={{ 
                      color: '#FF512B',
                      textDecoration: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        textDecoration: 'underline',
                      }
                    }}
                  >
                    Sign In
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

export default Register; 
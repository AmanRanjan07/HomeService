import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  InputLabel,
  Snackbar,
  Alert,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Message as MessageIcon,
  Send as SendIcon,
} from '@mui/icons-material';

// Styled components
const PageContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #111111 0%, #1f1f1f 100%)',
  position: 'relative',
  color: '#ffffff',
  overflow: 'hidden',
  minHeight: '100vh',
  paddingTop: '2rem',
  paddingBottom: '4rem',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 30%, rgba(255, 81, 43, 0.1) 0%, rgba(0, 0, 0, 0) 50%), radial-gradient(circle at 80% 70%, rgba(221, 36, 118, 0.05) 0%, rgba(0, 0, 0, 0) 50%)',
    pointerEvents: 'none',
    zIndex: 0,
  }
}));

const GradientText = styled('span')({
  background: 'linear-gradient(45deg, #FF512B 30%, #DD2476 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block',
  position: 'relative',
  '&::after': {
    content: 'attr(data-text)',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, #FF512B 30%, #DD2476 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    filter: 'blur(12px)',
    opacity: 0,
    animation: 'textGlow 3s ease-in-out infinite alternate'
  },
  '@keyframes textGlow': {
    '0%': { opacity: 0.3 },
    '100%': { opacity: 0.7 }
  }
});

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(25, 25, 30, 0.5)',
  backdropFilter: 'blur(10px)',
  padding: theme.spacing(3),
  color: '#fff',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'all 0.3s ease',
  position: 'relative',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: 'linear-gradient(45deg, rgba(45, 149, 255, 0.3), rgba(231, 71, 220, 0.3), rgba(255, 81, 43, 0.3))',
    zIndex: -1,
    borderRadius: '18px',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
    '&::before': {
      opacity: 1,
      animation: 'borderGlow 3s infinite alternate',
    }
  },
  '@keyframes borderGlow': {
    '0%': {
      opacity: 0.5,
      transform: 'rotate(0deg)',
      background: 'linear-gradient(45deg, rgba(45, 149, 255, 0.3), rgba(231, 71, 220, 0.3), rgba(255, 81, 43, 0.3))',
    },
    '100%': {
      opacity: 0.8,
      transform: 'rotate(180deg)',
      background: 'linear-gradient(45deg, rgba(255, 81, 43, 0.3), rgba(45, 149, 255, 0.3), rgba(231, 71, 220, 0.3))',
    }
  }
}));

const ContactInfoCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  borderRadius: '12px',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.08)',
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
  }
}));

const IconBox = styled(Box)(({ theme }) => ({
  width: 50,
  height: 50,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: theme.spacing(2),
  background: 'linear-gradient(45deg, #FF512B 30%, #DD2476 90%)',
  boxShadow: '0 5px 15px rgba(221, 36, 118, 0.3)',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #FF512B 30%, #DD2476 90%)',
    filter: 'blur(8px)',
    opacity: 0.6,
    zIndex: -1,
  }
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FF512B 30%, #DD2476 90%)',
  border: 0,
  borderRadius: 30,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  padding: '10px 30px',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    background: 'linear-gradient(45deg, #FF6B45 30%, #E93B8C 90%)',
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 15px rgba(255, 105, 135, .5)',
  },
  '&:disabled': {
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.4)',
    boxShadow: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%)',
    transform: 'rotate(30deg)',
    opacity: 0,
    transition: 'all 0.6s ease',
  },
  '&:hover::after': {
    opacity: 1,
    transform: 'rotate(30deg) translate(100%, -100%)',
    transition: 'all 0.6s ease',
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FF512B',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#FF512B',
  },
  '& .MuiInputBase-input': {
    color: 'white',
  }
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#FF512B',
  },
  '& .MuiSelect-select': {
    color: 'white',
  },
  '& .MuiSvgIcon-root': { // dropdown icon
    color: 'rgba(255, 255, 255, 0.7)',
  },
}));

const StyledFormLabel = styled(InputLabel)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  '&.Mui-focused': {
    color: '#FF512B',
  },
}));

const officeLocations = [
  {
    city: 'Vaddeswaram',
    address: 'Vaddeswaram, Vijaywada, IN 522502',
    phone: '+91 9334935195',
    email: 'info@amanhomeservices.in',
    hours: 'Mon-Fri: 9AM - 6PM, Sat: 10AM - 4PM',
  },
  {
    city: 'Sonpur',
    address: 'Sonpur, Bihar, IN 767017',
    phone: '+91 9334935195',
    email: 'aman@homeservices.in',
    hours: 'Mon-Fri: 9AM - 6PM, Sat: 10AM - 4PM',
  }
];

const inquiryTypes = [
  'General Inquiry',
  'Service Information',
  'Booking Issue',
  'Account Support',
  'Become a Service Provider',
  'Feedback & Suggestions',
  'Partnership Opportunities',
  'Billing & Payment',
  'Other',
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | 
    { target: { name?: string; value: unknown } }
  ) => {
    const { name, value } = e.target;
    if (name) {
      setFormData({
        ...formData,
        [name]: value,
      });
      
      // Clear error when field is changed
      if (errors[name as keyof FormData]) {
        setErrors({
          ...errors,
          [name]: undefined,
        });
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (formData.phone && !/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/[\s()-]/g, ''))) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    if (!formData.inquiryType) {
      newErrors.inquiryType = 'Please select an inquiry type';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message is too short (minimum 10 characters)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', formData);
        setSubmitting(false);
        setSnackbarOpen(true);
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          inquiryType: '',
          message: '',
        });
      }, 1500);
    }
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <PageContainer>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ py: 8, position: 'relative' }}>
            <Box sx={{ 
              position: 'absolute', 
              top: '20%', 
              right: '10%', 
              width: '300px', 
              height: '300px', 
              borderRadius: '50%',
              background: 'linear-gradient(45deg, rgba(255, 81, 43, 0.2), rgba(221, 36, 118, 0.2))',
              filter: 'blur(100px)',
              zIndex: 0,
              animation: 'float 8s ease-in-out infinite alternate',
            }} />
            
            <Typography variant="h2" component="h1" align="center" gutterBottom>
              Contact <GradientText data-text="Us">Us</GradientText>
            </Typography>
            
            <Typography variant="h6" align="center" sx={{ 
              maxWidth: '800px', 
              mx: 'auto', 
              color: 'rgba(255, 255, 255, 0.8)',
              mb: 5,
              position: 'relative',
              zIndex: 1,
            }}>
              We're here to help! Reach out to our team with any questions, feedback, or support needs.
            </Typography>
          </Box>
        </motion.div>

        {/* Contact Information Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Get in <GradientText data-text="Touch">Touch</GradientText>
          </Typography>
          
          <Typography variant="body1" align="center" sx={{ 
            maxWidth: '700px', 
            mx: 'auto', 
            color: 'rgba(255, 255, 255, 0.8)',
            mb: 6 
          }}>
            Contact us through any of these channels or use the form below to send us a message
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <ContactInfoCard>
                  <IconBox>
                    <PhoneIcon sx={{ color: 'white' }} />
                  </IconBox>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Phone
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Customer Support: 9334935195<br />
                      Business Inquiries: 933495195
                    </Typography>
                  </Box>
                </ContactInfoCard>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <ContactInfoCard>
                  <IconBox>
                    <EmailIcon sx={{ color: 'white' }} />
                  </IconBox>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Email
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      General Inquiries: info@amanhomeservices.in<br />
                      Support: support@amanhomeservices.in
                    </Typography>
                  </Box>
                </ContactInfoCard>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <ContactInfoCard>
                  <IconBox>
                    <TimeIcon sx={{ color: 'white' }} />
                  </IconBox>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Hours
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Customer Support: 24/7<br />
                      Office Hours: Mon-Fri, 9AM - 6PM EST
                    </Typography>
                  </Box>
                </ContactInfoCard>
              </motion.div>
            </Grid>
          </Grid>
        </Box>

        {/* Office Locations Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Office <GradientText data-text="Locations">Locations</GradientText>
          </Typography>
          
          <Typography variant="body1" align="center" sx={{ 
            maxWidth: '700px', 
            mx: 'auto', 
            color: 'rgba(255, 255, 255, 0.8)',
            mb: 6 
          }}>
            Visit one of our offices for in-person assistance
          </Typography>
          
          <Grid container spacing={4} justifyContent="center">
            {officeLocations.map((office, index) => (
              <Grid item xs={12} md={6} key={office.city}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <StyledCard>
                    <CardContent>
                      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <IconBox sx={{ width: 40, height: 40, mr: 1.5 }}>
                          <LocationIcon sx={{ color: 'white', fontSize: '1.2rem' }} />
                        </IconBox>
                        <Typography variant="h6">
                          {office.city}
                        </Typography>
                      </Box>
                      
                      <Divider sx={{ my: 2, background: 'rgba(255, 255, 255, 0.1)' }} />
                      
                      <Typography variant="body2" paragraph sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        <strong>Address:</strong><br />
                        {office.address}
                      </Typography>
                      
                      <Typography variant="body2" paragraph sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        <strong>Phone:</strong><br />
                        {office.phone}
                      </Typography>
                      
                      <Typography variant="body2" paragraph sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        <strong>Email:</strong><br />
                        {office.email}
                      </Typography>
                      
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        <strong>Hours:</strong><br />
                        {office.hours}
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Contact Form Section */}
        <Box sx={{ mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <StyledCard>
              <CardContent>
                <Typography variant="h4" align="center" gutterBottom>
                  Send Us a <GradientText data-text="Message">Message</GradientText>
                </Typography>
                
                <Typography variant="body1" align="center" sx={{ 
                  maxWidth: '700px', 
                  mx: 'auto', 
                  color: 'rgba(255, 255, 255, 0.8)',
                  mb: 4 
                }}>
                  Fill out the form below and we'll get back to you as soon as possible
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        name="firstName"
                        label="First Name"
                        required
                        fullWidth
                        value={formData.firstName}
                        onChange={handleChange}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        name="lastName"
                        label="Last Name"
                        required
                        fullWidth
                        value={formData.lastName}
                        onChange={handleChange}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        name="email"
                        label="Email Address"
                        required
                        fullWidth
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        name="phone"
                        label="Phone Number (optional)"
                        fullWidth
                        value={formData.phone}
                        onChange={handleChange}
                        error={!!errors.phone}
                        helperText={errors.phone}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <FormControl fullWidth error={!!errors.inquiryType}>
                        <StyledFormLabel id="inquiry-type-label">Inquiry Type *</StyledFormLabel>
                        <StyledSelect
                          labelId="inquiry-type-label"
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleChange}
                          displayEmpty
                          label="Inquiry Type"
                        >
                          <MenuItem value="" disabled>
                            <em>Select the nature of your inquiry</em>
                          </MenuItem>
                          {inquiryTypes.map((type) => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                          ))}
                        </StyledSelect>
                        {errors.inquiryType && (
                          <FormHelperText>{errors.inquiryType}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <StyledTextField
                        name="message"
                        label="Message"
                        multiline
                        rows={6}
                        required
                        fullWidth
                        value={formData.message}
                        onChange={handleChange}
                        error={!!errors.message}
                        helperText={errors.message}
                        placeholder="Please describe how we can help you..."
                      />
                    </Grid>
                    
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <GradientButton
                          type="submit"
                          variant="contained"
                          size="large"
                          disabled={submitting}
                          endIcon={<SendIcon />}
                          sx={{ px: 5, py: 1.5 }}
                        >
                          {submitting ? 'Sending...' : 'Send Message'}
                        </GradientButton>
                      </motion.div>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </StyledCard>
          </motion.div>
        </Box>

        {/* Map Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Find <GradientText data-text="Us">Us</GradientText>
          </Typography>
          
          <Typography variant="body1" align="center" sx={{ 
            maxWidth: '700px', 
            mx: 'auto', 
            color: 'rgba(255, 255, 255, 0.8)',
            mb: 4 
          }}>
            Our headquarters is located in Vaddeswaram, Vijaywada
          </Typography>
          
          <Box sx={{ 
            position: 'relative',
            height: '400px',
            width: '100%',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          }}>
            <Box 
              component="iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243988.63671424004!2d80.49401161362074!3d16.438222881280223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35f0a2a73a0715%3A0x4815cd5e47bbce3c!2sVaddeswaram%2C%20Andhra%20Pradesh%2C%20India!5e0!3m2!1sen!2sus!4v1715675647741!5m2!1sen!2sus"
              width="100%"
              height="100%"
              frameBorder="0"
              loading="lazy"
              sx={{ border: 0 }}
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
            />
          </Box>
        </Box>
      </Container>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity="success" 
          sx={{ 
            width: '100%',
            background: 'linear-gradient(45deg, rgba(0, 200, 83, 0.8), rgba(56, 142, 60, 0.8))',
            color: 'white',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            '& .MuiAlert-icon': {
              color: 'white',
            }
          }}
        >
          Your message has been sent successfully! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default Contact; 
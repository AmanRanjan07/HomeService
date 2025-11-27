import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
  Chip,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { addDays, addHours, isAfter, startOfHour } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';

interface BookingData {
  service: string;
  date: Date | null;
  time: Date | null;
  address: string;
  notes: string;
  urgency: string;
  frequency: string;
  preferences: string[];
  additionalServices: string[];
  paymentMethod: string;
  promoCode: string;
}

interface BookingFormValues {
  serviceType: string;
  frequency: string;
  scheduledTime: Date;
  description: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  additionalServices: string[];
  paymentMethod: string;
  promoCode: string;
}

const serviceTypes = [
  'House Cleaning',
  'Electrical Services',
  'Plumbing',
  'Moving Services',
  'Handyman',
  'Painting',
  'Landscaping',
  'HVAC Services',
  'Deep Cleaning',
  'Smart Home Installation'
];

const frequencyOptions = [
  'One-time service',
  'Weekly',
  'Bi-weekly',
  'Monthly',
  'Quarterly'
];

const additionalServicesOptions = {
  'House Cleaning': ['Window Cleaning', 'Carpet Cleaning', 'Appliance Cleaning', 'Laundry'],
  'Electrical Services': ['Outlet Installation', 'Light Fixture Installation', 'Circuit Inspection', 'Surge Protection'],
  'Plumbing': ['Water Heater Maintenance', 'Pipe Insulation', 'Drain Treatment', 'Fixture Installation'],
  'Moving Services': ['Packing Service', 'Storage Service', 'Furniture Assembly', 'Junk Removal'],
  'Handyman': ['Furniture Assembly', 'TV Mounting', 'Shelving Installation', 'Door Repair'],
  'Painting': ['Wall Repair', 'Trim Painting', 'Cabinet Painting', 'Color Consultation'],
  'Landscaping': ['Mulching', 'Plant Installation', 'Irrigation Setup', 'Tree Trimming'],
  'HVAC Services': ['Filter Replacement', 'Duct Cleaning', 'Thermostat Installation', 'System Tune-up'],
  'Deep Cleaning': ['Mold Removal', 'Post-construction Cleanup', 'Move-in/out Cleaning', 'Sanitization'],
  'Smart Home Installation': ['Security Camera Setup', 'Smart Lock Installation', 'Doorbell Camera', 'Hub Configuration']
};

const paymentMethods = [
  'Credit Card',
  'Debit Card',
  'PayPal',
  'Bank Transfer',
  'Cash'
];

const validationSchemas = [
  // Step 1 validation
  Yup.object().shape({
    serviceType: Yup.string().required('Service type is required'),
    frequency: Yup.string().required('Service frequency is required'),
    scheduledTime: Yup.date()
      .required('Scheduled time is required')
      .min(startOfHour(new Date()), 'Scheduled time must be in the future')
      .max(addDays(new Date(), 30), 'Scheduled time must be within 30 days'),
    description: Yup.string()
      .required('Description is required')
      .min(10, 'Description must be at least 10 characters')
      .max(500, 'Description must not exceed 500 characters'),
    additionalServices: Yup.array().of(Yup.string()),
  }),
  // Step 2 validation
  Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    address: Yup.string().required('Address is required'),
  }),
  // Step 3 validation
  Yup.object().shape({
    paymentMethod: Yup.string().required('Payment method is required'),
    promoCode: Yup.string(),
  }),
];

const steps = ['Service Details', 'Personal Information', 'Payment & Confirmation'];

const PageContainer = styled(Box)({
  background: 'linear-gradient(135deg, #0a0a0a 0%, #121212 50%, #1a1a1a 100%)',
  minHeight: '100vh',
  padding: '24px 0',
  color: '#fff',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 30%, rgba(45, 149, 255, 0.08) 0%, rgba(0, 0, 0, 0) 50%), radial-gradient(circle at 80% 70%, rgba(231, 71, 220, 0.08) 0%, rgba(0, 0, 0, 0) 50%)',
    animation: 'bgPulse 8s ease-in-out infinite alternate',
    pointerEvents: 'none',
    zIndex: 0,
  },
  '@keyframes bgPulse': {
    '0%': {
      opacity: 0.6,
      background: 'radial-gradient(circle at 30% 30%, rgba(45, 149, 255, 0.08) 0%, rgba(0, 0, 0, 0) 50%), radial-gradient(circle at 70% 70%, rgba(231, 71, 220, 0.08) 0%, rgba(0, 0, 0, 0) 50%)',
    },
    '50%': {
      opacity: 0.8,
      background: 'radial-gradient(circle at 40% 50%, rgba(255, 81, 43, 0.06) 0%, rgba(0, 0, 0, 0) 50%), radial-gradient(circle at 60% 40%, rgba(231, 71, 220, 0.06) 0%, rgba(0, 0, 0, 0) 50%)',
    },
    '100%': {
      opacity: 0.7,
      background: 'radial-gradient(circle at 60% 30%, rgba(45, 149, 255, 0.08) 0%, rgba(0, 0, 0, 0) 50%), radial-gradient(circle at 30% 60%, rgba(231, 71, 220, 0.08) 0%, rgba(0, 0, 0, 0) 50%)',
    }
  }
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(25, 25, 30, 0.5)',
  backdropFilter: 'blur(10px)',
  padding: theme.spacing(4),
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  animation: 'paperFadeIn 0.5s ease-out',
  '@keyframes paperFadeIn': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    }
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, rgba(45, 149, 255, 0.1), rgba(231, 71, 220, 0.1), rgba(255, 81, 43, 0.1))',
    opacity: 0,
    transition: 'opacity 0.4s ease',
    zIndex: 0,
    pointerEvents: 'none',
  },
  '&:hover::before': {
    opacity: 0.6,
  }
}));

const GradientText = styled('span')({
  background: 'linear-gradient(45deg, #2D95FF 30%, #E747DC 90%)',
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
    background: 'linear-gradient(45deg, #2D95FF 30%, #E747DC 90%)',
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

const StyledStepper = styled(Stepper)(({ theme }) => ({
  background: 'transparent',
  marginBottom: theme.spacing(4),
  '.MuiStepConnector-line': {
    minHeight: 12,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  '.MuiStepConnector-active .MuiStepConnector-line': {
    borderColor: 'rgba(45, 149, 255, 0.6)',
    boxShadow: '0 0 8px rgba(45, 149, 255, 0.6)',
  },
  '.MuiStepConnector-completed .MuiStepConnector-line': {
    borderColor: 'rgba(231, 71, 220, 0.6)',
    boxShadow: '0 0 8px rgba(231, 71, 220, 0.6)',
  },
  '.MuiStepIcon-root.Mui-active': {
    color: '#2D95FF',
    filter: 'drop-shadow(0 0 3px rgba(45, 149, 255, 0.8))',
  },
  '.MuiStepIcon-root.Mui-completed': {
    color: '#E747DC',
    filter: 'drop-shadow(0 0 3px rgba(231, 71, 220, 0.8))',
  },
  '.MuiStepLabel-label': {
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: theme.spacing(0.5),
    '&.Mui-active': {
      color: '#ffffff',
      fontWeight: 'bold',
    }
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.2)',
      transition: 'all 0.3s ease',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(45, 149, 255, 0.6)',
      boxShadow: '0 0 0 1px rgba(45, 149, 255, 0.2)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(231, 71, 220, 0.8)',
      boxShadow: '0 0 0 2px rgba(231, 71, 220, 0.2)',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-focused': {
      color: 'rgba(231, 71, 220, 0.9)',
    },
  },
  '& .MuiFormHelperText-root': {
    color: 'rgba(255, 81, 43, 0.9)',
  }
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: 'white',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s ease',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(45, 149, 255, 0.6)',
    boxShadow: '0 0 0 1px rgba(45, 149, 255, 0.2)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(231, 71, 220, 0.8)',
    boxShadow: '0 0 0 2px rgba(231, 71, 220, 0.2)',
  },
  '& .MuiSelect-icon': {
    color: 'rgba(255, 255, 255, 0.7)',
  }
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  '&.MuiMenuItem-root': {
    '&:hover': {
      background: 'rgba(45, 149, 255, 0.1)',
    },
    '&.Mui-selected': {
      background: 'rgba(231, 71, 220, 0.15)',
      '&:hover': {
        background: 'rgba(231, 71, 220, 0.25)',
      }
    }
  }
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2D95FF 30%, #E747DC 90%)',
  border: 0,
  borderRadius: 50,
  boxShadow: '0 3px 5px 2px rgba(45, 149, 255, .3)',
  color: 'white',
  padding: '10px 30px',
  fontWeight: 'bold',
  letterSpacing: '0.5px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #4DA6FF 30%, #E85DE3 90%)',
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 15px rgba(45, 149, 255, .3)',
  },
  '&:active': {
    transform: 'translateY(-1px)',
    boxShadow: '0 3px 5px rgba(45, 149, 255, .3)',
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
    animation: 'shimmer 6s infinite',
    zIndex: 1,
  },
  '@keyframes shimmer': {
    '0%': {
      transform: 'translateX(-150%) rotate(30deg)',
    },
    '100%': {
      transform: 'translateX(150%) rotate(30deg)',
    }
  }
}));

const Booking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [bookingComplete, setBookingComplete] = useState(false);

  const initialValues: BookingFormValues = {
    serviceType: location.state?.service || '',
    frequency: location.state?.frequency || 'One-time service',
    scheduledTime: addHours(startOfHour(new Date()), 2),
    description: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    additionalServices: [],
    paymentMethod: location.state?.paymentMethod || 'Credit Card',
    promoCode: '',
  };

  const formik = useFormik<BookingFormValues>({
    initialValues,
    validationSchema: validationSchemas[activeStep],
    onSubmit: (values) => {
      if (activeStep === steps.length - 1) {
        console.log('Booking submitted:', values);
        setBookingComplete(true);
      } else {
        handleNext();
      }
    },
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Service Type</InputLabel>
                <StyledSelect
                  name="serviceType"
                  value={formik.values.serviceType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Service Type"
                >
                  {serviceTypes.map((service) => (
                    <StyledMenuItem key={service} value={service}>
                      {service}
                    </StyledMenuItem>
                  ))}
                </StyledSelect>
                {formik.touched.serviceType && formik.errors.serviceType && (
                  <FormHelperText sx={{ color: '#ff1744' }}>{formik.errors.serviceType}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Service Frequency</InputLabel>
                <StyledSelect
                  name="frequency"
                  value={formik.values.frequency}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Service Frequency"
                >
                  {frequencyOptions.map((option) => (
                    <StyledMenuItem key={option} value={option}>
                      {option}
                    </StyledMenuItem>
                  ))}
                </StyledSelect>
                {formik.touched.frequency && formik.errors.frequency && (
                  <FormHelperText sx={{ color: '#ff1744' }}>{formik.errors.frequency}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Scheduled Time"
                  value={formik.values.scheduledTime}
                  onChange={(value: Date | null) => formik.setFieldValue('scheduledTime', value)}
                  minDateTime={startOfHour(new Date())}
                  maxDateTime={addDays(new Date(), 30)}
                  sx={{
                    width: '100%',
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
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            {formik.values.serviceType && (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Additional Services</InputLabel>
                  <StyledSelect
                    multiple
                    name="additionalServices"
                    value={formik.values.additionalServices}
                    onChange={formik.handleChange}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(selected as string[]).map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            sx={{
                              backgroundColor: 'rgba(255,82,182,0.1)',
                              color: '#ffffff',
                              border: '1px solid rgba(255,82,182,0.3)',
                            }}
                          />
                        ))}
                      </Box>
                    )}
                  >
                    {additionalServicesOptions[formik.values.serviceType as keyof typeof additionalServicesOptions]?.map((option) => (
                      <StyledMenuItem key={option} value={option}>
                        {option}
                      </StyledMenuItem>
                    ))}
                  </StyledSelect>
                </FormControl>
              </Grid>
            )}

            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                multiline
                rows={4}
                name="description"
                label="Service Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.description && formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>
          </Grid>
        );
        
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                name="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.email && formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                name="phone"
                label="Phone Number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.phone && formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                name="address"
                label="Service Address"
                multiline
                rows={2}
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.address && formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
          </Grid>
        );
        
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Payment Method</InputLabel>
                <StyledSelect
                  name="paymentMethod"
                  value={formik.values.paymentMethod}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Payment Method"
                >
                  {paymentMethods.map((method) => (
                    <StyledMenuItem key={method} value={method}>
                      {method}
                    </StyledMenuItem>
                  ))}
                </StyledSelect>
                {formik.touched.paymentMethod && formik.errors.paymentMethod && (
                  <FormHelperText sx={{ color: '#ff1744' }}>{formik.errors.paymentMethod}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                name="promoCode"
                label="Promo Code (Optional)"
                value={formik.values.promoCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
                  Booking Summary
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography sx={{ color: '#ffffff' }}><strong>Service Type:</strong> {formik.values.serviceType}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{ color: '#ffffff' }}><strong>Frequency:</strong> {formik.values.frequency}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{ color: '#ffffff' }}><strong>Scheduled Time:</strong> {formik.values.scheduledTime?.toLocaleString()}</Typography>
                  </Grid>
                  {formik.values.additionalServices?.length > 0 && (
                    <Grid item xs={12}>
                      <Typography sx={{ color: '#ffffff' }}><strong>Additional Services:</strong> {formik.values.additionalServices.join(', ')}</Typography>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Typography sx={{ color: '#ffffff' }}><strong>Description:</strong> {formik.values.description}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{ color: '#ffffff' }}><strong>Name:</strong> {formik.values.firstName} {formik.values.lastName}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{ color: '#ffffff' }}><strong>Contact:</strong> {formik.values.email} | {formik.values.phone}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{ color: '#ffffff' }}><strong>Address:</strong> {formik.values.address}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{ color: '#ffffff' }}><strong>Payment Method:</strong> {formik.values.paymentMethod}</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  if (bookingComplete) {
    return (
      <PageContainer>
        <Container maxWidth="sm" sx={{ py: 8 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <StyledPaper elevation={3} sx={{ textAlign: 'center', py: 6 }}>
              <CheckCircleIcon sx={{ 
                fontSize: 80, 
                color: '#2D95FF',
                mb: 2,
                filter: 'drop-shadow(0 0 10px rgba(45, 149, 255, 0.6))',
                animation: 'pulse 2s infinite alternate',
                '@keyframes pulse': {
                  '0%': { 
                    color: '#2D95FF',
                    filter: 'drop-shadow(0 0 8px rgba(45, 149, 255, 0.6))',
                  },
                  '100%': { 
                    color: '#E747DC',
                    filter: 'drop-shadow(0 0 12px rgba(231, 71, 220, 0.8))',
                  }
                }
              }} />
              <Typography variant="h4" component="h1" gutterBottom>
                <GradientText data-text="Booking Confirmed!">Booking Confirmed!</GradientText>
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.8)' }}>
                Your appointment has been scheduled successfully. You will receive a confirmation email shortly with all the details.
              </Typography>
              <GradientButton 
                variant="contained" 
                onClick={() => navigate('/')}
                sx={{ 
                  mt: 2,
                  animation: 'pulse 1.5s infinite alternate',
                  '@keyframes pulse': {
                    '0%': { 
                      boxShadow: '0 0 5px rgba(45, 149, 255, 0.6), 0 0 10px rgba(231, 71, 220, 0.3)' 
                    },
                    '100%': { 
                      boxShadow: '0 0 10px rgba(45, 149, 255, 0.8), 0 0 20px rgba(231, 71, 220, 0.5)' 
                    }
                  }
                }}
              >
                Return to Home
              </GradientButton>
            </StyledPaper>
          </motion.div>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ mb: 4, mt: 2 }}>
            <GradientText data-text="Book Your Service">Book Your Service</GradientText>
          </Typography>
        
          <StyledPaper elevation={3}>
            <StyledStepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </StyledStepper>
            
            <form onSubmit={formik.handleSubmit}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                key={activeStep}
              >
                <Box sx={{ mt: 2 }}>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button
                      variant="outlined"
                      onClick={handleBack}
                      disabled={activeStep === 0}
                      sx={{ 
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        color: 'white',
                        '&:hover': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)'
                        }
                      }}
                    >
                      Back
                    </Button>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <GradientButton
                        type="submit"
                        variant="contained"
                      >
                        {activeStep === steps.length - 1 ? 'Complete Booking' : 'Next'}
                      </GradientButton>
                    </motion.div>
                  </Box>
                </Box>
              </motion.div>
            </form>
          </StyledPaper>
        </motion.div>
      </Container>
    </PageContainer>
  );
};

export default Booking; 
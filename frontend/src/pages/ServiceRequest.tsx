import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Grid, MenuItem, Stepper, Step, StepLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

const services = [
  { value: 'cleaning', label: 'Cleaning' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'carpentry', label: 'Carpentry' },
  { value: 'painting', label: 'Painting' },
  { value: 'gardening', label: 'Gardening' },
];

const steps = ['Service Details', 'Location', 'Schedule', 'Confirmation'];

const validationSchema = yup.object({
  serviceType: yup
    .string()
    .required('Service type is required'),
  description: yup
    .string()
    .required('Description is required'),
  address: yup
    .string()
    .required('Address is required'),
  city: yup
    .string()
    .required('City is required'),
  date: yup
    .date()
    .required('Date is required'),
  time: yup
    .string()
    .required('Time is required'),
});

const ServiceRequest: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const formik = useFormik({
    initialValues: {
      serviceType: '',
      description: '',
      address: '',
      city: '',
      date: '',
      time: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // TODO: Implement service request submission
      console.log(values);
      navigate('/customer-dashboard');
    },
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                id="serviceType"
                name="serviceType"
                label="Service Type"
                value={formik.values.serviceType}
                onChange={formik.handleChange}
                error={formik.touched.serviceType && Boolean(formik.errors.serviceType)}
                helperText={formik.touched.serviceType && formik.errors.serviceType}
              >
                {services.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                id="description"
                name="description"
                label="Service Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="address"
                name="address"
                label="Address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="city"
                name="city"
                label="City"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="date"
                name="date"
                label="Date"
                type="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={formik.touched.date && formik.errors.date}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="time"
                name="time"
                label="Time"
                type="time"
                value={formik.values.time}
                onChange={formik.handleChange}
                error={formik.touched.time && Boolean(formik.errors.time)}
                helperText={formik.touched.time && formik.errors.time}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Service Request Summary
            </Typography>
            <Typography>
              Service Type: {formik.values.serviceType}
            </Typography>
            <Typography>
              Description: {formik.values.description}
            </Typography>
            <Typography>
              Address: {formik.values.address}
            </Typography>
            <Typography>
              City: {formik.values.city}
            </Typography>
            <Typography>
              Date: {formik.values.date}
            </Typography>
            <Typography>
              Time: {formik.values.time}
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Paper elevation={3} sx={{ p: 4 }}>
        <form onSubmit={formik.handleSubmit}>
          {renderStepContent(activeStep)}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            {activeStep === steps.length - 1 ? (
              <Button type="submit" variant="contained">
                Submit Request
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            )}
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ServiceRequest; 
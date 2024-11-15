'use client'

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './Navbar';
import { useSearchParams } from 'next/navigation';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    background: { default: '#ffffff' },
  },
});

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const [searchParams] = useSearchParams();
  const username = searchParams[1];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const contactData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      company: formData.company,
      jobTitle: formData.jobTitle,
    };

    try {
      const response = await fetch('http://localhost:8080/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            contactData: contactData
          }),
        })

        if (response.ok) {
          const data = await response.json()
          alert(data.message)

          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            company: '',
            jobTitle: '',
          })

        } else {
          const errorData = await response.json()
          throw errorData.error
        }

    } catch (error) {
      console.error('Error submitting contact:', error);
    }
    
  };

  return (
    <div>
    <Navbar username={username}/>
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, width: '100%' }}>
          <Typography variant="h4" gutterBottom color="primary">
            Contact Us
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  variant="outlined"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  variant="outlined"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  type="tel"
                  variant="outlined"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Company"
                  name="company"
                  variant="outlined"
                  value={formData.company}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Job Title"
                  name="jobTitle"
                  variant="outlined"
                  value={formData.jobTitle}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Box mt={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ textTransform: 'none' }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </ThemeProvider>
    </div>
  );
};

export default ContactForm;

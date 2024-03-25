import React, { useState } from 'react';
import { Container, Grid, Typography, TextField, Button, Divider, Link, useMediaQuery } from '@mui/material';
import { AccountCircle, Lock, Person, CalendarToday, Work } from '@mui/icons-material';
import Logo from '../../Assets/darklogo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)({
  '& label': {
    color: '#FFFFFF', // Change color of label
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#FFFFFF', // Change border color
    },
    '&:hover fieldset': {
      borderColor: '#FFFFFF', // Change border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFFFFF', // Change border color on focus
    },
  },
  '& .MuiInputBase-input': {
    color: '#FFFFFF', // Change color of input text
  },
});
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    profession: ''
  });
  const [error, setError] = useState('');
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    for (const key in formData) {
      if (!formData[key]) {
        setError('All fields are compulsory.');
        return;
      }
    }

    // Email validation
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    // Password length validation
    if (formData.password.length < 4) {
      setError('Password must be at least 4 characters long.');
      return;
    }

    // Password confirmation check
    if (formData.password !== formData.confirmPassword) {
      setError('Password and confirm password do not match.');
      return;
    }

    try {
      // const response = await axios.post(`${window.location.origin}/api/signup`, formData);
      const response = await fetch(`http://localhost:5000/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      //console.log(response)
      if (response.status === 201) {
        navigate('/login'); // Redirect to login page after successful signup
      } else {
        if (response.status === 400 || response.data.message === 'User already exists') {
          setError('Username already exists. Please choose another one.');
        } else if (response.status === 400 || response.data.message === 'Email already exists') {
          setError('Email already exists.');
        } else {
          setError(response.data.message);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again. Either email already exists or username is taken');
    }
  };

  return (
    <Container
      maxWidth="md"
      style={{
        minHeight: '100vh',
        minWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Main Grid container */}
      <Grid container spacing={0} alignItems="center" justifyContent="center" style={{ paddingTop: '16px' }}>
        {/* Left Column with Logo */}
        <Grid
          item
          xs={12}
          md={5}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight: isSmallScreen ? '0' : '16px',
            borderRight: isSmallScreen ? 'none' : '1px solid #bdbdbd',
          }}
        >
          <img src={Logo} alt="Finsage Logo" style={{ width: '100%', maxWidth: '200px', marginBottom: '20px' }} />
          <Typography variant="h4" style={{ fontSize: '50px' }} gutterBottom>
            Finsage
          </Typography>
          <Typography variant="subtitle1" style={{ fontSize: '30px' }} gutterBottom>
            Predict | Invest | Save
          </Typography>
        </Grid>

        {/* Vertical Divider (Conditional Rendering) */}
        {!isSmallScreen && <Grid item xs={false} md={1}></Grid>}

        {/* Right Column */}
        <Grid item xs={12} md={5} style={{ paddingLeft: isSmallScreen ? '0' : '16px' }}>
          <Typography variant="h4" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <StyledTextField
              label="Username"
              fullWidth
              margin="normal"
              variant="outlined"
              name="username"
              onChange={handleChange}
              InputProps={{
                startAdornment: <Person style={{ marginRight: '8px' , color: '#FFFFFF' }} />,
              }}
            />
            <StyledTextField
              label="Email"
              fullWidth
              margin="normal"
              variant="outlined"
              name="email"
              onChange={handleChange}
              InputProps={{
                startAdornment: <AccountCircle style={{ marginRight: '8px', color: '#FFFFFF'  }} />,
              }}
            />
            <StyledTextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              name="password"
              onChange={handleChange}
              InputProps={{
                startAdornment: <Lock style={{ marginRight: '8px' , color: '#FFFFFF' }} />,
              }}
            />
            <StyledTextField
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              name="confirmPassword"
              onChange={handleChange}
              InputProps={{
                startAdornment: <Lock style={{ marginRight: '8px', color: '#FFFFFF'  }} />,
              }}
            />
            <StyledTextField
              label="Age"
              fullWidth
              margin="normal"
              variant="outlined"
              name="age"
              onChange={handleChange}
              InputProps={{
                startAdornment: <CalendarToday style={{ marginRight: '8px', color: '#FFFFFF'  }} />,
              }}
            />
            <StyledTextField
              label="Profession"
              fullWidth
              margin="normal"
              variant="outlined"
              name="profession"
              onChange={handleChange}
              InputProps={{
                startAdornment: <Work style={{ marginRight: '8px', color: '#FFFFFF'  }} />,
              }}
            />
            {error && <Typography variant="body2" style={{ color: 'red', textAlign: 'center', marginTop: '8px' }}>{error}</Typography>}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button 
                type="submit" 
                variant="contained" 
                style={{ 
                  marginTop: '16px', 
                  borderRadius: '25px', 
                  fontSize: '20px',
                  width: '50%', // Set fixed width
                  backgroundColor:'#2ECC71'
                }}
              >
                Proceed
              </Button>
            </div>
          </form>

          <Divider style={{ margin: '16px 0' }} />

          <Typography variant="body2" style={{ textAlign: 'center', fontSize: '20px' }}>
            Already have an account? <Link href="/login" style={{ textDecoration: 'none', color:'#658E9C' }}>Sign-in</Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signup;


import React, { useState, useContext } from 'react';
import { Container, Grid, Typography, TextField, Button, Divider, Link, useMediaQuery } from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';
import Logo from '../../Assets/darklogo.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext'; // Import the AuthContext
import { styled } from '@mui/system';

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

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Access the login function from AuthContext

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Store the token in localStorage
        login({ email: formData.email }); // Call the login function with user data
        navigate('/home'); // Redirect to dashboard or any desired page
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
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
      <Grid container spacing={0} alignItems="center" justifyContent="center" style={{ paddingTop: '16px' }}>
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
        {!isSmallScreen && <Grid item xs={false} md={1}></Grid>}
        <Grid item xs={12} md={5} style={{ paddingLeft: isSmallScreen ? '0' : '16px' }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <StyledTextField
              label="Email"
              fullWidth
              margin="normal"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: <AccountCircle style={{ marginRight: '8px', color: '#FFFFFF' }} />,
              }}
            />
            <StyledTextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              name="password"
              value={formData.password}
              onChange={handleChange}
             
              InputProps={{
                startAdornment: <Lock style={{ marginRight: '8px', color: '#FFFFFF' }} />,
              }}
            />

            {error && <Typography variant="body2" style={{ color: 'red', textAlign: 'center', marginBottom: '8px' }}>{error}</Typography>}
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
            Haven't made an account yet? <Link href="/signup" style={{ textDecoration: 'none', color: '#658E9C' }}>Sign-up</Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;

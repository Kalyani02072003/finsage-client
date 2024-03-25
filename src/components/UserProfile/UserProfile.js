import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid, TextField, Divider, CircularProgress } from '@mui/material';
import { AccountCircle, CalendarToday, Person, Work } from '@mui/icons-material';
import { useAuth } from '../AuthContext/AuthContext';
import { fetchUserProfile } from '../../utils/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate and useHistory
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

const UserProfile = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { logout } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        const profile = await fetchUserProfile(token);
        setUserProfile(profile);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSignOut = () => {
    logout();
    // Redirect to login page after signing out
    navigate('/login'); // Use navigate to redirect to login page
  };
  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };
  return (
    <>
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} md={5} style={{ paddingLeft: '16px', paddingRight: '16px' }}>
          <Typography variant="h4" gutterBottom>
            User Profile
          </Typography>
          
          {userProfile && (
            <>
              <StyledTextField
                label="Username"
                value={userProfile.username}
                fullWidth
                margin="normal"
                variant="outlined"
                InputProps={{
                  startAdornment: <Person style={{ marginRight: '8px', color: '#FFFFFF' }} />,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                readOnly
              />
              <StyledTextField
                label="Email"
                value={userProfile.email}
                fullWidth
                margin="normal"
                variant="outlined"
                InputProps={{
                  startAdornment: <AccountCircle style={{ marginRight: '8px', color: '#FFFFFF' }} />,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                readOnly
              />
              <StyledTextField
                label="Age"
                value={userProfile.age}
                fullWidth
                margin="normal"
                variant="outlined"
                InputProps={{
                  startAdornment: <CalendarToday style={{ marginRight: '8px', color: '#FFFFFF' }} />,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                readOnly
              />
              <StyledTextField
                label="Profession"
                value={userProfile.profession}
                fullWidth
                margin="normal"
                variant="outlined"
                InputProps={{
                  startAdornment: <Work style={{ marginRight: '8px', color: '#FFFFFF' }} />,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                readOnly
              />

              <Divider style={{ margin: '16px 0', color: '#FFFFFF' }} />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button onClick={handleGoBack} variant="contained" fullWidth 
                  style={{ borderRadius: '20px', fontSize: '18px' , backgroundColor: '#4FB0C6'}}>
                    Go Back
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button onClick={handleSignOut} variant="contained" fullWidth 
                  style={{ borderRadius: '20px', fontSize: '18px', backgroundColor: '#4FB0C6' }}>
                    Sign Out
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default UserProfile;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import PlotTradingView from '../PlotTradingView/PlotTradingView';
import Footer from '../Footer/Footer';
import { useAuth } from '../../AuthContext/AuthContext'; // Import useAuth hook
import { fetchUserProfile } from '../../../utils/api';
import RecommendationContainer from '../Recommendation/Recommendation';
import StockNews from '../../Insights/Insights'; // Import StockNews component

const getGreeting = () => {
  const currentHour = new Date().getUTCHours() + 5; // IST timezone offset
  if (currentHour >= 4 && currentHour < 12) {
    return 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    return 'Good Afternoon';
  } else{
    return 'Good Evening';
  } 
};

const MainPage = () => {
  const greeting = getGreeting();
  const { user } = useAuth(); 
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
  }, []);// Access user information using useAuth hook

  return (
    <div >
      <Navbar />
      <Container maxWidth="xl"> {/* Larger container */}
        <Grid container spacing={2}>
          {/* Left Column */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 1, marginTop: 5, textAlign: 'center', backgroundColor:'#0D1317'}}>
              <CardContent>
                <Typography variant="h3" component="div" align="left">
                  <span style={{ color: '#4FB0C6' }}>{`${greeting}, `}</span>
                  <span style={{ color: '#FFFFFF' }}>{userProfile ? userProfile.username : 'User'}</span>
                </Typography>
              </CardContent>
            </Card>
            {/* Include StockNews component here */}
            <StockNews />
          </Grid>
          
          {/* Right Column */}
          <Grid item xs={12} md={6}>
            <PlotTradingView style={{ width: '100%', height: '600px'}} /> {/* Larger graph */}
          </Grid>
        </Grid>

        
      </Container>
    </div>
  );
};

export default MainPage;

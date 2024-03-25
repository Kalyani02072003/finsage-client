import React from 'react';
import { Grid, Typography } from '@mui/material';
import Navbar from '../HomePage/Navbar/Navbar';
import Footer from '../HomePage/Footer/Footer';
import { SymbolOverview, TickerTape } from "react-ts-tradingview-widgets";
import RecommendationContainer from '../HomePage/Recommendation/Recommendation';
import StockCard from './StockCard';

function Dashboard() {
    const symbols = [
        ["APPLE", "AAPL"],
        ["GOOGLE", "GOOGL"],
        ["MICROSOFT", "MSFT"],
        ["AMAZON", "AMZN"],
        ["FACEBOOK", "FB"],
        ["TESLA", "TSLA"],
        ["AMD", "AMD"],
        ["NASDAQ", "NDAQ"],
        ["BOEING", "BA"],
        ["REDDIT", "RDDT"],
    ];

  return (
    <div>
        <Navbar />
        <TickerTape colorTheme="dark" />
        <Typography variant="h5" align="center" style={{ marginTop: '20px' }}>
            TRACK INVESTMENTS YOU CARE ABOUT HERE
        </Typography>
        <Grid container spacing={2} style={{ marginTop: '20px', paddingLeft:'80px' }}>
            {/* Left Column - SymbolOverview */}
            <Grid item xs={12} md={6} style={{marginTop:'16px'}}>
            <SymbolOverview
                colorTheme="dark"
                width='100%'
                symbols={symbols}
                chartType="candlesticks"
                downColor="#800080"
                borderDownColor="#800080"
                wickDownColor="#800080"
                height={600}
                
            />
            </Grid>
            {/* Right Column - RecommendationContainer */}
            <Grid item xs={12} md={6}>
            <RecommendationContainer />
            </Grid>
      </Grid>
      <StockCard />
    </div>
  );
}

export default Dashboard;

import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logo from '../../../Assets/darklogo.png'
const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#0D1317', boxShadow: 'none' }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop:'15px',
          padding: '0 20px', // Default padding for smaller screens
          '@media (min-width: 600px)': {
            padding: '0 50px', // Adjust padding for larger screens
          },
          '@media (min-width: 900px)': {
            padding: '0 100px', // Further adjust padding for even larger screens
          },
        }}
      >
        {/* Left side */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a href="/home">
            <img
              src={Logo}
              alt="Logo"
              style={{ height: '80px', width:'80px', marginRight: '20px' }}
            />
          </a>
          <a href="/investments" style={{ marginRight: '20px', color: '#FFFFFF', textDecoration: 'none' }}>
            Investment
          </a>
          <a href="/dashboard" style={{ marginRight: '20px', color: '#FFFFFF', textDecoration: 'none' }}>
            Watchlist
          </a>
          <a href="/chatroom" style={{ marginRight: '20px', color: '#FFFFFF', textDecoration: 'none' }}>
            AI Chat
          </a>
        </div>

        {/* Right side */}
        <IconButton color="#FFFFFF" href="/user-profile" >
          <AccountCircleIcon style={{
            height:'40px', width:'40px', color:'#FFFFFF'
        }}/>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

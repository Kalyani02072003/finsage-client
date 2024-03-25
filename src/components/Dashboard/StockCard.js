import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, IconButton, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

import { styled } from '@mui/material/styles';
const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cnttknhr01qt3uhjnne0cnttknhr01qt3uhjnneg";
const finnhubClient = new finnhub.DefaultApi();
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
const StockCard = () => {
    const [symbol, setSymbol] = useState('');
    const [stockDataList, setStockDataList] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [currentPrice, setCurrentPrice] = useState(null);
    const [followMessage, setFollowMessage] = useState('');
    

    // Function to fetch data for the entered stock symbol
    const fetchData = () => {
        axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=cnttknhr01qt3uhjnne0cnttknhr01qt3uhjnneg`)
            .then(profileResponse => {
                const profileData = profileResponse.data;
                finnhubClient.quote(symbol, (error, quoteData, response) => {
                    if (error) {
                        console.error('Error fetching current price:', error);
                        setCurrentPrice(null);
                        return;
                    }
                    const newData = { ...profileData, price: quoteData.c }; // Combine profile data with price
                    setStockDataList([...stockDataList, newData]); // Add new data to the list
                    setSymbol(''); // Reset the text field
                    setFollowMessage(`You started following ${symbol}`);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    // Function to handle card deletion
    const handleDeleteCard = (index) => {
        const updatedStockDataList = [...stockDataList];
        updatedStockDataList.splice(index, 1);
        setStockDataList(updatedStockDataList); // Update the list without the deleted item
    };

    // Function to close the follow message
    const handleCloseFollowMessage = () => {
        setFollowMessage('');
    };

    return (
        <>
            <Container maxWidth="md" style={{ marginTop: '20px' }}>
                <Card style={{ marginBottom: '20px', backgroundColor:'#002B36' }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom style={{color:'#FFFFFF'}} >
                            Add Stock Card
                       </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={9} md={5}>
                                <StyledTextField
                                    label="Stock Symbol"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    value={symbol}
                                    onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                                />
                            </Grid>
                            <Grid item xs={3} md={7} style={{ marginTop: '25px' }}>
                                <Button variant="contained" style={{backgroundColor:'#658E9C'}} onClick={fetchData}>
                                    Follow
                                </Button>
                            </Grid>
                        </Grid>
                        {followMessage && (
                            <Dialog open={Boolean(followMessage)} onClose={handleCloseFollowMessage}>
                                <DialogTitle>Follow and track stocks</DialogTitle>
                                <DialogContent>
                                    <Typography>{followMessage}</Typography>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseFollowMessage} color="primary">
                                        Close
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        )}
                    </CardContent>
                </Card>

                {/* Stock Cards */}
                {stockDataList.map((stockData, index) => (
                    <Card key={index} style={{ marginBottom: '20px', position: 'relative', backgroundColor:'#002B36' }}>
                        <IconButton
                            aria-label="delete"
                            onClick={() => setDeleteDialogOpen(true)}
                            style={{ position: 'absolute', top: '5px', right: '5px', color: 'red' }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <CardContent>
                            <Typography variant="h6" gutterBottom style={{color:'#FFFFFF'}} >
                                {stockData.name}
                            </Typography>
                            <Typography variant="body1" style={{color:'#FFFFFF'}} >
                                Symbol: {stockData.ticker}
                            </Typography>
                            <Typography variant="body1" style={{color:'#FFFFFF'}} >
                                Current Price: {stockData.price}
                            </Typography>
                            {/* Add more data from the API response as needed */}
                        </CardContent>
                    </Card>
                ))}

                {/* Delete Confirmation Dialog */}
                <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                    <DialogTitle>Confirmation</DialogTitle>
                    <DialogContent>
                        <Typography>Are you sure you want to delete this stock card?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDeleteCard} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
};

export default StockCard;

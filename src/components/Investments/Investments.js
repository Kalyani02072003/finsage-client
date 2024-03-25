import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Card, CardContent, Grid, IconButton, Typography, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Navbar from '../HomePage/Navbar/Navbar';
const finnhub = require('finnhub');

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
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cnttknhr01qt3uhjnne0cnttknhr01qt3uhjnneg";
const finnhubClient = new finnhub.DefaultApi();

const InvestmentsComponent = () => {
    const [investments, setInvestments] = useState([]);
    const [stockSymbol, setStockSymbol] = useState('');
    const [quantity, setQuantity] = useState('');
    const [costPerUnit, setCostPerUnit] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'stockSymbol':
                setStockSymbol(value.toUpperCase());
                break;
            case 'quantity':
                setQuantity(value);
                break;
            case 'costPerUnit':
                setCostPerUnit(value);
                break;
            default:
                break;
        }
    };

    const handleAddInvestment = () => {
        finnhubClient.quote(stockSymbol, (error, data, response) => {
            if (error) {
                console.error(error);
                return;
            }
            const price = data.c;
            const investment = {
                stockSymbol,
                quantity: parseFloat(quantity),
                costPerUnit: parseFloat(costPerUnit),
                price,
            };
            setInvestments([...investments, investment]);
            setStockSymbol('');
            setQuantity('');
            setCostPerUnit('');
        });
    };

    const handleDeleteInvestment = (index) => {
        const updatedInvestments = [...investments];
        updatedInvestments.splice(index, 1);
        setInvestments(updatedInvestments);
    };

    const getEvaluationColor = (evaluation, investment) => {
        if (evaluation > investment) {
            return '#2ECC71';
        } else if (evaluation < investment) {
            return '#DC143C';
        } else {
            return '#555555';
        }
    };

    return (
        <>
            <Navbar />
            <div style={{ display: 'flex', flexDirection: 'column', 
            alignItems: 'center', paddingTop: '20px' }}>
                
                <Card style={{ maxWidth: 700, padding: 20, 
                    marginBottom: 20, backgroundColor:'#002B36', borderRadius:'10px' }}>
                    <Typography variant="h5" gutterBottom style={{color:'#FFFFFF'}}>
                        Add Investment
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <StyledTextField
                                label="Stock Symbol"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                name="stockSymbol"
                                value={stockSymbol}
                                onChange={handleChange}
                                
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <StyledTextField
                                label="Quantity"
                                type="number"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                name="quantity"
                                value={quantity}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: <Typography variant="body1" style={{color:'#FFFFFF'}}>$ </Typography>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <StyledTextField
                                label="Cost Per Unit"
                                type="number"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                name="costPerUnit"
                                value={costPerUnit}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: <Typography  style={{color:'#FFFFFF'}} variant="body1">$ </Typography>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" style={{backgroundColor:'#658E9C'}} onClick={handleAddInvestment}>
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </Card>

                {investments.map((investment, index) => {
                    const evaluation = investment.quantity * investment.price;
                    const investmentValue = investment.quantity * investment.costPerUnit;
                    const textColor = getEvaluationColor(evaluation, investmentValue);
                    return (
                        <Card key={index} style={{ maxWidth: 700, width: '100%', marginBottom: 20, 
                        position: 'relative', backgroundColor:'#002B36', borderRadius:'10px'}}>
                            <CardContent>
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => handleDeleteInvestment(index)}
                                    style={{ position: 'absolute', top: 0, right: 0, color: '#DC143C' }}
                                >
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant="h6" gutterBottom style={{color:'#F5F5F5'}}>
                                    {investment.stockSymbol}
                                </Typography>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" style={{color:'#FFFFFF'}}>
                                            Quantity: {investment.quantity}
                                        </Typography>
                                        <Typography variant="body2" style={{color:'#FFFFFF'}}>
                                            Cost Per Unit: {investment.costPerUnit}
                                        </Typography>
                                        <Typography variant="body2" style={{color:'#FFFFFF'}}>
                                            Current Price: {investment.price}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" style={{ color: textColor }}>
                                            Investment: {investmentValue}
                                        </Typography>
                                        <Typography variant="body2" style={{ color: textColor }}>
                                            Evaluation: {evaluation}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </>
    );
};

export default InvestmentsComponent;

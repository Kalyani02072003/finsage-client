import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Button, Link, Divider } from '@mui/material';

const finnhub = require('finnhub');

const StockNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleNewsCount, setVisibleNewsCount] = useState(3); // Initially show 3 news items
    const [showViewMore, setShowViewMore] = useState(true);

    useEffect(() => {
        const api_key = finnhub.ApiClient.instance.authentications['api_key'];
        api_key.apiKey = 'cnttknhr01qt3uhjnne0cnttknhr01qt3uhjnneg'; 
        const finnhubClient = new finnhub.DefaultApi();
        finnhubClient.marketNews("general", { token: api_key }, (error, data, response) => {
            if (error) {
                setError(error);
                setLoading(false);
            } else {
                setNews(data);
                setLoading(false);
                // If there are fewer than 10 news items, hide the "View More" button
                if (data.length <= visibleNewsCount) {
                    setShowViewMore(false);
                }
            }
        });
    }, []);

    const handleViewMore = () => {
        setVisibleNewsCount(prevCount => prevCount + 10);
        // If all news items are displayed, hide the "View More" button
        if (visibleNewsCount + 10 >= news.length) {
            setShowViewMore(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <Container maxWidth="md">
            <div className="stock-news">
                <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                    Stock News
                </Typography>
                {news.slice(0, visibleNewsCount).map((item, index) => (
                    <div key={index}>
                        <Card className="stock-news-card" style={{backgroundColor:'#002B36'}}
                        variant="outlined">
                            <CardContent>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div>
                                        <Typography variant="h6" style={{color:'#FFFFFF'}} gutterBottom>
                                            {item.headline}
                                        </Typography>
                                        <Typography variant="body1" style={{color:'#FFFFFF'}}>
                                            {item.summary}
                                        </Typography>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                    <Link href={item.url} style={{ textDecoration: 'none', color:'#4FB0C6'}} target="_blank" rel="noopener noreferrer">
                                        News Link
                                    </Link>
                                    <Typography variant="body2" style={{color:'#00BFB3'}}>
                                        {new Date(item.datetime * 1000).toLocaleDateString()}
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                        {index < news.length - 1 && <Divider style={{ margin: '20px 0' }} />} {/* Add spacing */}
                    </div>
                ))}
                {showViewMore && 
                    <Button onClick={handleViewMore} variant="contained" fullWidth style={{marginBottom:'30px', backgroundColor:'#658E9C'}}>
                        View More
                    </Button>
                }
            </div>
        </Container>
    );
};

export default StockNews;

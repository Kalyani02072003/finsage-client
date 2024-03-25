import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Box } from "@mui/material";

function RecommendationCard({ symbol }) {
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol}&token=cnttknhr01qt3uhjnne0cnttknhr01qt3uhjnneg`);
        const data = response.data[0]; // Get the first recommendation
        setRecommendation(data);
      } catch (error) {
        console.error("Error fetching recommendation data:", error);
      }
    }

    fetchData();
  }, [symbol]);

  return (
    <Card variant="outlined" style={{ margin: "20px auto", width: "80%", maxWidth: 700, backgroundColor:'#002B36' }}>
      <CardContent>
        {recommendation && (
          <>
            <Typography variant="h6" align="left" style={{color:'#FFFFFF'}}>{symbol}</Typography>
            <hr style={{ margin: "10px 0" }} />
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box textAlign="center" flex="1">
                <Typography variant="subtitle1" style={{ color: "#2ECC71" }}>BUY</Typography>
                <Typography variant="body1" style={{ color: "#2ECC71" }}>{recommendation.buy}</Typography>
              </Box>
              <Box textAlign="center" flex="1">
                <Typography variant="subtitle1" style={{ color: "#FFD700" }}>HOLD</Typography>
                <Typography variant="body1" style={{ color: "#FFD700" }}>{recommendation.hold}</Typography>
              </Box>
              <Box textAlign="center" flex="1">
                <Typography variant="subtitle1" style={{ color: "#DC143C" }}>SELL</Typography>
                <Typography variant="body1" style={{ color: "#DC143C" }}>{recommendation.sell}</Typography>
              </Box>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function RecommendationContainer() {
  const companies = [ "NDAQ", "NVDA", "AMD"];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h5" style={{ color: "#999", borderBottom: "1px solid #999", paddingBottom: "5px", marginBottom: "20px" }}>STOCK RECOMMENDATIONS</Typography>
      {companies.map((company, index) => (
        <RecommendationCard key={index} symbol={company} />
      ))}
    </div>
  );
}

export default RecommendationContainer;

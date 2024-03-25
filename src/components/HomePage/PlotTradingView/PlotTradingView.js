import React, { useEffect, useState } from 'react';
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

const PlotTradingView = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch CSV data or load it from your local storage
    // Example: Fetching CSV data using `fetch` API
    fetch('/home/kalyani/Downloads/stocks/archive/Adamis Pharmaceuticals Corporationstock.csv')
      .then((response) => response.text())
      .then((csvData) => {
        // Process CSV data and use it to set the chart data
        const parsedData = parseCSV(csvData);
        setChartData(parsedData);
      })
      .catch((error) => console.error('Error fetching CSV data:', error));
  }, []);

  const parseCSV = (csvData) => {
    // Implement CSV parsing logic as needed
    // Example: Split lines, extract values, etc.
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    const parsedData = lines.slice(1).map((line) => {
      const values = line.split(',');
      const dataObject = {};
      headers.forEach((header, index) => {
        dataObject[header.trim()] = values[index].trim();
      });
      return dataObject;
    });
    return parsedData;
  };

  return (
    <div style={{ height:'900px',maxWidth: '1200px', margin: 'auto', marginTop:'40px', marginBottom:'40px'}}>
      <AdvancedRealTimeChart
        symbol="AAPL"
        interval="D"
        timezone="Etc/UTC"
        theme="dark"
        style="1"
        locale="en"
        toolbar_bg="#f1f3f6"
        enable_publishing={false}
        withdateranges={true}
        autosize={true}
        studies_overrides={{
          'mainSeriesProperties.candleStyle.upColor': '#00FF00',
          'mainSeriesProperties.candleStyle.downColor': '#FF0000',
        }}
        data={chartData}
      />
    </div>
  );
};

export default PlotTradingView;

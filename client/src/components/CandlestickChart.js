import React from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ChartContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const InfoContainer = styled.div`
  flex: 0.3;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    display: none;
  }
`;

const CandlestickChart = ({ data }) => {
  const transformData = (data) => {
    const candlestickData = {
      x: [],
      open: [],
      high: [],
      low: [],
      close: [],
    };
    data.forEach((item) => {
      candlestickData.x.push(item.fullDate);
      candlestickData.open.push(item.open);
      candlestickData.high.push(item.high);
      candlestickData.low.push(item.low);
      candlestickData.close.push(item.close);
    });
    return [candlestickData];
  };

  const startDateIndex = Math.max(data.length - 81, 0);
  const startDate = data.length > 0 ? data[startDateIndex].fullDate : null;
  const endDate = data.length > 0 ? data[data.length - 1].fullDate : null;
  const recentData = data.length > 0 ? data[data.length - 1] : null;

  let minPrice = null;
  let maxPrice = null;
  if (recentData) {
    const priceRange = (recentData.high - recentData.low) * 10;
    minPrice = recentData.low - priceRange;
    maxPrice = recentData.high + priceRange;
  }

const layout = {
  xaxis: {
    title: 'Date',
    type: 'date',
    range: [startDate, endDate],
    tickformat: '%Y-%m-%d',
    showgrid: true,
    zeroline: false,
    tickangle: 0,
  },
  yaxis: {
    title: 'Price',
    range: [minPrice, maxPrice],
    tickformat: '.2f',
    showgrid: true,
    zeroline: false,
    fixedrange: false,
  },
  dragmode: 'pan',
  hovermode: 'closest',
  plot_bgcolor: '#f9f9f9',
  paper_bgcolor: '#ffffff',
  shapes: recentData
    ? [
        {
          type: 'line',
          xref: 'paper',
          x0: 0,
          x1: 1,
          yref: 'y',
          y0: recentData.high,
          y1: recentData.high,
          line: {
            color: '#008000',
            width: 1,
            dash: 'dot',
          },
        },
      ]
    : [],
  annotations: recentData
    ? [
        {
          xref: 'paper',
          x: 1,
          xanchor: 'left',
          yref: 'y',
          y: recentData.close,
          yanchor: 'middle',
          text: recentData.close.toFixed(2),
          showarrow: true,
          arrowhead: 0,
          ax: 0,
          ay: 0,
        },
      ]
    : [],
};

const transformedData = transformData(data);

return (
  <Container>
    <ChartContainer>
      <Plot
        data={[
          {
            type: 'candlestick',
            x: transformedData[0].x,
            open: transformedData[0].open,
            high: transformedData[0].high,
            low: transformedData[0].low,
            close: transformedData[0].close,
            increasing: {
              line: {
                color: '#008000',
              },
              fillcolor: '#008000',
            },
            decreasing: {
              line: {
                color: '#FF0000',
              },
              fillcolor: '#FF0000',
            },
            hoverinfo: 'text',
            hoverlabel: {
              bgcolor: '#ffffff',
              font: {
                family: 'Arial',
                size: 12,
                color: '#333333',
              },
            },
            text: data.map(
              (item) =>
                `Date: ${item.fullDate}<br>Open: ${item.open}<br>High: ${item.high}<br>Low: ${item.low}<br>Close: ${item.close}`
            ),
          },
        ]}
        layout={layout}
        config={{
          responsive: true,
          scrollZoom: true,
        }}
        style={{
          width: '100%',
          height: '600px',
        }}
      />
    </ChartContainer>
    <InfoContainer>
      <h3>Additional Information</h3>
      {recentData && (
        <div>
          <p>Recent Data</p>
          <p>Date: {recentData.fullDate}</p>
          <p>Open: {recentData.open}</p>
          <p>High: {recentData.high}</p>
          <p>Low: {recentData.low}</p>
          <p>Close: {recentData.close}</p>
        </div>
      )}
    </InfoContainer>
  </Container>
);
};

export default CandlestickChart;
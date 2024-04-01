import React from 'react';
import DataList from './DataList';
import CandlestickChart from './CandlestickChart';
import styled from 'styled-components';
import { FaSpinner } from 'react-icons/fa';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ChartContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 24px;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: #ff0000;
`;

const Dashboard = ({ data, onSymbolSelect, selectedSymbol, isLoading, error }) => {
  return (
    <DashboardContainer>
      <DataList onSymbolSelect={onSymbolSelect} selectedSymbol={selectedSymbol} />
      <ChartContainer>
        {isLoading ? (
          <LoadingIndicator>
            <FaSpinner />
            Loading...
          </LoadingIndicator>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <CandlestickChart data={data} />
        )}
      </ChartContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
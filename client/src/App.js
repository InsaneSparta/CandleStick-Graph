import React, { useState, useEffect } from 'react';
import { fetchBtcusdData, fetchEurusdData } from './utils/api';
import Dashboard from './components/Dashboard';
import GlobalStyles from './components/GlobalStyles';
import styled from 'styled-components';

const AppContainer = styled.div`
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

function App() {
  const [data, setData] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState('BTCUSD');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const fetchFunction = selectedSymbol === 'BTCUSD' ? fetchBtcusdData : fetchEurusdData;
        const data = await fetchFunction();
        setData(data);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedSymbol]);

  const handleSymbolSelect = (symbol) => {
    setSelectedSymbol(symbol);
  };

  return (
    <AppContainer>
      <GlobalStyles />
      <Dashboard
        data={data}
        onSymbolSelect={handleSymbolSelect}
        selectedSymbol={selectedSymbol}
        isLoading={isLoading}
        error={error}
      />
    </AppContainer>
  );
}

export default App;
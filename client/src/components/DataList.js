import React from 'react';
import styled from 'styled-components';

const DataListContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const SymbolButton = styled.button`
  background-color: ${(props) => (props.isSelected ? '#007bff' : '#f5f5f5')};
  color: ${(props) => (props.isSelected ? '#ffffff' : '#333333')};
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.isSelected ? '#0056b3' : '#e9e9e9')};
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const DataList = ({ onSymbolSelect, selectedSymbol }) => {
  const handleSymbolClick = (symbol) => {
    onSymbolSelect(symbol);
  };

  return (
    <DataListContainer>
      <SymbolButton
        isSelected={selectedSymbol === 'BTCUSD'}
        onClick={() => handleSymbolClick('BTCUSD')}
      >
        BTCUSD
      </SymbolButton>
      <SymbolButton
        isSelected={selectedSymbol === 'EURUSD'}
        onClick={() => handleSymbolClick('EURUSD')}
      >
        EURUSD
      </SymbolButton>
    </DataListContainer>
  );
};

export default DataList;
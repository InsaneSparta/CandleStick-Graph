import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const fetchBtcusdData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/btcusd`);
    return response.data;
  } catch (error) {
    console.error('Error fetching BTCUSD data:', error);
    throw error;
  }
};

export const fetchEurusdData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/eurusd`);
    return response.data;
  } catch (error) {
    console.error('Error fetching EURUSD data:', error);
    throw error;
  }
};


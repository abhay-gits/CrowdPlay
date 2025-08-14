import axios from 'axios';

const isProduction = import.meta.env.PROD;

const api = axios.create({
  baseURL: isProduction ? import.meta.env.VITE_API_URL : "http://localhost:3000/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

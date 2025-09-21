import axios from 'axios';

// Determine the base URL based on the environment
const baseURL = import.meta.env.DEV
  ? 'http://localhost:5000/api' // Development URL
  : `${import.meta.env.VITE_API_URL}/api`; // Production URL from Vercel

// Create a pre-configured axios instance
const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
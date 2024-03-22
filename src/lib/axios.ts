import axios from "axios";

const BASE_URL = process.env.API_BASE_URL || 'https://marketingcompany.tech';
// const BASE_URL = process.env.API_BASE_URL || 'http://localhost:5500';

export default axios.create(
  {
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  }
)

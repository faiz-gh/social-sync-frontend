import axios from "axios";

const BASE_URL = process.env.API_BASE_URL || 'http://marketingcompany.tech';

export default axios.create(
  {
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  }
)

import axios from 'axios';

// Set up the base URL for all requests
const http = axios.create({
//   baseURL: 'http://localhost:9000', // Replace with your API's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
http.interceptors.request.use(
  config => {
    // Do something before the request is sent, e.g., add a token to headers
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Token = `${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Handle response errors here
    if (error.response.status === 401) {
      // Handle unauthorized error
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default http;

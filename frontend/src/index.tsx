import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UNSAFE_DataRouterContext, UNSAFE_DataRouterStateContext, UNSAFE_NavigationContext, UNSAFE_LocationContext, UNSAFE_RouteContext } from 'react-router-dom';
import axios from 'axios';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.timeout = 10000; // 10 seconds timeout

// Add response interceptor for global error handling
axios.interceptors.response.use(
  response => response,
  error => {
    // Log all API errors to console
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('API Request Error:', error.request);
    } else {
      console.error('Axios Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Configure React Router future flags to fix warnings
// These flags should be in a separate router config, but for a quick fix we're setting them globally
(window as any).__reactRouterFutureFlags = {
  v7_startTransition: true,
  v7_relativeSplatPath: true
};

// Error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('API Request Error:', event.reason);
  // Prevent the default browser behavior (console error) 
  // as we've already logged it in our format
  event.preventDefault();
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 
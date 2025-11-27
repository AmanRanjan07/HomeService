import axios from 'axios';
import mockServices from './mockServices';

// Flag to determine if using mock data
let isUsingMockData = false;
let connectionErrorLogged = false; // To prevent multiple error logs

// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Check if the server is available
const checkServerAvailability = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services`, { 
      timeout: 3000,
      // Add cache busting parameter to prevent caching
      params: { ts: new Date().getTime() }
    });
    
    if (response.status === 200) {
      if (isUsingMockData) {
        console.log('✅ Successfully connected to backend server');
      }
      isUsingMockData = false;
      connectionErrorLogged = false; // Reset error log flag when connection succeeds
      return true;
    }
    return false;
  } catch (error) {
    // Only log first time to avoid console spam
    if (!connectionErrorLogged) {
      console.warn('Backend server is not available, using mock data. To resolve this, please start the backend server by running one of the server scripts in the backend folder.');
      connectionErrorLogged = true;
    }
    isUsingMockData = true;
    return false;
  }
};

// Initial check
checkServerAvailability();

// Setup periodic check for server availability
setInterval(() => {
  if (isUsingMockData) {
    checkServerAvailability(); // Only check if we're currently using mock data
  }
}, 5000); // Check every 5 seconds if we're in mock mode

// Service endpoints
export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    PROFILE: `${API_BASE_URL}/auth/profile`,
  },
  SERVICES: {
    LIST: `${API_BASE_URL}/services`,
    DETAILS: (id: string) => `${API_BASE_URL}/services/${id}`,
    CATEGORIES: `${API_BASE_URL}/services/categories`,
  },
  BOOKINGS: {
    CREATE: `${API_BASE_URL}/bookings`,
    USER_BOOKINGS: `${API_BASE_URL}/bookings/user`,
    DETAILS: (id: string) => `${API_BASE_URL}/bookings/${id}`,
    CANCEL: (id: string) => `${API_BASE_URL}/bookings/${id}/cancel`,
  },
  REVIEWS: {
    CREATE: (serviceId: string) => `${API_BASE_URL}/services/${serviceId}/reviews`,
    LIST: (serviceId: string) => `${API_BASE_URL}/services/${serviceId}/reviews`,
  },
  USER: {
    PROFILE: `${API_BASE_URL}/users/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/users/profile`,
    CHANGE_PASSWORD: `${API_BASE_URL}/users/password`,
  },
};

// Generic API request method
export const apiRequest = async <T>(
  method: string,
  url: string,
  data?: any,
  headers?: any,
  retryCount: number = 0
): Promise<T> => {
  try {
    // If using mock data, don't make actual requests
    if (isUsingMockData) {
      throw new Error('Using mock data - server unavailable');
    }

    const config = {
      method,
      url,
      data,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      timeout: 5000, // Add timeout to avoid long hanging requests
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Only log real server responses (not connection errors)
      console.error('API Error:', error.response.status, error.response.data);
      throw error.response.data;
    } else if (axios.isAxiosError(error) && error.code === 'ECONNREFUSED' && retryCount < 1) {
      // If first connection attempt fails, check server availability once
      await checkServerAvailability();
      
      // If server is now available, retry the request once
      if (!isUsingMockData) {
        return apiRequest(method, url, data, headers, retryCount + 1);
      } else {
        isUsingMockData = true; // Set to mock mode
      }
    } else if (axios.isAxiosError(error) && error.code === 'ETIMEDOUT' && retryCount < 1) {
      // Retry once on timeout
      await checkServerAvailability();
      
      if (!isUsingMockData) {
        return apiRequest(method, url, data, headers, retryCount + 1);
      } else {
        isUsingMockData = true; // Set to mock mode
      }
    }
    
    // Only log detailed error for non-retries to prevent duplicate messages
    if (retryCount === 0) {
      console.error('API Request failed:', error instanceof Error ? error.message : 'Unknown error');
    }
    
    throw error;
  }
};

// Authorization header creator
export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Service-specific API methods
export const serviceAPI = {
  getAll: async () => {
    try {
      if (!isUsingMockData) {
        try {
          return await apiRequest<any[]>('get', ENDPOINTS.SERVICES.LIST, null, getAuthHeader());
        } catch (error) {
          // If request fails, use mock data
          console.warn('Failed to fetch services, using mock data');
          isUsingMockData = true;
        }
      }
      // Return mock data
      return mockServices;
    } catch (error) {
      console.error('Service getAll error:', error);
      // Return mock data as fallback even if there was an error
      return mockServices;
    }
  },
  
  getById: async (id: string) => {
    try {
      if (!isUsingMockData) {
        try {
          return await apiRequest('get', ENDPOINTS.SERVICES.DETAILS(id), null, getAuthHeader());
        } catch (error) {
          isUsingMockData = true;
        }
      }
      return mockServices.find(service => service.id === id) || null;
    } catch (error) {
      console.error(`Failed to get service ${id}:`, error);
      return mockServices.find(service => service.id === id) || null;
    }
  },
  
  getCategories: async () => {
    try {
      if (!isUsingMockData) {
        try {
          return await apiRequest<string[]>('get', ENDPOINTS.SERVICES.CATEGORIES, null, getAuthHeader());
        } catch (error) {
          isUsingMockData = true;
        }
      }
      // Extract unique categories from mock services
      const categories = Array.from(new Set(mockServices.map(service => service.category)));
      return categories;
    } catch (error) {
      console.error('Failed to get categories:', error);
      const categories = Array.from(new Set(mockServices.map(service => service.category)));
      return categories;
    }
  },
};

export const bookingAPI = {
  create: async (bookingData: any) => {
    return apiRequest('post', ENDPOINTS.BOOKINGS.CREATE, bookingData, getAuthHeader());
  },
  
  getUserBookings: async () => {
    return apiRequest<any[]>('get', ENDPOINTS.BOOKINGS.USER_BOOKINGS, null, getAuthHeader());
  },
  
  getDetails: async (id: string) => {
    return apiRequest('get', ENDPOINTS.BOOKINGS.DETAILS(id), null, getAuthHeader());
  },
  
  cancelBooking: async (id: string) => {
    return apiRequest('put', ENDPOINTS.BOOKINGS.CANCEL(id), null, getAuthHeader());
  },
};

export const userAPI = {
  getProfile: async () => {
    return apiRequest('get', ENDPOINTS.USER.PROFILE, null, getAuthHeader());
  },
  
  updateProfile: async (userData: any) => {
    return apiRequest('put', ENDPOINTS.USER.UPDATE_PROFILE, userData, getAuthHeader());
  },
  
  changePassword: async (passwordData: { currentPassword: string; newPassword: string }) => {
    return apiRequest('put', ENDPOINTS.USER.CHANGE_PASSWORD, passwordData, getAuthHeader());
  },
};

export const reviewAPI = {
  createReview: async (serviceId: string, reviewData: any) => {
    return apiRequest('post', ENDPOINTS.REVIEWS.CREATE(serviceId), reviewData, getAuthHeader());
  },
  
  getServiceReviews: async (serviceId: string) => {
    return apiRequest<any[]>('get', ENDPOINTS.REVIEWS.LIST(serviceId), null, getAuthHeader());
  },
};

// Method to check if using mock data
export const getIsUsingMockData = () => isUsingMockData;

export default {
  service: serviceAPI,
  booking: bookingAPI,
  user: userAPI,
  review: reviewAPI,
  isUsingMockData: getIsUsingMockData
}; 
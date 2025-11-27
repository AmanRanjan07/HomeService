import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { mockLogin, mockRegister, checkExistingAuth } from '../services/mockAuthService';

// Define API URL configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Setup API endpoints
const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    PROFILE: `${API_BASE_URL}/auth/profile`,
  },
  SERVICES: {
    LIST: `${API_BASE_URL}/services`,
    DETAILS: (id: string) => `${API_BASE_URL}/services/${id}`,
  },
  BOOKINGS: {
    CREATE: `${API_BASE_URL}/bookings`,
    USER_BOOKINGS: `${API_BASE_URL}/bookings/user`,
    DETAILS: (id: string) => `${API_BASE_URL}/bookings/${id}`,
    CANCEL: (id: string) => `${API_BASE_URL}/bookings/${id}/cancel`,
  }
};

// Setup API request handler with error handling
const apiRequest = async (method: string, url: string, data?: any, headers?: any) => {
  try {
    const config = {
      method,
      url,
      data,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };
    
    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data.message || error.response.data;
        console.error('API Error:', errorMessage);
        throw new Error(errorMessage);
      } else if (error.request) {
        // Request made but no response received
        console.error('No response received:', error.request);
        throw new Error('No response received from server. Please try again later.');
      }
    }
    // Something else went wrong
    console.error('API Request failed:', error);
    throw new Error('An unexpected error occurred. Please try again later.');
  }
};

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userRole: string | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  register: (userData: any) => Promise<User>;
  getServices: () => Promise<any[]>;
  getServiceDetails: (serviceId: string) => Promise<any>;
  createBooking: (bookingData: any) => Promise<any>;
  getUserBookings: () => Promise<any[]>;
  isUsingMockData: boolean; // New flag to indicate if using mock data
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Setup axios interceptors
const setupAxiosInterceptors = () => {
  // Request interceptor for adding token
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor for handling errors
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Auto logout on auth error
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isUsingMockData, setIsUsingMockData] = useState<boolean>(false);

  // Check if the server is available
  const checkServerAvailability = async (): Promise<boolean> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/services`, { 
        timeout: 3000,
        // Add cache busting parameter to prevent caching
        params: { ts: new Date().getTime() }
      });
      
      if (response.status === 200) {
        setIsUsingMockData(false);
        return true;
      }
      return false;
    } catch (error) {
      console.warn('Backend server is not available, using mock data. To resolve this, please start the backend server by running one of the server scripts in the backend folder.');
      setIsUsingMockData(true);
      return false;
    }
  };

  useEffect(() => {
    // Initialize axios interceptors
    setupAxiosInterceptors();
    
    // Check if user is logged in on component mount
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && typeof parsedUser === 'object') {
          setUser(parsedUser);
          setIsAuthenticated(true);
          setUserRole(parsedUser.role);
        } else {
          // Invalid user data, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }

    // Check server availability
    checkServerAvailability();
    
    // Setup periodic check for server availability if using mock data
    const interval = setInterval(() => {
      if (isUsingMockData) {
        checkServerAvailability();
      }
    }, 10000); // Check every 10 seconds if we're in mock mode
    
    return () => clearInterval(interval);
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      // Try to use the real API first
      if (!isUsingMockData) {
        try {
          const data = await apiRequest('post', API_ENDPOINTS.AUTH.LOGIN, { email, password });
          
          const { token, user } = data || {};
          
          if (!token || !user || !user.role) {
            throw new Error('Invalid login response: missing token or user data');
          }
          
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          
          setUser(user);
          setIsAuthenticated(true);
          setUserRole(user.role);
          
          return user;
        } catch (error) {
          // If the server request fails, fall back to mock data
          console.warn('Failed to login via API, falling back to mock data:', error);
          setIsUsingMockData(true);
          // Continue to mock login below
        }
      }
      
      // Use mock login if server is not available or previous request failed
      const mockResponse = await mockLogin(email, password);
      
      localStorage.setItem('token', mockResponse.token);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));
      
      setUser(mockResponse.user);
      setIsAuthenticated(true);
      setUserRole(mockResponse.user.role);
      
      return mockResponse.user;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    setUser(null);
    setIsAuthenticated(false);
    setUserRole(null);
  };

  const register = async (userData: any): Promise<User> => {
    try {
      // Try to use the real API first
      if (!isUsingMockData) {
        try {
          const data = await apiRequest('post', API_ENDPOINTS.AUTH.REGISTER, userData);
          
          const { token, user } = data || {};
          
          if (!token || !user || !user.role) {
            throw new Error('Invalid registration response: missing token or user data');
          }
          
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          
          setUser(user);
          setIsAuthenticated(true);
          setUserRole(user.role);
          
          return user;
        } catch (error) {
          // If the server request fails, fall back to mock data
          console.warn('Failed to register via API, falling back to mock data:', error);
          setIsUsingMockData(true);
          // Continue to mock registration below
        }
      }
      
      // Use mock registration if server is not available or previous request failed
      const mockResponse = await mockRegister(userData);
      
      localStorage.setItem('token', mockResponse.token);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));
      
      setUser(mockResponse.user);
      setIsAuthenticated(true);
      setUserRole(mockResponse.user.role);
      
      return mockResponse.user;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  // Mock service data to use when server is unavailable
  const mockServices = [
    {
      id: '1',
      name: 'Home Cleaning',
      description: 'Professional home cleaning services',
      category: 'CLEANING',
      price: 80.0,
      imageUrl: 'https://via.placeholder.com/300x200?text=Home+Cleaning'
    },
    {
      id: '2',
      name: 'Plumbing',
      description: 'Expert plumbing repair and installation',
      category: 'REPAIRS',
      price: 100.0,
      imageUrl: 'https://via.placeholder.com/300x200?text=Plumbing'
    },
    {
      id: '3',
      name: 'Electrical Work',
      description: 'Certified electricians for all your needs',
      category: 'REPAIRS',
      price: 120.0,
      imageUrl: 'https://via.placeholder.com/300x200?text=Electrical+Work'
    },
    {
      id: '4',
      name: 'Gardening',
      description: 'Lawn and garden maintenance',
      category: 'OUTDOOR',
      price: 70.0,
      imageUrl: 'https://via.placeholder.com/300x200?text=Gardening'
    },
    {
      id: '5',
      name: 'Painting',
      description: 'Interior and exterior painting services',
      category: 'HOME_IMPROVEMENT',
      price: 95.0,
      imageUrl: 'https://via.placeholder.com/300x200?text=Painting'
    }
  ];

  // Add service-related methods
  const getServices = async () => {
    try {
      if (!isUsingMockData) {
        try {
          return await apiRequest('get', API_ENDPOINTS.SERVICES.LIST);
        } catch (error) {
          console.warn('Failed to fetch services via API, falling back to mock data:', error);
          setIsUsingMockData(true);
        }
      }
      // Return mock data if server is not available
      return mockServices;
    } catch (error) {
      console.error('Failed to fetch services:', error);
      throw error;
    }
  };

  const getServiceDetails = async (serviceId: string) => {
    try {
      if (!isUsingMockData) {
        try {
          return await apiRequest('get', API_ENDPOINTS.SERVICES.DETAILS(serviceId));
        } catch (error) {
          console.warn(`Failed to fetch service ${serviceId} via API, falling back to mock data:`, error);
          setIsUsingMockData(true);
        }
      }
      // Return mock data if server is not available
      return mockServices.find(service => service.id === serviceId) || null;
    } catch (error) {
      console.error(`Failed to fetch service ${serviceId}:`, error);
      throw error;
    }
  };

  // Types for mock data
  interface MockBooking {
    id: string;
    userId: string | undefined;
    serviceId: string;
    date: string;
    time: string;
    status: string;
    createdAt: string;
  }

  // Mock bookings data
  const mockBookings: MockBooking[] = [];

  // Add booking-related methods
  const createBooking = async (bookingData: any) => {
    try {
      if (!isUsingMockData) {
        try {
          return await apiRequest('post', API_ENDPOINTS.BOOKINGS.CREATE, bookingData);
        } catch (error) {
          console.warn('Failed to create booking via API, falling back to mock data:', error);
          setIsUsingMockData(true);
        }
      }
      
      // Create a mock booking if server is not available
      const mockBooking = {
        id: Date.now().toString(),
        userId: user?.id,
        serviceId: bookingData.serviceId,
        date: bookingData.date,
        time: bookingData.time,
        status: 'PENDING',
        createdAt: new Date().toISOString()
      };
      
      mockBookings.push(mockBooking);
      return mockBooking;
    } catch (error) {
      console.error('Failed to create booking:', error);
      throw error;
    }
  };

  const getUserBookings = async () => {
    try {
      if (!isUsingMockData) {
        try {
          return await apiRequest('get', API_ENDPOINTS.BOOKINGS.USER_BOOKINGS);
        } catch (error) {
          console.warn('Failed to fetch user bookings via API, falling back to mock data:', error);
          setIsUsingMockData(true);
        }
      }
      
      // Return mock bookings for this user if server is not available
      return mockBookings.filter(booking => booking.userId === user?.id) || [];
    } catch (error) {
      console.error('Failed to fetch user bookings:', error);
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated,
    userRole,
    login,
    logout,
    register,
    getServices,
    getServiceDetails,
    createBooking,
    getUserBookings,
    isUsingMockData
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 
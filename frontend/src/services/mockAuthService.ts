// Mock Auth Service - Provides authentication functionality without backend dependency
// This file simulates backend responses for authentication operations

// Types
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone?: string;
  address?: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

// Mock database of users (stored in localStorage)
const STORAGE_KEY = 'mock_users_db';

// Initialize mock user database if it doesn't exist
const initMockDatabase = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    const initialUsers = [
      {
        id: '1',
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password', // In a real app, this would be hashed
        role: 'USER',
        phone: '555-1234',
        address: '123 Main St'
      },
      {
        id: '2',
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
        password: 'admin123',
        role: 'ADMIN',
        phone: '555-5678',
        address: '456 Admin St'
      },
      {
        id: '3',
        email: 'provider@example.com',
        firstName: 'Service',
        lastName: 'Provider',
        password: 'provider123',
        role: 'SERVICE_PROVIDER',
        phone: '555-9012',
        address: '789 Service Ave'
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialUsers));
  }
};

// Get users from local storage
const getUsers = (): any[] => {
  initMockDatabase();
  const usersJson = localStorage.getItem(STORAGE_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

// Save users to local storage
const saveUsers = (users: any[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

// Generate a random token (simplified)
const generateToken = (): string => {
  return 'mock_token_' + Math.random().toString(36).substring(2);
};

// Mock login function
export const mockLogin = async (email: string, password: string): Promise<AuthResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user || user.password !== password) {
    throw new Error('Invalid email or password');
  }
  
  // Generate token and create response (exclude password)
  const { password: _, ...userWithoutPassword } = user;
  const token = generateToken();
  
  return {
    token,
    user: userWithoutPassword
  };
};

// Mock register function
export const mockRegister = async (userData: any): Promise<AuthResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const users = getUsers();
  
  // Check if email already exists
  if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
    throw new Error('Email already in use');
  }
  
  // Create new user
  const newUser = {
    id: Date.now().toString(),
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
    password: userData.password, // Would be hashed in real app
    role: userData.role || 'USER',
    phone: userData.phone || '',
    address: userData.address || ''
  };
  
  // Save user to "database"
  users.push(newUser);
  saveUsers(users);
  
  // Return user data without password
  const { password: _, ...userWithoutPassword } = newUser;
  const token = generateToken();
  
  return {
    token,
    user: userWithoutPassword
  };
};

// Check if user is already logged in
export const checkExistingAuth = (): { user: User | null; token: string | null } => {
  const storedUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  
  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    token
  };
};

// Export default object
export default {
  mockLogin,
  mockRegister,
  checkExistingAuth
}; 
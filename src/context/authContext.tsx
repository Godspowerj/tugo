"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authApi, AuthResponse } from "@/src/api/authApi";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
}

interface AuthContextType {
  // User State
  user: User | null;
  setUser: (user: User | null) => void;

  // Auth State
  isAuthenticated: boolean;
  isLoading: boolean;

  // Token Management
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;

  // Auth Methods
  login: (email: string, password: string, acceptCookies?: boolean) => Promise<void>;
  signup: (email: string, password: string, fullName: string, university?: string, acceptCookies?: boolean) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      const userData = localStorage.getItem('user');

      console.log('AuthContext - checkAuth - Token:', token);
      console.log('AuthContext - checkAuth - UserData:', userData);

      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          console.log('AuthContext - checkAuth - Parsed User:', parsedUser);
          setAccessToken(token);
          setUser(parsedUser);
        } catch (e) {
          console.error('AuthContext - checkAuth - JSON Parse Error:', e);
        }
      } else {
        console.log('AuthContext - checkAuth - No token or user data found');
      }
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string, acceptCookies = true) => {
    setIsLoading(true);
    try {
      const response: AuthResponse = await authApi.login({
        email,
        password,
        acceptCookies
      });

      if (response.success) {
        // Save token and user data
        const token = response.accessToken;
        const userData: User = {
          id: response.data.id.toString(),
          email: response.data.email,
          fullName: response.data.fullName,
        };

        console.log('AuthContext - Login Success - Setting User:', userData);

        setAccessToken(token);
        setUser(userData);

        localStorage.setItem('accessToken', token);
        localStorage.setItem('user', JSON.stringify(userData));

        toast.success('Login successful!');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    email: string,
    password: string,
    fullName: string,
    university?: string,
    acceptCookies = true
  ) => {
    setIsLoading(true);
    try {
      const response: AuthResponse = await authApi.signup({
        email,
        password,
        fullName,
        university,
        acceptCookies
      });

      if (response.success) {
        // Save token and user data
        const token = response.accessToken;
        const userData: User = {
          id: response.data.id.toString(),
          email: response.data.email,
          fullName: response.data.fullName,
        };

        setAccessToken(token);
        setUser(userData);

        localStorage.setItem('accessToken', token);
        localStorage.setItem('user', JSON.stringify(userData));

        toast.success('Account created successfully!');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setAccessToken(null);
      toast.info('Logged out successfully');
    }
  };

  const contextValue: AuthContextType = {
    user,
    setUser,
    isAuthenticated: !!user,
    isLoading,
    accessToken,
    setAccessToken,
    login,
    signup,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

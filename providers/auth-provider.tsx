'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  // Keep these for compatibility with existing UI
  data: { user: User | null } | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('auth-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Mock authentication - replace with your API call
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

    if (email === 'demo@kt.com' && password === 'demo123') {
      const mockUser: User = {
        id: '1',
        email: 'demo@kt.com',
        name: 'Demo User',
        avatar: '/media/avatars/300-2.png',
      };

      setUser(mockUser);
      localStorage.setItem('auth-user', JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth-user');
  };

  // Compatibility properties for existing UI components
  const data = user ? { user } : null;
  const status = isLoading
    ? 'loading'
    : user
      ? 'authenticated'
      : 'unauthenticated';

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        data,
        status,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// For compatibility with NextAuth useSession hook
export function useSession() {
  const { data, status } = useAuth();
  return { data, status };
}

// Mock signIn function for compatibility
export async function signIn(
  provider: string,
  options?: Record<string, unknown>,
) {
  // Suppress unused parameter warning
  void options;

  if (provider === 'credentials') {
    // This will be handled by your login form
    return { error: null };
  }
  if (provider === 'google') {
    // Mock Google sign in - replace with your implementation
    console.log('Google sign in clicked - implement your Google auth here');
    return { error: null };
  }
  return { error: 'Provider not supported' };
}

// Mock signOut function for compatibility
export function signOut() {
  // For compatibility, we'll handle logout through the context directly
  const authUser = localStorage.getItem('auth-user');
  if (authUser) {
    localStorage.removeItem('auth-user');
    window.location.reload(); // Force a reload to update the auth state
  }
}

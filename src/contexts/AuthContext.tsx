import React from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  userName: string | null;
  login: (username: string, password: string, role: string) => boolean;
  logout: () => void;
  register: (username: string, password: string, role: string) => boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// Mock user database
const mockUsers = [
  { username: 'Yograj', password: '1234', role: 'user' },
  { username: 'admin', password: 'admin', role: 'admin' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [userRole, setUserRole] = React.useState<string | null>(null);
  const [userName, setUserName] = React.useState<string | null>(null);

  React.useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedRole = localStorage.getItem('userRole');
    const storedName = localStorage.getItem('userName');

    if (storedAuth === 'true' && storedRole && storedName) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
      setUserName(storedName);
    }
  }, []);

  const login = (username: string, password: string, role: string): boolean => {
    // Always allow login with any credentials
    if (username && password) {
      setIsAuthenticated(true);
      setUserRole(role);
      setUserName(username);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', role);
      localStorage.setItem('userName', username);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserName(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
  };

  const register = (username: string, password: string, role: string): boolean => {
    // Check if username already exists
    if (mockUsers.some(u => u.username === username)) {
      return false;
    }
    
    // In a real app, this would be an API call
    mockUsers.push({ username, password, role });
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        userName,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 
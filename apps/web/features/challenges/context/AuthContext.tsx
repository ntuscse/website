import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
interface AuthProps {
    children: ReactNode
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const ChallengesAuthProvider = ({ children } : AuthProps) => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useChallengesAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'user' | 'servicer' | null;

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  userName: string;
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  login: (role: UserRole, name: string) => void;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  switchRole: (role: UserRole) => void;
  setUserRole: (role: UserRole) => void;
  setUserName: (name: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsAuthenticated(!!session?.user);
        
        if (session?.user) {
          // Extract name from user metadata or email
          const name = session.user.user_metadata?.full_name || 
                       session.user.user_metadata?.name ||
                       session.user.email?.split('@')[0] || 
                       'User';
          setUserName(name);
          
          // Set default role if not set
          if (!userRole) {
            setUserRole('user');
          }
        }
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session?.user);
      
      if (session?.user) {
        const name = session.user.user_metadata?.full_name || 
                     session.user.user_metadata?.name ||
                     session.user.email?.split('@')[0] || 
                     'User';
        setUserName(name);
        if (!userRole) {
          setUserRole('user');
        }
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = (role: UserRole, name: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserName(name);
  };

  const loginWithGoogle = async () => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
      }
    });
    
    if (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
    }
    setIsAuthenticated(false);
    setUserRole(null);
    setUserName('');
    setUser(null);
    setSession(null);
  };

  const switchRole = (role: UserRole) => {
    setUserRole(role);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userRole, 
      userName, 
      user,
      session,
      isLoading,
      login, 
      loginWithGoogle,
      logout, 
      switchRole,
      setUserRole,
      setUserName
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

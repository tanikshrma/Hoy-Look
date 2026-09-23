import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface User {
  id: string;
  phoneNumber: string;
  createdAt?: string;
}

export interface UserOnboardingProfile {
  photoUrl: string | null;
  gender: 'Male' | 'Female' | 'Other';
  heightCm: number;
  heightUnit: 'cm' | 'ft/in';
  age: number;
  bodyShape: 'Rectangle' | 'Hourglass' | 'Pear' | 'Inverted Triangle' | 'Athletic';
  skinToneIndex: number;
  topSize: string;
  bottomSize: string;
  shoeSize: string;
  preferredColors: string[];
  isCompleted: boolean;
}

const DEFAULT_PROFILE: UserOnboardingProfile = {
  photoUrl: null,
  gender: 'Female',
  heightCm: 163,
  heightUnit: 'cm',
  age: 22,
  bodyShape: 'Rectangle',
  skinToneIndex: 1,
  topSize: 'S',
  bottomSize: 'M',
  shoeSize: 'EU 38',
  preferredColors: ['Neutrals', 'Warm Earth'],
  isCompleted: false,
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  onboardingStep: number; // 0: completed/not active, 1: photo upload, 2: photo analysis, 3: profile details, 4: AI generate
  userProfile: UserOnboardingProfile;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  setAuthenticatedUser: (user: User) => void;
  startOnboarding: () => void;
  setOnboardingStep: (step: number) => void;
  updateUserProfile: (data: Partial<UserOnboardingProfile>) => void;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('hoy_user_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('hoy_user_session');
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Onboarding Step state: 0 = finished/inactive, 1 = photo, 2 = analysis, 3 = profile, 4 = AI generate
  const [onboardingStep, setOnboardingStepState] = useState<number>(0);
  const [userProfile, setUserProfile] = useState<UserOnboardingProfile>(() => {
    try {
      const saved = localStorage.getItem('hoy_user_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Save profile state to localStorage for session persistence
  useEffect(() => {
    try {
      localStorage.setItem('hoy_user_profile', JSON.stringify(userProfile));
    } catch (e) {
      console.error('Failed to save profile to localStorage:', e);
    }
  }, [userProfile]);

  const checkAuth = useCallback(async () => {
    try {
      const saved = localStorage.getItem('hoy_user_session');
      if (saved) {
        setUser(JSON.parse(saved));
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const openAuthModal = useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const startOnboarding = useCallback(() => {
    if (!userProfile.isCompleted) {
      setOnboardingStepState(1);
    } else {
      setOnboardingStepState(0);
    }
  }, [userProfile.isCompleted]);

  const setAuthenticatedUser = useCallback((newUser: User) => {
    setUser(newUser);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    try {
      localStorage.setItem('hoy_user_session', JSON.stringify(newUser));
    } catch (e) {
      console.error('Failed to save session to localStorage:', e);
    }
    
    // Check if onboarding is completed or needs to start
    if (!userProfile.isCompleted) {
      setOnboardingStepState(1);
    }
  }, [userProfile.isCompleted]);

  const setOnboardingStep = useCallback((step: number) => {
    setOnboardingStepState(step);
  }, []);

  const updateUserProfile = useCallback((data: Partial<UserOnboardingProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...data }));
  }, []);

  const completeOnboarding = useCallback(() => {
    setUserProfile((prev) => ({ ...prev, isCompleted: true }));
    setOnboardingStepState(0);
  }, []);

  const logout = useCallback(async () => {
    try {
      localStorage.removeItem('hoy_user_session');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setOnboardingStepState(0);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        isAuthModalOpen,
        onboardingStep,
        userProfile,
        openAuthModal,
        closeAuthModal,
        checkAuth,
        logout,
        setAuthenticatedUser,
        startOnboarding,
        setOnboardingStep,
        updateUserProfile,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

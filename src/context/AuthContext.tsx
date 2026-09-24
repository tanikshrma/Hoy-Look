import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserOnboardingProfile {
  name: string;
  email?: string;
  phone?: string;
  ageRange: string;
  heightCm: number;
  weightKg?: number;
  bodyShape: string;
  skinTone: string;
  skinToneIndex: number;
  stylePreferences: string[];
  colorPalette: string[];
  photoUrl?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  profile: UserOnboardingProfile;
  activePlanId?: string;
  isSubscribed?: boolean;
}

interface AuthContextType {
  user: UserAccount | null;
  isAuthenticated: boolean;
  isOnboardingActive: boolean;
  onboardingStep: number;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  startOnboarding: () => void;
  setOnboardingStep: (step: number) => void;
  updateUserProfile: (profile: Partial<UserOnboardingProfile>) => void;
  setAuthenticatedUser: (user: UserAccount | null) => void;
  logout: () => void;
}

const defaultProfile: UserOnboardingProfile = {
  name: '',
  ageRange: '25-34',
  heightCm: 168,
  bodyShape: 'Hourglass',
  skinTone: 'Warm Sand',
  skinToneIndex: 2,
  stylePreferences: ['Minimalist', 'Smart Casual', 'Tailored'],
  colorPalette: ['#C5A880', '#1A1817', '#FAF8F5'],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [isOnboardingActive, setIsOnboardingActive] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Load persisted user session if present
  useEffect(() => {
    try {
      const stored = localStorage.getItem('hoy_user_session');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // Ignore localStorage error
    }
  }, []);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const startOnboarding = () => {
    setIsOnboardingActive(true);
    setOnboardingStep(1);
    setIsAuthModalOpen(false);
  };

  const updateUserProfile = (profileUpdate: Partial<UserOnboardingProfile>) => {
    setUser((prev) => {
      const updatedProfile = {
        ...(prev?.profile || defaultProfile),
        ...profileUpdate,
      };
      const updatedUser: UserAccount = {
        id: prev?.id || 'usr_' + Math.random().toString(36).substring(2, 9),
        name: updatedProfile.name || prev?.name || 'HOY Member',
        phone: prev?.phone,
        email: prev?.email,
        profile: updatedProfile,
        activePlanId: prev?.activePlanId,
        isSubscribed: prev?.isSubscribed,
      };
      try {
        localStorage.setItem('hoy_user_session', JSON.stringify(updatedUser));
      } catch {
        // Ignore storage error
      }
      return updatedUser;
    });
  };

  const setAuthenticatedUser = (newUser: UserAccount | null) => {
    setUser(newUser);
    try {
      if (newUser) {
        localStorage.setItem('hoy_user_session', JSON.stringify(newUser));
      } else {
        localStorage.removeItem('hoy_user_session');
      }
    } catch {
      // Ignore storage error
    }
  };

  const logout = () => {
    setUser(null);
    setIsOnboardingActive(false);
    setOnboardingStep(0);
    try {
      localStorage.removeItem('hoy_user_session');
    } catch {
      // Ignore storage error
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isOnboardingActive,
        onboardingStep,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        startOnboarding,
        setOnboardingStep,
        updateUserProfile,
        setAuthenticatedUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

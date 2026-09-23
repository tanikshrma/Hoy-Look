import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

const STORAGE_KEY_USER = 'hoy_user_auth';
const STORAGE_KEY_PROFILE = 'hoy_user_profile';
const STORAGE_KEY_STEP = 'hoy_onboarding_step';

const DEFAULT_PROFILE = {
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
};

export const AuthProvider = ({ children }) => {
  // Authentication State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => !!user);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Onboarding & Profile State
  const [onboardingStep, setOnboardingStep] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STEP);
      return saved !== null ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Sync state to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
      setIsAuthenticated(false);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_STEP, onboardingStep.toString());
  }, [onboardingStep]);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const loginWithWhatsApp = async (phoneNumber) => {
    // Simulated OTP verification
    const newUser = {
      phoneNumber,
      isVerified: true,
      hasCompletedOnboarding: false,
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    setOnboardingStep(0);
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_STEP);
  };

  const updateUserProfile = (updates) => {
    setUserProfile((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const startOnboarding = () => {
    setOnboardingStep(1);
    closeAuthModal();
  };

  const completeOnboarding = () => {
    setOnboardingStep(0);
    if (user) {
      setUser({
        ...user,
        hasCompletedOnboarding: true,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAuthModalOpen,
        onboardingStep,
        userProfile,
        openAuthModal,
        closeAuthModal,
        loginWithWhatsApp,
        logout,
        updateUserProfile,
        startOnboarding,
        completeOnboarding,
        setOnboardingStep,
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

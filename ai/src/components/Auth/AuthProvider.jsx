import React, { useState, useEffect } from 'react';
import { AuthContext } from '../../services/auth';
import { authService } from '../../services/auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = authService.getStoredUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const loginWithMobile = async (mobileNumber) => {
    const result = await authService.loginWithMobile(mobileNumber);
    setUser(result.user);
    return result;
  };

  const verifyOTP = async (otp) => {
    const result = await authService.verifyOTP(otp, user);
    setUser(result.user);
    return result;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loginWithMobile,
    verifyOTP,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
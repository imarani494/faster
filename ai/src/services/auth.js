import { createContext, useContext } from "react";

// Create Auth Context
export const AuthContext = createContext();

// Auth Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Pure service functions
export const authService = {
  loginWithMobile: async (mobileNumber) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tempUser = { mobileNumber, otpSent: true };
        localStorage.setItem("fastor_user", JSON.stringify(tempUser));
        resolve({ success: true, user: tempUser });
      }, 1000);
    });
  },

  verifyOTP: async (otp, currentUser) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (otp === "123456") {
          const verifiedUser = { ...currentUser, verified: true };
          localStorage.setItem("fastor_user", JSON.stringify(verifiedUser));
          resolve({ success: true, user: verifiedUser });
        } else {
          reject({ success: false, message: "Invalid OTP" });
        }
      }, 1000);
    });
  },

  getStoredUser: () => {
    const savedUser = localStorage.getItem("fastor_user");
    return savedUser ? JSON.parse(savedUser) : null;
  },

  logout: () => {
    localStorage.removeItem("fastor_user");
  }
};

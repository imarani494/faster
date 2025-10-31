import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth';

const LoginPage = () => {
  const [step, setStep] = useState('mobile');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { loginWithMobile, verifyOTP } = useAuth();
  const navigate = useNavigate();

  const handleMobileSubmit = async (e) => {
    e.preventDefault();
    if (mobileNumber.length !== 10) return;
    
    setLoading(true);
    setError('');
    try {
      await loginWithMobile(mobileNumber);
      setStep('otp');
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerify = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) return;
    
    setLoading(true);
    setError('');
    try {
      await verifyOTP(otp);
      navigate('/');
    } catch (err) {
      setError(err.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            {step === 'mobile' ? 'Welcome to Fastor' : 'OTP Verification'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {step === 'mobile' 
              ? 'Enter your mobile number to get started'
              : `Enter OTP sent to +91 ${mobileNumber}`
            }
          </p>
          {step === 'otp' && (
            <p className="mt-1 text-center text-xs text-gray-500">
              Use <strong>123456</strong> as OTP
            </p>
          )}
        </div>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {step === 'mobile' ? (
          <form onSubmit={handleMobileSubmit} className="space-y-6">
            <div>
              <label htmlFor="mobile" className="input-label">
                Mobile Number
              </label>
              <input
                id="mobile"
                type="tel"
                required
                className="input-field"
                placeholder="Enter 10-digit mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                maxLength="10"
              />
            </div>

            <button
              type="submit"
              disabled={loading || mobileNumber.length !== 10}
              className="btn btn-primary w-full"
            >
              {loading ? 'Sending OTP...' : 'Continue'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOTPVerify} className="space-y-6">
            <div>
              <label htmlFor="otp" className="input-label">
                OTP
              </label>
              <input
                id="otp"
                type="text"
                required
                className="input-field"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                maxLength="6"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep('mobile')}
                className="btn btn-secondary flex-1"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="btn btn-primary flex-1"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
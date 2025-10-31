import React, { useState } from 'react'
import { Smartphone, ArrowRight } from 'lucide-react'

const Login = ({ onMobileSubmit, loading }) => {
  const [mobileNumber, setMobileNumber] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (mobileNumber.length === 10) {
      onMobileSubmit(mobileNumber)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 bg-red-600 rounded-full flex items-center justify-center">
            <Smartphone className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to Fastor
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your mobile number to get started
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="mobile" className="input-label">
              Mobile Number
            </label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              required
              className="input-field"
              placeholder="Enter 10-digit mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
              maxLength="10"
              pattern="[0-9]{10}"
            />
          </div>

          <button
            type="submit"
            disabled={loading || mobileNumber.length !== 10}
            className="btn btn-primary w-full"
          >
            {loading ? (
              'Sending OTP...'
            ) : (
              <>
                Continue
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
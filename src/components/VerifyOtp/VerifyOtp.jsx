import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyOtpAndRegister, resetPassword } from "../../service/authService";
import logo from "../../assets/logo.png";
import "./VerifyOtp.css";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, flow, registerData } = location.state || {};
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email || !flow) {
      toast.error("Invalid OTP verification request");
      navigate("/auth");
    }
    inputRefs.current[0]?.focus();
  }, [email, flow, navigate]);

  const isValidOtp = () => {
    return otp.every((digit) => /^[0-9]$/.test(digit));
  };

  const isValidPassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/;
    return regex.test(password);
  };

  const handleOtpChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      inputRefs.current[5].focus();
    }
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidOtp()) {
      toast.error("OTP must be a 6-digit number");
      return;
    }
    const otpString = otp.join("");
    try {
      if (flow === "signup") {
        const response = await verifyOtpAndRegister(email, otpString, registerData);
        if (response.status === 201 || response.status === 200) {
          toast.success("Registration completed. Please sign in.");
          navigate("/auth?tab=signin");
        } else {
          toast.error(`OTP verification failed: Status ${response.status}`);
        }
      } else if (flow === "forgot-password") {
        if (!isValidPassword(newPassword)) {
          toast.error("Password must be at least 8 characters long and include at least 1 letter, 1 digit, and 1 special character.");
          return;
        }
        const response = await resetPassword(email, otpString, newPassword);
        if (response.status === 200) {
          toast.success("Password reset successfully. Please sign in.");
          navigate("/auth?tab=signin");
        } else {
          toast.error(`Password reset failed: Status ${response.status}`);
        }
      }
    } catch (error) {
      console.error("OTP Verification Error:", error.message, error.response?.data);
      toast.error(`OTP verification failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleCancel = () => {
    navigate("/auth?tab=signin");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-left-panel">
          <h1 className="text-h1">The Plate<span className="text-net">Net</span></h1>
          <img src={logo} alt="Platenet Logo" className="auth-logo" />
          <div className="auth-left-text">
            <h2>Verify OTP</h2>
            <p>Enter the OTP sent to your email</p>
          </div>
        </div>
        <div className="auth-form-container">
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-input-group">
              <label>OTP</label>
              <div className="otp-input-group">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="otp-input"
                    required
                  />
                ))}
              </div>
            </div>
            {flow === "forgot-password" && (
              <div className="auth-input-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="auth-button-group">
              <button
                type="submit"
                className="auth-submit-btn"
                disabled={!isValidOtp() || (flow === "forgot-password" && !isValidPassword(newPassword))}
              >
                Verify OTP
              </button>
              <button type="button" className="auth-reset-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
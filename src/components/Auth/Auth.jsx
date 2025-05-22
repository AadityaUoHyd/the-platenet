import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { login, sendSignupOtp, sendForgotPasswordOtp, googleLogin } from "../../service/authService";
import { StoreContext } from "../../context/StoreContext";
import logo from "../../assets/logo.png";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./Auth.css";

const Auth = () => {
  const { setToken, loadCartData, setIsAdmin } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("signin");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "", mobileNumber: "" });
  const [forgotPasswordData, setForgotPasswordData] = useState({ email: "" });
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    setActiveTab(tab === "signup" ? "signup" : "signin");
  }, [location.search]);

  const onChangeHandler = (event, setData) => {
    const name = event.target.name;
    const value = name === "email" ? event.target.value.toLowerCase() : event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(loginData);
      if (response.status === 200) {
        const isAdmin = response.data.isAdmin ?? response.data.admin ?? false;
        setToken(response.data.token);
        setIsAdmin(isAdmin);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isAdmin", isAdmin.toString());
        if (!isAdmin) {
          await loadCartData(response.data.token);
          navigate("/");
        } else {
          navigate("/admin/orders", { replace: true });
        }
      } else {
        toast.error(`Login failed: Status ${response.status}`);
      }
    } catch (error) {
      console.error("Login Error:", error.message, error.response?.data, error.response?.status);
      toast.error(`Login failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const isValidName = (name) => {
    return name.length >= 3 && name.length <= 30;
  };

  const isValidPassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/;
    return regex.test(password);
  };

  const isValidMobileNumber = (mobileNumber) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(mobileNumber);
  };

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const onRegisterSubmit = async (event) => {
    event.preventDefault();

    if (!isValidName(registerData.name)) {
      toast.error("Name must be in between 3 and 30 characters long.");
      return;
    }

    if (!isValidMobileNumber(registerData.mobileNumber)) {
      toast.error("Mobile number must be at least 10 valid digits.");
      return;
    }

    if (!isValidEmail(registerData.email)) {
      toast.error("Invalid email format.");
      return;
    }

    if (!isValidPassword(registerData.password)) {
      toast.error("Password must be at least 8 characters long and include at least 1 letter, 1 digit, and 1 special character.");
      return;
    }

    try {
      const response = await sendSignupOtp(registerData.email);
      if (response.status === 200) {
        toast.success("OTP sent to your email");
        navigate("/verify-otp", { state: { email: registerData.email, flow: "signup", registerData } });
      } else {
        toast.error("Failed to send OTP");
      }
    } catch (error) {
      console.error("Signup OTP Error:", error.message, error.response?.data);
      toast.error(`Failed to send OTP: ${error.response?.data?.message || error.message}`);
    }
  };

  const onForgotPasswordSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await sendForgotPasswordOtp(forgotPasswordData.email);
      if (response.status === 200) {
        toast.success("OTP sent to your email");
        navigate("/verify-otp", { state: { email: forgotPasswordData.email, flow: "forgot-password" } });
      } else {
        toast.error(`Failed to send OTP: Status ${response.status}`);
      }
    } catch (error) {
      console.error("Forgot Password OTP Error:", error.message, error.response?.data);
      toast.error(`Failed to send OTP: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await googleLogin(credentialResponse.credential);
      if (response.status === 200) {
        const isAdmin = response.data.isAdmin ?? false;
        setToken(response.data.token);
        setIsAdmin(isAdmin);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isAdmin", isAdmin.toString());
        if (!isAdmin) {
          await loadCartData(response.data.token);
          navigate("/");
        } else {
          navigate("/admin/orders", { replace: true });
        }
      } else {
        toast.error(`Google login failed: Status ${response.status}`);
      }
    } catch (error) {
      console.error("Google Login Error:", error.message, error.response?.data);
      toast.error(`Google login failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleGoogleLoginError = () => {
    toast.error("Google login failed: Authentication error");
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-left-panel">
            <h1 className="text-h1">The Plate<span className="text-net">Net</span></h1>
            <img src={logo} alt="Platenet Logo" className="auth-logo" />
            <div className="auth-left-text">
              <h2>
                {activeTab === "signin" ? "Sign In" : 
                 showForgotPassword ? "Forgot Password" : "Sign Up"}
              </h2>
              <p>
                {activeTab === "signin" ? "Log in to your Platenet account" : 
                 showForgotPassword ? "Reset your password" : 
                 "Create a new Platenet account"}
              </p>
            </div>
          </div>
          <div className="auth-form-container">
            <div className="auth-tabs">
              <button
                className={`auth-tab ${activeTab === "signin" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("signin");
                  setShowForgotPassword(false);
                }}
              >
                Sign In
              </button>
              <button
                className={`auth-tab ${activeTab === "signup" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("signup");
                  setShowForgotPassword(false);
                }}
              >
                Sign Up
              </button>
            </div>
            {activeTab === "signin" && !showForgotPassword && (
              <form onSubmit={onLoginSubmit} className="auth-form">
                <div className="auth-input-group">
                  <label htmlFor="signinEmail">Email Address</label>
                  <input
                    type="email"
                    id="signinEmail"
                    name="email"
                    placeholder="yourname@example.com"
                    value={loginData.email}
                    onChange={(e) => onChangeHandler(e, setLoginData)}
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="auth-input-group">
                  <label htmlFor="signinPassword">Password</label>
                  <input
                    type="password"
                    id="signinPassword"
                    name="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => onChangeHandler(e, setLoginData)}
                    autoComplete="current-password"
                    required
                  />
                </div>
                <div className="auth-input-group">
                  <button
                    type="button"
                    className="auth-forgot-btn"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="auth-button-group">
                  <button type="submit" className="auth-submit-btn">
                    Sign In
                  </button>
                  <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginError}
                    text="signin_with"
                    shape="rectangular"
                    theme="filled_blue"
                    width="100%"
                  />
                </div>
              </form>
            )}
            {activeTab === "signup" && (
              <form onSubmit={onRegisterSubmit} className="auth-form">
                <div className="auth-input-group">
                  <label htmlFor="signupName">Full Name</label>
                  <input
                    type="text"
                    id="signupName"
                    name="name"
                    placeholder="Your Full Name"
                    value={registerData.name}
                    onChange={(e) => onChangeHandler(e, setRegisterData)}
                    required
                  />
                </div>
                <div className="auth-input-group">
                  <label htmlFor="signupMobileNumber">Mobile</label>
                  <input
                    type="tel"
                    id="signupMobileNumber"
                    name="mobileNumber"
                    placeholder="9999999999"
                    pattern="[0-9]{10}"
                    value={registerData.mobileNumber}
                    onChange={(e) => onChangeHandler(e, setRegisterData)}
                    required
                  />
                </div>
                <div className="auth-input-group">
                  <label htmlFor="signupEmail">Email Address</label>
                  <input
                    type="email"
                    id="signupEmail"
                    name="email"
                    placeholder="yourname@example.com"
                    value={registerData.email}
                    onChange={(e) => onChangeHandler(e, setRegisterData)}
                    required
                  />
                </div>
                <div className="auth-input-group">
                  <label htmlFor="signupPassword">Password</label>
                  <input
                    type="password"
                    id="signupPassword"
                    name="password"
                    placeholder="Password"
                    value={registerData.password}
                    onChange={(e) => onChangeHandler(e, setRegisterData)}
                    required
                  />
                </div>
                <div className="auth-button-group">
                  <button type="submit" className="auth-submit-btn">
                    Sign Up
                  </button>
                </div>
              </form>
            )}
            {showForgotPassword && (
              <form onSubmit={onForgotPasswordSubmit} className="auth-form">
                <div className="auth-input-group">
                  <label htmlFor="forgotEmail">Email Address</label>
                  <input
                    type="email"
                    id="forgotEmail"
                    name="email"
                    placeholder="yourname@example.com"
                    value={forgotPasswordData.email}
                    onChange={(e) => onChangeHandler(e, setForgotPasswordData)}
                    required
                  />
                </div>
                <div className="auth-button-group">
                  <button type="submit" className="auth-submit-btn">
                    Send OTP
                  </button>
                  <button
                    type="button"
                    className="auth-reset-btn"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setForgotPasswordData({ email: "" });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Auth;
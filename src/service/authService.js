import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

export const registerUser = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/register`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

export const login = async (data) => {
    try {
        console.log("Login Payload:", data);
        const response = await axios.post(`${API_URL}/login`, data);
        console.log("Login Response:", response);
        return response;
    } catch (error) {
        throw error;
    }
};

export const sendSignupOtp = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/send-otp`, { email });
        return response;
    } catch (error) {
        throw error;
    }
};

export const verifyOtpAndRegister = async (email, otp, userRequest) => {
    try {
        const response = await axios.post(`${API_URL}/verify-otp`, { email, otp, userRequest });
        return response;
    } catch (error) {
        throw error;
    }
};

export const sendForgotPasswordOtp = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/forgot-password`, { email });
        return response;
    } catch (error) {
        throw error;
    }
};

export const resetPassword = async (email, otp, newPassword) => {
    try {
        const response = await axios.post(`${API_URL}/reset-password`, { email, otp, newPassword });
        return response;
    } catch (error) {
        throw error;
    }
};

export const googleLogin = async (idToken) => {
    try {
        const response = await axios.post(`${API_URL}/google-login`, { idToken });
        return response;
    } catch (error) {
        throw error;
    }
};

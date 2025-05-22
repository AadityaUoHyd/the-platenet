import axios from "axios";
import { toast } from "react-toastify";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Get User Profile Error:", error.message, error.response?.data);
    throw error;
  }
};

export const updateUserAddress = async (addressData, token) => {
  try {
    await axios.post(`${API_URL}/user/update-address`, addressData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Update User Address Error:", error.message, error.response?.data);
    throw error;
  }
};

export const uploadProfileImage = async (file, token) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await axios.post(`${API_URL}/user/upload-profile-image`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Upload Profile Image Error:", error.message, error.response?.data);
    throw error;
  }
};
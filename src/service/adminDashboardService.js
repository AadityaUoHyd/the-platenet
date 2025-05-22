import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

export const getDashboardData = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/admin/dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch dashboard data');
    }
};
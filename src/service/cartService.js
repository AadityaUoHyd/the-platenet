import axios from "axios";

// Use env variable for base URL
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/cart`;

export const addToCart = async (foodId, token) => {
    try {
        await axios.post(
            API_URL,
            { foodId },
            { headers: { Authorization: `Bearer ${token}` } }
        );
    } catch (error) {
        console.error('Error while adding the cart data', error);
    }
}

export const removeQtyFromCart = async (foodId, token) => {
    try {
        await axios.post(
            `${API_URL}/remove`,
            { foodId },
            { headers: { Authorization: `Bearer ${token}` } }
        );
    } catch (error) {
        console.error('Error while removing qty from cart', error);
    }
}

export const getCartData = async (token) => {
    if (!token) {
        console.warn("No token found, skipping getCartData");
        return [];  // Or return null, or handle as per your app logic
    }
    try {
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.items;
    } catch (error) {
        console.error('Error while fetching the cart data', error);
    }
}

export const clearCartItems = async (token, setQuantities) => {
    try {
        await axios.delete(API_URL, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setQuantities({});
    } catch (error) {
        console.error('Error while clearing the cart', error);
        throw error;
    }
}

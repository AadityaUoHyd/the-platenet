import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/foods`;

export const addFood = async (foodData, image) => {
    const formData = new FormData();
    formData.append('food', JSON.stringify(foodData));
    formData.append('file', image); 

    try {
        await axios.post(API_URL, formData, {headers: { "Content-Type": "multipart/form-data"}});
    } catch (error) {
        console.log('Error', error);
        throw error;
    }
}

export const getFoodList = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.log('Error fetching food list', error);
        throw error;
    }
}

export const deleteFood = async (foodId) => {
    try {
        const response = await axios.delete(API_URL+"/"+foodId);
        return response.status === 204;
    } catch (error) {
        console.log('Error while deleting the food.', error);
        throw error;
    }
}

export const updateFood = async (foodId, foodData, image) => {
    const formData = new FormData();
    formData.append('food', JSON.stringify(foodData));
    if (image) {
        formData.append('file', image);
    }

    try {
        const response = await axios.put(`${API_URL}/${foodId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    } catch (error) {
        console.log('Error updating food', error);
        throw error;
    }
}
import { createContext, useEffect, useState } from "react";
import { fetchFoodList } from "../service/foodService";
import axios from "axios";
import {
    addToCart,
    getCartData,
    removeQtyFromCart,
} from "../service/cartService";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
    const [foodList, setFoodList] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");

    const increaseQty = async (foodId) => {
        if (isAdmin) return;
        setQuantities((prev) => ({ ...prev, [foodId]: (prev[foodId] || 0) + 1 }));
        await addToCart(foodId, token);
    };

    const decreaseQty = async (foodId) => {
        if (isAdmin) return;
        setQuantities((prev) => ({
            ...prev,
            [foodId]: prev[foodId] > 0 ? prev[foodId] - 1 : 0,
        }));
        await removeQtyFromCart(foodId, token);
    };

    const removeFromCart = (foodId) => {
        if (isAdmin) return;
        setQuantities((prevQuantities) => {
            const updatedQuantities = { ...prevQuantities };
            delete updatedQuantities[foodId];
            return updatedQuantities;
        });
    };

    const loadCartData = async (token) => {
        if (!token || isAdmin) return;
        try {
            const items = await getCartData(token);
            setQuantities(items || {});
        } catch (error) {
            setQuantities({});
        }
    };

    const contextValue = {
        foodList,
        increaseQty,
        decreaseQty,
        quantities,
        removeFromCart,
        token,
        setToken,
        setQuantities,
        loadCartData,
        isAdmin,
        setIsAdmin,
    };

    useEffect(() => {
        async function loadData() {
            const data = await fetchFoodList();
            setFoodList(data);
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                const isAdminStored = localStorage.getItem("isAdmin") === "true";
                setIsAdmin(isAdminStored);
                if (!isAdminStored) {
                    await loadCartData(localStorage.getItem("token"));
                }
            }
        }
        loadData();
    }, []);

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};
import axios from 'axios';

const API_URL = "http://localhost:8080/api/cart";

const addToCart = async (cartItem) => {
    try {
        const response = await axios.post(API_URL + '/add', cartItem);
        return response.data;
    } catch (error) {
        console.error("Error while adding to cart:", error);
        throw error;
    }
};

const getCartItems = async (userId) => {
    try {
        const response = await axios.get(API_URL + `/items?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error while fetching cart items:", error);
        throw error;
    }
};

const deleteCartItem = async (itemId) =>  {
    try {
        const response = await axios.delete(API_URL + "/items/" + itemId);
        return response.data;
      } catch (error) {
        console.error("Error while deleting account service:", error);
        throw error;
      }
}

const createOrderFromCart = async (userId) => {
    try {
        const response = await axios.post(API_URL + `/checkout?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error while adding to cart:", error);
        throw error;
    }
}

const CartService = {
    addToCart,
    getCartItems,
    deleteCartItem,
    createOrderFromCart
};

export default CartService;

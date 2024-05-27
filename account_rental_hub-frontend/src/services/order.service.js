import axios from "axios";

const API_URL = "http://localhost:8080/api/order";

const getOrderByOrderCode = async (orderCode) => {
    try {
      const response = await axios.get(API_URL + "/" + orderCode);

      return response.data;
  } catch (error) {
      // console.error("Error while searching account service:", error);
      throw error;
  }
}

const searchOrders = async (page, size, orderCode, userId, startDate, endDate, status) => {
    try {
        const response = await axios.get(
            API_URL 
            + `/search?page=${page}&size=${size}&orderCode=${orderCode}&userId=${userId}&startDate=${startDate}&endDate=${endDate}&status=${status}`);
            return response.data;
    } catch (error) {
        // console.error("Error while searching account service:", error);
        throw error;
    }
}

const changeOrderStatus  = async (orderID, status) => {
    try {
        return axios.post(`${API_URL}/changeStatus`, null, { params: { orderID, status } });
    } catch (error) {
        throw error;
    }
}


const OrderService = {
    searchOrders,
    getOrderByOrderCode,
    changeOrderStatus 
}

export default OrderService;
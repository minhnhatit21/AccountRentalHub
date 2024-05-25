import axios from 'axios';

const API_URL = "http://localhost:8080/api/payment";

const processPayment = async (paymentData) => {
    try {
        const response = await axios.post(API_URL + '/checkout', paymentData);
        return response.data;
    } catch (error) {
        console.error("Error while payment:", error);
        throw error;
    }
};



const PaymentService = {
    processPayment,
};

export default PaymentService;

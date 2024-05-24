import axios from "axios";

const API_URL = "http://localhost:8080/api/transaction";


const searchTransactions = async (page, size, customeName, userId, startDate, endDate, status) => {
    try {
        const response = await axios.get(
            API_URL 
            + `/search?page=${page}&size=${size}&userId=${userId}&customerName=${customeName}&status=${status}&startDate=${startDate}&endDate=${endDate}`);
        return response.data;
    } catch (error) {
        // console.error("Error while searching account service:", error);
        throw error;
    }
}


const TransactionService = {
    searchTransactions,
}

export default TransactionService;
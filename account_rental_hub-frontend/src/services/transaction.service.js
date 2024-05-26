import axios from "axios";

const API_URL = "http://localhost:8080/api/transaction";


const searchTransactions = async (page, size, customerName, userId, startDate, endDate, status) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: {
        page,
        size,
        userId,
        customerName,
        status,
        startDate,
        endDate
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error while searching account service:", error);
    throw error;
  }
}


const TransactionService = {
  searchTransactions,
}

export default TransactionService;
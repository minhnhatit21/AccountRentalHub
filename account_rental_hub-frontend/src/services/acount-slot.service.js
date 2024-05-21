import axios from "axios";

const API_URL = "http://localhost:8080/api/rentalHistories";

// const getCustomerByUserId = (id) => {
//     console.log("Get Customer Call: ", id)
//     return axios.get(API_URL + "account/" + id);
// }

const searchAccountSlots = async (page, size,status,fullName,packageID) => {
    try {
        const response = await axios.get(API_URL + `/search?page=${page}&size=${size}&fullName=${fullName}&status=${status}&packageId=${packageID}`);

        return response.data;
    } catch (error) {
        // console.error("Error while searching account service:", error);
        throw error;
    }
}

const createAccountRentalSlot = async (accountData) => {
    try {
        const response = await axios.post(API_URL, accountData);
        return response.data;
    } catch (error) {
        console.error("Error while creating account service:", error);
        throw error;
    }
}

const updateAccountRentalSlot = async (id, accountData) => {
    try {
        const response = await axios.put(API_URL + `/${id}`, accountData);
      return response.data;
    } catch (error) {
      console.error("Error while updating account service:", error);
      throw error;
    }
  }
  
  const deleteAccountRentalSlot = async (id) => {
    try {
      const response = await axios.delete(API_URL + "/" + id);
      return response.data;
    } catch (error) {
      console.error("Error while deleting account service:", error);
      throw error;
    }
  }

const AccountSlotService = {
    searchAccountSlots,
    createAccountRentalSlot,
    updateAccountRentalSlot,
    deleteAccountRentalSlot
}

export default AccountSlotService;
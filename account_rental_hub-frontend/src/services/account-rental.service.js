import axios from "axios";

const API_URL = "http://localhost:8080/api/accountRentals";

const getAllAccountRental = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const searchAccountRental = async (page, size, status, username, packageID) => {
    try {
        const response = await axios.get(API_URL + `/search?page=${page}&size=${size}&status=${status}&username=${username}&packageId=${packageID}`);

        return response.data;
    } catch (error) {
        // console.error("Error while searching account service:", error);
        throw error;
    }
}

const createAccountRental = async (accountData) => {
    try {
        const response = await axios.post(API_URL, accountData);
        return response.data;
    } catch (error) {
        console.error("Error while creating account service:", error);
        throw error;
    }
}

const updateAccountRental = async (id, accountData) => {
    try {
        const response = await axios.put(API_URL + `/${id}`, accountData);
      return response.data;
    } catch (error) {
      console.error("Error while updating account service:", error);
      throw error;
    }
  }
  
  const deleteAccountRental = async (id) => {
    try {
      const response = await axios.delete(API_URL + "/" + id);
      return response.data;
    } catch (error) {
      console.error("Error while deleting account service:", error);
      throw error;
    }
  }

  const checkAccountRentalAvailability = async (packageId) => {
    try {
      const response = await axios.get(API_URL + `/check-availability?packageId=${packageId}&status=ACTIVE&packageAmount=0&rentalAmount=0`)
      return response.data;
    } catch (error) {
      throw error
    }
  }

const AccountRentalService = {
    searchAccountRental,
    createAccountRental,
    updateAccountRental,
    deleteAccountRental,
    getAllAccountRental,
    checkAccountRentalAvailability
}

export default AccountRentalService;
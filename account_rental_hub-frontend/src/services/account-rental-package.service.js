import axios from "axios";
const API_URL = "http://localhost:8080/api/accountRentalPackages";

const getAllAccountRentalPackages = async () => {
  try {
    const response = axios.get(API_URL + '/list');
    return (await response).data;
  } catch (error) {
    throw error;
  }
}

const getAllAccountRentalPackagesByServiceId = async (serviceId) => {
  try {
    const response = await axios.get(API_URL + '/service/' + serviceId);
    console.log("Package:", response);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const searchAccountPackage = async (page, size, service, name) => {
    try {

        const response = await axios.get(API_URL + `/search?page=${page}&size=${size}&serviceId=${service}&name=${name}`);
        return response.data;
    } catch (error) {
        // console.error("Error while searching account service:", error);
        throw error;
    }
}

const createAccountPackage = async (packageData) => {
    try {
      const response = await axios.post(API_URL, packageData);
      return response.data;
    } catch (error) {
      console.error("Error while creating account service:", error);
      throw error;
    }
  }
  
  const updateAccountPackage = async (id, packageData) => {
    try {
      const response = await axios.put(API_URL + `/${id}`, packageData);
      return response.data;
    } catch (error) {
      console.error("Error while updating account service:", error);
      throw error;
    }
  }

  const deleteAccountPackage = async (id) => {
    try {
      const response = await axios.delete(API_URL + "/" + id);
      return response.data;
    } catch (error) {
      console.error("Error while deleting account service:", error);
      throw error;
    }
  }

const AccountPackageService = {
    searchAccountPackage,
    createAccountPackage,
    updateAccountPackage,
    deleteAccountPackage,
    getAllAccountRentalPackages,
    getAllAccountRentalPackagesByServiceId
}

export default AccountPackageService;
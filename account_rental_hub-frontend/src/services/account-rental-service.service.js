import axios from "axios";

const API_URL = "http://localhost:8080/api/accountRentalServices";

const testSearchAccountService = async (page, size, category, name) => {
  try {
    const response = await axios.get(`${API_URL}/search?page=${page}&size=${size}&cat=${category}&name=${name}`);
    return response.data;
  } catch (error) {
    console.error('Error while searching account service:', error);
    throw error;
  }
}

const getAccountServiceRental = (page, size) => {

  return axios.get(API_URL + `?page=${page}&size=${size}`);
}

const getListServiceName = async () => {
  try {
    const response = await axios.get(API_URL + `/list`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const searchAccountServiceRental = async (page, size, category, name) => {
  try {

    const response = await axios.get(API_URL + `/search?page=${page}&size=${size}&cat=${category}&name=${name}`);

    return response.data;
  } catch (error) {
     // console.error("Error while searching account service:", error);
    throw error;
  }
}

const createAccountServiceRetal = async (serviceData) => {
  try {
    const response = await axios.post(API_URL, serviceData);
    return response.data;
  } catch (error) {
    console.error("Error while creating account service:", error);
    throw error;
  }
}

const updateAccountServiceRetal = async (id, serviceData) => {
  try {
    const response = await axios.put(API_URL + `/${id}`, serviceData);
    return response.data;
  } catch (error) {
    console.error("Error while updating account service:", error);
    throw error;
  }
}

const deleteAccountServiceRental = async (id) => {
  try {
    const response = await axios.delete(API_URL + "/" + id);
    return response.data;
  } catch (error) {
    console.error("Error while deleting account service:", error);
    throw error;
  }
}
const AccountServiceRentalService = {
  getAccountServiceRental,
  createAccountServiceRetal,
  updateAccountServiceRetal,
  deleteAccountServiceRental,
  searchAccountServiceRental,
  testSearchAccountService,
  getListServiceName
}

export default AccountServiceRentalService;
import axios from "axios";

const API_URL = "http://localhost:8080/api/customer/";

const getCustomerByUserId = (id) => {
    console.log("Get Customer Call: ", id)
    return axios.get(API_URL + "account/" + id);
}
const CustomerService = {
    getCustomerByUserId
}

export default CustomerService;
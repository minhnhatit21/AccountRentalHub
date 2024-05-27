import { useState, useContext, useRef } from "react";
import CustomerView from "./CustomerView";
import { CustomerContext } from "../../context/CustomerContext";

function Customers() {

    const { customerList, action, setAction, actions, pageable, searchData, changePage } = useContext(CustomerContext);
    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [showDeteteCustomerModal, setShowDeleteCustomerModal] = useState(false);
    const dataModalRef = useRef(null);

    // Handle Search Data
    const handleSearchData = (name) => {
        searchData(name);
    }

    // Handle change pagination
    const handlePageChange = (newPage) => {
        changePage(newPage);
    };

    const handleEditCustomerClick = (id) => {
        setAction(actions[1]);
        const data = customerList.filter(customer => customer.id === id);
        dataModalRef.current = data;
        setShowCustomerModal(true);
    };

    const handleViewCustomerClick = (id) => {
        setAction(actions[2]);
        const data = customerList.filter(customer => customer.id === id);
        dataModalRef.current = data;
        setShowCustomerModal(true);
    }

    const handleCustomerModalClose = () => {
        setShowCustomerModal(false);
        dataModalRef.current = null;
    };

    // Delete customer
    const handleDeteteCustomerClick = (id) => {
        setAction(actions[3]);
        const data = customerList.filter(customer => customer.id === id);
        dataModalRef.current = data;
        setShowDeleteCustomerModal(true);
    }

    const handleDeleteCustomerModalClose = () => {
        setShowDeleteCustomerModal(false);
        dataModalRef.current = null
    }

    const handleDeleteCustomer = (customerId) => {
        setShowDeleteCustomerModal(false);
        dataModalRef.current = null
    };

    return (
        <>
            <CustomerView
                customerList={customerList}
                pageable={pageable}
                action={action}
                isOpenModal={showCustomerModal}
                isOpenDeleteModal={showDeteteCustomerModal}
                dataModal={dataModalRef}
                customerModalClose={handleCustomerModalClose}
                handleViewCustomerClick={handleViewCustomerClick}
                handleEditCustomerClick={handleEditCustomerClick}
                handleDeleteCustomerClick={handleDeteteCustomerClick}
                handleDeleteCustomerModalClose={handleDeleteCustomerModalClose}
                handleDeleteCustomer={handleDeleteCustomer}
                onSearchData={handleSearchData}
                onPageChange={handlePageChange}
            />
        </>
    );
}

export default Customers;
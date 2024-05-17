import { useRef, useState, useContext } from "react";
import ServicesComponent from "./ServiceView";
import { AccountContext } from "../../context/AccountContext";
import { AccountServiceContext } from "../../context/AccountServiceContext";

function Services() {

    const { action, setAction, actions, serviceAccounts, setPage, setCategorySearch, deleteData, serviceAccountsPageable, changePage, searchData } = useContext(AccountServiceContext);

    const [showModal, setShowModal] = useState(false);
    const [showDeteteModal, setShowDeleteModal] = useState(false);
    const dataModalRef = useRef(null);

    // Handle change pagination
    const handlePageChange = (newPage) => {
        changePage(newPage);
    };

    const handleSearchData = (category, name) => {
        console.log(`name: ${name}, category: ${category}`);
        searchData(category, name);
    }

    // Hanldle Add Services
    const handleAddServiceClick = () => {
        setAction(actions[0]);
        setShowModal(true);
    };

    const handleEditServiceClick = (id) => {
        setAction(actions[1]);
        const data = serviceAccounts.filter(service => service.id === id);
        dataModalRef.current = data;
        setShowModal(true);
    };

    const handleViewServiceClick = (id) => {
        setAction(actions[2]);
        const data = serviceAccounts.filter(service => service.id === id);
        dataModalRef.current = data;
        setShowModal(true);
    }

    const handleModalClose = () => {
        setShowModal(false);
        dataModalRef.current = null;
    };

    // Delete service
    const handleDeteteServiceClick = (id) => {
        setAction(actions[3]);
        const data = serviceAccounts.filter(service => service.id === id);
        dataModalRef.current = data;
        setShowDeleteModal(true);
    }

    const handleDeleteModalClose = () => {
        console.log('Call close delete');
        setShowDeleteModal(false);
        dataModalRef.current = null
    }

    const handleDeleteService = (serviceId) => {
        deleteData(serviceId)
        setShowDeleteModal(false);
        dataModalRef.current = null
    };


    return (
        <>
            <ServicesComponent
                serviceAccounts={serviceAccounts}
                action={action}
                showModal={showModal}
                showDeleteModal={showDeteteModal}
                dataModalRef={dataModalRef}
                handleAddServiceClick={handleAddServiceClick}
                handleEditServiceClick={handleEditServiceClick}
                handleViewServiceClick={handleViewServiceClick}
                handleModalClose={handleModalClose}
                handleDeleteServiceClick={handleDeteteServiceClick}
                handleDeleteModalClose={handleDeleteModalClose}
                handleDeleteService={handleDeleteService}
                pageable={serviceAccountsPageable}
                onPageChange={handlePageChange} // Truyền hàm xử lý khi chuyển trang
                onSearchData={handleSearchData}
            />

        </>
    );
}

export default Services;
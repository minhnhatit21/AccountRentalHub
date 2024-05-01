import { useRef, useState, useContext } from "react";
import ServicesComponent from "./ServiceView";
import { AccountContext } from "../../context/AccountContext";

function Services() {

    const {action, setAction, actions, serviceAccounts} = useContext(AccountContext);

    const [showModal, setShowModal] = useState(false);
    const [showDeteteModal, setShowDeleteModal] = useState(false);
    const dataModalRef = useRef(null);

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
        console.log(`Xóa dịch vụ có id ${serviceId}`);
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
            />

        </>
    );
}

export default Services;
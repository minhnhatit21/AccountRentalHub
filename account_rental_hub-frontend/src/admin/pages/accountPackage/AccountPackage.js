import { useContext, useRef, useState } from "react";
import AccountPackageView from "./AccountPackageView";
import { AccountPackageContext } from "../../context/AccountPackageContext";


function AccountPackage() {

    const {action, setAction, actions, data, serviceData, searchData, deleteData, changePage, pageable} = useContext(AccountPackageContext);
    // Account Package Modal
    const [showAddAccountPackageModal, setShowAddAccountPackageModal] = useState(false);
    const [showDeteteAccountPackageModal, setShowDeteteAccountPackageModal] = useState(false);
    const dataAccountPackageModalRef = useRef(null);

    // Handle change pagination
    const handlePageChange = (newPage) => {
        changePage(newPage);
      };

    
    /**
      * Add Account Package
      */
    const handleAddAccountPackageClick = () => {
        dataAccountPackageModalRef.current = null;
        setAction(actions[0]);
        setShowAddAccountPackageModal(true);
    };

    /**
     * Edit Account Package
    */
    const handleEditAccountPackageClick = (id) => {
        setAction(actions[1]);
        const response = data.filter(pack => pack.id === id);
        dataAccountPackageModalRef.current = response;
        setShowAddAccountPackageModal(true);
    };

    /**
     * View Detail Account Package
     */
    const handleViewAccountPackageClick = (id) => {
        setAction(actions[2]);
        const response = data.filter(pack => pack.id === id);
        dataAccountPackageModalRef.current = response;
        setShowAddAccountPackageModal(true);
    }

    /**
     * Search Data
     */

    const handleSearchData = (service, name) => {
        searchData(service, name);
    }

    /***
     * Account Package Modal Close
     */
    const handleAccountPackageModalClose = () => {
        setShowAddAccountPackageModal(false);
        dataAccountPackageModalRef.current = null;
    };

    /**
     * Delete Account Package Click
     */

    const handleDeteteAccountPackageClick = (id) => {
        setAction(actions[3]);
        const response = data.filter(pack => pack.id === id);
        dataAccountPackageModalRef.current = response;
        setShowDeteteAccountPackageModal(true);
    }

    /**
     * Delete Account Package Modal Close
     */
    const handleDeleteAccountPackageClose = () => {
        console.log('Call close delete');
        setShowDeteteAccountPackageModal(false);
        dataAccountPackageModalRef.current = null
    }


    /**
    * Delete Account Package
    */
    const handleDeleteAccountPackage = (Id) => {
        console.log(`Xóa gói tài khoản có id ${Id}`);
        deleteData(Id);
        setShowDeteteAccountPackageModal(false);
        dataAccountPackageModalRef.current = null
    };

    return (
        <>
            <h1 class="font-bold mb-8 text-2xl">Quản lý gói tài khoản</h1>
            <AccountPackageView
                accountPackageList={data}
                serviceData={serviceData}
                pageable={pageable}
                action={action}
                showAddAccountPackageModal={showAddAccountPackageModal}
                showDeteteAccountPackageModal={showDeteteAccountPackageModal}
                dataAccountPackageModalRef={dataAccountPackageModalRef}
                handleAddAccountPackageClick={handleAddAccountPackageClick}
                handleEditAccountPackageClick={handleEditAccountPackageClick}
                handleViewAccountPackageClick={handleViewAccountPackageClick}
                handleAccountPackageModalClose={handleAccountPackageModalClose}
                handleDeteteAccountPackageClick={handleDeteteAccountPackageClick}
                handleDeleteAccountPackageClose={handleDeleteAccountPackageClose}
                handleDeleteAccountPackage={handleDeleteAccountPackage}
                onSearchData={handleSearchData}
                onPageChange={handlePageChange}
            />
        </>
    );
}

export default AccountPackage;
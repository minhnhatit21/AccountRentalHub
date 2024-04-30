import { useContext, useRef, useState } from "react";
import AccountPackageView from "./AccountPackageView";
import { AccountContext } from "../../context/AccountContext";


function AccountPackage() {

    const {action, setAction, actions, servicePlanOptions} = useContext(AccountContext);

    console.log("servicePlanOptions: ", servicePlanOptions)

    // Account Package Modal
    const [showAddAccountPackageModal, setShowAddAccountPackageModal] = useState(false);
    const [showDeteteAccountPackageModal, setShowDeteteAccountPackageModal] = useState(false);
    const dataAccountPackageModalRef = useRef(null);

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
        const data = servicePlanOptions.filter(service => service.id === id);
        dataAccountPackageModalRef.current = data;
        setShowAddAccountPackageModal(true);
    };

    /**
     * View Detail Account Package
     */
    const handleViewAccountPackageClick = (id) => {
        setAction(actions[2]);
        const data = servicePlanOptions.filter(service => service.id === id);
        dataAccountPackageModalRef.current = data;
        setShowAddAccountPackageModal(true);
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
        const data = servicePlanOptions.filter(service => service.id === id);
        dataAccountPackageModalRef.current = data;
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
        setShowDeteteAccountPackageModal(false);
        dataAccountPackageModalRef.current = null
    };

    return (
        <>
            <h1 class="font-bold mb-8 text-2xl">Quản lý gói tài khoản</h1>
            <AccountPackageView
                accountPackageList={servicePlanOptions}
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
            />
        </>
    );
}

export default AccountPackage;
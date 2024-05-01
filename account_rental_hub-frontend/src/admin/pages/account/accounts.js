import { useRef, useState, useContext } from "react";
import Account from "./AccountView";
import AccountSlotView from "./AccountSlotView";
import { AccountContext } from "../../context/AccountContext";


function Accounts() {

     const { accountList, accountSlots, action, setAction, actions, setActions } = useContext(AccountContext);

     // Account Modal
     const [showModal, setShowModal] = useState(false);
     const [showDeteteModal, setShowDeleteModal] = useState(false);
     const dataModalRef = useRef(null);

     // Account Slot Modal
     const [showAccountSlotModal, setShowAccountSlotModal] = useState(false);
     const [showAccountSlotDeteteModal, setShowAccountSlotDeteteModal] = useState(false);
     const dataAccountSlotModalRef = useRef(null);

     /**
      * Add Account
      */
     const handleAddAccountClick = () => {
          setAction(actions[0]);
          setShowModal(true);
     };

     /**
      * Edit Account
     */
     const handleEditAccountClick = (id) => {
          setAction(actions[1]);
          const data = accountList.filter(service => service.id === id);
          dataModalRef.current = data;
          setShowModal(true);
     };

     /**
      * View Details Account
      */
     const handleViewAccountClick = (id) => {
          setAction(actions[2]);
          const data = accountList.filter(service => service.id === id);
          dataModalRef.current = data;
          setShowModal(true);
     }

     /***
      * Account Modal Close
      */
     const handleAccountModalClose = () => {
          setShowModal(false);
          dataModalRef.current = null;
     };

     /**
      * Delete Account Click
      */

     const handleDeteteAccountClick = (id) => {
          setAction(actions[3]);
          const data = accountList.filter(service => service.id === id);
          dataModalRef.current = data;
          setShowDeleteModal(true);
     }

     /**
      * Delete Account Modal Close
      */
     const handleDeleteModalClose = () => {
          console.log('Call close delete');
          setShowDeleteModal(false);
          dataModalRef.current = null
     }

     /**
     * Delete Account
     */
     const handleDeleteAccount = (accountId) => {
          console.log(`Xóa dịch vụ có id ${accountId}`);
          setShowDeleteModal(false);
          dataModalRef.current = null
     };


     /**
      * Add Account Slot
      */

     const handleAddAccountSlotClick = () => {
          setAction(actions[0]);
          setShowAccountSlotModal(true);
     }

     /**
      * Edit Account Slot Slot
     */
     const handleEditAccountSlotClick = (id) => {
          setAction(actions[1]);
          const data = accountSlots.filter(slot => slot.id === id);
          dataAccountSlotModalRef.current = data;
          setShowAccountSlotModal(true);
     };

     /**
      * View Details Slot Account
      */
     const handleViewAccountSlotClick = (id) => {
          setAction(actions[2]);
          const data = accountSlots.filter(slot => slot.id === id);
          dataAccountSlotModalRef.current = data;
          setShowAccountSlotModal(true);
     }

     /***
      * Account Modal Slot Close
      */
     const handleAccountSlotModalClose = () => {
          setShowAccountSlotModal(false);
          dataAccountSlotModalRef.current = null;
     };

     /**
      * Delete Account Slot Click
      */

     const handleDeteteAccountSlotClick = (id) => {
          setAction(actions[3]);
          const data = accountSlots.filter(slot => slot.id === id);
          dataAccountSlotModalRef.current = data;
          setShowAccountSlotDeteteModal(true);
     }

     /**
      * Delete Account Slot Modal Close
      */
     const handleDeleteModalSlotClose = () => {
          console.log('Call close delete');
          setShowAccountSlotDeteteModal(false);
          dataAccountSlotModalRef.current = null
     }

     /**
     * Delete Account Slot
     */
     const handleDeleteAccountSlot = (accountId) => {
          console.log(`Xóa dịch vụ có id ${accountId}`);
          setShowAccountSlotDeteteModal(false);
          dataAccountSlotModalRef.current = null
     };

     return (
          <>
               <div className="mb-10">
                    <h1 class="font-bold mb-8 text-2xl">Quản lý tài khoản </h1>
                    <Account
                         accountList={accountList}
                         dataAccountModalRef={dataModalRef}
                         handleAddAccountClick={handleAddAccountClick}
                         handleEditAccountClick={handleEditAccountClick}
                         handleViewAccountClick={handleViewAccountClick}
                         handleDeteteAccountClick={handleDeteteAccountClick}
                         showAddModal={showModal}
                         showDeteteModal={showDeteteModal}
                         handleAccountModalClose={handleAccountModalClose}
                         handleDeleteAccountClose={handleDeleteModalClose}
                         handleDeleteAccount={handleDeleteAccount}
                         action={action}
                    />

               </div>

               <hr></hr>
               <div className="mt-10">
                    <h1 class="font-bold mb-8 text-2xl">Quản lý slot tài khoản cho thuê </h1>
                    <AccountSlotView
                         accountSlots={accountSlots}
                         action={action}
                         dataAccountSlotModalRef={dataAccountSlotModalRef}
                         showAccountSlotModal={showAccountSlotModal}
                         showAccountSlotDeteteModal={showAccountSlotDeteteModal}
                         handleAddAccountSlotClick={handleAddAccountSlotClick}
                         handleEditAccountSlotClick={handleEditAccountSlotClick}
                         handleDeteteAccountSlotClick={handleDeteteAccountSlotClick}
                         handleViewAccountSlotClick={handleViewAccountSlotClick}
                         handleAccountSlotModalClose={handleAccountSlotModalClose}
                         handleDeteteAccountSlotClose={handleDeleteModalSlotClose}
                         handleDeleteAccountSlot={handleDeleteAccountSlot}
                    />
               </div>
          </>
     );
}

export default Accounts;
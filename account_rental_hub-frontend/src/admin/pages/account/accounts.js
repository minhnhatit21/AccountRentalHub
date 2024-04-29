import { useRef, useState } from "react";
import AccountPackage from "../accountPackage/accountPackageView";
import Account from "./accountView";
import AccountSlotView from "./accountSlotView";
import Datepicker from "../../partials/datepicker";

const accountList = [
     {
          "id": 1,
          "service":
          {
               "service_name": "Netflix",
               "website_link": "https://www.netflix.com"
          }
          ,
          "username": "user1",
          "email": "user1@example.com",
          "password": "encrypted_password",
          "description": "Netflix account",
          "account_package": "Netflix 1 tháng",
          "supcription_date": "2024-02-28T10:30:00Z",
          "renew_start_date": "2024-03-28T10:30:00Z",
          "renew_end_date": "2024-04-28T10:30:00Z",
          "created_at": "2023-03-28T10:30:00Z",
          "updated_at": "2023-03-28T10:30:00Z",
          "status": "active"
     },
     {
          "id": 2,
          "service": {
               "service_name": "Spotify",
               "website_link": "https://spotify.com"
          },
          "username": "user2",
          "email": "user2@example.com",
          "password": "encrypted_password",
          "description": "Spotify Premium account",
          "account_package": "Spotify Premium Individual",
          "supcription_date": "2024-01-15T09:00:00Z",
          "renew_start_date": "2024-04-15T09:00:00Z",
          "renew_end_date": "2024-05-15T09:00:00Z",
          "created_at": "2023-04-15T09:00:00Z",
          "updated_at": "2023-04-15T09:00:00Z",
          "status": "active"
     },
     {
          "id": 3,
          "service": {
               "service_name": "Amazon Prime",
               "website_link": "https://amazon.com"
          },
          "username": "user3",
          "email": "user3@example.com",
          "password": "encrypted_password",
          "description": "Amazon Prime membership",
          "account_package": "Amazon Prime Annual",
          "supcription_date": "2023-12-01T00:00:00Z",
          "renew_start_date": "2024-11-01T00:00:00Z",
          "renew_end_date": "2024-12-01T00:00:00Z",
          "created_at": "2023-12-01T00:00:00Z",
          "updated_at": "2023-12-01T00:00:00Z",
          "status": "active"
     },
     {
          "id": 4,
          "service": {
               "service_name": "Hulu",
               "website_link": "https://hulu.com"
          },
          "username": "user4",
          "email": "user4@example.com",
          "password": "encrypted_password",
          "description": "Hulu subscription",
          "account_package": "Hulu (No Ads)",
          "supcription_date": "2024-03-10T15:30:00Z",
          "renew_start_date": "2024-04-10T15:30:00Z",
          "renew_end_date": "2024-05-10T15:30:00Z",
          "created_at": "2023-04-10T15:30:00Z",
          "updated_at": "2023-04-10T15:30:00Z",
          "status": "active"
     },
     {
          "id": 5,
          "service": {
               "service_name": "Disney+",
               "website_link": "https://disneyplus.com"
          },
          "username": "user5",
          "email": "user5@example.com",
          "password": "encrypted_password",
          "description": "Disney+ subscription",
          "account_package": "Disney+ Premium",
          "supcription_date": "2023-11-20T08:00:00Z",
          "renew_start_date": "2024-11-20T08:00:00Z",
          "renew_end_date": "2024-12-20T08:00:00Z",
          "created_at": "2023-11-20T08:00:00Z",
          "updated_at": "2023-11-20T08:00:00Z",
          "status": "active"
     },
     {
          "id": 6,
          "service": {
               "service_name": "YouTube Premium",
               "website_link": "https://youtube.com"
          },
          "username": "user6",
          "email": "user6@example.com",
          "password": "encrypted_password",
          "description": "YouTube Premium subscription",
          "account_package": "YouTube Premium Family",
          "supcription_date": "2023-07-01T00:00:00Z",
          "renew_start_date": "2024-07-01T00:00:00Z",
          "renew_end_date": "2024-08-01T00:00:00Z",
          "created_at": "2023-07-01T00:00:00Z",
          "updated_at": "2023-07-01T00:00:00Z",
          "status": "active"
     },
     {
          "id": 7,
          "service": {
               "service_name": "Apple Music",
               "website_link": "https://apple.com/music"
          },
          "username": "user7",
          "email": "user7@example.com",
          "password": "encrypted_password",
          "description": "Apple Music subscription",
          "account_package": "Apple Music Individual",
          "supcription_date": "2023-09-15T12:00:00Z",
          "renew_start_date": "2024-09-15T12:00:00Z",
          "renew_end_date": "2024-10-15T12:00:00Z",
          "created_at": "2023-09-15T12:00:00Z",
          "updated_at": "2023-09-15T12:00:00Z",
          "status": "active"
     },
     {
          "id": 8,
          "service": {
               "service_name": "HBO Max",
               "website_link": "https://hbomax.com"
          },
          "username": "user8",
          "email": "user8@example.com",
          "password": "encrypted_password",
          "description": "HBO Max subscription",
          "account_package": "HBO Max Ad-Free",
          "supcription_date": "2023-06-01T18:00:00Z",
          "renew_start_date": "2024-06-01T18:00:00Z",
          "renew_end_date": "2024-07-01T18:00:00Z",
          "created_at": "2023-06-01T18:00:00Z",
          "updated_at": "2023-06-01T18:00:00Z",
          "status": "active"
     },

]

const accountSlots = [
     {
          "id": 1,
          "account": {
               "id": 1,
               "service":
               {
                    "id": "1",
                    "name": "Netflix",
                    "image": "https://i.ibb.co/L6MDz9X/HD-wallpaper-netflix-logo-black-logo-minimal-netflix.jpg",
                    "description": "Dịch vụ xem phim trực tuyến phổ biến nhất hiện nay",
                    "pricing_info": "Từ $8.99/tháng",
                    "website": "netflix.com",
                    "category": "Giải trí"
               }
               ,
               "username": "user1",
               "email": "user1@example.com",
               "password": "encrypted_password",
               "description": "Netflix account",
               "account_package": {
                    "id": "1",
                    "name": "Netflix 1 tháng",
                    "duration": 30,
                    "description": "Truy cập YouTube không quảng cáo, xem video ngoại tuyến",
                    "pricing": 77000,
                    "description": "Tài khoảng netflix 1 tháng",
                    "service": "Netflix"
               },
               "supcription_date": "2024-02-28T10:30:00Z",
               "renew_start_date": "2024-03-28T10:30:00Z",
               "renew_end_date": "2024-04-28T10:30:00Z",
               "created_at": "2023-03-28T10:30:00Z",
               "updated_at": "2023-03-28T10:30:00Z",
               "status": "active"
          },
          "renter": {
               "id": 1,
               "username": "minhnhat01",
               "fullname": "Nguyễn Hữu Minh Nhật",
               "email": "minhnhat@gmail.com"
          },
          "date_stared_rent": "2024-03-28T10:30:00Z",
          "date_end_rent": "2024-04-28T10:30:00Z",
          "price": 80000,
          "status": "rented"
     },
     {
          "id": 2,
          "account": {
               "id": 1,
               "service":
               {
                    "id": "1",
                    "name": "Netflix",
                    "image": "https://i.ibb.co/L6MDz9X/HD-wallpaper-netflix-logo-black-logo-minimal-netflix.jpg",
                    "description": "Dịch vụ xem phim trực tuyến phổ biến nhất hiện nay",
                    "pricing_info": "Từ $8.99/tháng",
                    "website": "netflix.com",
                    "category": "Giải trí"
               }
               ,
               "username": "user1",
               "email": "user1@example.com",
               "password": "encrypted_password",
               "description": "Netflix account",
               "account_package": {
                    "id": "1",
                    "name": "Netflix 1 tháng",
                    "duration": 30,
                    "description": "Truy cập YouTube không quảng cáo, xem video ngoại tuyến",
                    "pricing": 77000,
                    "description": "Tài khoảng netflix 1 tháng",
                    "service": "Netflix"
               },
               "supcription_date": "2024-02-28T10:30:00Z",
               "renew_start_date": "2024-03-28T10:30:00Z",
               "renew_end_date": "2024-04-28T10:30:00Z",
               "created_at": "2023-03-28T10:30:00Z",
               "updated_at": "2023-03-28T10:30:00Z",
               "status": "active"
          },
          "renter": {
               "id": 2,
               "username": "anhtuan99",
               "fullname": "Nguyễn Anh Tuấn",
               "email": "anhtuan99@gmail.com"
          },
          "date_stared_rent": "2024-04-15T09:00:00Z",
          "date_end_rent": "2024-05-15T09:00:00Z",
          "price": 60000,
          "status": "rented"
     },
     {
          "id": 3,
          "account": {
               "id": 1,
               "service":
               {
                    "id": "1",
                    "name": "Netflix",
                    "image": "https://i.ibb.co/L6MDz9X/HD-wallpaper-netflix-logo-black-logo-minimal-netflix.jpg",
                    "description": "Dịch vụ xem phim trực tuyến phổ biến nhất hiện nay",
                    "pricing_info": "Từ $8.99/tháng",
                    "website": "netflix.com",
                    "category": "Giải trí"
               }
               ,
               "username": "user1",
               "email": "user1@example.com",
               "password": "encrypted_password",
               "description": "Netflix account",
               "account_package": {
                    "id": "1",
                    "name": "Netflix 1 tháng",
                    "duration": 30,
                    "description": "Truy cập YouTube không quảng cáo, xem video ngoại tuyến",
                    "pricing": 77000,
                    "description": "Tài khoảng netflix 1 tháng",
                    "service": "Netflix"
               },
               "supcription_date": "2024-02-28T10:30:00Z",
               "renew_start_date": "2024-03-28T10:30:00Z",
               "renew_end_date": "2024-04-28T10:30:00Z",
               "created_at": "2023-03-28T10:30:00Z",
               "updated_at": "2023-03-28T10:30:00Z",
               "status": "active"
          },
          "renter": {
               "id": 3,
               "username": "thanhvan02",
               "fullname": "Trần Thanh Vân",
               "email": "thanhvan02@gmail.com"
          },
          "date_stared_rent": "2024-11-01T00:00:00Z",
          "date_end_rent": "2024-12-01T00:00:00Z",
          "price": 120000,
          "status": "rented"
     },
     {
          "id": 4,
          "account": {
               "id": 1,
               "service":
               {
                    "id": "1",
                    "name": "Netflix",
                    "image": "https://i.ibb.co/L6MDz9X/HD-wallpaper-netflix-logo-black-logo-minimal-netflix.jpg",
                    "description": "Dịch vụ xem phim trực tuyến phổ biến nhất hiện nay",
                    "pricing_info": "Từ $8.99/tháng",
                    "website": "netflix.com",
                    "category": "Giải trí"
               }
               ,
               "username": "user1",
               "email": "user1@example.com",
               "password": "encrypted_password",
               "description": "Netflix account",
               "account_package": {
                    "id": "1",
                    "name": "Netflix 1 tháng",
                    "duration": 30,
                    "description": "Truy cập YouTube không quảng cáo, xem video ngoại tuyến",
                    "pricing": 77000,
                    "description": "Tài khoảng netflix 1 tháng",
                    "service": "Netflix"
               },
               "supcription_date": "2024-02-28T10:30:00Z",
               "renew_start_date": "2024-03-28T10:30:00Z",
               "renew_end_date": "2024-04-28T10:30:00Z",
               "created_at": "2023-03-28T10:30:00Z",
               "updated_at": "2023-03-28T10:30:00Z",
               "status": "rented"
          },
          "renter": {
               "id": 4,
               "username": "phuonganh88",
               "fullname": "Lê Phương Anh",
               "email": "phuonganh88@gmail.com"
          },
          "date_stared_rent": "2024-04-10T15:30:00Z",
          "date_end_rent": "2024-05-10T15:30:00Z",
          "price": 70000,
          "status": "rented"
     },
     {
          "id": 5,
          "account": {
               "id": 3,
               "service": {
                    "id": "3",
                    "name": "Amazon Prime",
                    "image": "https://i.ibb.co/xCFY6mW/amazon-prime.jpg",
                    "description": "Dịch vụ giao hàng miễn phí, xem phim và nhiều ưu đãi khác",
                    "pricing_info": "$119/năm hoặc $12.99/tháng",
                    "website": "amazon.com/prime",
                    "category": "Mua sắm"
               },
               "username": "user3",
               "email": "user3@example.com",
               "password": "encrypted_password",
               "description": "Amazon Prime membership",
               "account_package": {
                    "id": "3",
                    "name": "Amazon Prime 1 năm",
                    "duration": 365,
                    "description": "Giao hàng miễn phí, xem nội dung Prime Video",
                    "pricing": 499000,
                    "service": "Amazon Prime"
               },
               "supcription_date": "2023-12-01T00:00:00Z",
               "renew_start_date": "2024-11-01T00:00:00Z",
               "renew_end_date": "2024-12-01T00:00:00Z",
               "created_at": "2023-12-01T00:00:00Z",
               "updated_at": "2023-12-01T00:00:00Z",
               "status": "active"
          },
          "renter": {
               "id": 5,
               "username": "ngocdiep77",
               "fullname": "Trần Ngọc Diệp",
               "email": "ngocdiep77@gmail.com"
          },
          "date_stared_rent": "2024-11-20T08:00:00Z",
          "date_end_rent": "2024-12-20T08:00:00Z",
          "price": 90000,
          "status": "available"
     }

]


const actions = ["add", "edit", "view", "delete"];

function Accounts() {
     const [action, setAction] = useState(actions[0]);

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
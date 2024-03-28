import { useRef, useState } from "react";
import AccountPackage from "./accountPackageView";
import Account from "./accountView";

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

const accountPackageList = [
     {
          "id": "1",
          "name": "Netflix 1 tháng",
          "duration": 30,
          "description": "Truy cập YouTube không quảng cáo, xem video ngoại tuyến",
          "pricing": 77000,
          "description": "Tài khoảng netflix 1 tháng",
          "service": "Netflix"
     },
     {
          "id": "2",
          "name": "Netflix 3 tháng",
          "duration": 90,
          "description": "Truy cập Netflix không quảng cáo, xem nội dung ngoại tuyến",
          "pricing": 210000,
          "service": "Netflix"
     },
     {
          "id": "3",
          "name": "Amazon Prime 1 năm",
          "duration": 365,
          "description": "Giao hàng miễn phí, xem nội dung Prime Video",
          "pricing": 499000,
          "service": "Amazon Prime"
     },
     {
          "id": "4",
          "name": "Spotify Premium 3 tháng",
          "duration": 90,
          "description": "Nghe nhạc không quảng cáo, tải về ngoại tuyến",
          "pricing": 149000,
          "service": "Spotify"
     },
     {
          "id": "5",
          "name": "YouTube Premium 1 năm",
          "duration": 365,
          "description": "Xem YouTube không quảng cáo, tải video ngoại tuyến",
          "pricing": 599000,
          "service": "YouTube"
     },
     {
          "id": "6",
          "name": "Disney+ 1 tháng",
          "duration": 30,
          "description": "Xem nội dung Disney, Pixar, Marvel, Star Wars",
          "pricing": 99000,
          "service": "Disney+"
     },
     {
          "id": "7",
          "name": "Hulu 6 tháng",
          "duration": 180,
          "description": "Xem phim, chương trình truyền hình và nội dung gốc",
          "pricing": 299000,
          "service": "Hulu"
     },
     {
          "id": "8",
          "name": "HBO Max 1 năm",
          "duration": 365,
          "description": "Xem phim, chương trình truyền hình và nội dung gốc HBO",
          "pricing": 799000,
          "service": "HBO Max"
     },
     {
          "id": "9",
          "name": "Apple TV+ 6 tháng",
          "duration": 180,
          "description": "Xem nội dung gốc Apple TV+, không quảng cáo",
          "pricing": 249000,
          "service": "Apple TV+"
     },
     {
          "id": "10",
          "name": "Peacock Premium 1 năm",
          "duration": 365,
          "description": "Xem nội dung NBC, phim, chương trình truyền hình",
          "pricing": 499000,
          "service": "Peacock"
     },
     {
          "id": "11",
          "name": "Paramount+ 3 tháng",
          "duration": 90,
          "description": "Xem nội dung Paramount, phim, chương trình truyền hình",
          "pricing": 149000,
          "service": "Paramount+"
     },
]

const actions = ["add", "edit", "view", "delete"];

function Accounts() {
     const [action, setAction] = useState(actions[0]);

     // Account Modal
     const [showModal, setShowModal] = useState(false);
     const [showDeteteModal, setShowDeleteModal] = useState(false);
     const dataModalRef = useRef(null);

     // Account Package Modal
     const [showAddAccountPackageModal, setShowAddAccountPackageModal] = useState(false);
     const [showDeteteAccountPackageModal, setShowDeteteAccountPackageModal] = useState(false);
     const dataAccountPackageModalRef = useRef(null);

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
          const data = accountPackageList.filter(service => service.id === id);
          dataAccountPackageModalRef.current = data;
          setShowAddAccountPackageModal(true);
     };

     /**
      * View Detail Account Package
      */
     const handleViewAccountPackageClick = (id) => {
          setAction(actions[2]);
          const data = accountPackageList.filter(service => service.id === id);
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
          const data = accountPackageList.filter(service => service.id === id);
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
                    <h1 class="font-bold mb-8 text-2xl">Quản lý gói tài khoản</h1>
                    <AccountPackage
                         accountPackageList={accountPackageList}
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
               </div>


          </>
     );
}

export default Accounts;
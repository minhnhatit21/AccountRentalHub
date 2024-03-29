import { useRef, useState } from "react";
import AccountPackageView from "./accountPackageView";

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

function AccountPackage() {

    const [action, setAction] = useState(actions[0]);

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
            <h1 class="font-bold mb-8 text-2xl">Quản lý gói tài khoản</h1>
            <AccountPackageView
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
        </>
    );
}

export default AccountPackage;
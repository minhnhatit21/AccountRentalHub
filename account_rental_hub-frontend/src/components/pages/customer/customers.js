import { useState, useEffect, useRef } from "react";
import CustomerView from "./customerView";

const customerList = [
    {
        "id": 1,
        "user": {
            "id": 1,
            "role": "user",
            "username": "nguyenvana",
            "email": "nguyenvana@example.com",
            "password": "password123",
            "created_at": "2023-04-01T12:00:00Z",
            "updated_at": "2023-04-05T09:30:00Z"
        },
        "fullname": "Nguyễn Văn A",
        "phone": "0123456789",
        "address": "123 Nguyễn Trãi, Quận 5, TP.HCM",
        "created_at": "2023-04-01T12:00:00Z",
        "updated_at": "2023-04-05T09:30:00Z"
    },
    {
        "id": 2,
        "user": {
            "id": 2,
            "role": "user",
            "username": "lethib",
            "email": "lethib@example.com",
            "password": "password456",
            "created_at": "2023-03-15T08:45:00Z",
            "updated_at": "2023-03-20T14:15:00Z"
        },
        "fullname": "Lê Thị B",
        "phone": "0987654321",
        "address": "456 Trần Hưng Đạo, Quận 1, TP.HCM",
        "created_at": "2023-03-15T08:45:00Z",
        "updated_at": "2023-03-20T14:15:00Z"
    },
    {
        "id": 3,
        "user": {
            "id": 3,
            "role": "user",
            "username": "tranthic",
            "email": "tranthic@example.com",
            "password": "password789",
            "created_at": "2023-02-28T16:20:00Z",
            "updated_at": "2023-03-05T11:10:00Z"
        },
        "fullname": "Trần Thị C",
        "phone": "0135792468",
        "address": "789 Lê Lợi, Quận 3, TP.HCM",
        "created_at": "2023-02-28T16:20:00Z",
        "updated_at": "2023-03-05T11:10:00Z"
    },
    {
        "id": 4,
        "user": {
            "id": 4,
            "role": "user",
            "username": "dovanh",
            "email": "dovanh@example.com",
            "password": "password246",
            "created_at": "2023-01-22T09:00:00Z",
            "updated_at": "2023-02-01T14:45:00Z"
        },
        "fullname": "Đỗ Văn H",
        "phone": "0246813579",
        "address": "012 Phan Đăng Lưu, Quận 5, TP.HCM",
        "created_at": "2023-01-22T09:00:00Z",
        "updated_at": "2023-02-01T14:45:00Z"
    },
    {
        "id": 5,
        "user": {
            "id": 5,
            "role": "user",
            "username": "lehongk",
            "email": "lehongk@example.com",
            "password": "password369",
            "created_at": "2022-12-10T15:30:00Z",
            "updated_at": "2022-12-18T10:00:00Z"
        },
        "fullname": "Lê Hồng K",
        "phone": "0369258147",
        "address": "345 Võ Văn Tần, Quận 3, TP.HCM",
        "created_at": "2022-12-10T15:30:00Z",
        "updated_at": "2022-12-18T10:00:00Z"
    },
    {
        "id": 6,
        "user": {
            "id": 6,
            "role": "user",
            "username": "tranthil",
            "email": "tranthil@example.com",
            "password": "password147",
            "created_at": "2022-11-05T13:00:00Z",
            "updated_at": "2022-11-15T17:45:00Z"
        },
        "fullname": "Trần Thị L",
        "phone": "0147852369",
        "address": "678 Trường Chinh, Quận Tân Bình, TP.HCM",
        "created_at": "2022-11-05T13:00:00Z",
        "updated_at": "2022-11-15T17:45:00Z"
    },
    {
        "id": 7,
        "user": {
            "id": 7,
            "role": "user",
            "username": "nguyenvanm",
            "email": "nguyenvanm@example.com",
            "password": "password753",
            "created_at": "2022-10-18T11:00:00Z",
            "updated_at": "2022-10-25T14:30:00Z"
        },
        "fullname": "Nguyễn Văn M",
        "phone": "0753159753",
        "address": "901 Cách Mạng Tháng 8, Quận 3, TP.HCM",
        "created_at": "2022-10-18T11:00:00Z",
        "updated_at": "2022-10-25T14:30:00Z"
    },
    {
        "id": 8,
        "user": {
            "id": 8,
            "role": "user",
            "username": "tranthin",
            "email": "tranthin@example.com",
            "password": "password951",
            "created_at": "2022-09-20T09:45:00Z",
            "updated_at": "2022-09-30T16:15:00Z"
        },
        "fullname": "Trần Thị N",
        "phone": "0951753951",
        "address": "234 Nguyễn Văn Cừ, Quận 5, TP.HCM",
        "created_at": "2022-09-20T09:45:00Z",
        "updated_at": "2022-09-30T16:15:00Z"
    },
    {
        "id": 9,
        "user": {
            "id": 9,
            "role": "user",
            "username": "levanp",
            "email": "levanp@example.com",
            "password": "password147",
            "created_at": "2022-08-12T14:00:00Z",
            "updated_at": "2022-08-20T11:30:00Z"
        },
        "fullname": "Lê Văn Pháp",
        "phone": "0147852693",
        "address": "567 Ngô Quyền, Quận 10, TP.HCM",
        "created_at": "2022-08-12T14:00:00Z",
        "updated_at": "2022-08-20T11:30:00Z"
    },
    {
        "id": 10,
        "user": {
            "id": 10,
            "role": "user",
            "username": "nguyenthar",
            "email": "nguyenthar@example.com",
            "password": "password753",
            "created_at": "2022-07-01T10:30:00Z",
            "updated_at": "2022-07-15T15:00:00Z"
        },
        "fullname": "Nguyễn Thị A",
        "phone": "0753159357",
        "address": "890 Bà Huyện Thanh Quan, Quận 3, TP.HCM",
        "created_at": "2022-07-01T10:30:00Z",
        "updated_at": "2022-07-15T15:00:00Z"
    },
    {
        "id": 11,
        "user": {
            "id": 11,
            "role": "user",
            "username": "doanhuts",
            "email": "doanhuts@example.com",
            "password": "password951",
            "created_at": "2022-06-08T13:45:00Z",
            "updated_at": "2022-06-20T09:00:00Z"
        },
        "fullname": "Đoàn Hữu T",
        "phone": "0951753159",
        "address": "123 Lý Tự Trọng, Quận 1, TP.HCM",
        "created_at": "2022-06-08T13:45:00Z",
        "updated_at": "2022-06-20T09:00:00Z"
    },
    {
        "id": 12,
        "user": {
            "id": 12,
            "role": "user",
            "username": "tranvanv",
            "email": "tranvanv@example.com",
            "password": "password753",
            "created_at": "2022-05-15T16:00:00Z",
            "updated_at": "2022-05-25T11:00:00Z"
        },
        "fullname": "Trần Văn V",
        "phone": "0753159357",
        "address": "456 Phan Xích Long, Quận Phú Nhuận, TP.HCM",
        "created_at": "2022-05-15T16:00:00Z",
        "updated_at": "2022-05-25T11:00:00Z"
    },
    {
        "id": 13,
        "user": {
            "id": 13,
            "role": "user",
            "username": "nguyenthix",
            "email": "nguyenthix@example.com",
            "password": "password951",
            "created_at": "2022-04-22T08:30:00Z",
            "updated_at": "2022-05-01T14:15:00Z"
        },
        "fullname": "Nguyễn Thị X",
        "phone": "0951753951",
        "address": "789 Lê Đại Hành, Quận 11, TP.HCM",
        "created_at": "2022-04-22T08:30:00Z",
        "updated_at": "2022-05-01T14:15:00Z"
    },
    {
        "id": 14,
        "user": {
            "id": 14,
            "role": "user",
            "username": "lethuya",
            "email": "lethuya@example.com",
            "password": "password147",
            "created_at": "2022-03-30T11:45:00Z",
            "updated_at": "2022-04-10T17:00:00Z"
        },
        "fullname": "Lê Thúy A",
        "phone": "0147852693",
        "address": "012 Nguyễn Văn Linh, Quận 7, TP.HCM",
        "created_at": "2022-03-30T11:45:00Z",
        "updated_at": "2022-04-10T17:00:00Z"
    },
    {
        "id": 15,
        "user": {
            "id": 15,
            "role": "user",
            "username": "nguyenvanb",
            "email": "nguyenvanb@example.com",
            "password": "password753",
            "created_at": "2022-03-01T14:00:00Z",
            "updated_at": "2022-03-15T10:30:00Z"
        },
        "fullname": "Nguyễn Văn B",
        "phone": "0753159357",
        "address": "345 Điện Biên Phủ, Quận 3, TP.HCM",
        "created_at": "2022-03-01T14:00:00Z",
        "updated_at": "2022-03-15T10:30:00Z"
    }
]

const actions = ["add", "edit", "view", "delete"];

function Customers() {

    const [action, setAction] = useState(actions[0]);
    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [showDeteteCustomerModal, setShowDeleteCustomerModal] = useState(false);
    const dataModalRef = useRef(null);

    // Hanldle Add customers
    const handleAddCustomerClick = () => {
        setAction(actions[0]);
        setShowCustomerModal(true);
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
        console.log('Call close delete');
        setShowDeleteCustomerModal(false);
        dataModalRef.current = null
    }

    const handleDeleteCustomer = (customerId) => {
        console.log(`Xóa khách hàng có id ${customerId}`);
        setShowDeleteCustomerModal(false);
        dataModalRef.current = null
    };

    return (
        <>
            <CustomerView
                customerList={customerList}
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
            />
        </>
    );
}

export default Customers;
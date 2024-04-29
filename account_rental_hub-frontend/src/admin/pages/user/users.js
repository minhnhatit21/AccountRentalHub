import { useState, useEffect, useRef } from "react";
import UserView from "./userView";
const userAccountList =
    [
        {
            "id": 1,
            "role": "user",
            "username": "nguyenvana",
            "email": "nguyenvana@example.com",
            "password": "password123",
            "status": "active",
            "avatar_image": "https://i.ibb.co/hL1rqQw/rabbit-avatar.jpg",
            "created_at": "2023-04-01T12:00:00Z",
            "updated_at": "2023-04-05T09:30:00Z"
        },
        {
            "id": 2,
            "role": "user",
            "username": "lethib",
            "email": "lethib@example.com",
            "password": "password456",
            "status": "active",
            "avatar_image": "https://i.ibb.co/H21qTGt/pig-avatar.jpg",
            "created_at": "2023-03-15T08:45:00Z",
            "updated_at": "2023-03-20T14:15:00Z"
        },
        {
            "id": 3,
            "role": "user",
            "username": "tranthic",
            "email": "tranthic@example.com",
            "password": "password789",
            "status": "active",
            "avatar_image": "https://i.ibb.co/hL1rqQw/rabbit-avatar.jpg",
            "created_at": "2023-02-28T16:20:00Z",
            "updated_at": "2023-03-05T11:10:00Z"
        },
        {
            "id": 4,
            "role": "user",
            "username": "dovanh",
            "email": "dovanh@example.com",
            "password": "password246",
            "status": "active",
            "avatar_image": "https://i.ibb.co/hL1rqQw/rabbit-avatar.jpg",
            "created_at": "2023-01-22T09:00:00Z",
            "updated_at": "2023-02-01T14:45:00Z"
        },
        {
            "id": 5,
            "role": "user",
            "username": "lehongk",
            "email": "lehongk@example.com",
            "password": "password369",
            "status": "active",
            "avatar_image": "https://i.ibb.co/H21qTGt/pig-avatar.jpg",
            "created_at": "2022-12-10T15:30:00Z",
            "updated_at": "2022-12-18T10:00:00Z"
        },
        {
            "id": 6,
            "role": "user",
            "username": "tranthil",
            "email": "tranthil@example.com",
            "password": "password147",
            "status": "active",
            "avatar_image": "https://i.ibb.co/hL1rqQw/rabbit-avatar.jpg",
            "created_at": "2022-11-05T13:00:00Z",
            "updated_at": "2022-11-15T17:45:00Z"
        },
        {
            "id": 7,
            "role": "user",
            "username": "nguyenvanm",
            "email": "nguyenvanm@example.com",
            "password": "password753",
            "status": "active",
            "avatar_image": "https://i.ibb.co/H21qTGt/pig-avatar.jpg",
            "created_at": "2022-10-18T11:00:00Z",
            "updated_at": "2022-10-25T14:30:00Z"
        },
        {
            "id": 8,
            "role": "user",
            "username": "tranthin",
            "email": "tranthin@example.com",
            "password": "password951",
            "status": "active",
            "avatar_image": "https://i.ibb.co/hL1rqQw/rabbit-avatar.jpg",
            "created_at": "2022-09-20T09:45:00Z",
            "updated_at": "2022-09-30T16:15:00Z"
        },
        {
            "id": 9,
            "role": "user",
            "username": "levanp",
            "email": "levanp@example.com",
            "password": "password147",
            "status": "active",
            "avatar_image": "https://i.ibb.co/H21qTGt/pig-avatar.jpg",
            "created_at": "2022-08-12T14:00:00Z",
            "updated_at": "2022-08-20T11:30:00Z"
        },
        {
            "id": 10,
            "role": "user",
            "username": "nguyenthar",
            "email": "nguyenthar@example.com",
            "password": "password753",
            "status": "active",
            "avatar_image": "https://i.ibb.co/H21qTGt/pig-avatar.jpg",
            "created_at": "2022-07-01T10:30:00Z",
            "updated_at": "2022-07-15T15:00:00Z"
        },
        {
            "id": 11,
            "role": "user",
            "username": "doanhuts",
            "email": "doanhuts@example.com",
            "password": "password951",
            "status": "active",
            "avatar_image": "https://i.ibb.co/hL1rqQw/rabbit-avatar.jpg",
            "created_at": "2022-06-08T13:45:00Z",
            "updated_at": "2022-06-20T09:00:00Z"
        },
        {
            "id": 12,
            "role": "user",
            "username": "tranvanv",
            "email": "tranvanv@example.com",
            "password": "password753",
            "status": "active",
            "avatar_image": "https://i.ibb.co/hL1rqQw/rabbit-avatar.jpg",
            "created_at": "2022-05-15T16:00:00Z",
            "updated_at": "2022-05-25T11:00:00Z"
        },
        {
            "id": 13,
            "role": "user",
            "username": "nguyenthix",
            "email": "nguyenthix@example.com",
            "password": "password951",
            "status": "active",
            "avatar_image": "https://i.ibb.co/H21qTGt/pig-avatar.jpg",
            "created_at": "2022-04-22T08:30:00Z",
            "updated_at": "2022-05-01T14:15:00Z"
        },
        {
            "id": 14,
            "role": "user",
            "username": "lethuya",
            "email": "lethuya@example.com",
            "password": "password147",
            "status": "active",
            "avatar_image": "https://i.ibb.co/hL1rqQw/rabbit-avatar.jpg",
            "created_at": "2022-03-30T11:45:00Z",
            "updated_at": "2022-04-10T17:00:00Z"
        },
        {
            "id": 15,
            "role": "user",
            "username": "nguyenvanb",
            "email": "nguyenvanb@example.com",
            "password": "password753",
            "status": "active",
            "avatar_image": "https://i.ibb.co/hL1rqQw/rabbit-avatar.jpg",
            "created_at": "2022-03-01T14:00:00Z",
            "updated_at": "2022-03-15T10:30:00Z"
        }
    ]

const actions = ["add", "edit", "view", "delete"];
function Users() {
    const [action, setAction] = useState(actions[0]);
    const [showUserModal, setShowUserModal] = useState(false);
    const [showDeteteUserModal, setShowDeleteUserModal] = useState(false);
    const dataModalRef = useRef(null);

    // Hanldle Add Users
    const handleAddUserClick = () => {
        setAction(actions[0]);
        setShowUserModal(true);
    };

    const handleEditUserClick = (id) => {
        setAction(actions[1]);
        const data = userAccountList.filter(User => User.id === id);
        dataModalRef.current = data;
        setShowUserModal(true);
    };

    const handleViewUserClick = (id) => {
        setAction(actions[2]);
        const data = userAccountList.filter(User => User.id === id);
        dataModalRef.current = data;
        setShowUserModal(true);
    }

    const handleUserModalClose = () => {
        setShowUserModal(false);
        dataModalRef.current = null;
    };

    // Delete User

    const handleDeteteUserClick = (id) => {
        setAction(actions[3]);
        const data = userAccountList.filter(User => User.id === id);
        dataModalRef.current = data;
        setShowDeleteUserModal(true);
    }

    const handleDeleteUserModalClose = () => {
        console.log('Call close delete');
        setShowDeleteUserModal(false);
        dataModalRef.current = null
    }

    const handleDeleteUser = (UserId) => {
        console.log(`Xóa tài khoản khách hàng có id ${UserId}`);
        setShowDeleteUserModal(false);
        dataModalRef.current = null
    };

    return (
        <>
            <UserView
                userList={userAccountList}
                action={action}
                isOpenModal={showUserModal}
                isOpenDeleteModal={showDeteteUserModal}
                dataModal={dataModalRef}
                userModalClose={handleUserModalClose}
                handleViewUserClick={handleViewUserClick}
                handleEditUserClick={handleEditUserClick}
                handleDeleteUserClick={handleDeteteUserClick}
                handleDeleteUserModalClose={handleDeleteUserModalClose}
                handleDeleteUser={handleDeleteUser}
            />
        </>
    );
}

export default Users;
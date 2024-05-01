import { useState, useRef, useContext } from "react";
import UserView from "./UserView";
import { UserContext } from "../../context/UserContext";
function Users() {
    const {userAccountList, action, setAction, actions} = useContext(UserContext);

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
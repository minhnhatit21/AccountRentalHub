import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { toast } from 'react-toastify';
import AccountPackageService from '../../services/account-rental-package.service';
import AccountRentalService from '../../services/account-rental.service';
import { GlobalContext } from './GlobalContext';

export const AccountContext = createContext("");

const actionList = ["add", "edit", "view", "delete"];

export const AccountProvider = ({ children }) => {
    const [accountList, setAccountList] = useState([]);
    const [packageData, setPackageData] = useState([]);

    const [pageable, setPageable] = useState(null);

    const [action, setAction] = useState('add');
    const [actions, setActions] = useState(actionList);
    const [update, setUpdate] = useState(false);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);

    const [usernameSearch, setUsernameSearch] = useState("");
    const [statusSearch, setStatusSearch] = useState("");
    const [packageIDSearch, setPackageIDSearch] = useState("");

    // Global Context
    const {globalUpdate, setGlobalUpdate} = useContext(GlobalContext);

    useEffect(() => {
        const fetchAccountPackage = async () => {
            try {
                const response = await AccountPackageService.getAllAccountRentalPackages();
                if (response != null) {
                    setPackageData(response);
                } else {
                    setPackageData([]);
                    console.error("Not Found Data");
                }
            } catch (error) {
                toast.error("Đã xảy ra lỗi khi tải dữ liệu ban đầu");
            }
        };

        fetchAccountPackage();
    }, []);

    const fetchAccountRentals = useCallback(async () => {
        try {
            const response = await AccountRentalService.searchAccountRental(page, size, statusSearch, usernameSearch, packageIDSearch);
            if (response?.content) {
                setAccountList(response.content);
                setPageable(response.pageable);
            } else {
                setAccountList([]);
                setPageable(null);
                console.error("Not Found Data");
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setAccountList([]);
                setPageable(null);
                console.error("Not Found Data");
                toast.warning("Không tìm thấy dữ liệu");
            } else {
                console.error("Error while searching data:", error);
                toast.error("Đã xảy ra lỗi khi search dữ liệu");
            }
        }
    }, [page, size, statusSearch, usernameSearch, packageIDSearch]);

    useEffect(() => {
        fetchAccountRentals();
    }, [fetchAccountRentals, page, update, globalUpdate]);

    const changePage = (newPage) => {
        setPage(newPage);
        setUpdate(prev => !prev); // Ensure it triggers a re-fetch
    };

    const searchData = useCallback(async (status, username, packageID) => {
        setPage(0);
        setStatusSearch(status || "");
        setUsernameSearch(username || "");
        setPackageIDSearch(packageID || "");
        setUpdate(prev => !prev); 
    }, []);

    const createData = async (accountData) => {
        try {
            await AccountRentalService.createAccountRental(accountData);
            toast.success("Thêm dữ liệu thành công");
            setUpdate(prev => !prev);
            setGlobalUpdate(prev => !prev)
        } catch (error) {
            toast.error(error.response.data.message + ". Vui lòng thử lại!");
        }
    };

    const updateData = async (id, accountData) => {
        try {
            await AccountRentalService.updateAccountRental(id, accountData);
            toast.success("Cập nhật dữ liệu thành công");
            setUpdate(prev => !prev);
            setGlobalUpdate(prev => !prev)
        } catch (error) {
            console.error("Lỗi khi cập nhật dữ liệu:", error);
            toast.error("Đã xảy ra lỗi khi cập nhật dữ liệu");
        }
    };

    const deleteData = async (id) => {
        try {
            await AccountRentalService.deleteAccountRental(id);
            toast.success("Xóa dữ liệu thành công");
            setUpdate(prev => !prev);
            setGlobalUpdate(prev => !prev)
        } catch (error) {
            console.error("Lỗi khi xóa dữ liệu:", error);
            toast.error("Đã xảy ra lỗi khi xóa dữ liệu");
        }
    };

    const value = {
        accountList,
        packageData,
        pageable,
        action,
        actions,
        setAccountList,
        setAction,
        setActions,
        update,
        setUpdate,
        createData,
        deleteData,
        updateData,
        changePage,
        searchData,
        setUsernameSearch,
        setStatusSearch,
        setPackageIDSearch,
    };

    return (
        <AccountContext.Provider value={value}>
            {children}
        </AccountContext.Provider>
    );
};

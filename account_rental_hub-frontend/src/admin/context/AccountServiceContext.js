import { createContext, useEffect, useState, useCallback } from "react";
import AccountServiceRentalService from "../../services/account-rental-service.service";
import { toast } from "react-toastify";

export const AccountServiceContext = createContext("");


const actionList = ["add", "edit", "view", "delete"];

export const AccountServiceProvider = ({ children }) => {
    const [serviceAccounts, setServiceAccounts] = useState([]);
    const [action, setAction] = useState('add');
    const [actions, setActions] = useState(actionList);
    const [update, setUpdate] = useState(false);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);

    const [nameSearch, setNameSearch] = useState("");
    const [categorySearch, setCategorySearch] = useState("");


    const [serviceAccountsPageable, setServiceAccountsPageable] = useState(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await AccountServiceRentalService.searchAccountServiceRental(page, size, categorySearch, nameSearch);
                if (response?.content) {
                    setServiceAccounts(response.content);
                    setServiceAccountsPageable(response.pageable);
                } else {
                    setServiceAccounts([]);
                    setServiceAccountsPageable(null);
                    console.error("Not Found Data");
                }
            } catch (error) {
                toast.error("Đã xảy ra lỗi khi tải dữ liệu ban đầu");
            }
        };

        fetchInitialData();
    }, [page, update]);

    const changePage = (newPage) => {

        setPage(newPage);
        searchData(categorySearch, nameSearch); // Gọi hàm searchData khi page thay đổi
    };

    const searchData = async (category, name) => {
        let nameValue = name !== undefined ? name : "";
        let categoryValue = category !== undefined ? category : "";
        
        if (nameValue !== nameSearch || categoryValue !== categorySearch) {
            setPage(0);
            console.log("Page number:", page);
            try {
                const response = await AccountServiceRentalService.searchAccountServiceRental(page , size, categoryValue, nameValue);

                if (response?.content) {
                    setServiceAccounts(response.content);
                    setServiceAccountsPageable(response.pageable);
                    setNameSearch(nameValue);
                    setCategorySearch(categoryValue);
                    // setUpdate(!update);
                } else {
                    setServiceAccounts([]);
                    setServiceAccountsPageable(null);
                    console.error("Not Found Data");
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setServiceAccounts([]);
                    setServiceAccountsPageable(null);
                    console.error("Not Found Data");
                    toast.warning("Không tìm thấy dữ liệu");
                } else {
                    console.error("Error while searching data:", error);
                    toast.error("Đã xảy ra lỗi khi search dữ liệu");
                }
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await searchData(categorySearch, nameSearch);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [searchData, categorySearch, nameSearch, page, update]);

    const createData = async (serviceData) => {
        try {
            await AccountServiceRentalService.createAccountServiceRetal(serviceData);
            toast.success("Thêm dữ liệu thành công");
            setUpdate(!update)
        } catch (error) {
            //console.error("Lỗi khi thêm dữ liệu:", error.response.data);
            toast.error(error.response.data + ". Vui lòng thử lại!");
        }
    };

    const updateData = async (id, serviceData) => {
        try {
            await AccountServiceRentalService.updateAccountServiceRetal(id, serviceData);
            toast.success("Cập nhật dữ liệu thành công");
            setUpdate(!update)
        } catch (error) {
            console.error("Lỗi khi cập nhật dữ liệu:", error);
            toast.error("Đã xảy ra lỗi khi cập nhật dữ liệu");
        }
    };

    const deleteData = async (id) => {
        try {
            await AccountServiceRentalService.deleteAccountServiceRental(id);
            toast.success("Xóa liệu thành công");
            setUpdate(!update)
        } catch (error) {
            console.error("Lỗi khi xóa dữ liệu:", error);
            toast.error("Đã xảy ra lỗi khi xóa dữ liệu");
        }
    }

    const value = {
        serviceAccounts,
        action,
        actions,
        setAction,
        setActions,
        serviceAccountsPageable,
        update,
        setUpdate,
        createData,
        deleteData,
        updateData,
        changePage,
        searchData,
        setNameSearch,
        setCategorySearch
        // Các phương thức xử lý khác
    };

    return (
        <AccountServiceContext.Provider value={value}>
            {children}
        </AccountServiceContext.Provider>
    );
}
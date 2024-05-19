import { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AccountRentalService from "../../services/account-rental.service";
import AccountPackageService from "../../services/account-rental-package.service";
import AccountSlotService from "../../services/acount-slot.service";
import CustomerService from "../../services/customer.service";

export const AccountSlotContext = createContext("");


const actionList = ["add", "edit", "view", "delete"];

export const AccountSlotProvider = ({ children }) => {
    const [accountSlots, setAccountSlots] = useState([]);
    const [customerList, setCustomerList] = useState([]);

    const [pageable, setPageable] = useState(null);



    const [action, setAction] = useState('add');
    const [actions, setActions] = useState(actionList);
    const [update, setUpdate] = useState(false);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);

    const [fullnameSearch, setFullnameSearch] = useState("");
    const [statusSearch, setStatusSearch] = useState("");
    const [packageIDSearch, setPackageIDSearch] = useState("");

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await CustomerService.getAllCustomer();
                if (response != null) {
                    setCustomerList(response);
                } else {
                    setCustomerList([]);
                    console.error("Not Found Data");
                }
            } catch (error) {
                toast.error("Đã xảy ra lỗi khi tải dữ liệu ban đầu");
            }
        };

        fetchCustomer();
    }, []);

    useEffect(() => {
        const fetchAccountSlotInitialData = async () => {
            try {
                const response = await AccountSlotService.searchAccountSlots(page, size, statusSearch, fullnameSearch, packageIDSearch)
                if (response?.content) {
                    setAccountSlots(response.content);
                    setPageable(response.pageable);
                } else {
                    setAccountSlots([]);
                    setPageable(null);
                    console.error("Not Found Data");
                }
            } catch (error) {
                toast.error("Đã xảy ra lỗi khi tải dữ liệu ban đầu");
            }
        };

        fetchAccountSlotInitialData();
    },[])

    const changePage = (newPage) => {

        setPage(newPage);
        searchSlotData(statusSearch, fullnameSearch, packageIDSearch)
    };

    const searchSlotData = useCallback(async (status, username, packageID) => {
        let usernameValue = username !== undefined ? username : "";
        let statusValue = status !== undefined ? status : "";
        let packageIDValue = packageID !== undefined ? packageID : "";
        console.log(`Form Data: ${status}, ${username}, ${packageID}`);
        if (usernameValue !== fullnameSearch || statusValue !== statusSearch || packageIDValue !== packageIDSearch) {
            setPage(0);
            try {
                const response = await  AccountSlotService.searchAccountSlots(page, size, statusValue, usernameValue, packageIDValue);
                if (response?.content) {
                    setAccountSlots(response.content);
                    setPageable(response.pageable);
                    setFullnameSearch(usernameValue);
                    setStatusSearch(statusValue);
                    setPackageIDSearch(packageIDValue);
                } else {
                    setAccountSlots([]);
                    setPageable(null);
                    console.error("Not Found Data");
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setAccountSlots([]);
                    setPageable(null);
                    console.error("Not Found Data");
                    toast.warning("Không tìm thấy dữ liệu");
                } else {
                    console.error("Error while searching data:", error);
                    toast.error("Đã xảy ra lỗi khi search dữ liệu");
                }
            }
        }
    }, [page, size, fullnameSearch, statusSearch, packageIDSearch]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await searchSlotData(statusSearch, fullnameSearch, packageIDSearch);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [searchSlotData, statusSearch, fullnameSearch, packageIDSearch, page, update]);


    const createData = async (accountData) => {
        try {
            await AccountRentalService.createAccountRental(accountData);
            toast.success("Thêm dữ liệu thành công");
            setUpdate(!update)
        } catch (error) {
            //console.error("Lỗi khi thêm dữ liệu:", error.response.data);
            toast.error(error.response.data.message + ". Vui lòng thử lại!");
        }
    };

    const updateData = async (id, accountData) => {
        try {
            await AccountRentalService.updateAccountRental(id, accountData);
            toast.success("Cập nhật dữ liệu thành công");
            setUpdate(!update)
        } catch (error) {
            console.error("Lỗi khi cập nhật dữ liệu:", error);
            toast.error("Đã xảy ra lỗi khi cập nhật dữ liệu");
        }
    };

    const deleteData = async (id) => {
        try {
            await AccountRentalService.deleteAccountRental(id);
            toast.success("Xóa liệu thành công");
            setUpdate(!update)
        } catch (error) {
            console.error("Lỗi khi xóa dữ liệu:", error);
            toast.error("Đã xảy ra lỗi khi xóa dữ liệu");
        }
    }

    const value = {
        accountSlots,
        customerList,
        action,
        actions,
        pageable,
        setAccountSlots,
        setAction,
        setActions,
        update,
        setUpdate,
        createData,
        deleteData,
        updateData,
        changePage,
        searchSlotData,
        setFullnameSearch,
        setStatusSearch,
        setPackageIDSearch,
        createData
        // Các phương thức xử lý khác
    };

    return (
        <AccountSlotContext.Provider value={value}>
            {children}
        </AccountSlotContext.Provider>
    );
}
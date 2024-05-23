import { createContext, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import AccountPackageService from "../../services/account-rental-package.service";
import AccountServiceRentalService from "../../services/account-rental-service.service";

export const AccountPackageContext = createContext("");

const actionList = ["add", "edit", "view", "delete"];

export const AccountPackageProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [serviceData, setServiceData] = useState([]);
    const [pageable, setPageable] = useState(null);
    const [action, setAction] = useState('add');
    const [actions, setActions] = useState(actionList);
    const [update, setUpdate] = useState(false);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);

    const [serviceSearch, setServiceSearch] = useState("");
    const [nameSearch, setNameSearch] = useState("");

    useEffect(() => {
        const fetchServiceNameData = async () => {
            try {
                const response = await AccountServiceRentalService.getListServiceName();
                if (response) {
                    setServiceData(response);
                } else {
                    setServiceData([]);
                    console.error("Not Found Data");
                }
            } catch (error) {
                toast.error("Đã xảy ra lỗi khi tải dữ liệu ban đầu");
            }
        };
        fetchServiceNameData();
    }, []);

    const fetchInitialData = useCallback(async () => {
        try {
            const response = await AccountPackageService.searchAccountPackage(page, size, serviceSearch, nameSearch);
            if (response?.content) {
                setData(response.content);
                setPageable(response.pageable);
            } else {
                setData([]);
                setPageable(null);
                console.error("Not Found Data");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi tải dữ liệu ban đầu");
        }
    }, [page, size, serviceSearch, nameSearch]);

    useEffect(() => {
        fetchInitialData();
    }, [fetchInitialData]);

    const searchData = useCallback(
        async (category, name) => {
            let nameValue = name !== undefined ? name : "";
            let serviceValue = category !== undefined ? category : "";
            if (nameValue !== nameSearch || serviceValue !== serviceSearch) {
                setPage(0); // Reset page to 0 for new search
            }
            try {
                const response = await AccountPackageService.searchAccountPackage(0, size, serviceValue, nameValue);
                if (response?.content) {
                    setData(response.content);
                    setPageable(response.pageable);
                    setNameSearch(nameValue);
                    setServiceSearch(serviceValue);
                } else {
                    setData([]);
                    setPageable(null);
                    console.error("Not Found Data");
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setData([]);
                    setPageable(null);
                    console.error("Not Found Data");
                    toast.warning("Không tìm thấy dữ liệu");
                } else {
                    console.error("Error while searching data:", error);
                    toast.error("Đã xảy ra lỗi khi search dữ liệu");
                }
            }
        },
        [nameSearch, serviceSearch, size]
    );

    const createData = async (packageData) => {
        try {
            await AccountPackageService.createAccountPackage(packageData);
            toast.success("Thêm dữ liệu thành công");
            setUpdate(!update);
        } catch (error) {
            toast.error(error.response?.data?.message + ". Vui lòng thử lại!");
        }
    };

    const updateData = async (id, packageData) => {
        try {
            await AccountPackageService.updateAccountPackage(id, packageData);
            toast.success("Cập nhật dữ liệu thành công");
            setUpdate(!update);
        } catch (error) {
            console.error("Lỗi khi cập nhật dữ liệu:", error);
            toast.error("Đã xảy ra lỗi khi cập nhật dữ liệu");
        }
    };

    const deleteData = async (id) => {
        try {
            await AccountPackageService.deleteAccountPackage(id);
            toast.success("Xóa liệu thành công");
            setUpdate(!update);
        } catch (error) {
            console.error("Lỗi khi xóa dữ liệu:", error);
            toast.error("Đã xảy ra lỗi khi xóa dữ liệu");
        }
    };

    const changePage = (newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        if (update) {
            fetchInitialData();
            setUpdate(false); // Reset update after fetching data
        }
    }, [update, fetchInitialData]);

    const value = {
        data,
        pageable,
        page,
        size,
        serviceSearch,
        nameSearch,
        action,
        actions,
        serviceData,
        setAction,
        setActions,
        createData,
        updateData,
        searchData,
        deleteData,
        changePage
    };

    return (
        <AccountPackageContext.Provider value={value}>
            {children}
        </AccountPackageContext.Provider>
    );
};
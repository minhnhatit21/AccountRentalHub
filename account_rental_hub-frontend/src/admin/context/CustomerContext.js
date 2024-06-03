import { createContext, useState, useCallback, useEffect } from "react";
import CustomerService from "../../services/customer.service";
import { toast } from "react-toastify";

const actionList = ["add", "edit", "view", "delete"];

export const CustomerContext = createContext("");

export const CustomerProvider = ({ children }) => {
    const [customerList, setCustomerList] = useState([]);
    const [pageable, setPageable] = useState(null);

    const [action, setAction] = useState('add');
    const [actions, setActions] = useState(actionList);
    const [update, setUpdate] = useState(false);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [fullNameSearch, setFullNameSearch] = useState("");

    const searchData = useCallback(
        async (fullName = "") => {
            try {
                const response = await CustomerService.searchCustomer(page, size, fullName);
                if (response?.content) {
                    setCustomerList(response.content);
                    setPageable(response.pageable);
                    setFullNameSearch(fullName);
                } else {
                    setCustomerList([]);
                    setPageable(null);
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setCustomerList([]);
                    setPageable(null);
                    toast.warning("Không tìm thấy dữ liệu");
                } else {
                    toast.error("Đã xảy ra lỗi khi search dữ liệu");
                }
            }
        },
        [page, size]
    );

    useEffect(() => {
        searchData(fullNameSearch);
    }, [searchData, fullNameSearch, page, update]);

    const changePage = (newPage) => {
        setPage(newPage);
    };

    const value = {
        customerList,
        pageable,
        action,
        actions,
        setCustomerList,
        setAction,
        setActions,
        searchData,
        changePage
    };

    return (
        <CustomerContext.Provider value={value}>
            {children}
        </CustomerContext.Provider>
    );
};

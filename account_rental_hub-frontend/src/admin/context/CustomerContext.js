import { createContext, useState, useCallback, useEffect } from "react";
import CustomerService from "../../services/customer.service";
import { toast } from "react-toastify";

const actionList = ["add", "edit", "view", "delete"];

export const CustomerContext = createContext("");

export const CustomerProvider = ({children}) => {
    const [customerList, setCustomerList] = useState([])
    const [pageable, setPageable] = useState([])

    const [action, setAction] = useState('add')
    const [actions, setActions] = useState(actionList)
    const [update, setUpdate] = useState(false);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [fullNameSearch, setFullNameSearch] = useState("");

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await CustomerService.searchCustomer(page,size,fullNameSearch)
                if (response?.content) {
                    setCustomerList(response.content);
                    setPageable(response.pageable);
                } else {
                    setCustomerList([]);
                    setPageable(null);
                }
            } catch (error) {
                toast.error("Đã xảy ra lỗi khi tải dữ liệu ban đầu");
            }
        };

        fetchInitialData();
    }, [page, update]);

    const searchData = useCallback(
        async (fullName) => {
            let nameValue = fullName !== undefined ? fullName : "";
            if (nameValue === fullName) {
                setPage(0);
                try {
                    const response = await CustomerService.searchCustomer(page , size, nameValue);
                   
                    if (response?.content) {
                        setCustomerList(response.content);
                        setPageable(response.pageable);
                        setFullNameSearch(nameValue);
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
            }
        },
        [fullNameSearch, page]
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                await searchData(fullNameSearch);
            } catch (error) {
                toast.error('Lỗi khi tải dữ liệu:', error);
            }
        };

        fetchData();
    }, [searchData, fullNameSearch, page, update]);

    const changePage = (newPage) => {
        setPage(newPage);
        searchData(fullNameSearch); // Gọi hàm searchData khi page thay đổi
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
    )
}
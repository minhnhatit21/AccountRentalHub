import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { toast } from 'react-toastify';
import { GlobalContext } from "./GlobalContext";
import TransactionService from '../../services/transaction.service';

const actionList = ["add", "edit", "view", "delete"];

export const TransactionContext = createContext("");

export const TransactionProvider = ({ children }) => {
  const [transactionList, setTransactions] = useState([]);
  const [pageable, setPageable] = useState(null);
  const [action, setAction] = useState('add');
  const [actions, setActions] = useState(actionList);
  const [update, setUpdate] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [customerNameSearch, setCustomerNameSearch] = useState("");
  const [userIdSearch, setUserIdSearch] = useState("");
  const [startDateSearch, setStartDateSearch] = useState("");
  const [endDateSearch, setEndDateSearch] = useState("");
  const [statusSearch, setStatusSearch] = useState("");

  // Global Context
  const { globalUpdate } = useContext(GlobalContext);

  const changePage = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const searchTransactionData = useCallback(async (customerName = "", userId = "", startDate = "", endDate = "", status = "") => {
    if (customerName !== customerNameSearch || userId !== userIdSearch || startDate !== startDateSearch || endDate !== endDateSearch || status !== statusSearch) {
      setPage(0);
    }

    try {
      const response = await TransactionService.searchTransactions(page, size, customerName, userId, startDate, endDate, status);
      if (response?.content) {
        setTransactions(response.content);
        setPageable(response.pageable);
        setCustomerNameSearch(customerName);
        setUserIdSearch(userId);
        setStartDateSearch(startDate);
        setEndDateSearch(endDate);
        setStatusSearch(status);
      } else {
        setTransactions([]);
        setPageable(null);
        console.error("Not Found Data");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setTransactions([]);
        setPageable(null);
        console.error("Not Found Data");
        toast.warning("Không tìm thấy dữ liệu");
      } else {
        console.error("Error while searching data:", error);
        toast.error("Đã xảy ra lỗi khi search dữ liệu");
      }
    }
  }, [page, size, customerNameSearch, userIdSearch, startDateSearch, endDateSearch, statusSearch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await searchTransactionData(customerNameSearch, userIdSearch, startDateSearch, endDateSearch, statusSearch);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchTransactionData, customerNameSearch, userIdSearch, startDateSearch, endDateSearch, statusSearch, page, size, update, globalUpdate]);

  const value = {
    transactionList,
    pageable,
    action,
    actions,
    setTransactions,
    setAction,
    setActions,
    changePage,
    searchTransactionData,
    setUserIdSearch,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}

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
  const { globalUpdate, setGlobalUpdate } = useContext(GlobalContext);

  const changePage = (newPage) => {
    setPage(newPage);
    searchTransactionData(customerNameSearch, userIdSearch, startDateSearch, endDateSearch, statusSearch);
  };

  const searchTransactionData = useCallback(async (customerName, userId, startDate, endDate, status) => {
    let customerNameValue = customerName !== undefined ? customerName : "";
    let userIdValue = userId !== undefined ? userId : "";
    let startDateValue = startDate !== undefined ? startDate : "";
    let endDateValue = endDate !== undefined ? endDate : "";
    let statusValue = status !== undefined ? status : "";

    if (customerNameValue !== customerNameSearch || userIdValue !== userIdSearch 
        || startDateValue !== startDateSearch || endDateValue !== endDateSearch
        || statusValue !== statusSearch) {
      setPage(0);
    }

    try {
      const response = await TransactionService.searchTransactions(page, size, customerNameValue, userIdValue, startDateValue, endDateValue, statusValue);
      if (response?.content) {
        setTransactions(response.content);
        setPageable(response.pageable);
        setCustomerNameSearch(customerNameValue);
        setUserIdSearch(userIdValue);
        setStartDateSearch(startDateValue);
        setEndDateSearch(endDateValue);
        setStatusSearch(statusValue);
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
  }, [searchTransactionData, customerNameSearch, userIdSearch, startDateSearch, endDateSearch, statusSearch, page, update, globalUpdate]);

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
    setUserIdSearch
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  )
}


import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { toast } from 'react-toastify';
import OrderService from '../../services/order.service';
import { GlobalContext } from '../../admin/context/GlobalContext';

const actionList = ["add", "edit", "view", "delete"];

export const OrderUserContext = createContext("");

export const OrderUserProvider = ({ children }) => {
  const [orderList, setOrders] = useState([]);
  const [pageable, setPageable] = useState(null);
  const [action, setAction] = useState('add');
  const [actions, setActions] = useState(actionList);
  const [update, setUpdate] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [orderCodeSearch, setOrderCodeSearch] = useState("");
  const [userIdSearch, setUserIdSearch] = useState("");
  const [startDateSearch, setStartDateSearch] = useState("");
  const [endDateSearch, setEndDateSearch] = useState("");
  const [statusSearch, setStatusSearch] = useState("");

  // Global Context
  const { globalUpdate, setGlobalUpdate } = useContext(GlobalContext);

  const searchOrderData = useCallback(async (orderCode, userId, startDate, endDate, status, requireUserId = true) => {
    let orderCodeValue = orderCode !== undefined ? orderCode : "";
    let userIdValue = requireUserId ? (userId !== undefined ? userId : "") : "";
    let startDateValue = startDate !== undefined ? startDate : "";
    let endDateValue = endDate !== undefined ? endDate : "";
    let statusValue = status !== undefined ? status : "";

    if(userId) {
        if (orderCodeValue !== orderCodeSearch || userIdValue !== userIdSearch
          || startDateValue !== startDateSearch || endDateValue !== endDateSearch
          || statusValue !== statusSearch) {
          setPage(0);
        }
        try {
          const response = await OrderService.searchOrders(page, size, orderCodeValue, userIdValue, startDateValue, endDateValue, statusValue);
          if (response?.content) {
            setOrders(response.content);
            setPageable(response.pageable);
            setOrderCodeSearch(orderCodeValue);
            setUserIdSearch(userIdValue);
            setStartDateSearch(startDateValue);
            setEndDateSearch(endDateValue);
            setStatusSearch(statusValue);
          } else {
            setOrders([]);
            setPageable(null);
            console.error("Not Found Data");
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setOrders([]);
            setPageable(null);
            console.error("Not Found Data");
          } else {
            console.error("Error while searching data:", error);
            toast.error("Đã xảy ra lỗi khi search dữ liệu");
          }
        }
    }
  }, [page, size, orderCodeSearch, userIdSearch, startDateSearch, endDateSearch, statusSearch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await searchOrderData(orderCodeSearch, userIdSearch, startDateSearch, endDateSearch, statusSearch);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchOrderData, orderCodeSearch, userIdSearch, startDateSearch, endDateSearch, statusSearch, page, update, globalUpdate]);

  const changePage = (newPage) => {
    setPage(newPage);
    searchOrderData(orderCodeSearch, userIdSearch, startDateSearch, endDateSearch, statusSearch);
  };

  const value = {
    orderList,
    pageable,
    action,
    actions,
    setOrders,
    setAction,
    setActions,
    changePage,
    searchOrderData,
    setUserIdSearch
  };

  return (
    <OrderUserContext.Provider value={value}>
      {children}
    </OrderUserContext.Provider>
  );
};

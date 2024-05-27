import { useState, useRef, useContext } from "react";
import OrderListView from "./OrderListView";
import { OrderContext } from "../../context/OrderContext";

function Orders() {

  const { orderList, action, setAction, actions, searchOrderData, changePage, pageable } = useContext(OrderContext);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showDeteteOrderModal, setShowDeleteOrderModal] = useState(false);
  const dataModalRef = useRef(null);

   // Handle change pagination
   const handlePageChange = (newPage) => {
    changePage(newPage);
};

const handleSearchData = (orderCode, userId, startDate, endDate, status) => {
 // console.log("Form Data: ", orderCode + "," + userId + "," + startDate + "," + endDate + "," + status);
  searchOrderData(orderCode, userId, startDate, endDate, status);
}

  const handleViewOrderClick = (id) => {
    setAction(actions[2]);
    const data = orderList.filter(Order => Order.id === id);
    dataModalRef.current = data;
    setShowOrderModal(true);
  }

  const handleOrderModalClose = () => {
    setShowOrderModal(false);
    dataModalRef.current = null;
  };

  return (
    <>
      <OrderListView
        orderList={orderList}
        action={action}
        pageable={pageable}
        isOpenModal={showOrderModal}
        isOpenDeleteModal={showDeteteOrderModal}
        dataModal={dataModalRef}
        orderModalClose={handleOrderModalClose}
        handleVieworderClick={handleViewOrderClick}
        onSearchData={handleSearchData}
        onChagepage={handlePageChange}
      />
    </>
  );
}

export default Orders;
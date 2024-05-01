import { useState, useRef, useContext } from "react";
import OrderListView from "./OrderListView";
import { OrderContext } from "../../context/OrderContext";

function Orders() {

  const { orderList, action, setAction, actions } = useContext(OrderContext);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showDeteteOrderModal, setShowDeleteOrderModal] = useState(false);
  const dataModalRef = useRef(null);

  // Hanldle Add Orders
  const handleAddOrderClick = () => {
    setAction(actions[0]);
    setShowOrderModal(true);
  };

  const handleEditOrderClick = (id) => {
    setAction(actions[1]);
    const data = orderList.filter(Order => Order.id === id);
    dataModalRef.current = data;
    setShowOrderModal(true);
  };

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

  // Delete Order
  const handleDeteteOrderClick = (id) => {
    setAction(actions[3]);
    const data = orderList.filter(Order => Order.id === id);
    dataModalRef.current = data;
    setShowDeleteOrderModal(true);
  }

  const handleDeleteOrderModalClose = () => {
    console.log('Call close delete');
    setShowDeleteOrderModal(false);
    dataModalRef.current = null
  }

  const handleDeleteOrder = (OrderId) => {
    console.log(`Xóa tài khoản khách hàng có id ${OrderId}`);
    setShowDeleteOrderModal(false);
    dataModalRef.current = null
  };

  return (
    <>
      <OrderListView
        orderList={orderList}
        action={action}
        isOpenModal={showOrderModal}
        isOpenDeleteModal={showDeteteOrderModal}
        dataModal={dataModalRef}
        orderModalClose={handleOrderModalClose}
        handleVieworderClick={handleViewOrderClick}
        handleEditorderClick={handleEditOrderClick}
        handleDeleteorderClick={handleDeteteOrderClick}
        handleDeleteorderModalClose={handleDeleteOrderModalClose}
        handleDeleteorder={handleDeleteOrder}
      />
    </>
  );
}

export default Orders;
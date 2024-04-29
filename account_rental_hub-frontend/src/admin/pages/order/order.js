import { useState, useEffect, useRef } from "react";
import OrderListView from "./orderListView";

const ordersList = [
    {
      "OrderID": 1001,
      "CustomerName": "Nguyễn Văn A",
      "Email": "nguyenvana@example.com",
      "SubscriptionService": "Netflix",
      "SubscriptionPlan": "Premium",
      "StartDate": "2023-04-01",
      "EndDate": "2023-09-30",
      "TotalPrice": 99.99,
      "OrderStatus": "Pending"
    },
    {
      "OrderID": 1002,
      "CustomerName": "Trần Thị B",
      "Email": "tranthib@example.com",
      "SubscriptionService": "Disney+",
      "SubscriptionPlan": "Standard",
      "StartDate": "2023-05-15",
      "EndDate": "2023-11-14",
      "TotalPrice": 79.99,
      "OrderStatus": "Pending"
    },
    {
      "OrderID": 1003,
      "CustomerName": "Lê Công C",
      "Email": "lecongc@example.com",
      "SubscriptionService": "Hulu",
      "SubscriptionPlan": "Basic",
      "StartDate": "2023-06-01",
      "EndDate": "2023-11-30",
      "TotalPrice": 59.99,
      "OrderStatus": "Paid"
    },
    {
      "OrderID": 1004,
      "CustomerName": "Phạm Thị D",
      "Email": "phamthid@example.com",
      "SubscriptionService": "HBO Max",
      "SubscriptionPlan": "Ad-Free",
      "StartDate": "2023-07-01",
      "EndDate": "2024-06-30",
      "TotalPrice": 149.99,
      "OrderStatus": "Cancel"
    },
    {
      "OrderID": 1005,
      "CustomerName": "Hoàng Văn E",
      "Email": "hoangvane@example.com",
      "SubscriptionService": "Amazon Prime Video",
      "SubscriptionPlan": "Annual",
      "StartDate": "2023-08-15",
      "EndDate": "2024-08-14",
      "TotalPrice": 119.99,
      "OrderStatus": "Finished"
    }
  ]

  const actions = ["add", "edit", "view", "delete"];
function Orders() {
    const [action, setAction] = useState(actions[0]);
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
        const data = ordersList.filter(Order => Order.id === id);
        dataModalRef.current = data;
        setShowOrderModal(true);
    };

    const handleViewOrderClick = (id) => {
        setAction(actions[2]);
        const data = ordersList.filter(Order => Order.id === id);
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
        const data = ordersList.filter(Order => Order.id === id);
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
                orderList={ordersList}
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
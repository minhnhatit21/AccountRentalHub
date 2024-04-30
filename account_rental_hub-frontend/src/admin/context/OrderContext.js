import { createContext, useState } from "react";

const actionList = ["add", "edit", "view", "delete"];
const orders = [
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

export const OrderContext = createContext("");

export const OrderProvider = ({children}) => {
    const [orderList, setUserOrderList] = useState(orders)
    const [action, setAction] = useState('add')
    const [actions, setActions] = useState(actionList)

    const value = {
        orderList,
        action,
        actions,
        setUserOrderList,
        setAction,
        setActions
    };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    )
}
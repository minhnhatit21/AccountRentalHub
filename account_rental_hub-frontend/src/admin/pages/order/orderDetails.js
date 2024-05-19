import React, { useState } from 'react';

const order = {
    "orderID": 1001,
    "customerName": "Nguyễn Văn A",
    "email": "nguyenvana@example.com",
    "subscriptionService": "Netflix",
    "subscriptionPlan": "Premium",
    "startDate": "2023-04-01",
    "endDate": "2023-09-30",
    "totalPrice": 100000,
    "orderStatus": "Paid"
}

const orderDetails = [
    {
        "service": "Netflix",
        "accountPackage": "Netfix 1 thàng",
        "amount": 1,
        "price": 80000,
        "total_price": 80000,
        "img": "https://i.ibb.co/L6MDz9X/HD-wallpaper-netflix-logo-black-logo-minimal-netflix.jpg"
    }
]

const OrderDetails = () => {

    const [isConfirming, setIsConfirming] = useState(false);

    const handleCancelOrder = () => {
        // Implement logic to cancel the order
        console.log('Cancelling order:', order.id);
    };

    const handleConfirmOrder = () => {
        setIsConfirming(true);
        // Implement logic to confirm the order
        console.log('Confirming order:', order.id);
    };

    const handleDeleteOrder = () => {
        // Implement logic to delete the order
        console.log('Deleting order:', order.id);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Chi tiết đơn hàng</h1>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="font-bold">Order ID:</p>
                    <p>{order.orderID}</p>
                </div>
                <div>
                    <p className="font-bold">Tên khách hàng:</p>
                    <p>{order.customerName}</p>
                </div>
                <div>
                    <p className="font-bold">Email:</p>
                    <p>{order.email}</p>
                </div>
                <div>
                    <p className="font-bold">Dịch vụ đăng ký:</p>
                    <p>{order.subscriptionService}</p>
                </div>
                <div>
                    <p className="font-bold">Start Date:</p>
                    <p>{order.startDate}</p>
                </div>
                <div>
                    <p className="font-bold">End Date:</p>
                    <p>{order.endDate}</p>
                </div>
            </div>

            <div className='max-w-full mt-6 overflow-x-auto rounded-xl border-solid border-2 border-[#F2F2F2]'>
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left bg-[#F2F2F2]">
                            <th
                                className="min-w-[130px] px-4 py-4 font-medium text-black"
                            >
                                <p
                                    className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-md font-medium text-success"
                                >
                                    Ảnh đại diện
                                </p>
                            </th>
                            <th
                                className="min-w-[130px] px-4 py-4 font-medium text-black"
                            >
                                <p
                                    className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-md font-medium text-success"
                                >
                                    Tên dịch vụ
                                </p>
                            </th>
                            <th
                                className="min-w-[120px] px-4 py-4 font-medium text-black"
                            >
                                <p
                                    className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-md font-medium text-success"
                                >
                                    Gói dịch vụ
                                </p>

                            </th>
                            <th
                                className="min-w-[120px] px-4 py-4 font-medium text-black"
                            >
                                <p
                                    className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-md font-medium text-success"
                                >
                                    Số lượng
                                </p>
                            </th>
                            <th
                                className="min-w-[120px] px-4 py-4 font-medium text-black"
                            >
                                <p
                                    className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-md font-medium text-success"
                                >
                                    Đơn giá
                                </p>
                            </th>
                            <th
                                className="min-w-[120px] px-4 py-4 font-medium text-black"
                            >
                                <p
                                    className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-md font-medium text-success"
                                >
                                    Thành tiền
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails && orderDetails.map(order => (
                            <tr key={order.id}>
                                <td
                                    className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark">
                                    <img
                                        className="w-16 h-16"
                                        src={order.img}
                                    ></img>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p
                                        className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success"
                                    >
                                        {order.service}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p
                                        className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success"
                                    >
                                        {order.accountPackage}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p
                                        className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success"
                                    >
                                        {order.amount}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p
                                        className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success"
                                    >
                                        {order.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p
                                        className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success"
                                    >
                                        {order.total_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='flex mt-6 w-full flex-col'>
                <p className="font-bold mb-2">Trạng thái đơn hàng:</p>
                <p
                    className={`px-2 py-1 rounded-full text-white ${order.orderStatus === 'Paid' ? 'bg-green-500 w-2/3' : 'bg-yellow-500 w-1/2'}`}
                >
                    {order.orderStatus}
                </p>
            </div>

            <div className='flex mt-6 w-full flex-col'>
                <p className="font-bold mb-2">Phương thức thanh toán:</p>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={handleCancelOrder}
                >
                    Hủy đơn hàng
                </button>
                {!isConfirming && (
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        onClick={handleConfirmOrder}
                    >
                        Xác nhận đơn
                    </button>
                )}
                {isConfirming && (
                    <div className="flex space-x-4">
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            onClick={() => {
                                setIsConfirming(false);
                                // Implement logic to complete the confirmation
                            }}
                        >
                            Confirm
                        </button>
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            onClick={() => setIsConfirming(false)}
                        >
                            Cancel
                        </button>
                    </div>
                )}
                <button
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    onClick={handleDeleteOrder}
                >
                    Xóa đơn hàng
                </button>
            </div>

            
        </div>
    );
};

export default OrderDetails;
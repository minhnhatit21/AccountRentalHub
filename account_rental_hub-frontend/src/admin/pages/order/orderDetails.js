import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OrderService from '../../../services/order.service';
import { toast } from 'react-toastify';

const OrderDetails = () => {
    const [isConfirming, setIsConfirming] = useState(false);
    const [order, setOrder] = useState({});
    const [orderDetails, setOrderDetails] = useState([]);
    const { orderCode } = useParams();

    useEffect(() => {
        const fetchOrderDetailsData = async () => {
            try {
                const response = await OrderService.getOrderByOrderCode(orderCode);
                if (response) {
                    setOrder(response);
                    setOrderDetails(response.orderDetails);
                } else {
                    setOrder({});
                    setOrderDetails([]);
                    console.error("Not Found Data");
                }
            } catch (error) {
                toast.error("Đã xảy ra lỗi khi tải dữ liệu ban đầu");
            }
        };
        fetchOrderDetailsData();
    }, [orderCode]);

    const handleCancelOrder = async () => {
        try {
            const response = await OrderService.changeOrderStatus(order.id, 'CANCELLED');
            if (response.status === 200) {
                toast.success("Đơn hàng đã được hủy");
                setOrder(prevOrder => ({ ...prevOrder, status: 'CANCELLED' }));
            } else {
                toast.error("Không thể hủy đơn hàng");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi hủy đơn hàng");
        }
    };

    const handleConfirmOrder = async () => {
        setIsConfirming(true);
        if(order.status === 'PAID') {
            try {
                const response = await OrderService.changeOrderStatus(order.id, 'FINISHED');
                if (response.status === 200) {
                    toast.success("Đơn hàng đã được xác nhận");
                    setOrder(prevOrder => ({ ...prevOrder, status: 'FINISHED' }));
                    setIsConfirming(false);
                } else {
                    toast.error("Không thể xác nhận đơn hàng");
                    setIsConfirming(false);
                }
            } catch (error) {
                toast.error("Đã xảy ra lỗi khi xác nhận đơn hàng");
                setIsConfirming(false);
            }
        }
    };

    const handleDeleteOrder = async () => {
        try {
            const response = await OrderService.deleteOrder(order.id);
            if (response.status === 200) {
                toast.success("Đơn hàng đã được xóa");
                setOrder({});
                setOrderDetails([]);
            } else {
                toast.error("Không thể xóa đơn hàng");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi xóa đơn hàng");
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}-${month}-${year}`;
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Chi tiết đơn hàng</h1>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="font-bold">Order ID:</p>
                    <p>{order.orderCode}</p>
                </div>
                <div>
                    <p className="font-bold">Tên khách hàng:</p>
                    <p>{order.rentalCustomerName}</p>
                </div>
                <div>
                    <p className="font-bold">Email:</p>
                    <p>{order.rentalCustomerEmail}</p>
                </div>
                <div>
                    <p className="font-bold">Order Date:</p>
                    <p>{formatDate(order.orderDate)}</p>
                </div>
                <div>
                    <p className="font-bold">Tổng tiền:</p>
                    <p>{formatCurrency(order.totalAmount)}</p>
                </div>
            </div>

            <div className='max-w-full mt-6 overflow-x-auto rounded-xl border-solid border-2 border-[#F2F2F2]'>
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left bg-[#F2F2F2]">
                            <th className="min-w-[130px] px-4 py-4 font-medium text-black">
                                <p className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-md font-medium text-success">Ảnh đại diện</p>
                            </th>
                            <th className="min-w-[130px] px-4 py-4 font-medium text-black">
                                <p className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-md font-medium text-success">Tên dịch vụ</p>
                            </th>
                            <th className="min-w-[120px] px-4 py-4 font-medium text-black">
                                <p className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-md font-medium text-success">Gói dịch vụ</p>
                            </th>
                            <th className="min-w-[120px] px-4 py-4 font-medium text-black">
                                <p className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-md font-medium text-success">Đơn giá</p>
                            </th>
                            <th className="min-w-[120px] px-4 py-4 font-medium text-black">
                                <p className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-md font-medium text-success">Thành tiền</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails && orderDetails.map(od => (
                            <tr key={od.id}>
                                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark">
                                    <img className="w-16 h-16" src={od.accountRental.accountRentalPackage.imgURL || ""} alt="Ảnh đại diện" />
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success">
                                        {od.accountRental.accountRentalPackage.accountRentalServices.name || ""}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success">
                                        {od.accountRental.accountRentalPackage.name || ""}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success">
                                        {od.accountRental.accountRentalPackage.discountedPrice || ""}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success">
                                        {od.accountRental.accountRentalPackage.discountedPrice || ""}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='flex mt-6 w-full flex-col'>
                <p className="font-bold mb-2">Trạng thái đơn hàng:</p>
                <p className={`px-2 py-1 rounded-full text-white ${
                    order.status === 'PAID' ? 'bg-green-500 w-2/3' :
                    order.status === 'FINISHED' ? 'bg-blue-500 w-full' : 'bg-yellow-500 w-1/2'
                }`}>
                    {order.status}
                </p>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
                {order.status !== 'FINISHED' && order.status !== 'CANCELLED' && (
                    <>
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleCancelOrder}
                        >
                            Hủy đơn hàng
                        </button>
                        {/* <button
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleConfirmOrder}
                            disabled={isConfirming}
                        >
                            Xác nhận đơn
                        </button> */}
                    </>
                )}
                {order.status === 'PAID' && (
                    <>
                        {/* <button
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleCancelOrder}
                        >
                            Hủy đơn hàng
                        </button> */}
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleConfirmOrder}
                            disabled={isConfirming}
                        >
                            Xác nhận đơn
                        </button>
                    </>
                )}
                {order.status !== 'FINISHED' && order.status !== 'CANCELLED' && (
                    <button
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleDeleteOrder}
                    >
                        Xóa đơn hàng
                    </button>
                )}
            </div>
        </div>
    );
};

export default OrderDetails;

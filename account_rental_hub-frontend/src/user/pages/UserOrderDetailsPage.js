import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OrderService from '../../services/order.service';
import { toast } from 'react-toastify';

// Dữ liệu mẫu
const orderData = {
    orderNumber: '5955576',
    createdAt: '2023-01-11T21:55:11',
    status: 'Đã xử lý',
    customerEmail: 'nguyenhuuminhnhatsus@gmail.com',
    totalAmount: 89000,
    items: [
        {
            name: 'Tài Khoản Netflix Premium 1 tháng',
            description: 'Xem phim chất lượng 4k và Full HD',
            quantity: 1,
            price: 89000,
        },
    ],
    paymentInfo: {
        account: 'impa300@pay0s.com',
        password: '701884',
        pin: '4488',
    },
};

const UserOrderDetails = () => {

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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
      
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <div className='flex-1'>
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Chi tiết đơn hàng #{orderCode}</h2>
                <div className="mb-4">
                    <p className="text-gray-600">Ngày tạo: {formatDate(order.orderDate)}</p>
                    <p className="text-gray-600">Trạng thái đơn hàng: {order.status}</p>
                    <p className="text-gray-600">Người nhận: {order.rentalCustomerEmail}</p>
                </div>
                <div className="mb-4">
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
                                <>
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
                                            {formatCurrency(od.accountRental.accountRentalPackage.discountedPrice) || ""}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success">
                                            {formatCurrency(od.accountRental.accountRentalPackage.discountedPrice) || ""}
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="5" className="p-0">
                                        <div className="bg-slate-300 border-dashed border-2 border-sky-500 my-5 px-2 py-2 rounded-lg w-full">
                                            <h3 className="text-lg font-bold mb-2">Thông tin tài khoản</h3>
                                            <p>
                                                Tài khoản: {od.accountRental.username} || Mật khẩu: {od.accountRental.password}
                                            </p>
                                            <p className="text-gray-600">
                                                Vui lòng không đổi mật khẩu và sử dụng User của người khác
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                                <hr></hr>
                            </>

                            ))}
                        </tbody>
                    </table>
                    <p className="font-bold mt-4">Tổng giá trị đơn hàng: {formatCurrency(order.totalAmount)}</p>
                </div>

            </div>
        </div>
    );
};

export default UserOrderDetails;
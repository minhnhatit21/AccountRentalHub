import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import CustomerService from "../../services/customer.service";
import { useLocation, useSearchParams } from "react-router-dom";
import PaymentService from "../../services/payment.service";
import { toast } from "react-toastify";

function PaymentPage() {

    const [order, setOrder] = useState(null);

    const { isLoggedIn, user } = useContext(AuthContext);
    const [billingDetails, setBillingDetails] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("creditCard");

    useEffect(() => {
        const orderString = localStorage.getItem('order');
        const parsedOrder = orderString ? JSON.parse(orderString) : null;
        setOrder(parsedOrder);
        const fetchData = async () => {
            try {
                if (user) {
                    const currentUser = await CustomerService.getCustomerByUserId(user.id);
                    setBillingDetails(currentUser.data);
                } else {
                    setBillingDetails(null);
                }
            } catch (error) {
                console.error("Error while fetching customer data:", error);
                setBillingDetails(null);
            }
        };
    
        fetchData();
    },[user])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handlePaymentMethodChange = (e) => {
        setSelectedPaymentMethod(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const paymentData = {
            userId: user ? parseInt(user.id) : null,
            orderId: order?.id || 0,
            paymentMethod: selectedPaymentMethod,
            amount: 500000
        }
        console.log("pa: ", paymentData)
        if(paymentData !== null) {
            try {
                const response = await PaymentService.processPayment(paymentData);
                console.log("Response: ", response)
                toast.success("Thanh toán thành công. Kiểm tra phần Lịch sử đơn hàng để xem");
            } catch (error) {
                console.error(error.response.data)
                toast.error(`${error.response.data}`);
            }
            
        }
        console.log("Payment submitted:", billingDetails, selectedPaymentMethod);
    };

    const totalPrice = order?.totalAmount || "99000"; // Example total price

    return (
        <div className="flex-1">
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6">Thanh toán</h1>
                <div className="flex flex-col md:flex-row">
                    <div className="flex-1 md:mr-6">
                        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-bold mb-4">Thông tin thanh toán</h2>
                            <div className="mb-4">
                                <label className="block text-gray-700">Tên đầy đủ</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={billingDetails?.fullname || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={user?.email || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                />
                            </div>
                            <h2 className="text-lg font-bold mb-4">Phương thức thanh toán</h2>
                            <div className="mb-4">
                                <label className="block text-gray-700">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="creditCard"
                                        checked={selectedPaymentMethod === "creditCard"}
                                        onChange={handlePaymentMethodChange}
                                        className="mr-2"
                                    />
                                    Thẻ tín dụng
                                </label>
                                {selectedPaymentMethod === "creditCard" && (
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            placeholder="Số thẻ"
                                            className="w-full px-3 py-2 mb-2 border rounded-md"
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="expiry"
                                            placeholder="Ngày hết hạn (MM/YY)"
                                            className="w-full px-3 py-2 mb-2 border rounded-md"
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="cvc"
                                            placeholder="CVC"
                                            className="w-full px-3 py-2 border rounded-md"
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="momo"
                                        checked={selectedPaymentMethod === "momo"}
                                        onChange={handlePaymentMethodChange}
                                        className="mr-2"
                                    />
                                    Ví MoMo
                                </label>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="bankTransfer"
                                        checked={selectedPaymentMethod === "bankTransfer"}
                                        onChange={handlePaymentMethodChange}
                                        className="mr-2"
                                    />
                                    Chuyển khoản ngân hàng
                                </label>
                            </div>
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
                                Hoàn tất thanh toán
                            </button>
                        </form>
                    </div>
                    <div className="bg-white rounded-lg h-48 shadow-md  p-6 mt-6 md:mt-0 md:w-1/3">
                        <h2 className="text-lg font-bold mb-4">Tóm tắt đơn hàng</h2>
                        <div className="flex justify-between items-center mb-4">
                            <span>Sản phẩm</span>
                            <span>1 x ${totalPrice}</span>
                        </div>
                        <div className="flex justify-between items-center font-bold text-lg">
                            <span>Tổng cộng</span>
                            <span>{totalPrice}đ</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;

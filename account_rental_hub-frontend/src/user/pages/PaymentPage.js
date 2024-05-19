import { useState } from "react";

function PaymentPage() {
    const [billingDetails, setBillingDetails] = useState({
        name: "",
        email: ""
    });
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("creditCard");

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle payment submission logic
        console.log("Payment submitted:", billingDetails, selectedPaymentMethod);
    };

    const totalPrice = 99000; // Example total price

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
                                    value={billingDetails.name}
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
                                    value={billingDetails.email}
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
                            <span>1 x 99.000đ</span>
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

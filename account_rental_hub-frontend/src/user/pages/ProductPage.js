import { useState } from "react";

function ProductPage() {
    const [selectedDuration, setSelectedDuration] = useState("1 month");
    const [quantity, setQuantity] = useState(1);
    const prices = {
        "1 month": 99000,
        "3 months": 270000,
        "1 year": 960000
    };

    const handleDurationChange = (e) => {
        setSelectedDuration(e.target.value);
    };

    const handleQuantityChange = (change) => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity + change));
    };

    const totalPrice = prices[selectedDuration] * quantity;

    return (
        <div className="container flex mx-auto px-4 lg:px-32 py-8 lg:py-16 justify-between">
            <div className="flex-1">
                <h1 className="text-3xl font-bold mb-6">Tài khoản Netflix Premium</h1>
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2">
                        <img
                            src="https://i.ibb.co/TB10jcB/NetFlix.png"
                            alt="Netflix Logo"
                            className="w-full h-auto object-contain mb-6"
                        />
                    </div>
                    <div className="md:w-1/2 md:pl-6">
                        <h2 className="text-2xl font-bold mb-4">Tài khoản Netflix Premium 4K</h2>
                        <p className="text-gray-700 mb-4">Truy cập toàn bộ nội dung Netflix với chất lượng 4K tuyệt vời.</p>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Chọn thời gian thuê:</label>
                            <select
                                value={selectedDuration}
                                onChange={handleDurationChange}
                                className="w-full px-3 py-2 border rounded-md"
                            >
                                <option value="1 month">1 Tháng - 99.000đ</option>
                                <option value="3 months">3 Tháng - 270.000đ</option>
                                <option value="1 year">1 Năm - 960.000đ</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Số lượng:</label>
                            <div className="flex items-center">
                                <button
                                    className="bg-gray-200 rounded-l-md py-2 px-4 text-gray-700 hover:bg-gray-300"
                                    onClick={() => handleQuantityChange(-1)}
                                    disabled={quantity === 1}
                                >
                                    -
                                </button>
                                <span className="bg-white py-2 px-4 text-gray-700">{quantity}</span>
                                <button
                                    className="bg-gray-200 rounded-r-md py-2 px-4 text-gray-700 hover:bg-gray-300"
                                    onClick={() => handleQuantityChange(1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="text-lg font-bold text-red-600">{totalPrice}đ</span>
                        </div>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;

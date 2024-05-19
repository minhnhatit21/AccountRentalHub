import { useState } from "react";
import { Link } from 'react-router-dom';

function CartEmpty() {
    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <div className="bg-blue-500 rounded-full p-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                </div>
                <h2 className="mt-6 text-2xl font-bold text-gray-800">Giỏ hàng trống!</h2>
                <p className="mt-2 text-gray-600">
                    Thêm sản phẩm vào giỏ và quay lại trang này để thanh toán nhé bạn
                </p>
            </div>
        </>
    );
}

const CartItem = ({ item, onQuantityChange, onRemove }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="flex items-center">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-contain"
                />
                <div className="ml-4">
                    <h2 className="text-lg font-bold">{item.name}</h2>
                    <p className="text-gray-600">{item.category}</p>
                    <p className="text-gray-500">Tình trạng: {item.status}</p>
                    <div className="mt-4 flex items-center">
                        <div className="flex items-center">
                            <button
                                className="bg-gray-200 rounded-l-md py-2 px-4 text-gray-700 hover:bg-gray-300"
                                onClick={() => onQuantityChange(item.id, -1)}
                                disabled={item.quantity === 1}
                            >
                                -
                            </button>
                            <span className="bg-white py-2 px-4 text-gray-700">{item.quantity}</span>
                            <button
                                className="bg-gray-200 rounded-r-md py-2 px-4 text-gray-700 hover:bg-gray-300"
                                onClick={() => onQuantityChange(item.id, 1)}
                            >
                                +
                            </button>
                        </div>
                        <div className="ml-4">
                            <span className="text-lg font-bold text-slate-700">{item.price}đ</span>
                            {item.originalPrice && (
                                <>
                                    <span className="text-gray-500 line-through ml-2">{item.originalPrice}đ</span>
                                    <span className="text-green-600 ml-2">-{item.discount}%</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-end mt-6 md:mt-0">
                <button className="bg-red-500 text-white py-2 px-4 rounded-md mb-2" onClick={() => onRemove(item.id)}>
                    Xóa
                </button>
            </div>
        </div>
    );
};

function CartPage() {
    const [items, setItems] = useState([
        {
            id: 1,
            name: "Tài khoản Netflix Premium 1 user 4K FullHD (1 Tháng)",
            category: "App, Giải trí, Xem phim",
            status: "Còn hàng",
            image: "https://i.ibb.co/1GqrngD/1f8a13ac739a.png",
            price: 99000,
            originalPrice: 260000,
            discount: 62,
            quantity: 1,
        },
        {
            id: 2,
            name: "Tài khoản Spotify Premium 1 user 4K FullHD (1 Tháng)",
            category: "App, Giải trí, Xem phim",
            status: "Còn hàng",
            image: "https://i.ibb.co/0Gg8PVy/5acc91228d2e.jpg",
            price: 19000,
            originalPrice: 54000,
            discount: 62,
            quantity: 1,
        },
    ]);

    const handleQuantityChange = (itemId, change) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, quantity: item.quantity + change } : item
            )
        );
    };

    const handleRemove = (itemId) => {
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };


    const termPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = 0;
    const totalPrice = termPrice - discount;
    return (
        <div className="flex-1">
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6">Giỏ hàng của bạn</h1>
                <div className="flex flex-col md:flex-row">
                    <div className="flex-1">
                        {items.length > 0 ? (
                            <>
                                {items.map(item => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        onQuantityChange={handleQuantityChange}
                                        onRemove={handleRemove}
                                    />
                                ))}
                            </>
                        ) : (
                            <CartEmpty />
                        )}
                    </div>
                    <div className="bg-white rounded-lg h-48 shadow-md p-6 mt-6 md:mt-0 md:ml-6 md:w-1/3">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold">Tạm tính:</h3>
                            <span className="text-lg font-bold text-slate-900">{termPrice}đ</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold">Giảm giá:</h3>
                            <span className="text-lg font-bold text-slate-900">{discount}đ</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold">Tổng giá trị sản phẩm:</h3>
                            <span className="text-lg font-bold text-slate-900">{totalPrice}đ</span>
                        </div>
                        <div className="flex justify-center mt-4">
                            <Link to="/user/payment" className="bg-blue-500 text-white py-2 px-4 rounded-md">
                                TIẾN HÀNH THANH TOÁN
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;

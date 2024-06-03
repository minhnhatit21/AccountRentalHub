import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import CartService from "../../services/cart-service";
import { toast } from "react-toastify";
import AccountPackageService from "../../services/account-rental-package.service";
import { AuthContext } from "../context/AuthContext";
import { SignInModal } from "../components/modals/login_register_modal";


const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

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
                    src={item.accountRentalPackage.imgURL}
                    alt={item.accountRentalPackage.name}
                    className="w-20 h-20 object-contain"
                />
                <div className="ml-4">
                    <h2 className="text-lg font-bold">{item.accountRentalPackage.name}</h2>
                    {/* <p className="mb-4">
                        Tình trạng:
                        <span className={`${item?.accountRentalPackage.amount > 0 ? "text-green-600" : "text-red-600"}`}> {item?.accountRentalPackage.amount > 0 ? "Còn hàng" : "Hết hàng"}</span>
                    </p> */}
                    <div className="mt-4 flex items-center">
                        <span className="text-lg font-bold text-slate-700">{formatCurrency(item.accountRentalPackage.discountedPrice)}</span>
                        {item.accountRentalPackage.discountedPrice && (
                            <>
                                <span className="text-gray-500 line-through ml-2">{formatCurrency(item.accountRentalPackage.price)}</span>
                                <span className="text-green-600 ml-2">-{item.accountRentalPackage.discount}%</span>
                            </>
                        )}
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
    const [items, setItems] = useState([]);

    const { isLoggedIn, user } = useContext(AuthContext);
    const [showSiginModal, setShowSigninModal] = useState(false);

    const navigate = useNavigate();

    const fetchAccountPackage = async () => {
        try {
            const response = await AccountPackageService.getAllAccountRentalPackages();
            if (response) {
                return response;
            } else {
                console.error("Not Found");
                return [];
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi tải dữ liệu ban đầu");
            return [];
        }
    };

    const mergeCarts = async (userId, serverCart, localCart, accountPackages) => {
        const mergedCart = [...serverCart];

        for (const localItem of localCart) {
            const existingItem = mergedCart.find(
                serverItem => serverItem.accountRentalPackage.id === localItem.accountPackageId
            );
            if (!existingItem) {
                const packageDetails = accountPackages.find(
                    pkg => pkg.id === localItem.accountPackageId
                ) || null;
                if (packageDetails) {
                    if (userId) {
                        try {
                            console.log(`UserID: ${userId}, accountPackageId: ${localItem.accountPackageId}, `)
                            const cartItem = {
                                userId: userId ? parseInt(userId) : null,
                                accountPackageId: localItem.accountPackageId,
                                quantity: 1,
                            };
                            await CartService.addToCart(cartItem);
                            toast.success(`Đã thêm ${packageDetails.name} vào giỏ hàng trên máy chủ`);
                        } catch (error) {
                            console.error("Error adding to cart:", error);
                            toast.error(`Không thể thêm ${packageDetails.name} vào giỏ hàng trên máy chủ`);
                        }
                    }
                    mergedCart.push({
                        id: localItem.accountPackageId,
                        accountRentalPackage: packageDetails,
                        quantity: 1
                    });
                }
            }
        }

        return mergedCart;
    };

    useEffect(() => {
        const userLocalStorage = localStorage.getItem('user');
        let userId = null;
        if (userLocalStorage) {
            const userData = JSON.parse(userLocalStorage);
            userId = userData.id;
        }

        const fetchData = async () => {
            const accountPackages = await fetchAccountPackage();
            const localCartItems = JSON.parse(localStorage.getItem('cart')) || [];
            if (userId) {
                // User is logged in, fetch cart from server and sync local cart
                try {
                    const serverCartItems = await CartService.getCartItems(userId);
                    const mergedCartItems = await mergeCarts(userId, serverCartItems, localCartItems, accountPackages);
                    setItems(mergedCartItems);
                    localStorage.removeItem('cart'); // Clear local cart after sync
                } catch (error) {
                    toast.error("Đã xảy ra lỗi khi tải giỏ hàng từ máy chủ.");
                }
            } else {
                // User is not logged in, use local storage cart
                const mergedCartItems = await mergeCarts(null, [], localCartItems, accountPackages);
                setItems(mergedCartItems);
            }
        };

        fetchData();
    }, [user]);

    const handleQuantityChange = (itemId, change) => {

        setItems(prevItems =>
            prevItems.map(item =>
                item.accountPackageId === itemId ? { ...item, quantity: item.quantity + change } : item
            )
        );
    };

    const handleRemove = async (itemId) => {
        console.log("Remove call, itemId:", itemId);

        if (user) {

            const selectedItems = items.filter(item => item.id === itemId);
            try {


                // Xóa mục giỏ hàng từ máy chủ
                await CartService.deleteCartItem(itemId);
                toast.success(`Đã xóa ${selectedItems[0].accountRentalPackage.name} ra khỏi giỏ hàng`);
            } catch (error) {
                console.error("Error while deleting cart item:", error);
                toast.error(`Đã xảy ra lỗi khi xóa ${selectedItems[0].accountRentalPackage.name} giỏ hàng khỏi máy chủ`);
            }
        }

        // Cập nhật giỏ hàng cục bộ
        setItems(prevItems => {
            const filteredItems = prevItems.filter(item => item.id !== itemId);
            console.log("Filtered items:", filteredItems);
            localStorage.setItem('cart', JSON.stringify(filteredItems));
            return filteredItems;
        });
    };

    const handleToPayment = async () => {
        if (user) {
            try {
                const response = await CartService.createOrderFromCart(user.id);
                if (response !== null) {
                    const data = response.order;
                    localStorage.setItem('order', JSON.stringify(data));
                    navigate('/user/payment');
                }
                toast.success("Đã thêm vào giỏ hàng.");
            } catch (error) {
                toast.error("Đã xảy ra lỗi khi thêm đơn hàng.");
            }
        }
    }

    const handleLogin = () => {
        setShowSigninModal(true);
    }

    const handleCloseSigninModal = () => {
        setShowSigninModal(false);
    }

    const termPrice = items.reduce((acc, item) => acc + item.accountRentalPackage.discountedPrice * 1, 0);
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
                                        key={item.accountRentalPackage.id}
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
                            <span className="text-lg font-bold text-slate-900">{formatCurrency(termPrice)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold">Giảm giá:</h3>
                            <span className="text-lg font-bold text-slate-900">{formatCurrency(discount)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold">Tổng giá trị sản phẩm:</h3>
                            <span className="text-lg font-bold text-slate-900">{formatCurrency(totalPrice)}</span>
                        </div>
                        <div className="flex justify-center mt-4">

                            {isLoggedIn ? (
                                items.length > 0 ? (
                                    <button
                                        onClick={handleToPayment}
                                        className="bg-blue-500 text-white py-2 px-4 rounded-md"
                                    >
                                        TIẾN HÀNH THANH TOÁN
                                    </button>
                                ) : null
                            ) : (
                                <>
                                    <button
                                        onClick={handleLogin}
                                        className="bg-[#474193] px-4 py-2 rounded-lg"
                                    >
                                        <h2 className="text-white font-semibold">Đăng nhập để thanh toán</h2>
                                    </button>
                                    <SignInModal
                                        showModal={showSiginModal}
                                        onCloseModal={handleCloseSigninModal}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;

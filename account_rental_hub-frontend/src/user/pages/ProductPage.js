import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import AccountPackageService from "../../services/account-rental-package.service";
import { toast } from "react-toastify";
import CartService from "../../services/cart-service";
import { AuthContext } from "../context/AuthContext";
import AccountRentalService from "../../services/account-rental.service";

function ProductPage() {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { serviceId, packageId } = location.state || {};

    const [selectedDuration, setSelectedDuration] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [packageData, setPackageData] = useState([]);
    const [isStocking, setIsStocking] = useState(true);

    useEffect(() => {
        const fetchAccountPackage = async () => {
            try {
                const response = await AccountPackageService.getAllAccountRentalPackagesByServiceId(serviceId);
                if (response) {
                    setPackageData(response);
                } else {
                    setPackageData([]);
                    setIsStocking(false);
                }
            } catch (error) {
                console.error("Error fetching account packages:", error);
                setIsStocking(false);
            }
        };

        if (serviceId) {
            fetchAccountPackage();
        }
    }, [serviceId]);

    useEffect(() => {
        const checkAvailability = async (packageId) => {
            try {
                const check = await AccountRentalService.checkAccountRentalAvailability(packageId);
                setIsStocking(check.isAvailable);
            } catch (error) {
                setIsStocking(false);
            }
        };

        if (packageId && packageData.length > 0) {
            const selectedPackage = packageData.find(pkg => pkg.id === packageId);
            if (selectedPackage) {
                setSelectedDuration(selectedPackage.duration.toString());
                checkAvailability(packageId);
            } else if (packageData.length > 0) {
                setSelectedDuration(packageData[0].duration.toString());
                setIsStocking(true); // Đặt mặc định là có hàng nếu không tìm thấy packageId cụ thể
            }
        } else if (packageData.length > 0) {
            setSelectedDuration(packageData[0].duration.toString());
            setIsStocking(true); // Đặt mặc định là có hàng nếu không có packageId cụ thể
        }
    }, [packageId, packageData]);

    const checkAvailability = async (packageId) => {
        try {
            const check = await AccountRentalService.checkAccountRentalAvailability(packageId);
            setIsStocking(check.isAvailable);
        } catch (error) {
            console.error("Error checking package availability:", error);
            setIsStocking(false);
        }
    };

    const handleDurationChange = (e) => {
        setSelectedDuration(e.target.value);
        const selectedPackage = packageData.find(pkg => pkg.duration.toString() === e.target.value);
        if (selectedPackage) {
            checkAvailability(selectedPackage.id);
        }
    };

    const handleAddToCart = async () => {
        const userId = user?.id || null;
        const accountPackageId = packageData.find(pkg => pkg.duration.toString() === selectedDuration)?.id;

        if (!accountPackageId) {
            toast.error("Vui lòng chọn một gói hợp lệ.");
            return;
        }

        const cartItem = {
            userId: userId ? parseInt(userId) : null,
            accountPackageId,
            quantity: 1,
        };

        if (userId) {
            try {
                await CartService.addToCart(cartItem);
                toast.success("Đã thêm vào giỏ hàng.");
                navigate('/user/cart');
            } catch (error) {
                toast.error("Đã xảy ra lỗi khi thêm vào giỏ hàng.");
            }
        } else {
            const localCart = JSON.parse(localStorage.getItem('cart')) || [];
            localCart.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(localCart));
            toast.success("Đã thêm vào giỏ hàng (chưa đăng nhập).");
            navigate('/user/cart');
        }
    };

    const selectedPackage = packageData.find(pkg => pkg.duration.toString() === selectedDuration);
    const totalPrice = selectedPackage ? selectedPackage.discountedPrice * quantity : 0;
    const originalPrice = selectedPackage ? selectedPackage.price : 0;

    return (
        <div className="container mx-auto px-4 lg:px-32 py-8 lg:py-16">
            <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg p-6">
                <div className="lg:w-1/2">
                    <img
                        src={selectedPackage?.imgURL || "https://i.ibb.co/TB10jcB/NetFlix.png"}
                        alt={selectedPackage?.name || "Netflix Logo"}
                        className="w-full h-auto object-contain rounded-lg mb-6"
                    />
                </div>
                <div className="lg:w-1/2 lg:pl-6">
                    <p className="text-gray-800 mb-4">Sản phẩm </p>
                    <h1 className="text-3xl font-bold mb-4">{selectedPackage?.name || "Tài khoản Netflix Premium 4K"}</h1>
                    <p className="mb-4">
                        Tình trạng:
                        <span className={`${isStocking ? "text-green-600" : "text-red-600"}`}> {isStocking ? "Còn hàng" : "Hết hàng"}</span>
                    </p>
                    <div className="mb-4">
                        <span className="text-2xl font-bold text-red-600">{totalPrice.toLocaleString()}đ</span>
                    </div>
                    <div className="mb-4">
                        <span className="text-gray-500 line-through mr-2">{originalPrice.toLocaleString()}đ</span>
                    </div>
                    <div className="mb-4 bg-yellow-100 p-4 rounded-md shadow-md">
                        <label className="block text-gray-800 font-bold mb-2 text-lg">Chọn thời gian thuê:</label>
                        <select
                            value={selectedDuration}
                            onChange={handleDurationChange}
                            className="w-full px-3 py-2 border-2 border-yellow-400 rounded-md shadow-sm"
                        >
                            {packageData.map(pkg => (
                                <option key={pkg.id} value={pkg.duration.toString()}>
                                    {pkg.duration} ngày - {pkg.discountedPrice.toLocaleString()}đ
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!isStocking}
                            onClick={handleAddToCart}>
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-col bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-4">Chi tiết sản phẩm</h1>
                <p className="text-gray-700 mb-4">{selectedPackage?.description || "Truy cập toàn bộ nội dung Netflix với chất lượng 4K tuyệt vời."}</p>
            </div>
        </div>
    );
}

export default ProductPage;

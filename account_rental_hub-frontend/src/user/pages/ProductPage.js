import { useState, useEffect, useContext } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import AccountPackageService from "../../services/account-rental-package.service";
import { toast } from "react-toastify";
import CartService from "../../services/cart-service";
import { AuthContext } from "../context/AuthContext";
import AccountRentalService from "../../services/account-rental.service";

function ProductPage() {
    const { serviceName } = useParams();
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { serviceId, packageId } = location.state || {};

    const [selectedDuration, setSelectedDuration] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [packageData, setPackageData] = useState([]);
    const [isStocking, setIsStocking] = useState(true)

    useEffect(() => {
        const fetchAccountPackage = async () => {
            try {
                console.log("Fetching account packages for serviceId:", serviceId);
                const response = await AccountPackageService.getAllAccountRentalPackagesByServiceId(serviceId);
                if (response) {
                    console.log("Received packages:", response);
                    setPackageData(response);

                    // Check for packageId and set the corresponding duration
                    if (packageId) {
                        const selectedPackage = response.find(pkg => pkg.id === packageId);

                        if (selectedPackage) {

                            setSelectedDuration(selectedPackage.duration.toString());

                            // Check availability
                            const check = await AccountRentalService.checkAccountRentalAvailability(packageId);
                            console.log("Availability check result:", check.isAvailable);
                            if (check.isAvailable === false || selectedPackage.amount < 1) {
                                setIsStocking(false);
                            } else {
                                setIsStocking(true);
                            }
                        } else {
                            console.warn("No package found with the specified packageId.");
                            if (response.length > 0) {
                                setSelectedDuration(response[0].duration.toString());
                                setIsStocking(true); // Default to stocking if no specific packageId is found
                            }
                        }
                    } else if (response.length > 0) {
                        setSelectedDuration(response[0].duration.toString());
                        setIsStocking(true); // Default to stocking if no specific packageId is found
                    }
                } else {
                    console.warn("No packages received.");
                    setPackageData([]);
                    setIsStocking(false); // No packages available
                }
            } catch (error) {
                console.error("Error fetching account packages:", error);
                // toast.error("Đã xảy ra lỗi khi tải dữ liệu ban đầu");
                setIsStocking(false); // Error fetching packages
            }
        };

        fetchAccountPackage();
    }, [serviceId, packageId]);



    const handleDurationChange = (e) => {
        setSelectedDuration(e.target.value);
    };

    const handleQuantityChange = (change) => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity + change));
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

        console.log("Cart: ", cartItem)

        if (userId) {
            // User is logged in, add to server cart
            try {
                await CartService.addToCart(cartItem);
                toast.success("Đã thêm vào giỏ hàng.");
                navigate('/user/cart'); // Redirect to cart page
            } catch (error) {
                toast.error("Đã xảy ra lỗi khi thêm vào giỏ hàng.");
            }
        } else {
            // User is not logged in, add to local storage cart
            const localCart = JSON.parse(localStorage.getItem('cart')) || [];
            localCart.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(localCart));
            toast.success("Đã thêm vào giỏ hàng (chưa đăng nhập).");
            navigate('/user/cart'); // Redirect to cart page
        }
    };


    const selectedPackage = packageData.find(pkg => pkg.duration.toString() === selectedDuration);
    const totalPrice = selectedPackage ? selectedPackage.discountedPrice * quantity : 0;

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

                    {/* <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Số lượng:</label>
                        <div className="flex items-center">
                            <button
                                className="bg-gray-200 rounded-l-md py-2 px-4 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                                onClick={() => handleQuantityChange(-1)}
                                disabled={quantity === 1}
                            >
                                -
                            </button>
                            <span className="bg-white py-2 px-4 text-gray-700 border">{quantity}</span>
                            <button
                                className="bg-gray-200 rounded-r-md py-2 px-4 text-gray-700 hover:bg-gray-300"
                                onClick={() => handleQuantityChange(1)}
                            >
                                +
                            </button>
                        </div>
                    </div> */}
                    <div className="flex justify-end">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
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

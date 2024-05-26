import { useState, useEffect } from "react";
import AccountPackageService from "../../services/account-rental-package.service";
import { useLocation, useNavigate } from "react-router-dom";
import AccountServiceRentalService from "../../services/account-rental-service.service";
import { Link } from "react-router-dom";

const serviceDropdown = (services, defaultValue, setServiceId) => {
    return (
        <div>
            <select
                id="serviceName"
                name="serviceName"
                className="block w-full rounded-md border-gray-300 border-2 py-2 pl-3 pr-8 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none bg-white"
                value={defaultValue || ''}
                onChange={(e) => setServiceId(e.target.value)}
            >
                <option value="">Tất cả</option>
                {services.map(service => (
                    <option key={service.id} value={service.id}>
                        {service.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

function UserSearchPage() {
    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");
    const [products, setProducts] = useState([]);
    const [serviceData, setServiceData] = useState([]);
    const [serviceId, setServiceId] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    const getTagFromURL = () => new URLSearchParams(location.search).get('tag') || "";
    const getServiceNameFromURL = () => new URLSearchParams(location.search).get('service') || "";
    const getPriceFromURL = () => new URLSearchParams(location.search).get('priceFrom') || "";
    const getPriceToFromURL = () => new URLSearchParams(location.search).get('priceTo') || "";
    const getNameFromURL = () => new URLSearchParams(location.search).get('name') || "";

    const [category, setCategory] = useState(getTagFromURL);
    const [serviceName, setServiceName] = useState(getServiceNameFromURL);
    const [name, setName] = useState(getNameFromURL);

    useEffect(() => {
        const fetchServiceNameData = async () => {
            try {
                const response = await AccountServiceRentalService.getAccountServiceRental();
                if (response?.data?.content) {
                    setServiceData(response?.data?.content);
                } else {
                    setServiceData([]);
                    console.error("Not Found Data");
                }
            } catch (error) {
                console.error("Đã xảy ra lỗi khi tải dữ liệu ban đầu");
            }
        };
        fetchServiceNameData();
    }, []);

    useEffect(() => {
        setCategory(getTagFromURL());
        setServiceName(getServiceNameFromURL());
        setPriceFrom(getPriceFromURL());
        setPriceTo(getPriceToFromURL());
        setName(getNameFromURL());
    }, [location]);

    const fetchData = async () => {
        try {
            const response = await AccountPackageService.searchAccountPackageNyUser(
                0, 10, serviceId, name, category, serviceName, priceFrom, priceTo
            );
            setProducts(response.content);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setProducts([]);
            } else {
                console.error("Error while searching with tag:", error);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [category, serviceName, serviceId, priceFrom, priceTo, name]);

    const handleFilterChange = (filterName, value) => {
        const params = new URLSearchParams(location.search);
        if (value) {
            params.set(filterName, value);
        } else {
            params.delete(filterName);
        }
        navigate(`?${params.toString()}`);
    };

    const handleFilterClick = () => {
        fetchData();
    };

    const filteredProducts = products.filter(product => {
        const matchesCategory = category === "" || product.accountRentalServices?.category === category;
        const matchesPrice =
            (!priceFrom || product.price >= parseInt(priceFrom)) &&
            (!priceTo || product.price <= parseInt(priceTo));
        return matchesCategory && matchesPrice;
    });

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };


    return (
        <div className="container mx-auto px-4 lg:px-32 py-8 lg:py-16">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4 p-4">
                <div>
                    <label htmlFor="serviceId" className="block text-gray-700 font-bold mb-2">
                        Dịch vụ
                    </label>
                    {serviceDropdown(serviceData, serviceId, (value) => {
                        setServiceId(value);
                        handleFilterChange('serviceId', value);
                    })}
                </div>

                <div>
                    <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
                        Thể loại
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            handleFilterChange('tag', e.target.value);
                        }}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Tất cả</option>
                        <option value="movie">Xem phim</option>
                        <option value="music">Nghe nhạc</option>
                        <option value="study">Học tập</option>
                        <option value="work">Làm việc</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="serviceName" className="block text-gray-700 font-bold mb-2">
                        Tên dịch vụ
                    </label>
                    <input
                        id="serviceName"
                        type="text"
                        placeholder="Tên dịch vụ"
                        value={serviceName}
                        onChange={(e) => {
                            setServiceName(e.target.value);
                            handleFilterChange('service', e.target.value);
                        }}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div>
                    <label htmlFor="priceFrom" className="block text-gray-700 font-bold mb-2">
                        Mức giá
                    </label>
                    <div className="flex space-x-2">
                        <input
                            id="priceFrom"
                            type="number"
                            placeholder="Từ"
                            value={priceFrom}
                            onChange={(e) => {
                                setPriceFrom(e.target.value);
                                handleFilterChange('priceFrom', e.target.value);
                            }}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <span className="flex items-center text-gray-700">-</span>
                        <input
                            id="priceTo"
                            type="number"
                            placeholder="Đến"
                            value={priceTo}
                            onChange={(e) => {
                                setPriceTo(e.target.value);
                                handleFilterChange('priceTo', e.target.value);
                            }}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="" className="block text-gray-700 font-bold mb-2">
                        Lọc
                    </label>
                    <button
                        type="button"
                        onClick={handleFilterClick}
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Lọc
                    </button>
                </div>
            </div>

            <div className="mt-8">
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {filteredProducts.map(product => (
                            <Link
                                key={product.id}
                                to={`/user/product/${product?.accountRentalServices?.name}`}
                                state={{ serviceId: product?.accountRentalServices?.id, packageId: product?.id }} // Note the simplified state passing
                            >
                                <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
                                    <img
                                        src={product.imgURL}
                                        alt={product.name}
                                        className="w-full h-40 object-contain mb-4"
                                    />
                                    <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                                    <div className="flex items-center mb-2">
                                        <span className="text-gray-500 line-through mr-2">{formatCurrency(product.price)}</span>
                                        <span className="text-green-600 font-bold">{formatCurrency(product.discountedPrice)}</span>
                                        <span className="bg-red-500 text-white text-sm ml-2 px-2 py-1 rounded-full">{product.discount}%</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-700 text-lg">Không tìm thấy sản phẩm nào.</div>
                )}
            </div>
        </div>
    );
}

export default UserSearchPage;

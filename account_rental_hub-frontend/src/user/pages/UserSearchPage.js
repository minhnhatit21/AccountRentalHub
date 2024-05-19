import { useState } from "react";

const sampleProducts = [
    {
        id: 1,
        name: "Tài khoản Netflix Premium 1 Tháng",
        description: "Truy cập toàn bộ nội dung Netflix với chất lượng 4K tuyệt vời.",
        price: 99000,
        image: "https://i.ibb.co/TB10jcB/NetFlix.png"
    },
    {
        id: 2,
        name: "Tài khoản Spotify Premium 1 nam",
        description: "Nghe nhạc không giới hạn với chất lượng cao.",
        price: 228000,
        image: "https://i.ibb.co/v4YZVb0/Divine-Shop-Goi-Gia-Han-Spotify-1-Nam-40567.jpg"
    },
    {
        id: 3,
        name: "Tài khoản Youtube Premium 6 thang",
        description: "Thưởng thức phim và chương trình truyền hình của Disney, Pixar, Marvel.",
        price: 960000,
        image: "https://i.ibb.co/MBtp6mL/613ac6c4722f.png"
    }
];

function UserSearchPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("Tất cả");
    const [type, setType] = useState("Tất cả");
    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");

    const filteredProducts = sampleProducts.filter(product => {
        const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === "Tất cả" || product.category === category;
        const matchesType = type === "Tất cả" || product.type === type;
        const matchesPrice =
            (!priceFrom || product.price >= parseInt(priceFrom)) &&
            (!priceTo || product.price <= parseInt(priceTo));
        return matchesSearchTerm && matchesCategory && matchesType && matchesPrice;
    });

    return (
        <div className="container mx-auto px-4 lg:px-32 py-8 lg:py-16">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4 p-4">
                <div>
                    <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
                        Danh mục
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="Tất cả">Tất cả</option>
                        {/* Thêm các lựa chọn danh mục khác */}
                    </select>
                </div>
    
                <div>
                    <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
                        Thể loại
                    </label>
                    <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="Tất cả">Tất cả</option>
                        {/* Thêm các lựa chọn thể loại khác */}
                    </select>
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
                            onChange={(e) => setPriceFrom(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <span className="flex items-center text-gray-700">-</span>
                        <input
                            id="priceTo"
                            type="number"
                            placeholder="Đến"
                            value={priceTo}
                            onChange={(e) => setPriceTo(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </div>
    
                <button
                    type="button"
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Lọc
                </button>
            </div>
    
            <div className="mt-8">
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md mb-6"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-40 object-contain mb-4"
                            />
                            <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                            <p className="text-gray-600 mb-4">{product.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-red-600">{product.price}đ</span>
                                <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
                                    Thêm vào giỏ hàng
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserSearchPage;

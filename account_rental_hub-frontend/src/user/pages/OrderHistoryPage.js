const orders = [
    {
        id: 6470256,
        date: "2023-08-24T09:59:42",
        product: "Gói gia hạn Duolingo 1 tháng",
        quantity: 1,
        total: 29000,
        status: "Đã xử lý"
    },
    {
        id: 5955576,
        date: "2023-01-11T21:55:11",
        product: "Tài khoản Netflix Premium 1 tháng - Xem phim chất lượng 4k và Full HD",
        quantity: 1,
        total: 89000,
        status: "Đã xử lý"
    },
    {
        id: 5628470,
        date: "2022-07-24T09:10:49",
        product: "Tài khoản học ngoại ngữ Busuu Premium Plus 1 Tháng",
        quantity: 1,
        total: 19000,
        status: "Đã xử lý"
    },
    {
        id: 4848984,
        date: "2021-07-31T15:18:56",
        product: "Tài khoản Netflix Premium for 1 User (1 Tháng)",
        quantity: 1,
        total: 79000,
        status: "Đã xử lý"
    }
];
function OrderHistoryPage() {
    return (
        <>
            <div className="flex-1 ml-10">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-2xl font-bold mb-4">Lịch sử đơn hàng</h1>
                    <div className="mb-4 space-x-2 flex">
                        <input
                            type="text"
                            placeholder="Mã đơn hàng"
                            className="border rounded-md p-2"
                        />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Tìm kiếm
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300 rounded-lg">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 border-b border-gray-300">Thời gian</th>
                                    <th className="py-3 px-6 border-b border-gray-300">Mã đơn hàng</th>
                                    <th className="py-3 px-6 border-b border-gray-300">Sản phẩm</th>
                                    <th className="py-3 px-6 border-b border-gray-300">Tổng tiền</th>
                                    <th className="py-3 px-6 border-b border-gray-300">Trạng thái</th>
                                    <th className="py-3 px-6 border-b border-gray-300"></th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-800 text-sm font-medium">
                                {orders.map((order) => (
                                    <tr key={order.id} className="border-b border-gray-300 hover:bg-gray-100">
                                        <td className="py-3 px-6 border-r border-gray-300">{new Date(order.date).toLocaleString()}</td>
                                        <td className="py-3 px-6 border-r border-gray-300">{order.id}</td>
                                        <td className="py-3 px-6 border-r border-gray-300">{order.product}</td>
                                        <td className="py-3 px-6 border-r border-gray-300">{order.total.toLocaleString()} đ</td>
                                        <td className="py-3 px-6 border-r border-gray-300">{order.status}</td>
                                        <td className="py-3 px-6">
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                Chi tiết
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderHistoryPage;
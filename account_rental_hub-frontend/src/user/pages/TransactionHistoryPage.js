const transactions = [
    {
        time: "2023-08-24T10:00:35",
        description: "Số ID đơn hàng: #6470256",
        amount: -29000,
        balance: 0
    },
    {
        time: "2023-08-24T10:00:35",
        description: "Nạp Dcoin qua Momo Payment. Mã giao dịch Momo: #44273834652",
        amount: 29000,
        balance: 29000
    },
    // Các giao dịch khác...
];

function TransactionHistoryPage() {
    return (
        <>
            <div className="flex-1 ml-10">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-2xl font-bold mb-4">Lịch sử giao dịch</h1>
                    <div className="mb-4 space-x-2">
                        <input
                            type="text"
                            placeholder="Mô tả"
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
                                    <th className="py-3 px-6 border-b border-gray-300">Mô tả</th>
                                    <th className="py-3 px-6 border-b border-gray-300">Số tiền</th>
                                    <th className="py-3 px-6 border-b border-gray-300">Số dư</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-800 text-sm font-medium">
                                {transactions.map((transaction, index) => (
                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 border-r border-gray-300">{new Date(transaction.time).toLocaleString()}</td>
                                        <td className="py-3 px-6 border-r border-gray-300">{transaction.description}</td>
                                        <td className="py-3 px-6 border-r border-gray-300">
                                            {transaction.amount.toLocaleString()} đ
                                        </td>
                                        <td className="py-3 px-6 border-r border-gray-300">
                                            {transaction.balance.toLocaleString()} đ
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

export default TransactionHistoryPage;
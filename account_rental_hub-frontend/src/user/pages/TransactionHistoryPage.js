import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { TransactionContext } from "../../admin/context/TransactionContext";

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

    const { transactionList, action, setAction, actions, searchTransactionData, changePage, pageable, setUserIdSearch } = useContext(TransactionContext);
    const { isLoggedIn, user } = useContext(AuthContext)
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (user && user.id) {
            setUserIdSearch(user.id);
            searchTransactionData("", user.id);
        }
    }, [user, setUserIdSearch, searchTransactionData]);

    const handleSearch = (e) => {
        e.preventDefault();
        searchTransactionData(formData.orderCode, user.id);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
      
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <>
            <div className="flex-1 ml-10">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-2xl font-bold mb-4">Lịch sử giao dịch</h1>
                    {/* <div className="mb-4 space-x-2">
                        <input
                            type="text"
                            placeholder="Mô tả"
                            className="border rounded-md p-2"
                        />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Tìm kiếm
                        </button>
                    </div> */}
                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300 rounded-lg">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 border-b border-r border-gray-300">Mã đơn hàng</th>
                                    <th className="py-3 px-6 border-b border-r border-gray-300">Thời gian</th>
                                    <th className="py-3 px-6 border-b border-r border-gray-300">Phương thức thanh toán</th>
                                    <th className="py-3 px-6 border-b border-r border-gray-300">Số tiền</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-800 text-sm font-medium">
                                {transactionList && transactionList.map((transaction, index) => (
                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-center border-r border-gray-300">{transaction.orderCode}</td>
                                        <td className="py-3 px-6 text-center border-r border-gray-300">{formatDate(transaction.transactionDate)}</td>
                                        <td className="py-3 px-6 text-center border-r border-gray-300">{transaction.paymentMethod}</td>
                                        <td className="py-3 px-6 text-center border-r text-red-600 border-gray-300">
                                           - {formatCurrency(transaction.amount)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end items-center mt-4">
                        {pageable && (
                            <>
                                <button
                                    onClick={() => changePage(pageable.page - 1)}
                                    disabled={pageable.page === 0}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                <span className="text-sm mx-8">
                                    Trang {pageable.pageNumber + 1} / {pageable.totalPages}
                                </span>
                                <button
                                    onClick={() => changePage(pageable.page + 1)}
                                    disabled={pageable.page === pageable.totalPages - 1}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TransactionHistoryPage;
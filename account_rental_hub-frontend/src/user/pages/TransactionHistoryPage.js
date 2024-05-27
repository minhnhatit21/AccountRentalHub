import { useState, useEffect, useCallback, useContext } from "react";
import { TransactionContext } from "../../admin/context/TransactionContext";
import { SignInModal } from "../components/modals/login_register_modal";
import { Link } from "react-router-dom";

function TransactionHistoryPage() {
    const { transactionList, searchTransactionData, setUserIdSearch, pageable, changePage } = useContext(TransactionContext);
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({});
    const [showSiginModal, setShowSigninModal] = useState(false);

    const memoizedSetUserIdSearch = useCallback(setUserIdSearch, [setUserIdSearch]);
    const memoizedSearchTransactionData = useCallback(searchTransactionData, [searchTransactionData]);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData && userData.id) {
            setUser(userData);
            memoizedSetUserIdSearch(userData.id);
            memoizedSearchTransactionData("", userData.id);
        }
    }, [memoizedSetUserIdSearch, memoizedSearchTransactionData]);

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

    const handleLogin = () => {
        setShowSigninModal(true);
    }

    const handleCloseSigninModal = () => {
        setShowSigninModal(false);
    }

    return (
        <>
            {user ? (
                <div className="flex-1 ml-10">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h1 className="text-2xl font-bold mb-4">Lịch sử giao dịch</h1>
                        <div className="overflow-x-auto">
                            <table className="w-full border border-gray-300 rounded-lg">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 border-b border-gray-300">Ngày giao dịch</th>
                                        <th className="py-3 px-6 border-b border-gray-300">Trạng thái</th>
                                        <th className="py-3 px-6 border-b border-gray-300">Số tiền</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-800 text-sm font-medium">
                                    {transactionList.map((transaction) => (
                                        <tr key={transaction.id} className="border-b border-gray-300 hover:bg-gray-100">
                                            <td className="py-3 px-6 border-r text-center border-gray-300">{formatDate(transaction.transactionDate)}</td>
                                            <td className="py-3 px-6 border-r text-center border-gray-300">{transaction.status}</td>
                                            <td className="py-3 px-6 border-r text-center border-gray-300">{formatCurrency(transaction.amount)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-end items-center mt-4">
                            {pageable && (
                                <>
                                    <button
                                        onClick={() => changePage(pageable.pageNumber - 1)}
                                        disabled={pageable.pageNumber === 0}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>
                                    <span className="text-sm mx-8">
                                        Trang {pageable.pageNumber + 1} / {pageable.totalPages}
                                    </span>
                                    <button
                                        onClick={() => changePage(pageable.pageNumber + 1)}
                                        disabled={pageable.pageNumber === pageable.totalPages - 1}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className='flex-1 ml-10 bg-white rounded-lg shadow-lg p-6'>
                    <button onClick={handleLogin} className='bg-[#474193] px-4 py-2 rounded-lg'>
                        <h2 className="text-white font-semibold">Đăng nhập để xem thông tin</h2>
                    </button>
                    <SignInModal showModal={showSiginModal} onCloseModal={handleCloseSigninModal} />
                </div>
            )}
        </>
    );
}

export default TransactionHistoryPage;

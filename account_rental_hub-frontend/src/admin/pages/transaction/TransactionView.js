import { useState } from "react";
import Pagination from "../../components/partials/pagination";

function TransactionView({
    action,
    pageable,
    transactionList,
    handleViewTransactionClick,
    isOpenModal,
    onPageChange,
    onSearchData,
    onInputChange,
}) {

    const [formData, setFormData] = useState({});


    const handleSearch = (e) => {
        e.preventDefault();
        onSearchData(formData.customerName, "", formData.startDate, formData.endDate, formData.transactionStatus);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}-${month}-${year}`;
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <>
            <h1 className="font-bold mb-8 text-2xl">Danh sách giao dịch</h1>
            <div
                className="rounded-xl border border-stroke bg-white px-5 py-6 m-4 shadow-default sm:px-7.5 xl:pb-1"
            >
                <div className="flex flex-col mb-4 md:flex-row items-center justify-center md:space-x-4">
                    <form
                        onSubmit={handleSearch}
                        className="flex flex-col md:flex-row items-center justify-center md:space-x-4 space-y-4 md:space-y-0 w-full">
                        <div className="relative">
                            <select
                                id="transactionStatus"
                                name="transactionStatus"
                                className="block w-full rounded-md border-gray-300 border-2 py-2 pl-3 pr-8 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none bg-white"
                                onChange={handleInputChange}
                            >
                                <option value="" className="text-gray-500">
                                    Trạng thái giao dịch
                                </option>
                                <option className="hover:bg-gray-100" value="PENDING">Chờ thanh toán</option>
                                <option className="hover:bg-gray-100" value="SUCCESS">Hoàn tất</option>
                                <option className="hover:bg-gray-100" value="CANCELLED">Không hoàn thành</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <svg
                                    className="h-5 w-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="md:w-56">
                            <input
                                id="startDate"
                                name="startDate"
                                type="date"
                                placeholder="Ngày bắt đầu..."
                                className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="md:w-56">
                            <input
                                id="endDate"
                                name="endDate"
                                type="date"
                                placeholder="Ngày kết thúc..."
                                className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex-grow">
                            <input
                                type="text"
                                name="customerName"
                                placeholder="Nhập tên khách hàng cần tìm kiếm..."
                                className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleInputChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <span>Tìm kiếm</span>
                        </button>
                    </form>
                </div>

                <div className="max-w-full overflow-x-auto rounded-xl border-solid border-2 border-[#F2F2F2]">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left bg-[#F2F2F2]">
                                {/* Mã đơn hàng */}
                                <th
                                    className="min-w-[130px] px-4 py-4 font-medium text-black"
                                >
                                    <p
                                        className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-md font-medium text-success"
                                    >
                                        Tên khách hàng
                                    </p>
                                </th>
                                <th
                                    className="min-w-[120px] px-4 py-4 font-medium text-black"
                                >
                                    <p
                                        className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-md font-medium text-success"
                                    >
                                        Trạng thái giao dịch
                                    </p>
                                </th>
                                <th
                                    className="min-w-[120px] px-4 py-4 font-medium text-black"
                                >
                                    <p
                                        className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-md font-medium text-success"
                                    >
                                        Ngày hoàn tất giao dịch
                                    </p>
                                </th>
                                <th
                                    className="min-w-[120px] px-4 py-4 font-medium text-black"
                                >
                                    <p
                                        className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-md font-medium text-success"
                                    >
                                        Phương thức thanh toán
                                    </p>
                                </th>
                                <th
                                    className="min-w-[120px] px-4 py-4 font-medium text-black"
                                >
                                    <p
                                        className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-md font-medium text-success"
                                    >
                                        Số tiền (VNĐ)
                                    </p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionList && transactionList.map(transaction => (
                                <>
                                    <tr key={transaction.id}>
                                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p
                                                className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success"
                                            >
                                                {transaction.customerName}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p
                                                className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success"
                                            >
                                                {transaction.status}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p
                                                className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success"
                                            >
                                                {formatDate(transaction.transactionDate)}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p
                                                className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success"
                                            >
                                                {transaction.paymentMethod}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p
                                                className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success"
                                            >
                                                {formatCurrency(transaction.amount)}
                                            </p>
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
                {pageable && (
                    <Pagination
                        pageable={pageable}
                        onPageChange={onPageChange}
                    />
                )}
            </div>
        </>
    );
}

export default TransactionView;
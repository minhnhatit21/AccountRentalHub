import Pagination from "../../components/partials/pagination";

function OrderListView({
    action,
    orderList,
    handleEditOrderClick,
    handleViewOrderClick,
    handleDeleteOrderClick,
    isOpenModal,
    isOpenDeleteModal,
    dataModal,
    orderModalClose,
    handleDeleteOrderModalClose,
    handleDeleteOrder
}) {
    const onDeleteOrderClick = (id) => {
        handleDeleteOrderClick(id);
    }

    const onViewOrderClick = (id) => {
        handleViewOrderClick(id);
    }

    const onEditOrderClick = (id) => {
        handleEditOrderClick(id);
    }

    return ( 
        <>
<h1 class="font-bold mb-8 text-2xl">Danh sách đơn hàng</h1>
            <div
                className="rounded-xl border border-stroke bg-white px-5 py-6 m-4 shadow-default sm:px-7.5 xl:pb-1"
            >
                <div className="flex flex-col mb-4 md:flex-row items-center justify-center md:space-x-4">
                    <div className="w-full md:w-64 mb-6 md:mb-0">
                        <div className="relative">
                            <select
                                id="serviceType"
                                name="serviceType"
                                className="block w-full rounded-md border-gray-300 border-2 py-2 pl-3 pr-8 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none bg-white"
                                defaultValue=""
                            >
                                <option value="" disabled className="text-gray-500">
                                    Trạng thái đơn hàng
                                </option>
                                <option className="hover:bg-gray-100"> Hủy </option>
                                <option className="hover:bg-gray-100">Chờ xác nhận</option>
                                <option className="hover:bg-gray-100">Hoàn tất</option>
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
                    </div>
                    <form className="flex flex-col md:flex-row items-center justify-center md:space-x-4 space-y-4 md:space-y-0 w-full">
                        <div className="flex-grow">
                            <input
                                type="text"
                                placeholder="Nhập mã đơn hàng hoặc tên khách hàng cần tìm kiếm..."
                                className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    {/* <OrderModal
                        isOpen={isOpenModal}
                        onClose={OrderModalClose}
                        action={action}
                        initialData={dataModal.current}
                    />
                    <OrderDeleteModal
                        isOpen={isOpenDeleteModal}
                        onClose={handleDeleteOrderModalClose}
                        onDelete={handleDeleteOrder}
                        dataToDelete={dataModal.current}

                    /> */}
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
                                        Mã đơn hàng
                                    </p>
                                </th>
                                <th
                                    className="min-w-[120px] px-4 py-4 font-medium text-black"
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
                                        Dịch vụ cho thuê
                                    </p>
                                </th>
                                <th
                                    className="min-w-[120px] px-4 py-4 font-medium text-black"
                                >
                                    <p
                                        className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-md font-medium text-success"
                                    >
                                        Trạng thái đơn hàng
                                    </p>
                                </th>
                                <th
                                    className="min-w-[120px] px-4 py-4 font-medium text-black"
                                >
                                    <p
                                        className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-md font-medium text-success"
                                    >
                                        Ngày đặt hàng
                                    </p>
                                </th>
                                <th className="px-4 py-4 font-medium text-black">
                                    <p
                                        className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-md font-medium text-success"
                                    >
                                        Actions
                                    </p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderList && orderList.map(order => (
                                <tr key={order.id}>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p
                                            className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success"
                                        >
                                            {order.OrderID}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p
                                            className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success"
                                        >
                                            {order.CustomerName}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p
                                            className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success"
                                        >
                                            {order.SubscriptionService}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p
                                            className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success"
                                        >
                                            {order.OrderStatus}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p
                                            className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success"
                                        >
                                            {order.StartDate}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <div className="flex items-center justify-center space-x-3.5">
                                            <button
                                                onClick={() => onViewOrderClick(order.id)}
                                                className="hover:text-primary">
                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="#5A8CFF"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                                        fill=""
                                                    />
                                                    <path
                                                        d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination />
            </div>
        </>
     );
}

export default OrderListView;
import { useState, useEffect } from "react";
import C_Datepicker from "../../partials/datepicker";

function CustomerModal({ isOpen, onClose, action, initialData }) {
    const initFormData = (data) => {
        let initData;
        if (Array.isArray(data) && data.length > 0) {
            initData = data[0];
        } else {
            initData = data;
        }
        console.log("Init Data: ", initData)
        return {
            fullname: initData.fullname || '',
            customerEmail: Object.keys(initData).length > 0 ? initData.user.email : '',
            customerPhone: initData.phone || '',
            customerAddress: initData.address || '',
            customerRegisterDate: initData.created_at || ''
        };
    };

    const [formData, setFormData] = useState(initFormData(initialData || {}));

    useEffect(() => {
        if (initialData) {
            setFormData(initFormData(initialData));
        }
    }, [initialData]);

    useEffect(() => {
        if (action === "add") {
            setFormData(initFormData({}));
        }
    }, [action]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
    };

    const convertStringToDate = (dateString) => {
        const date = new Date(dateString);
        date.setHours(0, 0, 0, 0);
        return date.toISOString().slice(0, 10);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý logic lưu dữ liệu dịch vụ mới
        console.log(formData);
        onClose();
    };

    const titleModal = (action) => {
        console.log("Actions: ", action)
        if (action === "edit") return "Chỉnh sửa thông tin khách hàng"
        else if (action === "view") return "Xem chi tiết thông tin khách hàng"
    }

    return (
        <>
            {isOpen ? (
                <div className="fixed z-[200] inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">{titleModal(action)}</h3>
                                    <div className="mt-2">
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-4">
                                                <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700">
                                                    Tên khách hàng
                                                </label>
                                                <input
                                                    type="text"
                                                    id="fullname"
                                                    name="fullname"
                                                    value={formData.fullname || ""}
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    onChange={handleInputChange}
                                                    disabled={action === "view"}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700">
                                                    Email
                                                </label>
                                                <input
                                                    type="text"
                                                    id="customerEmail"
                                                    name="customerEmail"
                                                    value={formData.customerEmail || ""}
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    onChange={handleInputChange}
                                                    disabled={action === "view"}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700">
                                                    Số điện thoại
                                                </label>
                                                <input
                                                    type="text"
                                                    id="customerPhone"
                                                    name="customerPhone"
                                                    value={formData.customerPhone || ""}
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    onChange={handleInputChange}
                                                    disabled={action === "view"}
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700">
                                                    Ngày tham gia
                                                </label>
                                                <C_Datepicker
                                                    value={formData.customerRegisterDate}
                                                    onChange={(date) => handleInputChange({ name: 'customerRegisterDate', value: date })}
                                                    disabled
                                                />
                                            </div>

                                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                                {action !== "view" && (
                                                    <button
                                                        type="submit"
                                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                    >
                                                        Lưu
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                    onClick={onClose}
                                                >
                                                    {action === "view" ? "Đóng" : "Hủy"}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default CustomerModal;
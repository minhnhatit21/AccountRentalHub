import { useState, useEffect} from "react";

function AddAccountPackageModal({ isOpen, onClose, action, initialData }) {
    const initFormData = (data) => {
        let initData;
        if (Array.isArray(data) && data.length > 0) {
            initData = data[0];
        } else {
            initData = data;
        }
        console.log("Init Data: ", initData)
        return {
            image: initData.image || null,
            accountPackageName: initData.name || '',
            description: initData.description || '',
            serviceType: initData.service || '',
            price: initData.pricing || '',
            duration: initData.duration || '',
        };
    };

    const [formData, setFormData] = useState(initFormData(initialData || {}));

    useEffect(() => {
        if (initialData) {
            setFormData(initFormData(initialData));
        }
    }, [initialData]);



    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData((prevState) => ({ ...prevState, [name]: files[0] || null }));
        } else {
            setFormData((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý logic lưu dữ liệu dịch vụ mới
        console.log(formData);
        onClose();
    };

    const titleModal = (action) => {
        console.log("Actions: ", action)
        if (action === "add") return "Thêm gói tài khoản"
        else if (action === "edit") return "Chỉnh sửa gói tài khoản"
        else if (action === "view") return "Xem chi tiết tài khoản"
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
                                                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                                    Hình ảnh
                                                </label>
                                                <input
                                                    type="file"
                                                    id="image"
                                                    name="image"
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    onChange={handleInputChange}
                                                    disabled={action === "view"}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700">
                                                    Tên gói tài khoản
                                                </label>
                                                <input
                                                    type="text"
                                                    id="accountPackageName"
                                                    name="accountPackageName"
                                                    value={action !== "add" ? formData.accountPackageName : ""}
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    onChange={handleInputChange}
                                                    disabled={action === "view"}
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">
                                                    Loại dịch vụ
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        id="serviceType"
                                                        name="serviceType"
                                                        className="block w-full rounded-md border-gray-300 border-2 py-2 pl-3 pr-8 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none bg-white"
                                                        defaultValue=""
                                                    >
                                                        <option value="" disabled className="text-gray-500">
                                                            Chọn loại dịch vụ
                                                        </option>
                                                        <option className="hover:bg-gray-100">
                                                            Netflix
                                                        </option>
                                                        <option className="hover:bg-gray-100">Spotify</option>
                                                        <option className="hover:bg-gray-100">YouTube Premium</option>
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
                                            <div className="mb-4">
                                                <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                                                    Thời gian
                                                </label>
                                                <input
                                                    type="text"
                                                    id="duration"
                                                    name="duration"
                                                    value={action === "add" ? "" : formData.duration}
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    onChange={handleInputChange}
                                                    disabled={action === "view"}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="pricingInfo" className="block text-sm font-medium text-gray-700">
                                                    Giá gói tài khoản
                                                </label>
                                                <input
                                                    type="text"
                                                    id="price"
                                                    name="price"
                                                    value={action === "add" ? "" : formData.price}
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    onChange={handleInputChange}
                                                    disabled={action === "view"}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                                    Mô tả
                                                </label>
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    value={action === "add" ? "" : formData.description}
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    onChange={handleInputChange}
                                                    disabled={action === "view"}
                                                ></textarea>
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

export default AddAccountPackageModal;
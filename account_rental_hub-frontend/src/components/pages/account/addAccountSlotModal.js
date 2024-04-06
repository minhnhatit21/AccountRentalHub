import { useState, useEffect } from "react";
import M_Combobox from "../../partials/combox";
import DatePicker from "../../partials/datepicker";
import Datepicker from "../../partials/datepicker";
import C_Datepicker from "../../partials/datepicker";

const people = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
    { id: 7, name: 'Hanni Pham' },
    { id: 8, name: 'Kim Minji' },
    { id: 9, name: 'Mo Daniele' },
    { id: 10, name: 'Kang Haerin' },
    { id: 11, name: 'Lee Hyein' },
]

const accountPackageList = [
    {
        "id": "1",
        "name": "Netflix 1 tháng",
        "duration": 30,
        "description": "Truy cập YouTube không quảng cáo, xem video ngoại tuyến",
        "pricing": 77000,
        "description": "Tài khoảng netflix 1 tháng",
        "service": "Netflix"
    },
    {
        "id": "2",
        "name": "Netflix 3 tháng",
        "duration": 90,
        "description": "Truy cập Netflix không quảng cáo, xem nội dung ngoại tuyến",
        "pricing": 210000,
        "service": "Netflix"
    },
    {
        "id": "3",
        "name": "Amazon Prime 1 năm",
        "duration": 365,
        "description": "Giao hàng miễn phí, xem nội dung Prime Video",
        "pricing": 499000,
        "service": "Amazon Prime"
    },
    {
        "id": "4",
        "name": "Spotify Premium 3 tháng",
        "duration": 90,
        "description": "Nghe nhạc không quảng cáo, tải về ngoại tuyến",
        "pricing": 149000,
        "service": "Spotify"
    },
    {
        "id": "5",
        "name": "YouTube Premium 1 năm",
        "duration": 365,
        "description": "Xem YouTube không quảng cáo, tải video ngoại tuyến",
        "pricing": 599000,
        "service": "YouTube"
    },
    {
        "id": "6",
        "name": "Disney+ 1 tháng",
        "duration": 30,
        "description": "Xem nội dung Disney, Pixar, Marvel, Star Wars",
        "pricing": 99000,
        "service": "Disney+"
    },
    {
        "id": "7",
        "name": "Hulu 6 tháng",
        "duration": 180,
        "description": "Xem phim, chương trình truyền hình và nội dung gốc",
        "pricing": 299000,
        "service": "Hulu"
    },
    {
        "id": "8",
        "name": "HBO Max 1 năm",
        "duration": 365,
        "description": "Xem phim, chương trình truyền hình và nội dung gốc HBO",
        "pricing": 799000,
        "service": "HBO Max"
    },
    {
        "id": "9",
        "name": "Apple TV+ 6 tháng",
        "duration": 180,
        "description": "Xem nội dung gốc Apple TV+, không quảng cáo",
        "pricing": 249000,
        "service": "Apple TV+"
    },
    {
        "id": "10",
        "name": "Peacock Premium 1 năm",
        "duration": 365,
        "description": "Xem nội dung NBC, phim, chương trình truyền hình",
        "pricing": 499000,
        "service": "Peacock"
    },
    {
        "id": "11",
        "name": "Paramount+ 3 tháng",
        "duration": 90,
        "description": "Xem nội dung Paramount, phim, chương trình truyền hình",
        "pricing": 149000,
        "service": "Paramount+"
    },
]

const accountList = [
    {
        "id": 1,
        "service":
        {
            "service_name": "Netflix",
            "website_link": "https://www.netflix.com"
        }
        ,
        "username": "user1",
        "email": "user1@example.com",
        "password": "encrypted_password",
        "description": "Netflix account",
        "account_package": "Netflix 1 tháng",
        "supcription_date": "2024-02-28T10:30:00Z",
        "renew_start_date": "2024-03-28T10:30:00Z",
        "renew_end_date": "2024-04-28T10:30:00Z",
        "created_at": "2023-03-28T10:30:00Z",
        "updated_at": "2023-03-28T10:30:00Z",
        "status": "active"
    },
    {
        "id": 2,
        "service": {
            "service_name": "Spotify",
            "website_link": "https://spotify.com"
        },
        "username": "user2",
        "email": "user2@example.com",
        "password": "encrypted_password",
        "description": "Spotify Premium account",
        "account_package": "Spotify Premium Individual",
        "supcription_date": "2024-01-15T09:00:00Z",
        "renew_start_date": "2024-04-15T09:00:00Z",
        "renew_end_date": "2024-05-15T09:00:00Z",
        "created_at": "2023-04-15T09:00:00Z",
        "updated_at": "2023-04-15T09:00:00Z",
        "status": "active"
    },
    {
        "id": 3,
        "service": {
            "service_name": "Amazon Prime",
            "website_link": "https://amazon.com"
        },
        "username": "user3",
        "email": "user3@example.com",
        "password": "encrypted_password",
        "description": "Amazon Prime membership",
        "account_package": "Amazon Prime Annual",
        "supcription_date": "2023-12-01T00:00:00Z",
        "renew_start_date": "2024-11-01T00:00:00Z",
        "renew_end_date": "2024-12-01T00:00:00Z",
        "created_at": "2023-12-01T00:00:00Z",
        "updated_at": "2023-12-01T00:00:00Z",
        "status": "active"
    },
    {
        "id": 4,
        "service": {
            "service_name": "Hulu",
            "website_link": "https://hulu.com"
        },
        "username": "user4",
        "email": "user4@example.com",
        "password": "encrypted_password",
        "description": "Hulu subscription",
        "account_package": "Hulu (No Ads)",
        "supcription_date": "2024-03-10T15:30:00Z",
        "renew_start_date": "2024-04-10T15:30:00Z",
        "renew_end_date": "2024-05-10T15:30:00Z",
        "created_at": "2023-04-10T15:30:00Z",
        "updated_at": "2023-04-10T15:30:00Z",
        "status": "active"
    },
    {
        "id": 5,
        "service": {
            "service_name": "Disney+",
            "website_link": "https://disneyplus.com"
        },
        "username": "user5",
        "email": "user5@example.com",
        "password": "encrypted_password",
        "description": "Disney+ subscription",
        "account_package": "Disney+ Premium",
        "supcription_date": "2023-11-20T08:00:00Z",
        "renew_start_date": "2024-11-20T08:00:00Z",
        "renew_end_date": "2024-12-20T08:00:00Z",
        "created_at": "2023-11-20T08:00:00Z",
        "updated_at": "2023-11-20T08:00:00Z",
        "status": "active"
    },
    {
        "id": 6,
        "service": {
            "service_name": "YouTube Premium",
            "website_link": "https://youtube.com"
        },
        "username": "user6",
        "email": "user6@example.com",
        "password": "encrypted_password",
        "description": "YouTube Premium subscription",
        "account_package": "YouTube Premium Family",
        "supcription_date": "2023-07-01T00:00:00Z",
        "renew_start_date": "2024-07-01T00:00:00Z",
        "renew_end_date": "2024-08-01T00:00:00Z",
        "created_at": "2023-07-01T00:00:00Z",
        "updated_at": "2023-07-01T00:00:00Z",
        "status": "active"
    },
    {
        "id": 7,
        "service": {
            "service_name": "Apple Music",
            "website_link": "https://apple.com/music"
        },
        "username": "user7",
        "email": "user7@example.com",
        "password": "encrypted_password",
        "description": "Apple Music subscription",
        "account_package": "Apple Music Individual",
        "supcription_date": "2023-09-15T12:00:00Z",
        "renew_start_date": "2024-09-15T12:00:00Z",
        "renew_end_date": "2024-10-15T12:00:00Z",
        "created_at": "2023-09-15T12:00:00Z",
        "updated_at": "2023-09-15T12:00:00Z",
        "status": "active"
    },
    {
        "id": 8,
        "service": {
            "service_name": "HBO Max",
            "website_link": "https://hbomax.com"
        },
        "username": "user8",
        "email": "user8@example.com",
        "password": "encrypted_password",
        "description": "HBO Max subscription",
        "account_package": "HBO Max Ad-Free",
        "supcription_date": "2023-06-01T18:00:00Z",
        "renew_start_date": "2024-06-01T18:00:00Z",
        "renew_end_date": "2024-07-01T18:00:00Z",
        "created_at": "2023-06-01T18:00:00Z",
        "updated_at": "2023-06-01T18:00:00Z",
        "status": "active"
    },

]

const serviceList = [
    {
        "id": "1",
        "name": "Netflix",
        "image": "https://i.ibb.co/L6MDz9X/HD-wallpaper-netflix-logo-black-logo-minimal-netflix.jpg",
        "description": "Dịch vụ xem phim trực tuyến phổ biến nhất hiện nay",
        "pricing_info": "Từ $8.99/tháng",
        "website": "netflix.com",
        "category": "Giải trí"
    },
    {
        "id": "2",
        "name": "Spotify",
        "image": "https://i.ibb.co/3TKMSxn/spotify.png",
        "description": "Dịch vụ nghe nhạc trực tuyến với hàng triệu bài hát và podcast",
        "pricing_info": "Miễn phí với quảng cáo hoặc Premium từ $9.99/tháng",
        "website": "spotify.com",
        "category": "Giải trí"
    },
    {
        "id": "3",
        "name": "Amazon Prime",
        "image": "https://i.ibb.co/xCFY6mW/amazon-prime.jpg",
        "description": "Dịch vụ giao hàng miễn phí, xem phim và nhiều ưu đãi khác",
        "pricing_info": "$119/năm hoặc $12.99/tháng",
        "website": "amazon.com/prime",
        "category": "Mua sắm"
    },
    {
        "id": "4",
        "name": "YouTube Premium",
        "image": "https://i.ibb.co/6WshX41/youtube-premium.png",
        "description": "Truy cập YouTube không quảng cáo, xem video ngoại tuyến",
        "pricing_info": "$11.99/tháng",
        "website": "youtube.com/premium",
        "category": "Giải trí"
    }
]

function AddAccountSlotModal({ isOpen, onClose, action, initialData }) {
    const initFormData = (data) => {
        let initData;
        if (Array.isArray(data) && data.length > 0) {
            initData = data[0];
        } else {
            initData = data;
        }
        console.log("Account Slot Init Data: ", initData)
        return {
            accountSlotRenter: initData.account ? initData.renter : null,
            accountStatus: initData.status || '',
            accountListData: initData.account ? initData.account : null,
            accountSlotServiceData: initData.account ? initData.account.service : null,
            accountSlotPackageData: initData.account ? initData.account.account_package : null,
            rentStartDate: initData.date_stared_rent || '',
            rentEndDate: initData.date_end_rent || '',

        };
    };

    const convertStringToDate = (dateString) => {
        const dateObj = new Date(dateString);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
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
        if (e.target) {
            const { name, value } = e.target;

            if (name === 'rentStartDate' || name === 'rentEndDate') {
                setFormData((prevState) => ({
                    ...prevState,
                    [name]: value ? new Date(value) : null,
                }));
            } else {
                setFormData((prevState) => ({
                    ...prevState,
                    [name]: value,
                }));
            }
        } else {
            // Xử lý trường hợp e không có target
            // Ví dụ: khi cập nhật giá trị từ DatePicker
            const { name, value } = e;
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleComboboxInputChange = (value, name) => {
        console.log(`selected: ${value}, name: ${name}`);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý logic lưu dữ liệu dịch vụ mới
        console.log(formData);
        onClose();
    };

    const titleModal = (action) => {
        console.log("Actions: ", action)
        if (action === "add") return "Thêm slot tài khoản"
        else if (action === "edit") return "Chỉnh sửa slot tài khoản"
        else if (action === "view") return "Xem chi tiết slot tài khoản"
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
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full sm:p-6">
                            <div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">{titleModal(action)}</h3>
                                    <div className="mt-2">
                                        <form onSubmit={handleSubmit}>
                                            <div className="flex flex-row gap-4 mb-28">
                                                <div className="w-1/2">
                                                    {/* Dịch vụ */}
                                                    <div className="mb-4">
                                                        <label htmlFor="accountSlotService" className="block text-sm font-medium text-gray-700 mb-2">
                                                            Gói dịch vụ
                                                        </label>
                                                        <M_Combobox
                                                            data={serviceList}
                                                            onChangeInput={handleComboboxInputChange}
                                                            c_name={"accountSlotService"}
                                                            initialData={formData.accountSlotServiceData || null}
                                                        />
                                                    </div>

                                                    {/* Gói tài khoản */}
                                                    <div className="mb-4">
                                                        <label htmlFor="accountSlotPackage" className="block text-sm font-medium text-gray-700 mb-2">
                                                            Gói tài khoản
                                                        </label>
                                                        <div className="relative">
                                                            <M_Combobox
                                                                data={accountPackageList}
                                                                onChangeInput={handleComboboxInputChange}
                                                                c_name={"accountSlotPackage"}
                                                                initialData={formData.accountSlotPackageData || null}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Tài khoản cho thuê */}
                                                    <div className="mb-4">
                                                        <label htmlFor="accountRent" className="block text-sm font-medium text-gray-700 mb-2">
                                                            Tài khoản cho thuê
                                                        </label>
                                                        <M_Combobox
                                                            data={accountList}
                                                            onChangeInput={handleComboboxInputChange}
                                                            c_name={"accountRent"}
                                                            initialData={formData.accountListData || null}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="w-1/2">
                                                    {/* Người thuê */}
                                                    <div className="mb-4">
                                                        <label htmlFor="accountRenter" className="block text-sm font-medium text-gray-700 mb-2">
                                                            Người thuê
                                                        </label>
                                                        <M_Combobox
                                                            data={people}
                                                            onChangeInput={handleComboboxInputChange}
                                                            c_name={"accountRenter"}
                                                            initialData={formData.accountSlotRenter || null}
                                                        />
                                                    </div>

                                                    <div className="flex flex-row gap-32 my-3">
                                                        {/* Ngày bắt đâu thuê */}
                                                        <div className="mb-4">
                                                            <label htmlFor="rentStartDate" className="block text-sm font-medium text-gray-700 mb-2">
                                                                Ngày bắt đầu thuê
                                                            </label>
                                                            {/* <input
                                                            type="date"
                                                            id="rentStartDate"
                                                            name="rentStartDate"
                                                            value={convertStringToDate(formData.rentStartDate) || ""}
                                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            onChange={handleInputChange}
                                                            disabled={action === "view"}
                                                        /> */}
                                                            <C_Datepicker
                                                                value={formData.rentStartDate}
                                                                onChange={(date) => handleInputChange({ name: 'rentStartDate', value: date })}
                                                                disabled={action === 'view'}
                                                            />
                                                        </div>

                                                        {/* Ngày kết thúc thuê */}
                                                        <div className="mb-4">
                                                            <label htmlFor="rentEndDate" className="block text-sm font-medium text-gray-700 mb-2">
                                                                Ngày kết thúc thuê
                                                            </label>
                                                            {/* <input
                                                            type="date"
                                                            id="rentEndDate"
                                                            name="rentEndDate"
                                                            value={convertStringToDate(formData.rentEndDate) || ''}
                                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            onChange={handleInputChange}
                                                            disabled={action === "view"}
                                                        /> */}
                                                            <C_Datepicker
                                                                value={formData.rentEndDate}
                                                                onChange={(date) => handleInputChange({ name: 'rentEndDate', value: date })}
                                                                disabled={action === 'view'}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Trạng thái tài khoản */}
                                                    <div className="mb-4">
                                                        <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
                                                            Trạng thái tài khoản
                                                        </label>
                                                        <div className="relative">
                                                            <select
                                                                id="accountStatus"
                                                                name="accountStatus"
                                                                className="block w-full rounded-md border-gray-300 border-2 py-2 pl-3 pr-8 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none bg-white"
                                                                defaultValue=""
                                                            >
                                                                <option value="" disabled className="text-gray-500">
                                                                    Trạng thái tài khoản
                                                                </option>
                                                                <option className="hover:bg-gray-100">
                                                                    Đang hoạt động
                                                                </option>
                                                                <option className="hover:bg-gray-100">
                                                                    Đang cho thuê
                                                                </option>
                                                                <option className="hover:bg-gray-100">
                                                                    Hết hạn
                                                                </option>
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
                                                </div>
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
                                                {/* {action === "edit" &&
                                                    (
                                                        <button
                                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#FD9A56] text-base font-medium text-white hover:bg-[#f1be9d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                        >
                                                            <a href={formData.accountServiceWebsite} target="_blank" rel="noopener noreferrer">
                                                                Gia hạn tài khoản
                                                            </a>
                                                        </button>
                                                    )} */}
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

export default AddAccountSlotModal;
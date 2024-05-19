import { useState, useEffect, useContext } from "react";
import M_Combobox from "../../components/partials/combox";
import C_Datepicker from "../../components/partials/datepicker";
import { AccountSlotContext } from "../../context/AccountSlotContext";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const CustomerDropdown = ({ customers, defaultValue, handleInputChange }) => {
    return (
        <>
            {/* {customers ? (
                <div>
                    <select
                        id="accountCustomerID"
                        name="accountCustomerID"
                        className="block w-full rounded-md border-gray-300 border-2 py-2 pl-3 pr-8 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none bg-white"
                        value={defaultValue || ''}
                        onChange={handleInputChange}
                    >
                        <option value="">--Chọn một người thuê--</option>
                        {customers.customers.map(customer => (
                            <option key={customer.id} value={customer.id}>
                                {customer.user.username}
                            </option>
                        ))}
                    </select>
                </div>
            ) : null} */}
        </>
    );
};

function AddAccountSlotModal({ isOpen, onClose, action, initialData }) {
    const { customerList } = useContext(AccountSlotContext);

    // Define the validation schema
    const validationSchema = yup.object().shape({
        accountStatus: yup.string().required('Trạng thái tài khoản là bắt buộc'),
        accountCustomerID: yup.string().required('Người thuê là bắt buộc'),
        accountRentStartDate: yup.date().required('Ngày bắt đầu thuê là bắt buộc'),
        accountRentEndDate: yup.date().required('Ngày kết thúc thuê là bắt buộc'),
    });

    // Initialize form data
    const initFormData = (data) => {
        let initData;
        if (Array.isArray(data) && data.length > 0) {
            initData = data[0];
        } else {
            initData = data;
        }

        return {
            accountSlotID: initData.id || 0,
            accountID: initData.username || '',
            accountCustomerID: initData.username || '',
            accountStatus: initData.status || '',
            accountRentStartDate: initData.startDate ? new Date(initData.startDate) : '',
            accountRentEndDate: initData.endDate ? new Date(initData.endDate) : '',
        };
    };

    // Use react-hook-form for form management
    const { register, handleSubmit, formState: { errors }, reset, control, watch } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initFormData(initialData || {}),
    });

    useEffect(() => {
        if (initialData) {
            const initialFormData = initFormData(initialData);
            reset(initialFormData);
        }
    }, [initialData, reset]);

    // State for managing active tab
    const [activeTab, setActiveTab] = useState(0);

    // Handle form submission
    const onSubmit = async (data) => {
        // handle form submission logic here

        onClose();
    };

    const titleModal = (action) => {
        if (action === "add") return "Thêm slot tài khoản"
        else if (action === "edit") return "Chỉnh sửa slot tài khoản"
        else if (action === "view") return "Xem chi tiết slot tài khoản"
    }

    const renderTabs = () => {
        return (
            <div className="flex justify-around my-4">
                <button
                    type="button"
                    className={`rounded-lg px-4 py-2 ${activeTab === 0 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab(0)}
                >
                    Chọn người thuê
                </button>
                <button
                    type="button"
                    className={`rounded-lg px-4 py-2 ${activeTab === 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab(1)}
                >
                    Ngày thuê
                </button>
                <button
                    type="button"
                    className={`rounded-lg px-4 py-2 ${activeTab === 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab(2)}
                >
                    Trạng thái
                </button>
            </div>
        );
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 0:
                return (
                    <>
                        <div className="mb-4">
                            <label htmlFor="accountRenter" className="block text-sm font-medium text-gray-700 mb-2">
                                Người thuê
                            </label>
                            <Controller
                                control={control}
                                name="accountCustomerID"
                                render={({ field }) => (
                                    <CustomerDropdown
                                        customers={customerList}
                                        defaultValue={field.value}
                                        handleInputChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.accountCustomerID && <span className="text-red-500">{errors.accountCustomerID.message}</span>}
                        </div>
                    </>
                );
            case 1:
                return (
                    <div className="flex flex-row gap-32 my-3">
                        <div className="mb-4">
                            <label htmlFor="rentStartDate" className="block text-sm font-medium text-gray-700 mb-2">
                                Ngày bắt đầu thuê
                            </label>
                            <Controller
                                control={control}
                                name="accountRentStartDate"
                                render={({ field }) => (
                                    <C_Datepicker
                                        selected={field.value}
                                        value={field.value}
                                        onChange={(date) => field.onChange(date)}
                                        disabled={action === "view"}
                                    />
                                )}
                            />
                            {errors.accountRentStartDate && <span className="text-red-500">{errors.accountRentStartDate.message}</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="rentEndDate" className="block text-sm font-medium text-gray-700 mb-2">
                                Ngày kết thúc thuê
                            </label>
                            <Controller
                                control={control}
                                name="accountRentEndDate"
                                render={({ field }) => (
                                    <C_Datepicker
                                        selected={field.value}
                                        value={field.value}
                                        onChange={(date) => field.onChange(date)}
                                        disabled={action === "view"}
                                    />
                                )}
                            />
                            {errors.accountRentEndDate && <span className="text-red-500">{errors.accountRentEndDate.message}</span>}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <>
                        <div className="mb-4">
                            <label htmlFor="accountStatus" className="block text-sm font-medium text-gray-700 mb-2">
                                Trạng thái tài khoản
                            </label>
                            <div className="relative">
                                <select
                                    id="accountStatus"
                                    name="accountStatus"
                                    className="block w-full rounded-md border-gray-300 border-2 py-2 pl-3 pr-8 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none bg-white"
                                    {...register('accountStatus')}
                                    defaultValue=""
                                >
                                    <option value="" disabled className="text-gray-500">
                                        Trạng thái tài khoản
                                    </option>
                                    <option value="active" className="hover:bg-gray-100">
                                        Đang hoạt động
                                    </option>
                                    <option value="rented" className="hover:bg-gray-100">
                                        Đang cho thuê
                                    </option>
                                    <option value="expired" className="hover:bg-gray-100">
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
                            {errors.accountStatus && <span className="text-red-500">{errors.accountStatus.message}</span>}
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {isOpen && (
                <>
                    <div className="fixed z-[200] inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                &#8203;
                            </span>
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full sm:p-6">
                                <div>
                                    <div className="mt-3 sm:flex">
                                        <div className="mt-2 text-center sm:ml-4 sm:text-left w-full">
                                            <h4 className="text-lg font-medium text-gray-800">
                                                {titleModal(action)}
                                            </h4>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                {renderTabs()}
                                                {renderTabContent()}
                                                <div className="items-center gap-2 mt-3 sm:flex">
                                                    <button
                                                        type="button"
                                                        className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                                        onClick={onClose}
                                                    >
                                                        Đóng
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                                                    >
                                                        Xác nhận
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default AddAccountSlotModal;

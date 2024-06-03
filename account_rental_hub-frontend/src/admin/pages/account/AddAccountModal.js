import React, { useEffect, useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AccountContext } from "../../context/AccountContext";
import 'react-datepicker/dist/react-datepicker.css';
import C_Datepicker from "../../components/partials/datepicker";
import Requiredicon from "../../components/partials/requiredicon";


const PackageSelect = ({ packages, value, onChange }) => (
    <div>
        <select
            id="accountPackageID"
            name="accountPackageID"
            className="block w-full rounded-md border-gray-300 border-2 py-2 pl-3 pr-8 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none bg-white"
            value={value?.id || ''}
            onChange={e => {
                const selectedPackage = packages.find(pack => pack.id === parseInt(e.target.value, 10));
                onChange(selectedPackage);
            }}
        >
            <option value="">--Chọn một gói tài khoản--</option>
            {packages.map(pack => (
                <option key={pack.id} value={pack.id}>
                    {pack.name}
                </option>
            ))}
        </select>
    </div>
);


function AddAccountModal({ isOpen, onClose, action, initialData, packageData }) {
    const { createData, updateData } = useContext(AccountContext);
    const [loading, setLoading] = useState(false);

    const validationSchema = yup.object().shape({
        accountUserName: yup.string().required('Tên tài khoản đăng nhập là bắt buộc'),
        accountEmail: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
        accountPassword: yup.string().required('Mật khẩu là bắt buộc'),
        accountStatus: yup.string().required('Trạng thái tài khoản là bắt buộc'),
        accountPackageID: yup.object()
            .required('Gói tài khoản là bắt buộc'),
        accountRenewStartDate: yup
            .date()
            .typeError('Ngày bắt gia hạn phải là một ngày hợp lệ')
            .required('Ngày bắt đầu gia hạn là bắt buộc'),
        accountRenewEndDate: yup
            .date()
            .typeError('Ngày kết thúc gia hạn phải là một ngày hợp lệ')
            .required('Ngày kết thúc gia hạn là bắt buộc'),
            accountAmountUser: yup.number().positive('Loại tài khoảng không hợp lệ').required('Loại tài khoản là bắt buộc')
    });

    const initFormData = (data) => {
        if (action === "add") {
            return {
                accountID: 0,
                accountUserName: '',
                accountEmail: '',
                accountPassword: '',
                accountStatus: '',
                accountPackageID: 0,
                accountSupcriptionDate: '',
                accountRenewStartDate: '',
                accountRenewEndDate: '',
                accountServiceWebsite: '',
                accountAmountUser: 0
            };
        }

        let initData;
        if (Array.isArray(data) && data.length > 0) {
            initData = data[0];
        } else {
            initData = data;
        }
        return {
            accountID: initData.id || 0,
            accountUserName: initData.username || '',
            accountEmail: initData.email || '',
            accountPassword: initData.password || '',
            accountStatus: initData.status || '',
            accountPackageID: initData.accountRentalPackage || null,
            accountRenewStartDate: initData.renewStartDate ? new Date(initData.renewStartDate) : '',
            accountRenewEndDate: initData.renewEndDate ? new Date(initData.renewEndDate) : '',
            accountServiceWebsite: initData.accountRentalPackage?.accountRentalServices.website || '',
            accountAmountUser: initData.amountUsers || 0
        };
    };

    const { register, handleSubmit, formState: { errors }, reset, control, watch, setValue } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initFormData(initialData || {}),
    });

    useEffect(() => {
        if (action === "add") {
            reset(initFormData({}));
        } else if (initialData) {
            const initialFormData = initFormData(initialData);
            reset(initialFormData);
        }
    }, [initialData, reset, action]);

    const accountRenewStartDate = watch('accountRenewStartDate');
    const accountPackageID = watch('accountPackageID');
    const accountServiceWebsite = watch('accountServiceWebsite');

    useEffect(() => {
        if (accountRenewStartDate && accountPackageID?.duration) {
            const endDate = new Date(accountRenewStartDate);
            endDate.setDate(endDate.getDate() + accountPackageID.duration);
            setValue('accountRenewEndDate', endDate);
        }
    }, [accountRenewStartDate, accountPackageID, setValue]);

    const onSubmit = async (data) => {
        setLoading(true);
        const accountData = {
            username: data.accountUserName,
            email: data.accountEmail,
            password: data.accountPassword,
            status: data.accountStatus,
            renewStartDate: data.accountRenewStartDate ? data.accountRenewStartDate.toISOString() : null,
            renewEndDate: data.accountRenewEndDate ? data.accountRenewEndDate.toISOString() : null,
            amountUsers: data.accountAmountUser,
            accountRentalPackage: {
                id: data.accountPackageID.id,
            }
        };

        try {
            if (action === "add") {
                await createData(accountData);
            } else if (action === "edit" && data.accountID !== 0) {
                await updateData(data.accountID, accountData);
            }
            onClose();
        } finally {
            setLoading(false);
        }
    };

    const titleModal = (action) => {
        if (action === "add") return "Thêm tài khoản";
        else if (action === "edit") return "Chỉnh sửa tài khoản";
        else if (action === "view") return "Xem chi tiết tài khoản";
    };

    return isOpen ? (
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
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-4">
                                        <label htmlFor="accountUserName" className="block text-sm font-medium text-gray-700">
                                            Tên tài khoản đăng nhập<Requiredicon />
                                        </label>
                                        <input
                                            type="text"
                                            id="accountUserName"
                                            {...register("accountUserName")}
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            disabled={action === "view"}
                                        />
                                        {errors.accountUserName && <span className="text-red-500">{errors.accountUserName.message}</span>}
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="accountEmail" className="block text-sm font-medium text-gray-700">
                                            Email<Requiredicon />
                                        </label>
                                        <input
                                            type="text"
                                            id="accountEmail"
                                            {...register("accountEmail")}
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            disabled={action === "view"}
                                        />
                                        {errors.accountEmail && <span className="text-red-500">{errors.accountEmail.message}</span>}
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="accountPassword" className="block text-sm font-medium text-gray-700">
                                            Mật khẩu<Requiredicon />
                                        </label>
                                        <input
                                            type="password"
                                            id="accountPassword"
                                            {...register("accountPassword")}
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            disabled={action === "view"}
                                        />
                                        {errors.accountPassword && <span className="text-red-500">{errors.accountPassword.message}</span>}
                                    </div>
                                    <div className="mb-4">
                                                <label htmlFor="accountStatus" className="block text-sm font-medium text-gray-700">
                                                    Loại tài khoản<Requiredicon />
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        id="accountAmountUser"
                                                        {...register("accountAmountUser")}
                                                        className="block w-full rounded-md border-gray-300 border-2 py-2 pl-3 pr-8 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none bg-white"
                                                        defaultValue=""
                                                        disabled={action === "view"}
                                                    >
                                                        <option value="0" className="text-gray-500">Loại tài khoản</option>
                                                        <option value="1" >Dùng riêng</option>
                                                        <option value="4" >Dùng chung</option>
                                                    </select>
                                                    {errors.accountAmountUser && <span className="text-red-500">{errors.accountAmountUser.message}</span>}
                                                </div>
                                            </div>
                                    <div className="mb-4">
                                        <label htmlFor="accountRenewStartDate" className="block text-sm font-medium text-gray-700">
                                            Ngày bắt đầu gia hạn <Requiredicon />
                                        </label>
                                        <Controller
                                            control={control}
                                            name="accountRenewStartDate"
                                            render={({ field }) => (
                                                <C_Datepicker
                                                    selected={field.value}
                                                    value={field.value}
                                                    onChange={(date) => field.onChange(date)}
                                                    disabled={action === "view"}
                                                />
                                            )}
                                        />
                                        {errors.accountRenewStartDate && <span className="text-red-500">{errors.accountRenewStartDate.message}</span>}
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="accountRenewEndDate" className="block text-sm font-medium text-gray-700">
                                            Ngày kết thúc gia hạn <Requiredicon />
                                        </label>
                                        <Controller
                                            control={control}
                                            name="accountRenewEndDate"
                                            render={({ field }) => (
                                                <C_Datepicker
                                                    selected={field.value}
                                                    value={field.value}
                                                    onChange={(date) => field.onChange(date)}
                                                    disabled={action === "view" || !accountRenewStartDate || !accountPackageID}
                                                />
                                            )}
                                        />
                                        {errors.accountRenewEndDate && <span className="text-red-500">{errors.accountRenewEndDate.message}</span>}
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="accountStatus" className="block text-sm font-medium text-gray-700">
                                            Trạng thái tài khoản <Requiredicon />
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="accountStatus"
                                                {...register("accountStatus")}
                                                className="block w-full rounded-md border-gray-300 border-2 py-2 pl-3 pr-8 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none bg-white"
                                                defaultValue=""
                                                disabled={action === "view"}
                                            >
                                                <option value="" className="text-gray-500">Trạng thái tài khoản</option>
                                                <option value="ACTIVE"> Có sẵn</option>
                                                {/* <option value="RENTED"> Đang cho thuê</option> */}
                                                <option value="LOCK">Tài khoản bị tạm khóa</option>
                                                {/* <option value="EXPIRED" >Tài khoản đã hết hạn</option> */}
                                            </select>
                                            {errors.accountStatus && <span className="text-red-500">{errors.accountStatus.message}</span>}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="accountPackageID" className="block text-sm font-medium text-gray-700">
                                            Gói tài khoản<Requiredicon />
                                        </label>
                                        <Controller
                                            control={control}
                                            name="accountPackageID"
                                            render={({ field }) => (
                                                <PackageSelect
                                                    packages={packageData}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            )}
                                        />
                                        {errors.accountPackageID && <span className="text-red-500">{errors.accountPackageID.message}</span>}
                                    </div>

                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        {action !== "view" && (
                                            <button
                                                type="submit"
                                                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${loading ? 'bg-blue-400' : 'bg-blue-600'
                                                    } text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm`}
                                                disabled={loading}
                                            >
                                                {loading ? 'Đang lưu...' : 'Lưu'}
                                            </button>
                                        )}
                                        {action === "edit" && accountServiceWebsite && (
                                            <a
                                                href={accountServiceWebsite}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#FD9A56] text-base font-medium text-white hover:bg-[#f1be9d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            >
                                                Gia hạn tài khoản
                                            </a>
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
    ) : null;
}

export default AddAccountModal;

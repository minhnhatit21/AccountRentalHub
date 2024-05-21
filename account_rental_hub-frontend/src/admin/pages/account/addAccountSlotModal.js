import { useEffect, useContext, useState } from "react";
import C_Datepicker from "../../components/partials/datepicker";
import { AccountSlotContext } from "../../context/AccountSlotContext";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const CustomerDropdown = ({ customers, value, onChange, disabled }) => {
    return (
        <>
            {customers ? (
                <div>
                    <select
                        id="accountCustomerID"
                        name="accountCustomerID"
                        className="block w-full rounded-md border-gray-300 border-2 py-2 pl-3 pr-8 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none bg-white"
                        value={value || ''}
                        onChange={onChange}
                        disabled={disabled}
                    >
                        <option value={0}>--Chọn một người thuê--</option>
                        {customers.map(customer => (
                            <option key={customer.id} value={customer.id}>
                                {customer.user.username}
                            </option>
                        ))}
                    </select>
                </div>
            ) : null}
        </>
    );
};

const PackageDropdown = ({ packages, value, onChange, disabled }) => {
    return (
        <div>
            <select
                id="accountPackageID"
                name="accountPackageID"
                className="block w-full rounded-md border-gray-300 border-2 py-2 pl-3 pr-8 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none bg-white"
                value={value?.id || 0}
                onChange={(e) => {
                    const selectedPackage = packages.find(pack => pack.id === parseInt(e.target.value, 10));
                    onChange(selectedPackage);
                }}
                disabled={disabled}
            >
                <option value={0}>--Chọn một gói tài khoản--</option>
                {packages.map(pack => (
                    <option key={pack.id} value={pack.id}>
                        {pack.name}
                    </option>
                ))}
            </select>
        </div>
    );
}


const AccountRentalDropdown = ({ accounts, value, onChange, disabled, accountPackageID }) => {
    const [filteredAccounts, setFilteredAccounts] = useState([]);

    useEffect(() => {
        if (accounts && accountPackageID) {
            const accountPackageIDInt = parseInt(accountPackageID, 10);
            const filtered = accounts.filter(account => {
                return account.status === 'active' && account.accountRentalPackage.id === accountPackageIDInt;
            });
            console.log("filtered accounts:", filtered);
            setFilteredAccounts(filtered);
        } else {
            setFilteredAccounts([]);
        }
    }, [accounts, accountPackageID]);

    return (
        <div>
            <select
                id="accountRentalID"
                name="accountRentalID"
                className="block w-full rounded-md border-gray-300 border-2 py-2 pl-3 pr-8 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none bg-white"
                value={value || ''}
                onChange={onChange}
                disabled={disabled}
            >
                <option value="" disabled>--Chọn một tài khoản--</option>
                {filteredAccounts.map((account) => (
                    <option key={account.id} value={account.id}>
                        {account.email}
                    </option>
                ))}
            </select>
        </div>
    );
};




function AddAccountSlotModal({ isOpen, onClose, action, initialData }) {
    const { customerList, accountList, packageList, createData, updateData } = useContext(AccountSlotContext);

    const validationSchema = yup.object().shape({
        accountStatus: yup.string().required('Trạng thái tài khoản là bắt buộc'),
        accountCustomerID: yup.string().required('Người thuê là bắt buộc'),
        accountRentalID: yup.string().required('Tài khoản cho thuê là bắt buộc'),
        accountPackageID: yup.object().required('Gói tài khoản là bắt buộc'),
        accountRentStartDate: yup.date().required('Ngày bắt đầu gia hạn là bắt buộc'),
        accountRentEndDate: yup.date().required('Ngày kết thúc gia hạn là bắt buộc'),
    });

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
            accountCustomerID: initData?.customer?.id || 0,
            accountPackageID: initData?.rentalAccount?.accountRentalPackage || null,
            accountRentalID: initData?.rentalAccount?.id || 0,
            accountStatus: initData.status || '',
            accountRentStartDate: initData.startDate ? new Date(initData.startDate) : '',
            accountRentEndDate: initData.endDate ? new Date(initData.endDate) : '',
        };
    };

    const { register, handleSubmit, formState: { errors }, reset, control, watch, setValue } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initFormData(initialData || {}),
    });

    const accountRentStartDate = watch('accountRentStartDate');
    const accountPackageID = watch('accountPackageID');


    useEffect(() => {
        if (accountRentStartDate && accountPackageID?.duration) {
            const endDate = new Date(accountRentStartDate);
            endDate.setDate(endDate.getDate() + accountPackageID.duration);
            setValue('accountRentEndDate', endDate);
        }
    }, [accountRentStartDate, accountPackageID, setValue]);

    useEffect(() => {
        if (initialData) {
            const initialFormData = initFormData(initialData);
            reset(initialFormData);
        }
    }, [initialData, reset]);

    const onSubmit = async (data) => {
        
        const accountslotData = {
            startDate: data.accountRentStartDate ? data.accountRentStartDate.toISOString() : null,
            endDate: data.accountRentEndDate ? data.accountRentEndDate.toISOString() : null,
            customer: {
                id: data.accountCustomerID
            },
            rentalAccount: {
                id: data.accountRentalID,
            },
            status: data.accountStatus

        };

        console.log("Account Slot Data: ", accountslotData)

        if (accountslotData !== null || accountslotData !== undefined) {
            if (action === "add") {
                await createData(accountslotData);
            } else if (action === "edit" && data.accountSlotID !== 0) {
                await updateData(data.accountSlotID, accountslotData);
            }
        }
        
        onClose();
    };

    const titleModal = (action) => {
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
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">{titleModal(action)}</h3>
                                    <div className="mt-2">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="flex flex-col gap-4 mb-28">
                                                <div className="mb-4">
                                                    <label htmlFor="accountRent" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Gói tài khoản
                                                    </label>
                                                    <Controller
                                                        control={control}
                                                        name="accountPackageID"
                                                        render={({ field }) => (
                                                            <PackageDropdown
                                                                packages={packageList}
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                                disabled={action === "view"}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="accountRent" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Tài khoản cho thuê
                                                    </label>
                                                    <Controller
                                                        control={control}
                                                        name="accountRentalID"
                                                        render={({ field }) => (
                                                            <AccountRentalDropdown
                                                                accounts={accountList}
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                                disabled={action === "view"}
                                                                accountPackageID={watch("accountPackageID")?.id || null}
                                                            />
                                                        )}
                                                    />
                                                </div>
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
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                                disabled={action === "view"}
                                                            />
                                                        )}
                                                    />
                                                    {errors.accountCustomerID && <span className="text-red-500">{errors.accountCustomerID.message}</span>}
                                                </div>

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
                                                                    disabled={action === "view" || action === "edit"}
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
                                                                    disabled
                                                                />
                                                            )}
                                                        />
                                                        {errors.accountRentEndDate && <span className="text-red-500">{errors.accountRentEndDate.message}</span>}
                                                    </div>
                                                </div>

                                                <div className="mb-4">
                                                    <label htmlFor="accountStatus" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Trạng thái tài khoản
                                                    </label>
                                                    <select
                                                        id="accountStatus"
                                                        name="accountStatus"
                                                        className="block w-full rounded-md border-gray-300 border-2 py-2 pl-3 pr-8 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none bg-white"
                                                        {...register('accountStatus')}
                                                        disabled={action === "view"}
                                                    >
                                                        <option value="">--Chọn trạng thái tài khoản--</option>
                                                        <option value="Active">Đang thuê</option>
                                                        <option value="Error">Tài khoản có lỗi</option>
                                                        <option value="Expired">Hết hạn</option>
                                                    </select>
                                                    {errors.accountStatus && <span className="text-red-500">{errors.accountStatus.message}</span>}
                                                </div>
                                            </div>
                                            <div className="sm:flex sm:flex-row-reverse mt-5">
                                                <button
                                                    type="submit"
                                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                >
                                                    Lưu
                                                </button>
                                                <button
                                                    type="button"
                                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                    onClick={onClose}
                                                >
                                                    Hủy
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
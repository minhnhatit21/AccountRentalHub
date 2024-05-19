import { useEffect, useState } from "react";

function DeleteAccountSlotModal({ isOpen, onClose, accountDataToDelete, onDeleteAccount }) {
    const [isDeleting, setIsDeleting] = useState(false);
    
    const deleteData = (data) => {
        let initData;
        if (Array.isArray(data) && data.length > 0) {
            initData = data[0];
        } else {
            initData = data;
        }
        return {
            accountEmail:  Object.keys(initData).length > 0 ? initData.rentalAccount?.email : '',
        };
    };
    const [formData, setFormData] = useState(deleteData(accountDataToDelete || {}));
    
    const handleDelete = () => {
        setIsDeleting(true);
        onDeleteAccount(accountDataToDelete.id);
    };

    useEffect(() => {
        if (accountDataToDelete) {
            setFormData(deleteData(accountDataToDelete));
        }
    }, [accountDataToDelete]);

    return (
        <>
            {isOpen ? (
                <div className="fixed z-[200] inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Xóa tài khoản slot tài khoản "{formData.accountEmail}"
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Bạn có chắc chắn muốn xóa slot của tài khoản "{formData.accountEmail}"? Hành động này sẽ không thể hoàn tác.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    onClick={handleDelete}

                                >
                                    Xóa
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={onClose}
                                >
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default DeleteAccountSlotModal;
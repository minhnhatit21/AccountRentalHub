import { NavLink } from "react-router-dom";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function UserSidebar() {


    return (
        <div className="bg-white py-4 px-2 rounded-lg">
            <div className="mb-4">
                <NavLink
                    to="/user/profile"
                    className={({ isActive }) =>
                        classNames(
                            isActive
                                ? 'bg-[#474193] text-white group flex items-center px-2 py-2 gap-2 text-md font-medium rounded-md'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 group flex items-center px-2 py-2 gap-2 text-md font-medium rounded-md'
                        )
                    }
                >
                    <h2 className="font-semibold">Tài khoản</h2>
                </NavLink>
            </div>
            <div className="mb-4">
                <NavLink
                    to="/user/orders"
                    className={({ isActive }) =>
                        classNames(
                            isActive
                                ? 'bg-[#474193] text-white group flex items-center px-2 py-2 gap-2 text-md font-medium rounded-md'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 group flex items-center px-2 py-2 gap-2 text-md font-medium rounded-md'
                        )
                    }
                >
                    <h2 className="font-semibold">Lịch sử đơn hàng</h2>
                </NavLink>
            </div>

            <div className="mb-4">
                <NavLink
                    to="/user/transactions"
                    className={({ isActive }) =>
                        classNames(
                            isActive
                                ? 'bg-[#474193] text-white group flex items-center px-2 py-2 gap-2 text-md font-medium rounded-md'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 group flex items-center px-2 py-2 gap-2 text-md font-medium rounded-md'
                        )
                    }
                >
                    <h2 className="font-semibold">Lịch sử giao dịch</h2>
                </NavLink>
            </div>

            {/* <div className="mb-4">
                <NavLink
                    to="/user/wishlist"
                    className={({ isActive }) =>
                        classNames(
                            isActive
                                ? 'bg-[#474193] text-white group flex items-center px-2 py-2 gap-2 text-md font-medium rounded-md'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 group flex items-center px-2 py-2 gap-2 text-md font-medium rounded-md'
                        )
                    }
                >
                    <h2 className="font-semibold">Sản phẩm yêu thích</h2>
                </NavLink>
            </div> */}
        </div>
    );
}
import { Fragment, useContext } from 'react'
import { Menu, Transition } from '@headlessui/react'
import AvatarProfile from '../sections/avatar_profile';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function UserProfileDropdown({ imageSrc, username }) {

    const { logout } = useContext(AuthContext)
    const handleLogout = (e) => {
        e.preventDefault();
        logout();
    }

    return (
        <Menu as="div" className="relative inline-block">
            <div>
                <Menu.Button>
                    <AvatarProfile imageSrc={imageSrc}
                        username={username}
                    />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-[#2C2C33] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to={"/user/profile"}
                                    className={classNames(
                                        active ? 'bg-[#13112e] text-slate-50' : 'text-white',
                                        'flex items-center px-4 py-2 text-md font-semibold cursor-pointer'
                                    )}>
                                    Quản lý tài khoản
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to={"/user/orders"}
                                    className={classNames(
                                        active ? 'bg-[#13112e] text-slate-50' : 'text-white',
                                        'flex items-center px-4 py-2 text-md font-semibold cursor-pointer'
                                    )}>
                                    Lịch sử đơn hàng
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to={"/user/wishlist"}
                                    className={classNames(
                                        active ? 'bg-[#13112e] text-slate-50' : 'text-white',
                                        'flex items-center px-4 py-2 text-md font-semibold cursor-pointer'
                                    )}>
                                    Sản phẩm yêu thích
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    className={classNames(
                                        active ? 'bg-[#13112e] text-slate-50' : 'text-white fon',
                                        'flex items-center px-4 py-2 text-md font-semibold cursor-pointer'
                                    )}
                                    onClick={handleLogout}
                                >
                                    Đăng xuất
                                </div>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default UserProfileDropdown;
import { Fragment } from 'react'
import { FaBars, FaGraduationCap, FaPencilAlt, FaBriefcase, FaFilm, FaHeadphones } from 'react-icons/fa'
import { Menu, Transition } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function CategoryDropdown() {
    return (
        <Menu as="div" className="relative inline-block">
            <div>
                <Menu.Button className="hidden lg:w-56 lg:flex items-center px-4 py-2 rounded-md bg-[#2C2C33] text-white hover:bg-[#424069]">
                    <FaBars className="mr-2 flex-1" /> <strong>Danh mục sản phẩm</strong>
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
                                    <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-[#13112e] text-slate-50' : 'text-white',
                                            'flex items-center px-4 py-2 text-md'
                                        )}
                                    >
                                       <FaGraduationCap className='w-4 h-4 mr-4'/> Học tập
                                    </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    className={classNames(
                                        active ? 'bg-[#13112e] text-slate-50' : 'text-white',
                                        'flex items-center px-4 py-2 text-md'
                                    )}
                                >
                                    <FaBriefcase className='w-4 h-4 mr-4'/> Làm việc
                                </div>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    className={classNames(
                                        active ? 'bg-[#13112e] text-slate-50' : 'text-white',
                                        'flex items-center px-4 py-2 text-md'
                                    )}
                                >
                                    <FaFilm className='w-4 h-4 mr-4'/> Xem phim
                                </div>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    className={classNames(
                                        active ? 'bg-[#13112e] text-slate-50' : 'text-white fon',
                                        'flex items-center px-4 py-2 text-md'
                                    )}
                                >
                                    <FaHeadphones className='w-4 h-4 mr-4'/> Nghe nhạc
                                </div>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default CategoryDropdown;
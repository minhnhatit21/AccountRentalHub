import { Fragment } from 'react'
import { FaBars, FaGraduationCap, FaPencilAlt, FaBriefcase, FaFilm, FaHeadphones } from 'react-icons/fa'
import { Menu, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function CategoryDropdown() {
    return (
        <Menu as="div" className="relative inline-block">
            <div>
                <Menu.Button className="lg:w-56 flex items-center px-4 py-2 rounded-md bg-[#DEC01F] text-white hover:bg-[#9E8F3E]">
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
                                <Link to="/search?tag=study" className={classNames(
                                    active ? 'bg-[#13112e] text-slate-50' : 'text-white',
                                    'flex items-center px-4 py-2 text-md font-semibold cursor-pointer'
                                )}>
                                    <FaGraduationCap className='w-4 h-4 mr-4' /> Học tập
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link to="/search?tag=work" className={classNames(
                                    active ? 'bg-[#13112e] text-slate-50' : 'text-white',
                                    'flex items-center px-4 py-2 text-md font-semibold cursor-pointer'
                                )}>
                                    <FaBriefcase className='w-4 h-4 mr-4' /> Làm việc
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link to="/search?tag=movie" className={classNames(
                                    active ? 'bg-[#13112e] text-slate-50' : 'text-white',
                                    'flex items-center px-4 py-2 text-md font-semibold cursor-pointer'
                                )}>
                                    <FaFilm className='w-4 h-4 mr-4' /> Xem phim
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link to="/search?tag=music" className={classNames(
                                    active ? 'bg-[#13112e] text-slate-50' : 'text-white fon',
                                    'flex items-center px-4 py-2 text-md font-semibold cursor-pointer'
                                )}>

                                    <FaHeadphones className='w-4 h-4 mr-4' /> Nghe nhạc
                                </Link>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default CategoryDropdown;
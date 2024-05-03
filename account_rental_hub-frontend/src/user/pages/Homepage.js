import React, { useState } from 'react';
import { FaGamepad, FaPencilAlt, FaGraduationCap, FaGoogleDrive, FaItunes, FaVirus, FaSteamSymbol, FaWindows, FaSteamSquare, FaShoppingCart, FaUserPlus, FaUser, FaBars } from 'react-icons/fa';

import { HiOutlineMenu, HiOutlineUser } from 'react-icons/hi';
import CategoryDropdown from '../components/dropdowns/category_dropdown';

function HomePage() {

    const [showMenu, setShowMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to handle successful login
    const handleLogin = () => {
        // Logic to handle successful login
        setIsLoggedIn(true);
    };

    return (
        <>
            <div className="bg-gray-100 min-h-screen">
                {/* Header */}
                <header className="bg-[#13112e] shadow-md py-8 px-4 lg:px-32">
                    <div className="container mx-auto flex items-center justify-between">
                        <div className="lg:hidden">
                            <FaBars className="text-2xl text-gray-800 cursor-pointer" />
                        </div>
                        <div className="hidden lg:block text-lg text-white font-bold">AccountRentalHUB</div>
                        <div className="relative flex-1 px-10">
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Tìm kiếm sản phẩm...."
                            />
                            <button className="absolute inset-y-0 right-0 px-4 bg-[#0550EB] text-white rounded-r-md hover:bg-[#3405EB] flex items-center">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex items-center space-x-4 lg:ml-4">
                            {!isLoggedIn && (
                                <>
                                    {/* <a href="#" className="hidden lg:flex items-center px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300">
                                        <HiOutlineUser className="mr-2" /> Đăng nhập
                                    </a>
                                    <a href="#" className="hidden lg:flex items-center px-4 py-2 bg-[#0550EB] text-white rounded hover:bg-[#3405EB]">
                                        <FaUserPlus className="mr-2" /> Đăng ký
                                    </a> */}
                                    <div className='hidden lg:flex items-center justify-center px-4 py-2 rounded-md border-dashed border-2 border-white text-white'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                                        </svg>

                                        <div className='ml-2 text-white'>
                                            <a href="#" > <strong>Đăng nhập</strong> </a>
                                            /
                                            <a href="#"> <strong>Đăng ký</strong> </a>
                                        </div>
                                    </div>
                                </>
                            )}
                            <a href="#" className="flex items-center px-4 py-2 rounded-md bg-[#474193] text-white hover:bg-[#424069]">
                                <FaShoppingCart className="mr-2" /> <strong>Giỏ hàng</strong>
                            </a>
                        </div>
                    </div>
                </header>
                <header className='bg-slate-50 shadow-md py-4 px-4 lg:px-32' >
                    {/* <div className='relative'>
                        <a href="#" className="hidden lg:w-56 lg:flex items-center px-4 py-2 rounded-md bg-[#2C2C33] text-white hover:bg-[#424069]">
                            <FaBars className="mr-2 flex-1" /> <strong>Danh mục sản phẩm</strong>
                        </a>
                        <ul className="absolute left-0 mt-2 bg-white shadow-md rounded-md hidden group-hover:block">
                            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Netflix</a></li>
                            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Hulu</a></li>
                            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">HBO Max</a></li>
                        </ul>
                    </div> */}
                    <CategoryDropdown/>
                </header>

                {/* Hero Section */}
                <section className="container mx-auto px-32 py-16">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl font-bold mb-4">Truy cập không giới hạn vào các dịch vụ trực tuyến</h1>
                        <p className="text-gray-600 mb-8">Thuê tài khoản cho Netflix, Hulu, Apple TV+, HBO Max, và nhiều dịch vụ khác với giá cả phải chăng.</p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Đăng ký ngay
                        </button>
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-white py-16 px-32">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-8">Tính năng nổi bật</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-gray-100 p-8 rounded-lg mb-4">
                                    {/* Feature Icon */}
                                </div>
                                <h3 className="text-xl font-bold mb-2">Truy cập không giới hạn</h3>
                                <p className="text-gray-600">Xem nội dung không giới hạn trên nhiều dịch vụ trực tuyến.</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-gray-100 p-8 rounded-lg mb-4">
                                    {/* Feature Icon */}
                                </div>
                                <h3 className="text-xl font-bold mb-2">Giá cả phải chăng</h3>
                                <p className="text-gray-600">Tiết kiệm đáng kể so với đăng ký riêng lẻ từng dịch vụ.</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-gray-100 p-8 rounded-lg mb-4">
                                    {/* Feature Icon */}
                                </div>
                                <h3 className="text-xl font-bold mb-2">Đăng nhập dễ dàng</h3>
                                <p className="text-gray-600">Chỉ cần một bước đơn giản để truy cập vào tài khoản của bạn.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="bg-gray-800 py-16 px-32">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">Bắt đầu ngay bây giờ</h2>
                        <p className="text-gray-300 mb-8">Đăng ký và trải nghiệm dịch vụ của chúng tôi.</p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Đăng ký
                        </button>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-800 py-8 text-center text-gray-300">
                    <div className="container mx-auto px-4">
                        &copy; 2023 StreamAccounts. All rights reserved.
                    </div>
                </footer>
            </div>
        </>
    );
}

export default HomePage;
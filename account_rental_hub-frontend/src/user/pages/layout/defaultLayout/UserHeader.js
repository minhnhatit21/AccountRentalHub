import { FaShoppingCart, FaBars } from 'react-icons/fa';
import CategoryDropdown from '../../../components/dropdowns/category_dropdown'
import { useContext, useEffect, useState } from 'react';
import { SignInModal, SignUpModal } from '../../../components/modals/login_register_modal';
import UserProfileDropdown from '../../../components/dropdowns/user_profile_dropdown';
import { AuthContext } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';

function UserHeader() {

    const { isLoggedIn, user } = useContext(AuthContext);

    const [showSiginModal, setShowSigninModal] = useState(false);
    const [showSigupModal, setShowSignupModal] = useState(false);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        if (user) {
            setUserProfile(user);
        } else {
            setUserProfile(null);
        }
    }, [user]);


    const handleLogin = () => {
        setShowSigninModal(true);
    }

    const handleRegister = () => {
        setShowSignupModal(true);
    }

    const handleCloseSigninModal = () => {
        setShowSigninModal(false);
    }

    const handleCloseSignupModal = () => {
        setShowSignupModal(false);
    }

    return (
        <>
            <header className="bg-[#13112e] text-white shadow-md py-6 px-4 lg:px-32">
                <div className="container mx-auto flex items-center justify-between">
                    <Link to="/home">
                        <div className="lg:hidden">
                            <FaBars className="text-2xl text-white cursor-pointer" />
                        </div>
                        <div className="hidden lg:flex text-lg text-white font-bold">
                            <img src="https://i.ibb.co/mzSYdh5/Vutrukey-Text.png" className='w-36'></img>
                        </div>
                    </Link>
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
                        {!isLoggedIn ? (
                            <>
                                <div className='hidden lg:flex items-center justify-center px-4 py-2 rounded-md border-dashed border-2 border-white text-white'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                                    </svg>

                                    <div className='ml-2 text-white'>
                                        <a onClick={handleLogin} className='hover:text-[#DEC01F] cursor-pointer'> <strong>Đăng nhập</strong> </a>
                                        /
                                        <a onClick={handleRegister} className='hover:text-[#DEC01F] cursor-pointer'> <strong>Đăng ký</strong> </a>
                                    </div>
                                    <SignInModal showModal={showSiginModal} onCloseModal={handleCloseSigninModal} />
                                    <SignUpModal showModal={showSigupModal} onCloseModal={handleCloseSignupModal} />
                                </div>
                            </>
                        ) : userProfile ? (
                            <UserProfileDropdown imageSrc={"https://via.placeholder.com/150"} username={userProfile.username} email={userProfile.email} />
                        ) : null}
                        <Link to="/user/cart">
                            <div className="flex items-center px-4 py-2 rounded-md bg-[#474193] text-white hover:bg-[#424069]">
                                <FaShoppingCart className="mr-2" /> <strong>Giỏ hàng</strong>
                            </div>
                        </Link>
                    </div>
                </div>
            </header>
            <header className='hidden lg:flex items-center bg-[#13112e] text-white shadow-md py-4 px-4 lg:px-32' >
                <CategoryDropdown />
                <ul className='flex items-center text-[#989AAF] font-semibold'>
                    <li>
                        <Link to="/search?service=netflix" className="flex items-center px-4 py-2 mx-2 cursor-pointer hover:text-[#DEC01F]">
                            <img src='https://i.ibb.co/nrF9Q6R/netflix-png.webp' className='w-6 h-6 mr-2'></img>
                            Netflix
                        </Link>
                    </li>
                    <li>
                        <Link to="/search?service=disneyplus" className="flex items-center px-4 py-2 mx-2 cursor-pointer hover:text-[#DEC01F]">
                            <img src='https://i.ibb.co/2NxFzRj/Disney-White-Logo-wine.png' className='w-6 h-6 mr-2'></img>
                            Disney Plus
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="/search?service=amazoneprime" className="flex items-center px-4 py-2 mx-2 cursor-pointer hover:text-[#DEC01F]">
                            <img src='https://i.ibb.co/2KgG7VW/Amazon-Prime-Logo-wine.png' className='w-6 h-6 mr-2'></img>
                            Amazon Prime
                        </Link>
                    </li> */}
                    <li>
                        <Link to="/search?service=youtubepremium" className="flex items-center px-4 py-2 mx-2 cursor-pointer hover:text-[#DEC01F]">
                            <img src='https://i.ibb.co/TvkZrVm/You-Tube-Icon-Full-Color-Logo-wine.png' className='w-6 h-6 mr-2'></img>
                            Youtube Premium
                        </Link>
                    </li>
                    <li>
                        <Link to="/search?service=spotify" className="flex items-center px-4 py-2 mx-2 cursor-pointer hover:text-[#DEC01F]">
                            <img src='https://i.ibb.co/1MMrKR3/Spotify-Icon-Logo-wine.png' className='w-6 h-6 mr-2'></img>
                            Spotify
                        </Link>
                    </li>
                    <li>
                        <Link to="/search?service=canva" className="flex items-center px-4 py-2 mx-2 cursor-pointer hover:text-[#DEC01F]">
                            <img src='https://i.ibb.co/pZLtPXB/Canva-icon-2021-svg-150x150-png.webp' className='w-6 h-6 mr-2'></img>
                            Canva
                        </Link>
                    </li>
                    <li>
                        <Link to="/search?service=duolingo" className="flex items-center px-4 py-2 mx-2 cursor-pointer hover:text-[#DEC01F]">
                            <img src='https://i.ibb.co/dsZgL5p/duolingo.png' className='w-6 h-6 mr-2'></img>
                            Duolingo
                        </Link>
                    </li>
                </ul>
            </header>
        </>
    );
}

export default UserHeader;
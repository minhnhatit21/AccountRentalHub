import { FaShoppingCart, FaBars } from 'react-icons/fa';
import CategoryDropdown from '../../../components/dropdowns/category_dropdown';
import { useContext, useEffect, useState } from 'react';
import { SignInModal, SignUpModal } from '../../../components/modals/login_register_modal';
import UserProfileDropdown from '../../../components/dropdowns/user_profile_dropdown';
import { AuthContext } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import SearchBar from '../../../components/sections/search_bar';
import CartService from '../../../../services/cart-service';

function UserHeader() {
    const { isLoggedIn, user } = useContext(AuthContext);
    const [showSiginModal, setShowSigninModal] = useState(false);
    const [showSigupModal, setShowSignupModal] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(() => {
        if (user) {
            setUserProfile(user);
            fetchCartItemsCount(user.id);
        } else {
            setUserProfile(null);
            fetchLocalCartItemsCount();
        }
    }, [user]);

    const fetchCartItemsCount = async (userId) => {
        try {
            const cartItems = await CartService.getCartItems(userId);
            setCartItemsCount(cartItems.length);
        } catch (error) {
            console.error('Failed to fetch cart items count', error);
        }
    };

    const fetchLocalCartItemsCount = () => {
        const localCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItemsCount(localCartItems.length);
    };

    const handleLogin = () => {
        setShowSigninModal(true);
    };

    const handleRegister = () => {
        setShowSignupModal(true);
    };

    const handleCloseSigninModal = () => {
        setShowSigninModal(false);
    };

    const handleCloseSignupModal = () => {
        setShowSignupModal(false);
    };

    return (
        <>
            <header className="bg-[#13112e] text-white shadow-md py-6 px-4 lg:px-32">
                <div className="container mx-auto flex items-center justify-between">
                    <Link to="/home">
                        <div className="lg:hidden">
                            <FaBars className="text-2xl text-white cursor-pointer" />
                        </div>
                        <div className="hidden lg:flex text-lg text-white font-bold">
                            <img src="https://i.ibb.co/mzSYdh5/Vutrukey-Text.png" alt='logo' className='w-36'></img>
                        </div>
                    </Link>
                    <SearchBar />
                    <div className="flex items-center space-x-4 lg:ml-4">
                        {!isLoggedIn ? (
                            <>
                                <div className='hidden lg:flex items-center justify-center px-4 py-2 rounded-md border-dashed border-2 border-white text-white'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                                    </svg>

                                    <div className='ml-2 text-white'>
                                        <button onClick={handleLogin} className='hover:text-[#DEC01F] cursor-pointer'> <strong>Đăng nhập</strong> </button>
                                        /
                                        <button onClick={handleRegister} className='hover:text-[#DEC01F] cursor-pointer'> <strong>Đăng ký</strong> </button>
                                    </div>
                                    <SignInModal showModal={showSiginModal} onCloseModal={handleCloseSigninModal} />
                                    <SignUpModal showModal={showSigupModal} onCloseModal={handleCloseSignupModal} />
                                </div>
                            </>
                        ) : userProfile ? (
                            <UserProfileDropdown imageSrc={"https://via.placeholder.com/150"} username={userProfile.username} email={userProfile.email} />
                        ) : null}
                        <Link to="/user/cart" className="relative">
                            <div className="flex items-center px-4 py-2 rounded-md bg-[#474193] text-white hover:bg-[#424069]">
                                <FaShoppingCart className="mr-2" />
                                <strong>Giỏ hàng</strong>
                                {cartItemsCount > 0 && (
                                    <span className="absolute top-[-8px] right-[-8px] inline-block w-6 h-6 bg-red-600 text-white text-sm leading-tight text-center rounded-full">
                                        {cartItemsCount}
                                    </span>
                                )}
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
                            <img src='https://i.ibb.co/nrF9Q6R/netflix-png.webp' alt='netflix' className='w-6 h-6 mr-2'></img>
                            Netflix
                        </Link>
                    </li>
                    <li>
                        <Link to="/search?service=disney plus" className="flex items-center px-4 py-2 mx-2 cursor-pointer hover:text-[#DEC01F]">
                            <img src='https://i.ibb.co/2NxFzRj/Disney-White-Logo-wine.png' alt='Disney Plus' className='w-6 h-6 mr-2'></img>
                            Disney Plus
                        </Link>
                    </li>
                    <li>
                        <Link to="/search?service=youtube premium" className="flex items-center px-4 py-2 mx-2 cursor-pointer hover:text-[#DEC01F]">
                            <img src='https://i.ibb.co/TvkZrVm/You-Tube-Icon-Full-Color-Logo-wine.png' alt='Youtube Premium' className='w-6 h-6 mr-2'></img>
                            Youtube Premium
                        </Link>
                    </li>
                    <li>
                        <Link to="/search?service=spotify" className="flex items-center px-4 py-2 mx-2 cursor-pointer hover:text-[#DEC01F]">
                            <img src='https://i.ibb.co/1MMrKR3/Spotify-Icon-Logo-wine.png' alt='Spotify' className='w-6 h-6 mr-2'></img>
                            Spotify
                        </Link>
                    </li>
                    <li>
                        <Link to="/search?service=canva" className="flex items-center px-4 py-2 mx-2 cursor-pointer hover:text-[#DEC01F]">
                            <img src='https://i.ibb.co/pZLtPXB/Canva-icon-2021-svg-150x150-png.webp' alt='Canva' className='w-6 h-6 mr-2'></img>
                            Canva
                        </Link>
                    </li>
                    <li>
                        <Link to="/search?service=duolingo" className="flex items-center px-4 py-2 mx-2 cursor-pointer hover:text-[#DEC01F]">
                            <img src='https://i.ibb.co/dsZgL5p/duolingo.png' alt='Duolingo' className='w-6 h-6 mr-2'></img>
                            Duolingo
                        </Link>
                    </li>
                </ul>
            </header>
        </>
    );
}

export default UserHeader;

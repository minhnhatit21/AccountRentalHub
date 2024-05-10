import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { SignInModal } from '../components/modals/login_register_modal';
import CustomerService from '../../services/customer.service';

const UserProfile = () => {

    
    const [userProfile, setUserProfile] = useState({});

    const { isLoggedIn, user } = useContext(AuthContext)
    
    const [showSiginModal, setShowSigninModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user) {
                    const currentUser = await CustomerService.getCustomerByUserId(user.id);
                    setUserProfile(currentUser.data);
                } else {
                    setUserProfile(null);
                }
            } catch (error) {
                console.error("Error while fetching customer data:", error);
                setUserProfile(null);
            }
        };
    
        fetchData();
    }, [user])

    console.log("Current User: ", userProfile);
    
    const handleLogin = () => {
        setShowSigninModal(true);
    }

    const handleCloseSigninModal = () => {
        setShowSigninModal(false);
    }

    return (
        <>
            {isLoggedIn ? (
                <div className="flex-1 ml-10">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Tổng quan</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Tên đăng nhập</h3>
                                <p className="text-gray-600">{user ? user.username : "Chưa có tên đăng nhập"}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Email</h3>
                                <p className="text-gray-600">{user ? user.email : "Chưa có email"}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Họ và tên</h3>
                                <p className="text-gray-600">{userProfile ? userProfile.fullname : "Chưa có họ và tên"}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Địa chỉ</h3>
                                <p className="text-gray-600">{userProfile ? userProfile.address : "Chưa có Địa chỉ"}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Ngày tham gia</h3>
                                <p className="text-gray-600">{userProfile ? userProfile.createdAt : "Chưa có ngày tham gia"}</p>
                            </div>
                        </div>
                        <div className="mt-8 flex items-center">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Avatar"
                                className="w-20 h-20 rounded-full mr-4"
                            />
                            <div>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Sửa ảnh đại diện
                                </button>
                                <p className="text-gray-600 mt-2">Vui lòng chọn ảnh nhỏ hơn 5MB</p>
                                <p className="text-gray-600">Chọn hình ảnh phù hợp, không phản cảm</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) :

                (
                    <div className='flex-1 ml-10 bg-white rounded-lg shadow-lg p-6'>
                        <button onClick={handleLogin} className='bg-[#474193] px-4 py-2 rounded-lg'>
                            <h2 className="text-white font-semibold">Đăng nhập để xem thông tin</h2>
                        </button>
                        <SignInModal showModal={showSiginModal} onCloseModal={handleCloseSigninModal} />
                    </div>
                )
            }
        </>

    );
};

export default UserProfile;
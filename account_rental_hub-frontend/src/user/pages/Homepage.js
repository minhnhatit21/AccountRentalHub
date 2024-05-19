import React, { useContext } from 'react';
import ProductsSection from '../components/sections/produc_section';
import PromotionSection from '../components/sections/promotion_section';
import { UserGroupIcon, CreditCardIcon, LockClosedIcon } from "@heroicons/react/20/solid";
import { AuthContext } from '../context/AuthContext';


function HomePage() {

    const { isLoggedIn } = useContext(AuthContext);
    const products = [
        {
            image: 'https://i.ibb.co/K2ZFMsz/Netflix-1.png',
            title: 'Netflix Premium 1 tháng',
            originalPrice: '260.000đ',
            discountedPrice: '99.000đ',
            discount: 62,
        },
        {
            image: 'https://i.ibb.co/v4YZVb0/Divine-Shop-Goi-Gia-Han-Spotify-1-Nam-40567.jpg',
            title: 'Gói gia hạn Spotify Premium 1 năm',
            originalPrice: '590.000đ',
            discountedPrice: '299.000đ',
            discount: 49,
        },
        {
            image: 'https://i.ibb.co/JnFfgZW/HULU.png',
            title: 'Hulu Premium 1 năm',
            originalPrice: '1.180.000đ',
            discountedPrice: '599.000đ',
            discount: 51,
        },
        {
            image: 'https://i.ibb.co/v4YZVb0/Divine-Shop-Goi-Gia-Han-Spotify-1-Nam-40567.jpg',
            title: 'Gói gia hạn Spotify Premium 1 năm',
            originalPrice: '590.000đ',
            discountedPrice: '299.000đ',
            discount: 49,
        },
        {
            image: 'https://i.ibb.co/K2ZFMsz/Netflix-1.png',
            title: 'Netflix Premium 1 tháng',
            originalPrice: '260.000đ',
            discountedPrice: '99.000đ',
            discount: 62,
        },
        {
            image: 'https://i.ibb.co/v4YZVb0/Divine-Shop-Goi-Gia-Han-Spotify-1-Nam-40567.jpg',
            title: 'Gói gia hạn Spotify Premium 1 năm',
            originalPrice: '590.000đ',
            discountedPrice: '299.000đ',
            discount: 49,
        },
        {
            image: 'https://i.ibb.co/K2ZFMsz/Netflix-1.png',
            title: 'Netflix Premium 1 tháng',
            originalPrice: '260.000đ',
            discountedPrice: '99.000đ',
            discount: 62,
        },
        {
            image: 'https://i.ibb.co/v4YZVb0/Divine-Shop-Goi-Gia-Han-Spotify-1-Nam-40567.jpg',
            title: 'Gói gia hạn Spotify Premium 1 năm',
            originalPrice: '590.000đ',
            discountedPrice: '299.000đ',
            discount: 49,
        },
        {
            image: 'https://i.ibb.co/K2ZFMsz/Netflix-1.png',
            title: 'Netflix Premium 1 tháng',
            originalPrice: '260.000đ',
            discountedPrice: '99.000đ',
            discount: 62,
        },
        {
            image: 'https://i.ibb.co/v4YZVb0/Divine-Shop-Goi-Gia-Han-Spotify-1-Nam-40567.jpg',
            title: 'Gói gia hạn Spotify Premium 1 năm',
            originalPrice: '590.000đ',
            discountedPrice: '299.000đ',
            discount: 49,
        },
        {
            image: 'https://i.ibb.co/K2ZFMsz/Netflix-1.png',
            title: 'Netflix Premium 1 tháng',
            originalPrice: '260.000đ',
            discountedPrice: '99.000đ',
            discount: 62,
        },
        {
            image: 'https://i.ibb.co/v4YZVb0/Divine-Shop-Goi-Gia-Han-Spotify-1-Nam-40567.jpg',
            title: 'Gói gia hạn Spotify Premium 1 năm',
            originalPrice: '590.000đ',
            discountedPrice: '299.000đ',
            discount: 49,
        },
        {
            image: 'https://i.ibb.co/JnFfgZW/HULU.png',
            title: 'Hulu Premium 1 năm',
            originalPrice: '1.180.000đ',
            discountedPrice: '599.000đ',
            discount: 51,
        },
        {
            image: 'https://i.ibb.co/v4YZVb0/Divine-Shop-Goi-Gia-Han-Spotify-1-Nam-40567.jpg',
            title: 'Gói gia hạn Spotify Premium 1 năm',
            originalPrice: '590.000đ',
            discountedPrice: '299.000đ',
            discount: 49,
        },
        {
            image: 'https://i.ibb.co/K2ZFMsz/Netflix-1.png',
            title: 'Netflix Premium 1 tháng',
            originalPrice: '260.000đ',
            discountedPrice: '99.000đ',
            discount: 62,
        },
        {
            image: 'https://i.ibb.co/v4YZVb0/Divine-Shop-Goi-Gia-Han-Spotify-1-Nam-40567.jpg',
            title: 'Gói gia hạn Spotify Premium 1 năm',
            originalPrice: '590.000đ',
            discountedPrice: '299.000đ',
            discount: 49,
        },
        {
            image: 'https://i.ibb.co/K2ZFMsz/Netflix-1.png',
            title: 'Netflix Premium 1 tháng',
            originalPrice: '260.000đ',
            discountedPrice: '99.000đ',
            discount: 62,
        },
        {
            image: 'https://i.ibb.co/v4YZVb0/Divine-Shop-Goi-Gia-Han-Spotify-1-Nam-40567.jpg',
            title: 'Gói gia hạn Spotify Premium 1 năm',
            originalPrice: '590.000đ',
            discountedPrice: '299.000đ',
            discount: 49,
        },
        {
            image: 'https://i.ibb.co/K2ZFMsz/Netflix-1.png',
            title: 'Netflix Premium 1 tháng',
            originalPrice: '260.000đ',
            discountedPrice: '99.000đ',
            discount: 62,
        },
        {
            image: 'https://i.ibb.co/v4YZVb0/Divine-Shop-Goi-Gia-Han-Spotify-1-Nam-40567.jpg',
            title: 'Gói gia hạn Spotify Premium 1 năm',
            originalPrice: '590.000đ',
            discountedPrice: '299.000đ',
            discount: 49,
        },
    ];

    return (
        <>
            {/* PromotionSection */}
            <PromotionSection />

            {/* Product Section */}
            <ProductsSection products={products} />

            {/* Features Section */}
            <section className="bg-white py-16 px-32">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Tính năng nổi bật</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="bg-gray-100 p-8 rounded-lg mb-4 flex justify-center">
                            <UserGroupIcon className="h-12 w-12 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Truy cập không giới hạn</h3>
                        <p className="text-gray-600">Xem nội dung không giới hạn trên nhiều dịch vụ trực tuyến.</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-gray-100 p-8 rounded-lg mb-4 flex justify-center">
                            <CreditCardIcon className="h-12 w-12 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Giá cả phải chăng</h3>
                        <p className="text-gray-600">Tiết kiệm đáng kể so với đăng ký riêng lẻ từng dịch vụ.</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-gray-100 p-8 rounded-lg mb-4 flex justify-center">
                            <LockClosedIcon className="h-12 w-12 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Đăng nhập dễ dàng</h3>
                        <p className="text-gray-600">Chỉ cần một bước đơn giản để truy cập vào tài khoản của bạn.</p>
                    </div>
                </div>
            </div>
        </section>

            {/* Call to Action Section */}
            <section className="bg-gray-800 py-8 px-32">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Truy cập không giới hạn vào các dịch vụ trực tuyến</h2>
                    <p className="text-gray-300 mb-8">Thuê tài khoản cho Netflix, Hulu, Apple TV+, HBO Max, và nhiều dịch vụ khác với giá cả phải chăng.</p>
                    {!isLoggedIn ? (
                        <>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Đăng ký ngay
                        </button>
                        <div className='text-gray-300 mt-8'>Hoặc bạn đã có tài khoản? <button type="button" class="be">Đăng nhập</button></div>
                        </>

                    ) : null}
                </div>
            </section>
        </>
    );
}

export default HomePage;
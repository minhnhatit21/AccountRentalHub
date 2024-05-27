import React from 'react';
import ImageCarousel from './image_carousel';

const PromotionSection = () => {
    return (
        <div className="bg-blue-900">
            <div className="container mx-auto px-4 lg:px-32 py-8 lg:py-16 flex flex-col md:flex-row justify-between items-center">
                <div className="md:w-full lg:w-2/3 mb-8 md:mb-0">
                    <ImageCarousel />
                </div>
                <div className="md:w-full lg:w-1/3 flex flex-col justify-between items-center space-y-8">
                    <div className="bg-blue-700 rounded-lg p-4 mb-8 md:mb-0">
                        <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">
                            THỨ 5 HỘI SALE
                        </h2>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            CHÍNH HÃNG QUỐC TẾ
                        </h1>
                        <div className="flex items-center">
                            <div className="bg-red-500 text-white font-bold py-2 px-4 rounded-full mr-4">
                                GIẢM 50%
                            </div>
                            <p className="text-white text-lg">
                                Giá tốt mỗi tuần để bạn mua sắm thoải mái
                            </p>
                        </div>
                    </div>
                    <div className="bg-purple-900 rounded-lg p-4">
                        <h3 className="text-2xl font-bold text-white mb-2">
                            CHI TIÊU UU ĐÃI LIỀN CÁ TUẦN
                        </h3>
                        <p className="text-white text-lg">
                            UU ĐÃI ĐẾN <span className="text-yellow-400">150.000Đ</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromotionSection;
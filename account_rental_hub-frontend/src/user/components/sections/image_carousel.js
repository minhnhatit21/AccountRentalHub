import { useState, useEffect } from 'react';

const ImageCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        'https://i.ibb.co/1XrVNLK/2.png',
        'https://i.ibb.co/Ltxqfwf/Netflix-81012.png',
        'https://i.ibb.co/cQytPHf/t-i-u-c-ng-vi-c-45178.png'
        // Thêm các URL của ảnh khác
    ];

    const handlePrevClick = () => {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    };

    const handleNextClick = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextClick();
        }, 3000); // Chuyển slide sau 3 giây

        return () => clearInterval(interval); // Xóa interval khi component unmount
    }, [currentIndex]);

    return (
        <div className="relative rounded-md overflow-hidden">
            <div className="w-full h-80 md:h-96 lg:h-128 relative">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}
            </div>
            <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-900 text-white rounded-full p-2"
                onClick={handlePrevClick}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>
            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-900 text-white rounded-full p-2"
                onClick={handleNextClick}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>
            <div className='absolute flex bottom-4 justify-center gap-3 w-full'>
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`rounded-full w-3 h-3 ${index === currentIndex ? 'bg-white' : 'bg-gray-500'} transition-all duration-300`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;


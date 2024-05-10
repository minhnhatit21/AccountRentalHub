import React, { useState } from 'react';


const ProductCard = ({ image, title, originalPrice, discountedPrice, discount }) => {
    return (
        <div className="bg-[#fff] rounded-lg shadow-md p-2 flex flex-col items-center">
            <img src={image} alt={title} className="w-full mb-4 rounded-lg" />
            <h3 className="text-[#131336] text-lg font-semibold mb-2">{title}</h3>
            <div className="flex items-center mb-2">
                <span className="text-gray-500 line-through mr-2">{originalPrice}</span>
                <span className="text-green-600 font-bold">{discountedPrice}</span>
                <span className="bg-red-500 text-white text-sm ml-2 px-2 py-1 rounded-full">{discount}%</span>
            </div>
        </div>
    );
};

const ProductsSection = ({ products }) => {
  const [showingProducts, setShowingProducts] = useState(8);

  const handleShowMore = () => {
    setShowingProducts((prevCount) => Math.min(prevCount + 8, products.length));
  };

  return (
    <section className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-32 py-8 sm:py-12 md:py-16">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Sản phẩm nổi bật</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.slice(0, showingProducts).map((product, index) => (
          <ProductCard
            key={index}
            image={product.image}
            title={product.title}
            originalPrice={product.originalPrice}
            discountedPrice={product.discountedPrice}
            discount={product.discount}
          />
        ))}
      </div>
      {showingProducts < products.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowMore}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Xem thêm
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductsSection;
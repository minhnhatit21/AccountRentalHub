function UserSearchPage() {
    return (
        <div className="container mx-auto px-4 lg:px-32 py-8 lg:py-16 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4 p-4">
          <div>
            <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
              Danh mục
            </label>
            <select
              id="category"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>Tất cả</option>
              {/* Thêm các lựa chọn danh mục khác */}
            </select>
          </div>
    
          <div>
            <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
              Thể loại
            </label>
            <select
              id="type"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>Tất cả</option>
              {/* Thêm các lựa chọn thể loại khác */}
            </select>
          </div>
    
          <div>
            <label htmlFor="priceFrom" className="block text-gray-700 font-bold mb-2">
              Mức giá
            </label>
            <div className="flex space-x-2">
              <input
                id="priceFrom"
                type="number"
                placeholder="Từ"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <span className="flex items-center text-gray-700">-</span>
              <input
                id="priceTo"
                type="number"
                placeholder="Đến"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
    
          <div className="flex items-center space-x-2">
            <input
              id="freeShipping"
              type="checkbox"
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <label htmlFor="freeShipping" className="inline-block text-gray-700 font-bold">
              Khỏi phục bồ lọc
            </label>
          </div>
    
          <button
            type="button"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Lọc
          </button>
        </div>
      );
}

export default UserSearchPage;
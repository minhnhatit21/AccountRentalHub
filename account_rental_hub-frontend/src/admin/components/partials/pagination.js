function Pagination({ pageable, onPageChange }) {
    const { pageNumber = 0, pageSize = 10, totalElements, totalPages } = pageable;
    const handlePageClick = (newPage) => {
        onPageChange(newPage);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        // Thêm nút trang đầu tiên
        pageNumbers.push(
            <button
                key={0}
                className={`relative items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                    pageNumber === 0 ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : ''
                }`}
                onClick={() => handlePageClick(0)}
            >
                1
            </button>
        );

        // Thêm dấu "..." nếu cần
        if (pageNumber > 3) {
            pageNumbers.push(
                <span key="start-ellipsis" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                    ...
                </span>
            );
        }

        // Thêm các số trang xung quanh trang hiện tại
        for (let i = Math.max(2, pageNumber - 2); i <= Math.min(totalPages - 1, pageNumber + 2); i++) {
            pageNumbers.push(
                <button
                    key={`page-${pageNumber}-${i}`}
                    className={`relative items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                        pageNumber === i - 1 ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : ''
                    }`}
                    onClick={() => handlePageClick(i - 1)}
                >
                    {i}
                </button>
            );
        }

        // Thêm dấu "..." nếu cần
        if (pageNumber < totalPages - 3) {
            pageNumbers.push(
                <span key="end-ellipsis" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                    ...
                </span>
            );
        }

        // Thêm nút trang cuối cùng
        if (totalPages > 1) {
            pageNumbers.push(
                <button
                    key={totalPages - 1}
                    className={`relative items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                        pageNumber === totalPages - 1 ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : ''
                    }`}
                    onClick={() => handlePageClick(totalPages - 1)}
                >
                    {totalPages}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <>
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                {/* ==== Mobile Responsive ====*/}
                <div className="flex flex-1 justify-between sm:hidden">
                    <button
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        disabled={pageNumber === 0}
                        onClick={() => handlePageClick(pageNumber - 1)}
                    >
                        Previous
                    </button>
                    <button
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        disabled={pageNumber === totalPages - 1}
                        onClick={() => handlePageClick(pageNumber + 1)}
                    >
                        Next
                    </button>
                </div>
                {/* ==== Responsive ====*/}
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Hiển thị <span className="font-medium">{pageNumber * pageSize + 1}</span> đến{' '}
                            <span className="font-medium">{(pageNumber + 1) * pageSize > totalElements ? totalElements : (pageNumber + 1) * pageSize}</span> của{' '}
                            <span className="font-medium">{totalElements}</span> kết quả
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            {renderPageNumbers()}
                            <button
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                disabled={pageNumber === totalPages - 1}
                                onClick={() => handlePageClick(totalPages - 1)}
                            >
                                <span className="sr-only">Next</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Pagination;
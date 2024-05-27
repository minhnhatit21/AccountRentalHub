import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountPackageService from '../../../services/account-rental-package.service';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const navigate = useNavigate();

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.length > 0) {
            try {
                const results = await AccountPackageService.searchAccountPackageNyUser(0, 10, '', value, '', '', '', '');
                setSearchResults(results.content);
                setNoResults(results.content.length === 0);
            } catch (error) {
                console.error("Error while searching:", error);
                setSearchResults([]);
                setNoResults(true);
            }
        } else {
            setSearchResults([]);
            setNoResults(false);
        }
    };

    const handleSearchClick = (result) => {
        setSearchTerm('');
        setSearchResults([]);
        setNoResults(false);
        navigate(`/user/product/${result.name}`, {
            state: { serviceId: result?.accountRentalServices?.id, packageId: result?.id }
        });
    };

    const handleButtonSearch = () => {
        setSearchResults([]);
        setNoResults(false);
        navigate(`/search?name=${searchTerm}`);
    };
    return (
        <div className="relative flex-1">
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-full">
                <input
                    type="text"
                    className="w-full px-4 py-2 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tìm kiếm sản phẩm...."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button 
                    onClick={handleButtonSearch}
                    className="px-4 py-2 bg-[#0550EB] hover:bg-[#3405EB] flex items-center focus:outline-none"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>
            {(searchResults.length > 0 || noResults) && (
                <ul className="absolute mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    {searchResults.length > 0 ? (
                        searchResults.map((result) => (
                            <li
                                key={result.id}
                                onClick={() => handleSearchClick(result)}
                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-black"
                            >
                                {result.name}
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-2 text-gray-700">
                            Không tìm thấy kết quả
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;
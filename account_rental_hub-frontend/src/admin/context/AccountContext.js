import { createContext, useEffect, useState, useCallback } from "react";
import AccountServiceRentalService from "../../services/account-rental-service.service";
import { toast } from "react-toastify";
import AccountRentalService from "../../services/account-rental.service";
import AccountPackageService from "../../services/account-rental-package.service";

export const AccountContext = createContext("");

const accountRentals = [
    {
        "id": 1,
        "service":
        {
            "service_name": "Netflix",
            "website_link": "https://www.netflix.com"
        }
        ,
        "username": "user1",
        "email": "user1@example.com",
        "password": "encrypted_password",
        "description": "Netflix account",
        "account_package": "Netflix 1 tháng",
        "supcription_date": "2024-02-28T10:30:00Z",
        "renew_start_date": "2024-03-28T10:30:00Z",
        "renew_end_date": "2024-04-28T10:30:00Z",
        "created_at": "2023-03-28T10:30:00Z",
        "updated_at": "2023-03-28T10:30:00Z",
        "status": "active"
    },
    {
        "id": 2,
        "service": {
            "service_name": "Spotify",
            "website_link": "https://spotify.com"
        },
        "username": "user2",
        "email": "user2@example.com",
        "password": "encrypted_password",
        "description": "Spotify Premium account",
        "account_package": "Spotify Premium Individual",
        "supcription_date": "2024-01-15T09:00:00Z",
        "renew_start_date": "2024-04-15T09:00:00Z",
        "renew_end_date": "2024-05-15T09:00:00Z",
        "created_at": "2023-04-15T09:00:00Z",
        "updated_at": "2023-04-15T09:00:00Z",
        "status": "active"
    },
    {
        "id": 3,
        "service": {
            "service_name": "Amazon Prime",
            "website_link": "https://amazon.com"
        },
        "username": "user3",
        "email": "user3@example.com",
        "password": "encrypted_password",
        "description": "Amazon Prime membership",
        "account_package": "Amazon Prime Annual",
        "supcription_date": "2023-12-01T00:00:00Z",
        "renew_start_date": "2024-11-01T00:00:00Z",
        "renew_end_date": "2024-12-01T00:00:00Z",
        "created_at": "2023-12-01T00:00:00Z",
        "updated_at": "2023-12-01T00:00:00Z",
        "status": "active"
    },
    {
        "id": 4,
        "service": {
            "service_name": "Hulu",
            "website_link": "https://hulu.com"
        },
        "username": "user4",
        "email": "user4@example.com",
        "password": "encrypted_password",
        "description": "Hulu subscription",
        "account_package": "Hulu (No Ads)",
        "supcription_date": "2024-03-10T15:30:00Z",
        "renew_start_date": "2024-04-10T15:30:00Z",
        "renew_end_date": "2024-05-10T15:30:00Z",
        "created_at": "2023-04-10T15:30:00Z",
        "updated_at": "2023-04-10T15:30:00Z",
        "status": "active"
    },
    {
        "id": 5,
        "service": {
            "service_name": "Disney+",
            "website_link": "https://disneyplus.com"
        },
        "username": "user5",
        "email": "user5@example.com",
        "password": "encrypted_password",
        "description": "Disney+ subscription",
        "account_package": "Disney+ Premium",
        "supcription_date": "2023-11-20T08:00:00Z",
        "renew_start_date": "2024-11-20T08:00:00Z",
        "renew_end_date": "2024-12-20T08:00:00Z",
        "created_at": "2023-11-20T08:00:00Z",
        "updated_at": "2023-11-20T08:00:00Z",
        "status": "active"
    },
    {
        "id": 6,
        "service": {
            "service_name": "YouTube Premium",
            "website_link": "https://youtube.com"
        },
        "username": "user6",
        "email": "user6@example.com",
        "password": "encrypted_password",
        "description": "YouTube Premium subscription",
        "account_package": "YouTube Premium Family",
        "supcription_date": "2023-07-01T00:00:00Z",
        "renew_start_date": "2024-07-01T00:00:00Z",
        "renew_end_date": "2024-08-01T00:00:00Z",
        "created_at": "2023-07-01T00:00:00Z",
        "updated_at": "2023-07-01T00:00:00Z",
        "status": "active"
    },
    {
        "id": 7,
        "service": {
            "service_name": "Apple Music",
            "website_link": "https://apple.com/music"
        },
        "username": "user7",
        "email": "user7@example.com",
        "password": "encrypted_password",
        "description": "Apple Music subscription",
        "account_package": "Apple Music Individual",
        "supcription_date": "2023-09-15T12:00:00Z",
        "renew_start_date": "2024-09-15T12:00:00Z",
        "renew_end_date": "2024-10-15T12:00:00Z",
        "created_at": "2023-09-15T12:00:00Z",
        "updated_at": "2023-09-15T12:00:00Z",
        "status": "active"
    },
    {
        "id": 8,
        "service": {
            "service_name": "HBO Max",
            "website_link": "https://hbomax.com"
        },
        "username": "user8",
        "email": "user8@example.com",
        "password": "encrypted_password",
        "description": "HBO Max subscription",
        "account_package": "HBO Max Ad-Free",
        "supcription_date": "2023-06-01T18:00:00Z",
        "renew_start_date": "2024-06-01T18:00:00Z",
        "renew_end_date": "2024-07-01T18:00:00Z",
        "created_at": "2023-06-01T18:00:00Z",
        "updated_at": "2023-06-01T18:00:00Z",
        "status": "active"
    },

]

const subscriptionAccounts = [
    {
        "id": 1,
        "account": {
            "id": 1,
            "service":
            {
                "id": "1",
                "name": "Netflix",
                "image": "https://i.ibb.co/L6MDz9X/HD-wallpaper-netflix-logo-black-logo-minimal-netflix.jpg",
                "description": "Dịch vụ xem phim trực tuyến phổ biến nhất hiện nay",
                "pricing_info": "Từ $8.99/tháng",
                "website": "netflix.com",
                "category": "Giải trí"
            }
            ,
            "username": "user1",
            "email": "user1@example.com",
            "password": "encrypted_password",
            "description": "Netflix account",
            "account_package": {
                "id": "1",
                "name": "Netflix 1 tháng",
                "duration": 30,
                "description": "Truy cập YouTube không quảng cáo, xem video ngoại tuyến",
                "pricing": 77000,
                "description": "Tài khoảng netflix 1 tháng",
                "service": "Netflix"
            },
            "supcription_date": "2024-02-28T10:30:00Z",
            "renew_start_date": "2024-03-28T10:30:00Z",
            "renew_end_date": "2024-04-28T10:30:00Z",
            "created_at": "2023-03-28T10:30:00Z",
            "updated_at": "2023-03-28T10:30:00Z",
            "status": "active"
        },
        "renter": {
            "id": 1,
            "username": "minhnhat01",
            "fullname": "Nguyễn Hữu Minh Nhật",
            "email": "minhnhat@gmail.com"
        },
        "date_stared_rent": "2024-03-28T10:30:00Z",
        "date_end_rent": "2024-04-28T10:30:00Z",
        "price": 80000,
        "status": "rented"
    },
    {
        "id": 2,
        "account": {
            "id": 1,
            "service":
            {
                "id": "1",
                "name": "Netflix",
                "image": "https://i.ibb.co/L6MDz9X/HD-wallpaper-netflix-logo-black-logo-minimal-netflix.jpg",
                "description": "Dịch vụ xem phim trực tuyến phổ biến nhất hiện nay",
                "pricing_info": "Từ $8.99/tháng",
                "website": "netflix.com",
                "category": "Giải trí"
            }
            ,
            "username": "user1",
            "email": "user1@example.com",
            "password": "encrypted_password",
            "description": "Netflix account",
            "account_package": {
                "id": "1",
                "name": "Netflix 1 tháng",
                "duration": 30,
                "description": "Truy cập YouTube không quảng cáo, xem video ngoại tuyến",
                "pricing": 77000,
                "description": "Tài khoảng netflix 1 tháng",
                "service": "Netflix"
            },
            "supcription_date": "2024-02-28T10:30:00Z",
            "renew_start_date": "2024-03-28T10:30:00Z",
            "renew_end_date": "2024-04-28T10:30:00Z",
            "created_at": "2023-03-28T10:30:00Z",
            "updated_at": "2023-03-28T10:30:00Z",
            "status": "active"
        },
        "renter": {
            "id": 2,
            "username": "anhtuan99",
            "fullname": "Nguyễn Anh Tuấn",
            "email": "anhtuan99@gmail.com"
        },
        "date_stared_rent": "2024-04-15T09:00:00Z",
        "date_end_rent": "2024-05-15T09:00:00Z",
        "price": 60000,
        "status": "rented"
    },
    {
        "id": 3,
        "account": {
            "id": 1,
            "service":
            {
                "id": "1",
                "name": "Netflix",
                "image": "https://i.ibb.co/L6MDz9X/HD-wallpaper-netflix-logo-black-logo-minimal-netflix.jpg",
                "description": "Dịch vụ xem phim trực tuyến phổ biến nhất hiện nay",
                "pricing_info": "Từ $8.99/tháng",
                "website": "netflix.com",
                "category": "Giải trí"
            }
            ,
            "username": "user1",
            "email": "user1@example.com",
            "password": "encrypted_password",
            "description": "Netflix account",
            "account_package": {
                "id": "1",
                "name": "Netflix 1 tháng",
                "duration": 30,
                "description": "Truy cập YouTube không quảng cáo, xem video ngoại tuyến",
                "pricing": 77000,
                "description": "Tài khoảng netflix 1 tháng",
                "service": "Netflix"
            },
            "supcription_date": "2024-02-28T10:30:00Z",
            "renew_start_date": "2024-03-28T10:30:00Z",
            "renew_end_date": "2024-04-28T10:30:00Z",
            "created_at": "2023-03-28T10:30:00Z",
            "updated_at": "2023-03-28T10:30:00Z",
            "status": "active"
        },
        "renter": {
            "id": 3,
            "username": "thanhvan02",
            "fullname": "Trần Thanh Vân",
            "email": "thanhvan02@gmail.com"
        },
        "date_stared_rent": "2024-11-01T00:00:00Z",
        "date_end_rent": "2024-12-01T00:00:00Z",
        "price": 120000,
        "status": "rented"
    },
    {
        "id": 4,
        "account": {
            "id": 1,
            "service":
            {
                "id": "1",
                "name": "Netflix",
                "image": "https://i.ibb.co/L6MDz9X/HD-wallpaper-netflix-logo-black-logo-minimal-netflix.jpg",
                "description": "Dịch vụ xem phim trực tuyến phổ biến nhất hiện nay",
                "pricing_info": "Từ $8.99/tháng",
                "website": "netflix.com",
                "category": "Giải trí"
            }
            ,
            "username": "user1",
            "email": "user1@example.com",
            "password": "encrypted_password",
            "description": "Netflix account",
            "account_package": {
                "id": "1",
                "name": "Netflix 1 tháng",
                "duration": 30,
                "description": "Truy cập YouTube không quảng cáo, xem video ngoại tuyến",
                "pricing": 77000,
                "description": "Tài khoảng netflix 1 tháng",
                "service": "Netflix"
            },
            "supcription_date": "2024-02-28T10:30:00Z",
            "renew_start_date": "2024-03-28T10:30:00Z",
            "renew_end_date": "2024-04-28T10:30:00Z",
            "created_at": "2023-03-28T10:30:00Z",
            "updated_at": "2023-03-28T10:30:00Z",
            "status": "rented"
        },
        "renter": {
            "id": 4,
            "username": "phuonganh88",
            "fullname": "Lê Phương Anh",
            "email": "phuonganh88@gmail.com"
        },
        "date_stared_rent": "2024-04-10T15:30:00Z",
        "date_end_rent": "2024-05-10T15:30:00Z",
        "price": 70000,
        "status": "rented"
    },
    {
        "id": 5,
        "account": {
            "id": 3,
            "service": {
                "id": "3",
                "name": "Amazon Prime",
                "image": "https://i.ibb.co/xCFY6mW/amazon-prime.jpg",
                "description": "Dịch vụ giao hàng miễn phí, xem phim và nhiều ưu đãi khác",
                "pricing_info": "$119/năm hoặc $12.99/tháng",
                "website": "amazon.com/prime",
                "category": "Mua sắm"
            },
            "username": "user3",
            "email": "user3@example.com",
            "password": "encrypted_password",
            "description": "Amazon Prime membership",
            "account_package": {
                "id": "3",
                "name": "Amazon Prime 1 năm",
                "duration": 365,
                "description": "Giao hàng miễn phí, xem nội dung Prime Video",
                "pricing": 499000,
                "service": "Amazon Prime"
            },
            "supcription_date": "2023-12-01T00:00:00Z",
            "renew_start_date": "2024-11-01T00:00:00Z",
            "renew_end_date": "2024-12-01T00:00:00Z",
            "created_at": "2023-12-01T00:00:00Z",
            "updated_at": "2023-12-01T00:00:00Z",
            "status": "active"
        },
        "renter": {
            "id": 5,
            "username": "ngocdiep77",
            "fullname": "Trần Ngọc Diệp",
            "email": "ngocdiep77@gmail.com"
        },
        "date_stared_rent": "2024-11-20T08:00:00Z",
        "date_end_rent": "2024-12-20T08:00:00Z",
        "price": 90000,
        "status": "available"
    }

]

const accountPackageList = [
    {
        "id": "1",
        "name": "Netflix 1 tháng",
        "duration": 30,
        "description": "Truy cập YouTube không quảng cáo, xem video ngoại tuyến",
        "pricing": 77000,
        "description": "Tài khoảng netflix 1 tháng",
        "service": "Netflix"
    },
    {
        "id": "2",
        "name": "Netflix 3 tháng",
        "duration": 90,
        "description": "Truy cập Netflix không quảng cáo, xem nội dung ngoại tuyến",
        "pricing": 210000,
        "service": "Netflix"
    },
    {
        "id": "3",
        "name": "Amazon Prime 1 năm",
        "duration": 365,
        "description": "Giao hàng miễn phí, xem nội dung Prime Video",
        "pricing": 499000,
        "service": "Amazon Prime"
    },
    {
        "id": "4",
        "name": "Spotify Premium 3 tháng",
        "duration": 90,
        "description": "Nghe nhạc không quảng cáo, tải về ngoại tuyến",
        "pricing": 149000,
        "service": "Spotify"
    },
    {
        "id": "5",
        "name": "YouTube Premium 1 năm",
        "duration": 365,
        "description": "Xem YouTube không quảng cáo, tải video ngoại tuyến",
        "pricing": 599000,
        "service": "YouTube"
    },
    {
        "id": "6",
        "name": "Disney+ 1 tháng",
        "duration": 30,
        "description": "Xem nội dung Disney, Pixar, Marvel, Star Wars",
        "pricing": 99000,
        "service": "Disney+"
    },
    {
        "id": "7",
        "name": "Hulu 6 tháng",
        "duration": 180,
        "description": "Xem phim, chương trình truyền hình và nội dung gốc",
        "pricing": 299000,
        "service": "Hulu"
    },
    {
        "id": "8",
        "name": "HBO Max 1 năm",
        "duration": 365,
        "description": "Xem phim, chương trình truyền hình và nội dung gốc HBO",
        "pricing": 799000,
        "service": "HBO Max"
    },
    {
        "id": "9",
        "name": "Apple TV+ 6 tháng",
        "duration": 180,
        "description": "Xem nội dung gốc Apple TV+, không quảng cáo",
        "pricing": 249000,
        "service": "Apple TV+"
    },
    {
        "id": "10",
        "name": "Peacock Premium 1 năm",
        "duration": 365,
        "description": "Xem nội dung NBC, phim, chương trình truyền hình",
        "pricing": 499000,
        "service": "Peacock"
    },
    {
        "id": "11",
        "name": "Paramount+ 3 tháng",
        "duration": 90,
        "description": "Xem nội dung Paramount, phim, chương trình truyền hình",
        "pricing": 149000,
        "service": "Paramount+"
    },
]

const actionList = ["add", "edit", "view", "delete"];

export const AccountProvider = ({ children }) => {
    const [accountList, setAccountList] = useState([]);
    const [accountSlots, setAccountSlots] = useState(subscriptionAccounts);
    const [packageData, setPackageData] = useState([]);

    const [pageable, setPageable] = useState(null);



    const [action, setAction] = useState('add');
    const [actions, setActions] = useState(actionList);
    const [update, setUpdate] = useState(false);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);

    const [usernameSearch, setUsernameSearch] = useState("");
    const [statusSearch, setStatusSearch] = useState("");
    const [packageIDSearch, setPackageIDSearch] = useState("");

    useEffect(() => {
        const fetchAccounPackage = async () => {
            try {
                const response = await AccountPackageService.getAllAccountRentalPackages();
                if (response != null) {
                    setPackageData(response);
                } else {
                    setPackageData([]);
                    console.error("Not Found Data");
                }
            } catch (error) {
                toast.error("Đã xảy ra lỗi khi tải dữ liệu ban đầu");
            }
        };

        fetchAccounPackage();
    }, []);


    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await AccountRentalService.searchAccountRental(page, size, statusSearch, usernameSearch, packageIDSearch)
                if (response?.content) {
                    setAccountList(response.content);
                    setPageable(response.pageable);
                } else {
                    setAccountList([]);
                    setPageable(null);
                    console.error("Not Found Data");
                }
            } catch (error) {
                toast.error("Đã xảy ra lỗi khi tải dữ liệu ban đầu");
            }
        };

        fetchInitialData();
    }, [page, update]);

    const changePage = (newPage) => {

        setPage(newPage);
        searchData(statusSearch, usernameSearch, packageIDSearch)
    };

    const searchData = useCallback(async (status, username, packageID) => {
        let usernameValue = username !== undefined ? username : "";
        let statusValue = status !== undefined ? status : "";
        let packageIDValue = packageID !== undefined ? packageID : "";

        if (usernameValue !== usernameSearch || statusValue !== statusSearch || packageIDValue !== packageIDSearch) {
            setPage(0);
            try {
                const response = await AccountRentalService.searchAccountRental(page, size, statusValue, usernameValue, packageIDValue);
                if (response?.content) {
                    setAccountList(response.content);
                    setPageable(response.pageable);
                    setUsernameSearch(usernameValue);
                    setStatusSearch(statusValue);
                    setPackageIDSearch(packageIDValue);
                } else {
                    setAccountList([]);
                    setPageable(null);
                    console.error("Not Found Data");
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setAccountList([]);
                    setPageable(null);
                    console.error("Not Found Data");
                    toast.warning("Không tìm thấy dữ liệu");
                } else {
                    console.error("Error while searching data:", error);
                    toast.error("Đã xảy ra lỗi khi search dữ liệu");
                }
            }
        }
    }, [page, size, usernameSearch, statusSearch, packageIDSearch]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await searchData(statusSearch, usernameSearch, packageIDSearch);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [searchData, statusSearch, usernameSearch, packageIDSearch, page, update]);


    const createData = async (accountData) => {
        try {
            await AccountRentalService.createAccountRental(accountData);
            toast.success("Thêm dữ liệu thành công");
            setUpdate(!update)
        } catch (error) {
            //console.error("Lỗi khi thêm dữ liệu:", error.response.data);
            toast.error(error.response.data.message + ". Vui lòng thử lại!");
        }
    };

    const updateData = async (id, accountData) => {
        try {
            await AccountRentalService.updateAccountRental(id, accountData);
            toast.success("Cập nhật dữ liệu thành công");
            setUpdate(!update)
        } catch (error) {
            console.error("Lỗi khi cập nhật dữ liệu:", error);
            toast.error("Đã xảy ra lỗi khi cập nhật dữ liệu");
        }
    };

    const deleteData = async (id) => {
        try {
            await AccountRentalService.deleteAccountRental(id);
            toast.success("Xóa liệu thành công");
            setUpdate(!update)
        } catch (error) {
            console.error("Lỗi khi xóa dữ liệu:", error);
            toast.error("Đã xảy ra lỗi khi xóa dữ liệu");
        }
    }

    const value = {
        accountList,
        accountSlots,
        packageData,
        pageable,
        action,
        actions,
        pageable,
        setAccountList,
        setAccountSlots,
        setAction,
        setActions,
        update,
        setUpdate,
        createData,
        deleteData,
        updateData,
        changePage,
        searchData,
        setUsernameSearch,
        setStatusSearch,
        setPackageIDSearch,
        createData
        // Các phương thức xử lý khác
    };

    return (
        <AccountContext.Provider value={value}>
            {children}
        </AccountContext.Provider>
    );
}
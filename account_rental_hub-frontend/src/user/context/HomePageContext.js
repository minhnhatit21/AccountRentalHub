import { createContext, useContext, useEffect, useState } from "react";
import AccountPackageService from "../../services/account-rental-package.service";
import { toast } from "react-toastify";

export const HomePageContext = createContext(null); // Updated to a more appropriate default value

export const HomePageProvider = ({ children }) => { // Corrected spelling
    const [packageList, setPackageList] = useState([]);

    useEffect(() => {
        const fetchAccountPackage = async () => {
            try {
                const response = await AccountPackageService.getAllAccountRentalPackages();
                if (response) { // Simplified the null check
                    setPackageList(response);
                } else {
                    setPackageList([]);
                }
            } catch (error) {
                toast.error("Đã xảy ra lỗi khi tải dữ liệu ban đầu");
            }
        };

        fetchAccountPackage();
    },[]);

    const value = { packageList };

    return (
        <HomePageContext.Provider value={value}>
            {children} {/* Corrected spelling */}
        </HomePageContext.Provider>
    );
};
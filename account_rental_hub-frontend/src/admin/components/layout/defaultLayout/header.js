import { useContext, useEffect, useState } from "react";
import NotificationDropdown from "../../../../admin/components/dropdown/notification_dropdown"
import ProfileMenuDropdown from "../../../../admin/components/dropdown/profile_dropdown";
import { AuthContext } from "../../../../user/context/AuthContext";

function Header({toggleSidebar}) {
    const { user } = useContext(AuthContext);
    
    const [adminProfile,setAdminProfile ] = useState(null);

    useEffect(() => {
        if (user) {
            setAdminProfile(user);
        } else {
            setAdminProfile(null);
        }
    }, [user]);

    return (
        <header className="sticky top-0 z-[100] flex w-full bg-white shadow-sm">
            <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                    <button onClick={() => toggleSidebar((prevState) => !prevState)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
                <div className="hidden sm:block" >
                    <form action="#">
                        <div className="relative rounded-md">
                            <button className="absolute left-2 top-1/2 -translate-y-1/2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth={1.5} stroke="#D5D5D5" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </button>
                            <input
                                type="text"
                                placeholder="Nhập từ khóa tìm kiếm..."
                                className="w-80 bg-transparent pl-9 pr-4 pt-2 pb-2 focus:outline-none xl:w-125 border-solid border-2 bg-grey-1 border-regal-grey rounded-2xl"
                            />
                        </div>
                    </form>
                </div>
                <div className="flex flex-row w-60">
                    <NotificationDropdown />
                    <ProfileMenuDropdown adminProfile={adminProfile} />
                </div>
            </div>
        </header>
    );
}

export default Header;
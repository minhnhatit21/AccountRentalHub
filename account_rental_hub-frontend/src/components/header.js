import NotificationDropdown from "./dropdown/notification_dropdown";
import ProfileMenuDropdown from "./dropdown/profile_dropdown";

function Header() {
    return (
        <header class="fixed w-full bg-white p-4 shadow-md">
            <div className="flex items-center w-3/4 justify-between flex-row">
                <div className="flex w-96 p-2 pl-4" >
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
                    <ProfileMenuDropdown />
                </div>
            </div>
        </header>
    );
}

export default Header;
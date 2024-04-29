import { useState } from "react";
import Header from "./defaultLayout/header";
import Sidebar from "./defaultLayout/sidebar";

function DefaultLayout({ children }) {
    const [sideBar, setSidebar] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = (value) => {
        setIsOpen(value);
      };

    return (
        <>
            <div className='flex flex-row h-screen overflow-hidden'>
                {/* ==== Sidebar ==== */}
                <Sidebar toggleSidebar={toggleSidebar} isOpen={isOpen}/>
                {/* ==== Sidebar ==== */}
                {/* ==== Content ==== */}
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    {/* ==== Header ====*/}
                    <Header toggleSidebar={toggleSidebar}/>
                    {/* ==== Header ====*/}

                    {/* ==== Main content ==== */}
                    <main>
                        <div className="mx-auto max-w-screen-2xl z-[99] p-4 md:p-6 2xl:p-10 bg-[#F2F2F2]">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default DefaultLayout;
import { useContext, useEffect, useState } from "react";
import UserFooter from "./defaultLayout/UserFooter";
import UserHeader from "./defaultLayout/UserHeader";
import { AuthContext } from "../../context/AuthContext";
import { UserSidebar } from "./defaultLayout/UserSidebar";

export function UserHomeDefaultLayout({ children }) {


    const { isLoggedIn, user, setIsLoggedIn, setUser } = useContext(AuthContext);

    const handleLoginSuccess = (currentUser) => {
        setIsLoggedIn(true);
        setUser(currentUser);
    };

    return (
        <>
            <div className="bg-gray-100">
                {/* Header */}
                <UserHeader isLoggedIn={isLoggedIn} user={user} onLoginSuccess={handleLoginSuccess} />
                <div className="min-h-screen flex flex-col">
                    <main className="flex-grow">
                        {children}
                    </main>
                    {/* Footer */}
                    <UserFooter />
                </div>
            </div>
        </>);
}

export function CartDefaultLayout({ children }) {
    const { isLoggedIn, user, setIsLoggedIn, setUser } = useContext(AuthContext);

    const handleLoginSuccess = (currentUser) => {
        setIsLoggedIn(true);
        setUser(currentUser);
    };

    return (
        <>
            <div className="bg-gray-100 min-h-screen">
                {/* Header */}
                <UserHeader isLoggedIn={isLoggedIn} user={user} onLogiSuccess={handleLoginSuccess} />
                <main className="container flex mx-auto px-4 lg:px-32 py-8 lg:py-16 justify-between">
                    {children}
                </main>
                {/* Footer */}
                <UserFooter />
            </div>
        </>);
}

export function UserDefaultLayout({ children }) {
    const { isLoggedIn, user, setIsLoggedIn, setUser } = useContext(AuthContext);

    const handleLoginSuccess = (currentUser) => {
        setIsLoggedIn(true);
        setUser(currentUser);
    };

    return (
        <>
            <div className="bg-gray-100 min-h-screen flex flex-col">
                {/* Header */}
                <UserHeader isLoggedIn={isLoggedIn} user={user} onLoginSuccess={handleLoginSuccess} />

                <main className="container flex mx-auto px-4 lg:px-32 py-8 lg:py-16 flex-grow">
                    <UserSidebar />
                    {children}
                </main>

                {/* Footer */}
                <UserFooter />
            </div>
        </>);
}
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

function UserFooter() {
    const { isLoggedIn, user } = useContext(AuthContext);
    return (
        <>
            <footer className="bg-gray-800 py-8 text-center text-gray-300">
                <div className="container mx-auto px-4">
                    &copy; 2024 Vutrukey. All rights reserved.
                </div>
            </footer>
        </>
    );
}

export default UserFooter;
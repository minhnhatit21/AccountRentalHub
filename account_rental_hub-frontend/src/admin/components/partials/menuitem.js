import { useState } from "react";
import { NavLink } from "react-router-dom";
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
function MenuItem({ children, to, icon, title }) {
    const [expandedMenus, setExpandedMenus] = useState([]);

    const isExpanded = expandedMenus.includes(to);

    const toggleMenu = () => {
        if (isExpanded) {
            setExpandedMenus(expandedMenus.filter((item) => item !== to));
        } else {
            setExpandedMenus([...expandedMenus, to]);
        }
    };

    return (
        <div>
            <button
                onClick={toggleMenu}
                className={`flex items-center px-2 py-2 w-full text-left ${isExpanded
                    ? 'bg-[#6292ff] text-white font-medium rounded-md'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium rounded-md'
                    }`}
            >
                {icon}
                <span className="ml-2">{title}</span>
            </button>
            {isExpanded && (
                <div className="pl-4 py-2">
                    {children}
                </div>
            )}
        </div>
    );
}

export default MenuItem;
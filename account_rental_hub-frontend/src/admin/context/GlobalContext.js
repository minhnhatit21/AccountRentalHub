import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    
    const [globalUpdate, setGlobalUpdate] = useState(false);
    
    const value = {
        globalUpdate,
        setGlobalUpdate
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};
import { createContext, useState } from "react";

const actionList = ["add", "edit", "view", "delete"];

export const UserContext = createContext("");

export const UserProvider = ({children}) => {
    const [userAccountList, setUserAccountList] = useState([])
    const [action, setAction] = useState('add')
    const [actions, setActions] = useState(actionList)

    const value = {
        userAccountList,
        action,
        actions,
        setUserAccountList,
        setAction,
        setActions
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
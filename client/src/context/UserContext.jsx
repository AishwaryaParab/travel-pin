import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const localStorageUser = localStorage.getItem('user');
    const [user, setUser] = useState(localStorageUser && JSON.parse(localStorageUser) || null);

    console.log("context ---> " + user);

    return <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
}
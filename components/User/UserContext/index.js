import {createContext, useEffect, useState} from "react";
import {GetSettings} from "@utils/api";

const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);

function UserProvider({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if(loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }

    },[]);

    useEffect( () => {
        if (user != null) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    },[user]);

    return (
        <UserContext.Provider value={user}>
        <UserDispatchContext.Provider value={setUser}>
            {children}
        </UserDispatchContext.Provider>
        </UserContext.Provider>
    );
}

export { UserContext, UserDispatchContext, UserProvider };
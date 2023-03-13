import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
const UserContext = createContext();

function UserContextProvider(props) {
    const [user, setUser] = useState();
    const userValue = { user, getUser }
    useEffect(() => {
        getUser();
    }, []);

    function getUser(userInfo) {
        setUser(userInfo);
    }

    return (
        <UserContext.Provider value={userValue}>
            {props.children}
        </UserContext.Provider>
    );
}
export default UserContext;
export { UserContextProvider };
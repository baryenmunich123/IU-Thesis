import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext();

function UserContextProvider(props) {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { accountId: "", role: "" };
  });

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  function getUser(userInfo) {
    setUser(userInfo);
  }

  const userValue = { user, getUser };

  return (
    <UserContext.Provider value={userValue}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserContextProvider };

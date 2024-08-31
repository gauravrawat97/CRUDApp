import React, {createContext, useState, useContext} from 'react';

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({children}) => {
  //States to be shared between components
  const [userAuthenticated, setUserAuthentication] = useState(false);
  const [userData, setUserData] = useState({});

  return (
    <UserContext.Provider
      value={{setUserAuthentication, userAuthenticated, setUserData, userData}}>
      {children}
    </UserContext.Provider>
  );
};

export const userDetails = () => useContext(UserContext);

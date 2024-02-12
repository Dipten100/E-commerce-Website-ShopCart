import React, { createContext, useState } from "react";

export const AllContext = createContext({});

const ContextProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [selectAddress, setSelectAddress] = useState(null);
  const [Price, setPrice] = useState(null);
  const [User, setUser] = useState();
  const provider = { cartProducts, User,selectAddress,Price, setPrice, setSelectAddress, setCartProducts, setUser };
  return <AllContext.Provider value={provider}>{children}</AllContext.Provider>;
};

export default ContextProvider;

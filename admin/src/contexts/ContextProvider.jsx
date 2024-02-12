import React, { createContext, useState } from "react";

export const AllContext = createContext({});

const ContextProvider = ({ children }) => {
  const [Products, setProducts] = useState([]);
  const [Admin, setAdmin] = useState(null);
  const provider = { Products, Admin, setProducts, setAdmin };
  return <AllContext.Provider value={provider}>{children}</AllContext.Provider>;
};

export default ContextProvider;

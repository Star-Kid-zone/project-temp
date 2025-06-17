import React, { useContext, createContext, useState } from "react";

const CustomContext = createContext();

export const CustomUseContext = () => useContext(CustomContext);

export const DataContext = ({ children }) => {
  const [load, setLoad] = useState(false);
  const [loadMsg, setLoadMsg] = useState("Loading...");

  return (
    <CustomContext.Provider value={{ setLoad, setLoadMsg, load, loadMsg }}>
      {children}
    </CustomContext.Provider>
  );
};

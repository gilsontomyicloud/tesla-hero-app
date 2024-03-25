import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    vehicleModels: [],
    setVehicleModels: () => {}
});
export const ContextProvider = ({ children }) => {
  const [vehicleModels, setVehicleModels] = useState([]);

  return (
    <StateContext.Provider
      value={{
        vehicleModels,
        setVehicleModels,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
// RegistrationDataContext.js
import { createContext, useContext, useState } from 'react';

const RegistrationDataContext = createContext();

export const RegistrationDataProvider = ({ children }) => {
  const [registrationData, setRegistrationData] = useState(null);

  const storeRegistrationData = (data) => {
    setRegistrationData(data);
  };

  return (
    <RegistrationDataContext.Provider value={{ registrationData, storeRegistrationData }}>
      {children}
    </RegistrationDataContext.Provider>
  );
};

export const useRegistrationData = () => {
  return useContext(RegistrationDataContext);
};

import { createContext, useContext, useState } from "react";

const ErrorContext = createContext();

export const useError = () => {
  return useContext(ErrorContext);
};

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const triggerError = (message) => {
    setError(message);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <ErrorContext.Provider value={{ error, triggerError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

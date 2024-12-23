import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useError } from "./ErrorContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { triggerError } = useError();
  const [session, setSession] = useState(null);
  const [contextKey, setContextKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        triggerError("Error fetching session:");
      } else {
        setSession(session);
        setIsLoading(false);
      }
    };

    fetchSession();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_, newSession) => {
        setSession(newSession);
        setContextKey((prevKey) => prevKey + 1);
      },
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, [triggerError]);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      setContextKey((prevKey) => prevKey + 1);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      triggerError("Error during logout:");
    }
  };

  return (
    <UserContext.Provider
      value={{ session, logout, isLoading }}
      key={contextKey}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useSession must be used within a UserProvider");
  }
  return context;
};

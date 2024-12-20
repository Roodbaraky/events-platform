import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useGoogleLogin } from "@react-oauth/google";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [googleAccessToken, setGoogleAccessToken] = useState(null);
  const [contextKey, setContextKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
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
  }, []);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (response) => {
      setGoogleAccessToken(response.access_token);
    },
    onError: () => {
      alert("Failed to log in with Google. Please try again.");
    },
  });

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      setContextKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ session, googleAccessToken, loginWithGoogle, logout, isLoading }}
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

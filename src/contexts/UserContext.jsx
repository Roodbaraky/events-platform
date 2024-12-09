import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useGoogleLogin } from "@react-oauth/google";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [googleAccessToken, setGoogleAccessToken] = useState(null);
  const [contextKey, setContextKey] = useState(0);
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
      }
    };

    fetchSession();

    const { data: subscription } = supabase.auth.onAuthStateChange((_, newSession) => {
      console.log("Auth state changed, new session:", newSession);
      setSession(newSession);
      setContextKey((prevKey) => prevKey + 1); 
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (response) => {
      setGoogleAccessToken(response.access_token);
      console.log("Google login successful!");
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
      console.log("User logged out");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ session, googleAccessToken, loginWithGoogle, logout }}
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

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useGoogleLogin } from "@react-oauth/google";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [session, setSession] = useState(null); 
  const [googleAccessToken, setGoogleAccessToken] = useState(null); 


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

    const { subscription } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
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

  return (
    <UserContext.Provider value={{ session, setSession, googleAccessToken, loginWithGoogle }}>
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

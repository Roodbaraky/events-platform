import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Events from "./components/Events";

function App() {
  const [session, setSession] = useState(null);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const getEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*");

      if (error) {
        console.error("Error fetching events:", error);
      } else {
        console.log(data)
        setEvents(data);
  
      }
    };

    getEvents();
    
  }, []);

  useEffect(() => {
    console.log("Events updated:", events);
  }, [events]);
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <Nav setSession={setSession} session={session} />
      <Login />
      <Events events={events}/>
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Events from "./components/Events";
import Login from "./components/Login";
import Nav from "./components/Nav";
import EventPage from "./pages/EventPage";
import { supabase } from "./supabaseClient";
import EditPage from "./pages/EditPage";

function App() {
  const [session, setSession] = useState(null);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const getEvents = async () => {
      const { data, error } = await supabase.from("events").select("*");

      if (error) {
        console.error("Error fetching events:", error);
      } else {
        console.log(data);
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
    <main className="w-full">
      <Nav setSession={setSession} session={session} />
      <Login />
      <Routes>
        <Route path="/" element={<Events events={events} />} />
        <Route path="/:title/:id" element={<EventPage />} />
        <Route path="/:title/:id/edit" element={<EditPage/>}/>
      </Routes>
    </main>
  );
}

export default App;

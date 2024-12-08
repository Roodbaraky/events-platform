import { useQuery } from "@tanstack/react-query";
import { Route, Routes, useNavigate } from "react-router-dom";
import Events from "./components/Events";
import Login from "./components/Login";
import Nav from "./components/Nav";
import CreateEventPage from "./pages/CreateEventPage";
import EventPage from "./pages/EventPage";
import { supabase } from "./supabaseClient";
import NotFound from "./pages/NotFound";
import { useSession } from "./contexts/UserContext";

function App() {
  const navigate = useNavigate()
  const { session } = useSession();
  const {
    data: events,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase.from("events").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });

  const { data: authors } = useQuery({
    queryKey: ["authors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("authors")
        .select("*")
        .eq("author", session?.user?.email.split("@")[0])
        .maybeSingle();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });

  if (isError) {
    console.error("Error fetching events:", error);
    return (
      <p className="text-red-500">
        Failed to load events. Please try again later.
      </p>
    );
  }

  return (
    <main className="w-full mx-auto">
      <Nav className="sticky" />
      <Login />
      <Routes>
        <Route
          path="/"
          element={
            isLoading ? (
              <div className="flex justify-center items-center h-screen">
                <div className=" loading loading-spinner rounded-full w-16 h-16"></div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                {authors && <a onClick={()=>{navigate('/create-event')}} className="btn w-fit">Create an event</a>}

                <Events events={events} />
              </div>
            )
          }
        />
        <Route path="/:title/:id" element={<EventPage />} />
        <Route path="/:title/:id/edit" element={<CreateEventPage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;

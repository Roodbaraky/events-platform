import { useQuery } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import Events from "./components/Events";
import Login from "./components/Login";
import Nav from "./components/Nav";
import CreateEventPage from "./pages/CreateEventPage";
import EventPage from "./pages/EventPage";
import { supabase } from "./supabaseClient";

function App() {
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
      <Nav />
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
              <Events events={events} />
            )
          }
        />
        <Route path="/:title/:id" element={<EventPage />} />
        <Route path="/:title/:id/edit" element={<CreateEventPage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
      </Routes>
    </main>
  );
}

export default App;

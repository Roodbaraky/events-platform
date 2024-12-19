import { useQuery } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import Events from "./components/Events";
import Login from "./components/Login";
import Nav from "./components/Nav";
import CreateEventPage from "./pages/CreateEventPage";
import EventPage from "./pages/EventPage";
import NotFound from "./pages/NotFound";
import { supabase } from "./supabaseClient";
import Loader from "./components/Loader";
import HomePage from "./pages/HomePage";
import MyPage from "./pages/MyPage";
import ErrorPopup from "./components/ErrorPopup";
import { useState } from "react";

function App() {
  const {
    data: events,
    isLoading,
    isError:isEventsError,
    error:eventsError,
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
  const [error, setError] = useState(null);

  const handleError = (message) => {
    setError(message);
  };

  const closeErrorPopup = () => {
    setError(null);
  };
  if (isEventsError) {
    handleError(eventsError)

    return (
      <p className="text-red-500">
        Failed to load events. Please try again later.
      </p>
    );
  }

  return (
    <main className="w-full mx-auto min-h-screen flex flex-col">
      <Nav className="sticky" />
      <Login />
      <a className="btn" onClick={()=>handleError("Test error")}>Cause error</a>
      {error && <ErrorPopup errorMessage={error} onClose={closeErrorPopup} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/events"
          element={
            isLoading ? (
              <Loader />
            ) : (
              <div className="flex flex-col items-center">
                <Events events={events} />
              </div>
            )
          }
        />
        <Route path="/:title/:id" element={<EventPage />} />
        <Route path="/:title/:id/edit" element={<CreateEventPage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;

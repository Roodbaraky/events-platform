import { useQuery } from "@tanstack/react-query";
import { useSession } from "../contexts/UserContext";
import { supabase } from "../supabaseClient";
import EventCard from "../components/EventCard";
import Loader from "../components/Loader";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useError } from "../contexts/ErrorContext";

function MyPage() {
  const { session, isLoading } = useSession();
  const { triggerError } = useError();
  const navigate = useNavigate();

  const {
    data: events,
    isLoading: isEventsLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user_events"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_user_events", {
        user_id: session?.user?.id,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    enabled: !!session,
  });

  const { data: userData } = useQuery({
    queryKey: ["user_data"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("authors")
        .select("*")
        .eq("id", session?.user?.id)
        .maybeSingle();

      if (data) {
        return data;
      }
      if (error) {
        throw new Error(error.message);
      }
      return false;
    },
    enabled: !!session,
  });

  useEffect(() => {
    if (!isLoading) {
      if (!session) {
        navigate("/401");
      }
    }
  }, [isLoading, navigate, session]);

  useEffect(() => {
    if (isError) {
      triggerError(error?.message);
    }
  }, [error?.message, isError, triggerError]);

  return (
    <section className="min-h-screen"> 
      <h1 className="m-1 text-4xl underline">My Account</h1>
      <div className="m-2">
        <p>Email: {session?.user?.email}</p>
        <p>Account type: {userData ? "Staff" : "User"}</p>
        <p>Subscribed Events: {events?.length}</p>
      </div>

      <h1 className="m-1 text-4xl underline">My Events</h1>

      {events && (
        <div className="flex flex-wrap items-center justify-center gap-4 p-2">
          {events.map((event, index) => (
            <EventCard key={`${event.event_id} ${index}`} event={event} />
          ))}
        </div>
      )}
      {(isEventsLoading || isLoading) && <Loader />}
    </section>
  );
}

export default MyPage;

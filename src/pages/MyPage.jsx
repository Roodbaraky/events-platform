import { useQuery } from "@tanstack/react-query";
import { useSession } from "../contexts/UserContext";
import { supabase } from "../supabaseClient";
import EventCard from "../components/EventCard";
import Loader from "../components/Loader";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MyPage() {
  const { session, isLoading } = useSession();
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

  useEffect(() => {
    if (!isLoading) {
      if (!session) {
        navigate("/405");
      }
    }
  }, [isLoading, navigate, session]);

  return (
    <>
      {events && (
        <div className="flex flex-wrap items-center justify-center gap-4 p-2">
          {events.map((event, index) => (
            <EventCard key={`${event.event_id} ${index}`} event={event} />
          ))}
        </div>
      )}
      {(isEventsLoading || isLoading) && <Loader />}
    </>
  );
}

export default MyPage;

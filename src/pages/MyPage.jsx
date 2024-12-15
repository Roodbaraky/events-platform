import { useQuery } from "@tanstack/react-query";
import { useSession } from "../contexts/UserContext";
import { supabase } from "../supabaseClient";
import EventCard from "../components/EventCard";
import Loader from "../components/Loader";

function MyPage() {
  const { session } = useSession();
  const {
    data: events,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user_events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc("get_user_events", { user_id: session?.user?.id });
  
      if (error) {
        throw new Error(error.message);
      }
  
      return data;
    },
  });
  
  
  return (
    <>
      {events && (
        <div className="flex flex-wrap items-center justify-center gap-4 p-2">
          {events.map((event) => (
            <EventCard key={event.event_id} event={event} />
          ))}
        </div>
      )}
      {isLoading && <Loader />}
    </>
  );
}

export default MyPage;

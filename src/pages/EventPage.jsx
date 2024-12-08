import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import EventPageCard from "../components/EventPageCard";
import { supabase } from "../supabaseClient";
import Loader from "../components/Loader";

function EventPage() {
  const { id } = useParams();


  const { data: eventData, isLoading, error } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", +id);

      if (error) {
        throw new Error(error.message);
      }

      return data[0];
    },
    enabled: !!id, 
  });

  if (isLoading) {
    return <Loader/>;
  }

  if (error) {
    return <div>Error loading event: {error.message}</div>;
  }

  return (
    <section className="p-4">
      {eventData ? <EventPageCard eventData={eventData} /> : <div>No event found</div>}
    </section>
  );
}

export default EventPage;

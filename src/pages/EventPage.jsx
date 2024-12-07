import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventPageCard from "../components/EventPageCard";
import { supabase } from "../supabaseClient";
function EventPage() {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  useEffect(() => {
    const getEventData = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", +id);

      if (error) {
        console.error("Error fetching events:", error);
      } else {
        console.log(data[0]);
        setEventData(data[0]);
      }
    };

    getEventData();
  }, [id]);
  return (
    <section className="p-4">
      {eventData != null ? <EventPageCard eventData={eventData} /> : <></>}
    </section>
  );
}

export default EventPage;

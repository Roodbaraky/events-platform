import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import EventPageCard from "../components/EventPageCard";
function EventPage() {
  const { title, id } = useParams();
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
  return <>{eventData!=null ? <EventPageCard eventData={eventData} /> : <></>}</>;
}

export default EventPage;

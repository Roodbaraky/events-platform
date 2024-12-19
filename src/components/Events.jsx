import { useError } from "../contexts/ErrorContext";
import EventCard from "./EventCard";

function Events({ events }) {
  const {triggerError} = useError()
  return (
    <section className="flex flex-wrap items-center justify-center gap-4 p-2">
      <a className="btn" onClick={()=>triggerError("Test")}>Test Error</a>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
}

export default Events;

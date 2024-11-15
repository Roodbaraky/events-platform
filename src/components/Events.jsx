import EventCard from "./EventCard";

function Events({ events }) {
  return (
    <section className="flex m-auto p-2 gap-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
}

export default Events;

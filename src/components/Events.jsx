import EventCard from "./EventCard";

function Events({ events }) {

  return (
    <section className="flex flex-wrap items-center justify-center gap-4 p-2"> 
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
}

export default Events;

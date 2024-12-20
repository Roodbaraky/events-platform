import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/UserContext";
import EventSignupControls from "./EventSignupControls";

function EventCard({ event }) {
  const {
    title,
    description,
    start_datetime,
    end_datetime,
    img_url,
    author,
    id,
    location
  } = event;
  const [start_date, start_time] = start_datetime.split("T");
  const [, end_time] = end_datetime.split("T");
  const navigate = useNavigate();
  const { session } = useSession();

  return (
    <div
      className="group relative flex min-w-80 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-400 transition-all duration-300 ease-in-out sm:w-[30%]"
      onClick={(e) => {
        if (!["signup", "AddToCalendar"].includes(e.target.id)) {
          navigate(`/${title}/${id}`);
        }
      }}
    >
      <h2 className="font-semibold text-lg">{title}</h2>
      <img
        className="h-40 w-full object-cover"
        src={img_url}
        alt={`Image of ${title}: ${description}`}
      />
      <p className="text-wrap text-sm">{description}</p>
      <p className="text-xs">{start_date}</p>
      <p className="text-xs">
        {start_time} - {end_time}
      </p>
      <p className="text-xs">{location}</p>
      <p className="text-xs font-light">{author}</p>

      <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <EventSignupControls eventData={event} session={session} />
      </div>
    </div>
  );
}

export default EventCard;

import { useNavigate } from "react-router-dom";
import { formatDuration } from "../../utils/FormatDuration";
import AddToCalendar from "./AddToCalendarBtn";
import SignUp from "./SignUpBtn";

function EventCard({ event }) {
  const {
    title,
    description,
    start_datetime,
    end_datetime,
    img_url,
    author,
    id,
  } = event;
  const [start_date, start_time] = start_datetime.split("T");
  const duration = formatDuration(start_datetime, end_datetime);
  const navigate = useNavigate();

  return (
    <div
      className="relative rounded-lg flex flex-col justify-center items-center w-full sm:w-[30%] border border-gray-400 transition-all ease-in-out duration-300 cursor-pointer group"
      onClick={(e) => {
        if (!["signup", "AddToCalendar"].includes(e.target.id)) {
          navigate(`/${title}/${id}`);
        }
      }}
    >
      <h2 className="font-semibold">{title}</h2>
      <img
        className="w-full h-40 object-cover"
        src={img_url}
        alt={`Image of ${title}: ${description}`}
      />
      <p className="text-wrap text-sm">{description}</p>
      <p className="text-xs">{start_date}</p>
      <p className="text-xs">{start_time}</p>
      <p className="text-xs font-light">{author}</p>

      <div className="absolute inset-0 bg-black bg-opacity-20 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
        <div className="flex gap-2 self-end">
          <SignUp id={id} duration={duration} />
          <AddToCalendar event={event} />
        </div>
      </div>
    </div>
  );
}

export default EventCard;

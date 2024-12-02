// TODO:
// add navigate to event page onClick
// link signup to supabase insert
// link add to cal to google cal api
// useState to manage signedUp / added to calendar?
// conditionally render 'edit' btn if current user === event author

import { useNavigate } from "react-router-dom";
import { formatDuration } from "../../utils/FormatDuration";
import AddToCalendar from "./AddToCalendarBtn";
import SignUp from "./SignUpBtn";

// --> edit event page / dialogue
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
  const duration = formatDuration(start_datetime, end_datetime)
  const navigate = useNavigate()

  return (
    <div
      className="relative rounded-lg flex min-w-40 w-full min-h-56 border border-gray-400 flex-col justify-center items-center transition-all ease-in-out duration-300 cursor-pointer group"
      onClick={(e) => {
        if (!["signup", "AddToCalendar"].includes(e.target.id)) {
          console.log("clicked");
          navigate(`/${title}/${id}`)
        }
      }}
    >
      <h2 className="font-semibold">{title}</h2>
      <img className="w-72 h-40 object-cover" src={img_url} alt={`Image of ${title}: ${description}`} />
      <p className="text-wrap text-sm">{description}</p>
      <p className="text-xs">{start_date}</p>
      <p className="text-xs">{start_time}</p>
      <p className="text-xs font-light">{author}</p>

      <div className="absolute inset-0 bg-black bg-opacity-20 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg ">
        <div className="flex gap-2  self-end">
          <SignUp id={id} duration={duration}/>
          <AddToCalendar event={event} />
        </div>
      </div>
    </div>
  );
}

export default EventCard;

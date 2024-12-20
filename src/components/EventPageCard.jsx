import { formatLongDate } from "../../utils/FormatLongDate";
import { lorem } from "../../utils/Lorem";
import { useSession } from "../contexts/UserContext";
import EventPageSignupControls from "./EventPageSignupControls";

function EventPageCard({ eventData }) {
  const {
    title,
    description,
    start_datetime,
    end_datetime,
    img_url,
    author,
    body,
    location
  } = eventData;
  const [start_date, start_time] = start_datetime.split("T");
  const [end_date, end_time] = end_datetime.split("T");
  const longDate = formatLongDate(start_date);
  const longEndDate = formatLongDate(end_date);
  const { session } = useSession();

  return (
    <div className="relative m-auto flex min-h-screen w-auto flex-col items-center justify-start rounded-lg p-4">
      <div className="flex max-h-full w-full flex-col items-center">
        <img
          className="aspect-video w-full rounded-3xl object-cover shadow-xl sm:aspect-ultraCinematic"
          src={img_url}
          alt={title}
        />
        <div className="mt-2 flex sm:hidden">
          <EventPageSignupControls session={session} eventData={eventData} />
        </div>
        <div className="flex w-full justify-between p-2">
          <div className="min-w-3/5 flex flex-col gap-2">
            <div className="flex flex-col">
              <p className="self-start">{longDate}</p>
              <h2 className="self-start text-5xl font-semibold">{title}</h2>
              <div className="self-start">
                <h3>Location:</h3>
                <p>{location}</p>
                <h3>Date and time:</h3>
                <p className="self-start">
                  {longDate}
                  {!(longDate == longEndDate) && " - " + longEndDate}
                </p>
                <p className="text self-start">
                  {start_time} - {end_time}
                </p>
              </div>
            </div>
            <p className="text-wrap text-sm">{description}</p>
            <p className="text-xs font-light">{author}</p>
            <div>{body ? body : lorem}</div>
          </div>

          <div className="hidden sm:flex">
            <EventPageSignupControls session={session} eventData={eventData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPageCard;

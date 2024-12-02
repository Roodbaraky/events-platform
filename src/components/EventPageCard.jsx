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
    body
  } = eventData;
  const [start_date, start_time] = start_datetime.split("T");
  const [end_date, end_time] = end_datetime.split("T");
  const longDate = formatLongDate(start_date);
  const longEndDate = formatLongDate(end_date);
  const { session } = useSession();

  return (
    <div className="relative rounded-lg flex w-auto min-h-screen flex-col justify-center items-center  m-auto p-4">
      <div className="flex flex-col items-center w-full max-h-full mt-12">
        <img
          className="w-full aspect-ultraCinematic object-cover rounded-3xl shadow-xl"
          src={img_url}
          alt={title}
        />
         <div className="flex sm:hidden ">
            <EventPageSignupControls session={session} eventData={eventData}/>
          </div>
        <div className="flex justify-between w-full p-2">
          <div className="flex flex-col min-w-3/5 gap-2">
            <div className="flex flex-col">
              <p className="self-start">{longDate}</p>
              <h2 className="font-semibold text-5xl self-start">{title}</h2>
              <div className="self-start">
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
            <div>
              {body?body:lorem}
            </div>
          </div>

          <div className="hidden sm:flex">
            <EventPageSignupControls session={session} eventData={eventData}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPageCard;


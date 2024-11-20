import { formatDuration } from "../../utils/FormatDuration";
import { formatLongDate } from "../../utils/FormatLongDate";
import AddToCalendar from "./AddToCalendar";
import SignUp from "./SignUp";

function EventPageCard({ eventData }) {
  const {
    title,
    description,
    start_datetime,
    end_datetime,
    img_url,
    author,
    id,
  } = eventData;
  const [start_date, start_time] = start_datetime.split("T");
  const [end_date, end_time] = end_datetime.split("T");
  const duration = formatDuration(start_datetime, end_datetime);
  const longDate = formatLongDate(start_date);
  const longEndDate = formatLongDate(end_date);

  return (
    <div className="relative rounded-lg flex w-auto h-screen  flex-col justify-center items-center  m-auto p-4">
      <div className="flex flex-col items-center w-4/5 max-h-full mt-12">
        <img
          className="w-full aspect-ultraCinematic object-cover rounded-3xl shadow-xl"
          src={img_url}
          alt={title}
        />
        <div className="flex justify-between w-full p-2">
          <div className="flex flex-col w-3/5 gap-2">
            <div className="flex flex-col">
              <p className="self-start">
                {longDate}
                
              </p>
              <h2 className="font-semibold text-5xl self-start">{title}</h2>
              <div className="self-start">
                <h3>Date and time:</h3>
                <p className="self-start">{longDate}{!(longDate == longEndDate) && " - " + longEndDate}</p>
                <p className="text self-start">
                  {start_time} - {end_time}
                </p>
              </div>
            </div>
            <p className="text-wrap text-sm">{description}</p>
            <p className="text-xs font-light">{author}</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              voluptates laudantium quod facere, sint odio, atque, repellat
              consectetur eaque suscipit sequi consequuntur nesciunt delectus
              corrupti minus sed necessitatibus doloremque expedita. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Magni culpa inventore
              quas ipsam aliquam harum nihil alias assumenda placeat fugiat,
              quaerat nulla doloremque, ullam quis exercitationem odio laborum
              magnam dolorem. Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Voluptatum, neque est. Et voluptatibus illo eos
              dolor incidunt qui impedit delectus, cum expedita doloribus quo
              provident assumenda, est porro at. Enim? Lorem ipsum, dolor sit
              amet consectetur adipisicing elit. Aut qui iure cum velit quo
              eligendi atque, architecto nemo corporis assumenda eius! Odio
              eligendi voluptatibus voluptate earum molestias cum vitae nam.
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente
              numquam sunt itaque aut facere ut temporibus magni soluta
              laudantium atque nesciunt fuga cum omnis, enim aperiam iste, ab
              molestias rerum? Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Voluptatem ipsam, temporibus culpa reiciendis
              reprehenderit necessitatibus dolor, odio beatae delectus, impedit
              incidunt explicabo voluptate nemo aspernatur? Magni corrupti nisi
              dolore. Quis. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Accusantium aperiam praesentium animi pariatur perspiciatis
              odio. Voluptatibus fugiat labore tenetur laborum aspernatur eos.
              Odit quam ab pariatur culpa exercitationem esse laudantium? Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Ex aspernatur
              quae mollitia ut provident praesentium debitis sed doloremque
              quaerat eveniet fuga, nobis soluta, alias quibusdam enim nulla
              eius nesciunt ipsum? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Expedita cum aliquid nihil dicta suscipit
              aperiam ea excepturi illum, mollitia facere quam fugiat blanditiis
              possimus voluptate repudiandae incidunt, id quasi dolorum? Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Nam quos amet
              omnis. Odio perspiciatis, adipisci consectetur quia quae nam sint
              culpa magnam quod error qui iure distinctio laboriosam commodi
              incidunt!
            </p>
          </div>

          <div>
            <div className="flex self-start gap-2 sticky">
              <SignUp id={id} duration={duration} />
              <AddToCalendar event={eventData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPageCard;
// finish updating this and commit

import { useNavigate } from "react-router-dom";

function CarouselEventCard({ event }) {
  const { title, id, description, start_datetime, img_url, location } = event;
  const navigate = useNavigate();

  return (
    <div
      className="group relative flex h-96 w-[900px] max-w-full cursor-pointer flex-col overflow-hidden rounded-lg bg-white shadow-lg"
      onClick={(e) => {
        if (!["signup", "AddToCalendar"].includes(e.target.id)) {
          navigate(`/${title}/${id}`);
        }
      }}
    >
      {img_url ? (
        <img src={img_url} alt={title} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-300">
          <span className="text-gray-500">Image Unavailable</span>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 bg-gradient-to-t from-black p-2 opacity-100 transition-opacity duration-300 sm:opacity-30 sm:group-hover:opacity-100">
        <div className="via-black to-transparent p-2 opacity-90">
          <h3 className="text-center text-xl font-semibold text-white">
            {title}
          </h3>
        </div>
        <p className="line-clamp-3 text-center text-sm italic text-white">
          {location}
        </p>
        <p className="line-clamp-3 text-center text-sm text-white">
          {description}
        </p>
        <p className="mt-2 text-center text-sm text-white">
          {new Date(start_datetime).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default CarouselEventCard;

import { useNavigate } from "react-router-dom";

function CarouselEventCard({ event }) {
  const { title, id, description, start_datetime, img_url, location } = event;
  const navigate = useNavigate();

  return (
    <div
      className="relative flex flex-col bg-white rounded-lg shadow-lg w-[900px] max-w-full h-96 overflow-hidden group cursor-pointer"
      onClick={(e) => {
        if (!["signup", "AddToCalendar"].includes(e.target.id)) {
          navigate(`/${title}/${id}`);
        }
      }}
    >
      {img_url ? (
        <img src={img_url} alt={title} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500">Image Unavailable</span>
        </div>
      )}

  
      <div
        className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 
        opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black"
      >
        <div className="p-2 via-black to-transparent opacity-90">
          <h3 className="text-xl font-semibold text-white text-center">
            {title}
          </h3>
        </div>
        <p className="text-sm text-white italic line-clamp-3 text-center">
          {location}
        </p>
        <p className="text-sm text-white line-clamp-3 text-center">
          {description}
        </p>
        <p className="text-sm text-white mt-2 text-center">
          {new Date(start_datetime).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default CarouselEventCard;

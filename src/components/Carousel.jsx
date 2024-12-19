import { useEffect, useState } from "react";
import CarouselEventCard from "./CarouselEventCard";

function Carousel({ events }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [events]);

  if (!events || events.length === 0) return null;

  return (
    <div className="relative w-full flex items-center justify-center">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${events.length * 100}%`,
        }}
      >
        {events.map((event, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full flex justify-center"
            style={{ width: "100%" }}
          >
            <CarouselEventCard event={event} />
          </div>
        ))}
      </div>
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full"
        onClick={() =>
          setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? events.length - 1 : prevIndex - 1
          )
        }
      >
        ◀
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full"
        onClick={() =>
          setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length)
        }
      >
        ▶
      </button>
    </div>
  );
}

export default Carousel;

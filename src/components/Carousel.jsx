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

  if (!events || events.length === 0)
    return <div className="skeleton h-96 w-[900px] max-w-full"></div>;

  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden">
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
            className="flex w-full flex-shrink-0 justify-center"
            style={{ width: "100%" }}
          >
            <CarouselEventCard event={event} />
          </div>
        ))}
      </div>
      <button
        className="btn btn-ghost absolute left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-s-2xl p-2 text-2xl text-white opacity-50 hover:opacity-100"
        onClick={() =>
          setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? events.length - 1 : prevIndex - 1,
          )
        }
      >
        ◀
      </button>
      <button
        className="btn btn-ghost absolute right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-e-2xl p-2 text-2xl text-white opacity-50 hover:opacity-100"
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

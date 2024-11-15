function EventCard({ event }) {
  const { title, description, datetime, img_url, author, id } = event;
  const [date, time] = datetime.split("T");
  return (
    <div
      className="relative rounded-lg flex w-40 border border-gray-400 flex-col justify-center items-center transition-all ease-in-out duration-300 cursor-pointer group"
      onClick={(e) => {
        if (!["signup", "AddToCalendar"].includes(e.target.id)) {
          console.log("clicked");
        }
      }}
    >
      <h2 className="font-semibold">{title}</h2>
      <img className="w-32 h-24 object-contain" src={img_url} alt={title} />
      <p className="text-wrap text-sm">{description}</p>
      <p className="text-xs">{date}</p>
      <p className="text-xs">{time}</p>
      <p className="text-xs font-light">{author}</p>

      <div className="absolute inset-0 bg-black bg-opacity-70 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg ">
        <div className="flex gap-2  self-end">
          <button
            id="signup"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
            onClick={() => console.log(`Sign up/Remove clicked for ${id}`)}
          >
            Sign Up
          </button>
          <button
            id="AddToCalendar"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-300"
            onClick={() => console.log(`Add to Calendar clicked for ${id}`)}
          >
            Add to Calendar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;

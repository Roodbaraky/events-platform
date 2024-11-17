function AddToCalendar({ event }) {
  const { title, start_datetime, end_datetime, description, location, id } =
    event;

  const handleAddToCalendar = () => {
    const formattedStart = start_datetime.replace(/-|:|\.\d\d\d/g, "");
    const formattedEnd = end_datetime.replace(/-|:|\.\d\d\d/g, "");
    const calendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${title}&dates=${formattedStart}/${formattedEnd}&details=${description}&location=${location}`;

    window.open(calendarUrl, "_blank");
  };

  return (
    <button
      id="AddToCalendar"
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-300"
      onClick={() => {
        console.log(`Add to Calendar clicked for ${id}`);
        handleAddToCalendar();
      }}
    >
      Add to Calendar
    </button>
  );
}
export default AddToCalendar;

function AddToCalendar({ event }) {
  const { title, start_datetime, end_datetime, description, location } = event;

  const getCalendarUrl = () => {
    const formattedStart = start_datetime.replace(/-|:|\.\d\d\d/g, "");
    const formattedEnd = end_datetime.replace(/-|:|\.\d\d\d/g, "");
    const showingURL = window.location.href;
    const details = description + "%0D%0D" + `Showing link: ${showingURL}`;

    return `https://calendar.google.com/calendar/event?action=TEMPLATE&text=${title}&dates=${formattedStart}/${formattedEnd}&details=${details}&location=${location}`;
  };

  const handleAddToCalendar = () => {
    const calendarUrl = getCalendarUrl();
    window.open(calendarUrl, "_blank");
  };

  return (
    <button
      id="AddToCalendar"
      className="rounded bg-green-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-green-700"
      onClick={() => {
        handleAddToCalendar();
      }}
    >
      Add to Calendar
    </button>
  );
}

export default AddToCalendar;

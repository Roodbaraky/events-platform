
// import { useSession } from "../contexts/UserContext";

function AddToCalendar({ event }) {
  const { title, start_datetime, end_datetime, description, location } = event;
  // const { googleAccessToken, loginWithGoogle } = useSession();

  const getCalendarUrl = () => {
    const formattedStart = start_datetime.replace(/-|:|\.\d\d\d/g, "");
    const formattedEnd = end_datetime.replace(/-|:|\.\d\d\d/g, "");
    const showingURL = window.location.href
    const details = description + "%0D%0D" + `Showing link: ${showingURL}`

    return `https://calendar.google.com/calendar/event?action=TEMPLATE&text=${
      title
    }&dates=${formattedStart}/${formattedEnd}&details=${
      details
    }&location=${location}`;
  };

  const handleAddToCalendar = () => {
    const calendarUrl = getCalendarUrl();
    window.open(calendarUrl, "_blank");
  };

  return (
    <button
      id="AddToCalendar"
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-300"
      onClick={() => {
        // if (googleAccessToken) {
        //   handleAddToCalendar();
        // } else {
        //   loginWithGoogle();
        // }
        handleAddToCalendar()
      }}
    >
      Add to Calendar
    </button>
  );
}

export default AddToCalendar;

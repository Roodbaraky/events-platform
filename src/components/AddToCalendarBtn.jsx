
import { useSession } from "../contexts/UserContext";

function AddToCalendar({ event }) {
  const { title, start_datetime, end_datetime, description, location, id } = event;
  const { googleAccessToken, loginWithGoogle } = useSession();

  const getCalendarUrl = () => {
    const formattedStart = start_datetime.replace(/-|:|\.\d\d\d/g, "");
    const formattedEnd = end_datetime.replace(/-|:|\.\d\d\d/g, "");
    return `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
      title
    )}&dates=${formattedStart}/${formattedEnd}&details=${encodeURIComponent(
      description
    )}&location=${encodeURIComponent(location)}`;
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
        if (googleAccessToken) {
          handleAddToCalendar();
        } else {
          loginWithGoogle();
        }
      }}
    >
      Add to Calendar
    </button>
  );
}

export default AddToCalendar;

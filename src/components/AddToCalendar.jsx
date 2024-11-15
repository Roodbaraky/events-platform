function AddToCalendar({ title, startDateTime, endDateTime, description, location }) {
    const handleAddToCalendar = () => {
        // Format the start and end datetime to Google Calendar format YYYYMMDDTHHmmSSZ
        // This might not be necessary
        const formattedStart = startDateTime.toISOString().replace(/-|:|\.\d\d\d/g, '');
        const formattedEnd = endDateTime.toISOString().replace(/-|:|\.\d\d\d/g, '');

        
        const calendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(title)}&dates=${formattedStart}/${formattedEnd}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;

        window.open(calendarUrl, '_blank');
    };

    return (
        <button onClick={handleAddToCalendar}>
            Add to Google Calendar
        </button>
    );
}
export default AddToCalendar

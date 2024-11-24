function EditBtn({setEditing}) {
  return (
    <button
      id="AddToCalendar"
      className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-300"
      onClick={() => {
        console.log(`editing`);
        setEditing(true);
      }}
    >
      Edit
    </button>
  );
}

export default EditBtn;

import { useNavigate } from "react-router-dom";

function EditBtn({title,id}) {
  const navigate = useNavigate();
  return (
    <button
      id="AddToCalendar"
      className="rounded bg-orange-400 px-4 py-2 text-white transition-colors duration-300 hover:bg-orange-600"
      onClick={() => {
        navigate(`/${title}/${id}/edit`);
      }}
    >
      Edit
    </button>
  );
}

export default EditBtn;

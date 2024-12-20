import { useNavigate, useParams } from "react-router-dom";

function EditBtn() {
  const navigate = useNavigate();
  const { title, id } = useParams();
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

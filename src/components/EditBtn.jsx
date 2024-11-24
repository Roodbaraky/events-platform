import { useNavigate, useParams } from "react-router-dom";

function EditBtn() {
  const navigate = useNavigate();
  const { title, id} = useParams();
  return (
    <button
      id="AddToCalendar"
      className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-300"
      onClick={() => {
      navigate(`/${title}/${id}/edit`)
      }}
    >
      Edit
    </button>
  );
}

export default EditBtn;

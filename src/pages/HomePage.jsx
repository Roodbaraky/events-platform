import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/UserContext";
import Carousel from "../components/Carousel";

function HomePage({ events }) {
  const navigate = useNavigate();
  const { session } = useSession();
  return (
    <section className="flex flex-grow flex-col items-center justify-center gap-4">
      <h1 className="text-7xl">Welcome.</h1>
      <Carousel events={events} />
      <div className="flex gap-2">
        <a className="btn btn-primary" onClick={() => navigate("/events")}>
          Browse Events
        </a>
        <a
          className="btn btn-outline"
          onClick={() => {
            session
              ? navigate("/mypage")
              : document.getElementById("login")?.showModal();
          }}
        >
          My page
        </a>
      </div>
    </section>
  );
}

export default HomePage;

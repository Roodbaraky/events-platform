import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate()
    return (
      <section className="flex flex-col items-center justify-center flex-grow gap-4">
        <h1 className="text-7xl">Welcome.</h1>
        <div className="flex gap-2">
          <a className="btn btn-primary" onClick={()=>navigate("/events")}>Browse Events</a>
          <a className="btn btn-outline" onClick={()=>navigate("/mypage")}>My page</a>
        </div>
      </section>
    );
  }
  
  export default HomePage;
  
import { useEffect } from "react";
import { BiHome } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function Nav({ setSession, session }) {
  useEffect(() => {
    if (session) {
      console.log(session.user.email);
      document.getElementById("login").close();
    }
  }, [session]);
  const navigate = useNavigate();
  return (
    <div className="flex sm:flex-row justify-between items-center">
      <h1
        className="hidden text-5xl cursor-pointer sm:block px-2"
        onClick={() => {
          navigate("/");
        }}
      >
        EventLite
      </h1>
      <div
        className="px-4 btn"
        onClick={() => {
          navigate("/");
        }}
      >
        <BiHome className="scale-150 px- sm:hidden pointer-events-none" />
      </div>
      <div className="p-2">
        {!session ? (
          <a
            className="btn"
            onClick={() => {
              document.getElementById("login").showModal();
            }}
          >
            Log in / Sign Up
          </a>
        ) : (
          <div className="flex gap-2">
            <p className="flex items-center">
              {session.user.email.split("@")[0]}
            </p>
            <a
              className="btn"
              onClick={() => {
                setSession(null);
              }}
            >
              Log Out
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;

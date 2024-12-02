import { useEffect } from "react";
import { BiHome } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/UserContext";
import { supabase } from "../supabaseClient";

function Nav() {
  const { session, setSession } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      console.log(session.user.email);
      document.getElementById("login").close();
    }
  }, [session]);

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
        className="px-4 btn  sm:hidden"
        onClick={() => {
          navigate("/");
        }}
      >
        <BiHome className="scale-150  pointer-events-none" />
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
                supabase.auth.signOut().then(() => setSession(null));
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

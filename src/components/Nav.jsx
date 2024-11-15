import { useEffect } from "react";

function Nav({ setSession, session }) {
  useEffect(() => {
    if(session){
      console.log(session.user.email)
      document.getElementById('login').close()
    }
  }, [session]);
  return (
    <div className="flex justify-between">
      <h1 className="text-5xl">EventLite</h1>
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
            <p className="flex items-center">{session.user.email.split('@')[0]}</p>
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

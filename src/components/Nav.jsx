import { useEffect } from "react";

function Nav({ setSession, session }) {
  useEffect(() => {
    if(session){
      
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
          <a
            className="btn"
            onClick={() => {
              setSession(null);
              localStorage.clear();
            }}
          >
            Log Out
          </a>
        )}
      </div>
    </div>
  );
}

export default Nav;

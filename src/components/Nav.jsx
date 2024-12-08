import { useEffect } from "react";
import { BiHome } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/UserContext";
import { supabase } from "../supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";

function Nav() {
  const { session, logout } = useSession();
  const navigate = useNavigate();

  const { data: authors, isFetching, isError } = useQuery({
    queryKey: ["authors", session?.user?.email],
    queryFn: async () => {
      if (!session) return null;

      const { data, error } = await supabase
        .from("authors")
        .select("*")
        .eq("author", session.user.email.split("@")[0])
        .maybeSingle();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    enabled: !!session,
  });


  useEffect(() => {
    if (session) {
      document.getElementById("login")?.close();
    }
  }, [session]);

  return (
    <div className="flex sm:flex-row justify-between items-center sticky top-0 z-10 bg-base-100">
      <h1
        className="hidden text-5xl cursor-pointer sm:flex px-2"
        onClick={() => {
          navigate("/");
        }}
      >
        EventLite
      </h1>
      <div
        className="px-4 btn sm:hidden mx-1"
        onClick={() => {
          navigate("/");
        }}
      >
        <BiHome className="scale-150 pointer-events-none" />
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
            {authors && !isFetching && !isError && (
               <>
               <a
                 onClick={() => {
                   navigate("/create-event");
                 }}
                 className="hidden sm:flex btn btn-primary w-fit"
               >
                 Create an event
               </a>
               <a
                 onClick={() => {
                   navigate("/create-event");
                 }}
                 className="sm:hidden btn btn-primary w-fit"
               >
                 <FaPlus />
               </a>
             </>
            )}
            <a
              className="btn"
              onClick={async () => {
                await supabase.auth.signOut();
                logout(); 
                navigate("/");
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

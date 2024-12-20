import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { BiHome } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useError } from "../contexts/ErrorContext";
import { useSession } from "../contexts/UserContext";
import { supabase } from "../supabaseClient";

function Nav() {
  const { session, logout } = useSession();
  const navigate = useNavigate();
  const { triggerError } = useError();

  const {
    data: authors,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["authors", session?.user?.email],
    queryFn: async () => {
      if (!session) return null;

      const { data, error } = await supabase
        .from("authors")
        .select("*")
        .eq("author", session.user.email.split("@")[0])
        .maybeSingle();

      if (error) {
        triggerError("Error fetching data, please try again");
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
    <div className="sticky top-0 z-10 flex items-center justify-between bg-base-100 sm:flex-row">
      <h1
        className="hidden cursor-pointer px-2 text-5xl hover:text-primary sm:flex"
        onClick={() => {
          navigate("/");
        }}
      >
        EventLite
      </h1>
      <div
        className="btn mx-1 px-4 sm:hidden"
        onClick={() => {
          navigate("/");
        }}
      >
        <BiHome className="pointer-events-none scale-150" />
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
            <a
              className="flex cursor-pointer items-center hover:text-primary"
              onClick={() => {
                navigate("/mypage");
              }}
            >
              {session.user.email.split("@")[0]}
            </a>
            {authors && !isFetching && !isError && (
              <>
                <a
                  onClick={() => {
                    navigate("/create-event");
                  }}
                  className="btn btn-primary hidden w-fit sm:flex"
                >
                  Create an event
                </a>
                <a
                  onClick={() => {
                    navigate("/create-event");
                  }}
                  className="btn btn-primary w-fit sm:hidden"
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

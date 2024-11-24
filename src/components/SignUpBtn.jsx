import { useSession } from "../contexts/UserContext";
import { supabase } from "../supabaseClient";

function SignUp({ id, duration }) {
  const { session } = useSession();
  const handleSignUp = async () => {
    console.log(session);
 
    const { data, error } = await supabase
      .from("user_events")
      .insert({ id: session.user.id, event_id: id });
    console.log(data ? data : error);
  };
  return (
    <button
      id="signup"
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
      onClick={() => handleSignUp()}
    >
      Sign Up
    </button>
  );
}

export default SignUp;

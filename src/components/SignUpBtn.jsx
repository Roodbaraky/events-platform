import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "../contexts/UserContext";
import { supabase } from "../supabaseClient";

function SignUp({ id, duration }) {
  const { session } = useSession();
  const queryClient = useQueryClient();
  const userId = session?.user?.id;

  const { data: isSignedUp, isLoading: isQueryLoading } = useQuery({
    queryKey: ["userEvent", userId, id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_events")
        .select("*")
        .eq("id", userId)
        .eq("event_id", id)
        .maybeSingle();

      if (error) {
        throw new Error(error.message);
      }

      return !!data;
    },
    enabled: !!userId,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      if (isSignedUp) {
        const { error } = await supabase
          .from("user_events")
          .delete()
          .eq("id", userId)
          .eq("event_id", id);

        if (error) throw new Error(error.message );
      } else {
        const { error } = await supabase.from("user_events").insert({
          id: userId,
          event_id: id,
        });

        if (error) throw new Error(error.message );
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["userEvent", userId, id] });
      const previousData = queryClient.getQueryData(["userEvent", userId, id]);
      queryClient.setQueryData(["userEvent", userId, id], !isSignedUp);
      return { previousData };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(["userEvent", userId, id], context.previousData);
      console.error("Error:", err.message );
      alert("Operation failed. Please try again.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["userEvent", userId, id] });
    },
  });

  const handleClick = () => mutation.mutate();

  return (
    <button
      id="signup"
      className={`px-4 py-2 rounded transition-colors duration-300 ${
        mutation.isLoading
          ? "bg-gray-400 cursor-not-allowed"
          : isSignedUp
          ? "bg-red-500 hover:bg-red-700 text-white"
          : "bg-blue-500 hover:bg-blue-700 text-white"
      }`}
      onClick={handleClick}
      disabled={mutation.isLoading || isQueryLoading}
    >
      {isQueryLoading || mutation.isLoading ? (
        <span className="loader" />
      ) : isSignedUp ? (
        "Unregister"
      ) : (
        "Sign Up"
      )}
    </button>
  );
}

export default SignUp;

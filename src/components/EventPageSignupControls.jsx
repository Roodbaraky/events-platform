import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import AddToCalendar from "./AddToCalendarBtn";
import EditBtn from "./EditBtn";
import SignUp from "./SignUpBtn";
import useError from "../contexts/ErrorContext";

function EventSignupControls({ eventData, session }) {
  const { id, author } = eventData;
  const userId = session?.user?.id;
  const { triggerError } = useError();
  const queryClient = useQueryClient();

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
        triggerError("Error retrieving data, please try again");
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

        if (error) {
          triggerError("Error retrieving data, please try again");
        }
      } else {
        const { error } = await supabase.from("user_events").insert({
          id: userId,
          event_id: id,
        });

        if (error) {
          triggerError("Error retrieving data, please try again");
        }
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

      triggerError("Operation failed. Please try again.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["userEvent", userId, id] });
    },
  });

  const handleToggleSignup = () => {
    if (userId) {
      mutation.mutate();
    } else {
      document.getElementById("login").showModal();
    }
  };

  return (
    <div className="flex gap-2 self-start">
      <SignUp
        isSignedUp={isSignedUp}
        isLoading={isQueryLoading || mutation.isLoading}
        onClick={handleToggleSignup}
      />
      {isSignedUp && <AddToCalendar event={eventData} />}
      {session?.user?.email?.split("@")[0] === author && <EditBtn />}
    </div>
  );
}

export default EventSignupControls;

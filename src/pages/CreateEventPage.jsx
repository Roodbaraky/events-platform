import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSession } from "../contexts/UserContext";
import { supabase } from "../supabaseClient";
import Loader from "../components/Loader";

function CreateEventPage() {
  const { id } = useParams();
  const { session, isLoading } = useSession();
  const author = session?.user?.email.split("@")[0];
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuthor = async () => {
      if (isLoading) return;
      if (!author) {
        navigate("/405");
        return;
      }

      const { data, error } = await supabase
        .from("authors")
        .select("*")
        .eq("author", author)
        .maybeSingle();

      if (error || !data) {
        console.error("Authorization failed:", error?.message);
        navigate("/405");
      }
    };

    checkAuthor();
  }, [author, isLoading, navigate]);

  useEffect(() => {
    if (id) {
      const fetchEventData = async () => {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching event data:", error.message);
          alert("Failed to load event data.");
        } else if (data) {
          Object.keys(data).forEach((key) => setValue(key, data[key]));
        }
      };

      fetchEventData();
    }
  }, [author, id, navigate, session, setValue]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        const { error } = await supabase
          .from("events")
          .update({
            title: data.title,
            img_url: data.img_url,
            location: data.location,
            description: data.description,
            body: data.body,
            start_datetime: data.start_datetime,
            end_datetime: data.end_datetime,
          })
          .eq("id", id);

        if (error) {
          console.error("Error updating event:", error.message);
          alert("Failed to update event. Please try again.");
        } else {
          alert("Event updated successfully!");
          navigate(`/event/${id}`);
        }
        return;
      }

      const {
        title,
        img_url,
        location,
        description,
        body,
        start_datetime,
        end_datetime,
      } = data;

      const { data: insertedData, error } = await supabase
        .from("events")
        .insert([
          {
            title,
            img_url,
            location,
            description,
            body,
            start_datetime,
            end_datetime,
            author,
          },
        ])
        .select("id");

      if (error) {
        console.error("Error creating event:", error.message);
        alert("Failed to create event. Please try again.");
      } else {
        const newEventID = insertedData[0]?.id;
        alert("Event created successfully!");
        if (newEventID) {
          navigate(`/${title}/${newEventID}`);
        }
        reset();
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="block font-semibold">Event Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className={`p-2 rounded w-full border ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">Event Image URL</label>
            <input
              type="text"
              {...register("img_url")}
              className={`p-2 rounded w-full border ${
                errors.img_url ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.img_url && (
              <p className="text-red-500 text-sm">{errors.img_url.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">Location</label>
            <input
              {...register("location", {
                required: "location is required",
              })}
              className={`p-2 rounded w-full border ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">Event Blurb</label>
            <textarea
              {...register("description", {
                required: "Blurb is required",
              })}
              className={`p-2 rounded w-full border ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              rows="1"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label className="block font-semibold">Event Description</label>
            <textarea
              {...register("body", {
                required: "Description is required",
              })}
              className={`p-2 rounded w-full border ${
                errors.body ? "border-red-500" : "border-gray-300"
              }`}
              rows="4"
            />
            {errors.body && (
              <p className="text-red-500 text-sm">{errors.body.message}</p>
            )}
          </div>
          <div>
            <label className="block font-semibold">Start Date & Time</label>
            <input
              type="datetime-local"
              {...register("start_datetime", {
                required: "Start date and time are required",
              })}
              className={`p-2 rounded w-full border ${
                errors.start_datetime ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.start_datetime && (
              <p className="text-red-500 text-sm">
                {errors.start_datetime.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold">End Date & Time</label>
            <input
              type="datetime-local"
              {...register("end_datetime", {
                required: "End date and time are required",
                validate: (value) =>
                  new Date(value) > new Date() ||
                  "End date must be in the future",
              })}
              className={`p-2 rounded w-full border ${
                errors.end_datetime ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.end_datetime && (
              <p className="text-red-500 text-sm">
                {errors.end_datetime.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {id ? "Save Changes" : "Create Event"}
          </button>
        </form>
      )}
    </div>
  );
}

export default CreateEventPage;

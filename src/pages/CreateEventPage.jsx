import { useForm } from "react-hook-form";
import { supabase } from "../supabaseClient"; // Supabase client initialization
import { useSession } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function CreateEventPage() {
  const { session } = useSession();
  const author = session.user.email.split("@")[0];
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const {
        title,
        img_url,
        location,
        description,
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
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
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
          <label className="block font-semibold">Event Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className={`p-2 rounded w-full border ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            rows="4"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
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
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEventPage;

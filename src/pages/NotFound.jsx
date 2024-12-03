import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-base-100">
      <h1 className="text-7xl font-bold text-red-500 mb-4">Oops!</h1>
      <p className="text-xl text-base-content mb-6">
        We can&apos;t seem to find the page you&apos;re looking for.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-primary px-4 py-2 rounded-md text-white"
        >
          Go Back
        </button>
        <Link
          to="/"
          className="btn px-4 py-2 btn-success rounded-md text-white"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}

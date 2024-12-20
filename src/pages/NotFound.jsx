import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-base-100">
      <h1 className="mb-4 text-7xl font-bold text-red-500">Oops!</h1>
      <p className="mb-6 text-xl text-base-content">
        We can&apos;t seem to find the page you&apos;re looking for.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate(-2)}
          className="btn btn-primary rounded-md px-4 py-2 text-white"
        >
          Go Back
        </button>
        <Link
          to="/"
          className="btn btn-success rounded-md px-4 py-2 text-white"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}

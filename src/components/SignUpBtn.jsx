function SignUp({ isSignedUp, isLoading, onClick }) {
  return (
    <button
      id="signup"
      className={`rounded px-4 py-2 transition-colors duration-300 ${
        isLoading
          ? "cursor-not-allowed bg-gray-400"
          : isSignedUp
            ? "bg-red-500 text-white hover:bg-red-700"
            : "bg-blue-500 text-white hover:bg-blue-700"
      }`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="loading-spinner"></span>
      ) : isSignedUp ? (
        "Unregister"
      ) : (
        "Sign Up"
      )}
    </button>
  );
}

export default SignUp;

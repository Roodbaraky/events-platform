
function SignUp({ isSignedUp, isLoading, onClick }) {
  return (
    <button
      id="signup"
      className={`px-4 py-2 rounded transition-colors duration-300 ${
        isLoading
          ? "bg-gray-400 cursor-not-allowed"
          : isSignedUp
          ? "bg-red-500 hover:bg-red-700 text-white"
          : "bg-blue-500 hover:bg-blue-700 text-white"
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

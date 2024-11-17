function SignUp({id, duration}) {
  return (
    <button
    id="signup"
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
    onClick={() =>
      console.log(`Sign up/Remove clicked for ${id} ${duration}`)
    }
  >
    Sign Up
  </button>
  )
}

export default SignUp
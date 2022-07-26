import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <form className="flex flex-col items-center justify-center w-full h-full min-h-screen gap-8 p-8">
      <h1 className="text-3xl font-medium text-center">
        Hello Again! <br />
        <span className="text-lg font-light">
          Welcome Back, You've Been Missed!
        </span>
      </h1>
      <input
        type="email"
        className="w-full p-5 transition-all rounded-lg border-white focus:border-[#F26865] focus:ring-[#F26865] outline-none placeholder:font-medium"
        placeholder="Enter Email"
        required
      />
      <input
        type="password"
        className="w-full p-5 transition-all rounded-lg border-white focus:border-[#F26865] focus:ring-[#F26865] outline-none placeholder:font-medium"
        minLength={8}
        placeholder="Password"
        required
      />
      <button className="w-full p-5 rounded-lg bg-[#F26865] text-white text-xl font-medium shadow-sm shadow-[#F26865] active:bg-[#ca4747] transition-all">
        Sign In
      </button>
      <p className="text-sm font-semibold text-center text-gray-600">
        Not a member?{" "}
        <Link
          to="/signup"
          className="text-[#4792F0] hover:underline transition-all"
        >
          Register now
        </Link>
      </p>
    </form>
  );
};

export default Login;

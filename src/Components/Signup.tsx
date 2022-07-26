import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <form className="flex flex-col items-center justify-center w-full h-full min-h-screen gap-8 p-8 animate-revealPage">
      <h1 className="text-3xl font-medium text-center">
        Welcome! <br />
        <span className="text-lg font-light">Glad to have you with us!</span>
      </h1>
      <input
        type="text"
        className="w-full p-5 transition-all rounded-lg border-white focus:border-[#F26865] focus:ring-[#F26865] outline-none placeholder:font-medium"
        placeholder="First Name"
        required
      />
      <input
        type="text"
        className="w-full p-5 transition-all rounded-lg border-white focus:border-[#F26865] focus:ring-[#F26865] outline-none placeholder:font-medium"
        placeholder="Last Name"
        required
      />
      <input
        type="email"
        className="w-full p-5 transition-all rounded-lg border-white focus:border-[#F26865] focus:ring-[#F26865] outline-none placeholder:font-medium"
        placeholder="Email"
        required
      />
      <input
        type="password"
        className="w-full p-5 transition-all rounded-lg border-white focus:border-[#F26865] focus:ring-[#F26865] outline-none placeholder:font-medium"
        placeholder="Password"
        required
      />
      <input
        type="password"
        className="w-full p-5 transition-all rounded-lg border-white focus:border-[#F26865] focus:ring-[#F26865] outline-none placeholder:font-medium"
        placeholder="Password Confirmation"
        required
      />
      <button className="w-full p-5 rounded-lg bg-[#F26865] text-white text-xl font-medium shadow-sm shadow-[#F26865] active:bg-[#ca4747] transition-all">
        Sign Up
      </button>
      <p className="text-sm font-semibold text-center text-gray-600">
        Already a member?{" "}
        <Link
          to="/login"
          className="text-[#4792F0] hover:underline transition-all"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default Signup;

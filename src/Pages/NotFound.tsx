import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-6 p-12 text-3xl font-bold animate-revealPage">
      <h1 className=" text-[#F26865] ">404</h1>
      <h2 className="">Not Found</h2>
      <button
        className="w-full p-4 rounded-lg bg-[#f26765e8] text-white text-xl font-medium shadow-sm shadow-[#F26865] active:scale-90 transition-all"
        onClick={() => navigate("/")}
      >
        Go Home!
      </button>
    </div>
  );
};

export default NotFound;

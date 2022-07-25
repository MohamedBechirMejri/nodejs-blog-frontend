import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed z-50 bottom-2 left-1/2 w-[95%] -translate-x-1/2 h-16 flex items-center justify-center gap-8 p-4 rounded-full bg-[#FAF9FE] text-[#B1B5C8]">
      {/* TODO: use React-icons */}
      <div className="flex items-center justify-evenly p-4 gap-4">
        <Link to="/">Home</Link>
        <Link to="/articles/1">Bookmarks</Link>
      </div>
      <Link
        to="/articles/2"
        className="bg-red-500 p-8 rounded-full relative -translate-y-6 bg-gradient-to-br from-[#FF9271] to-[#FF7695] text-white font-bold hover:ring ring-[#FFEBED] transition-all active:scale-90"
      >
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          New
        </p>
      </Link>
      <div className="flex items-center justify-evenly p-4 gap-4">
        <Link to="/articles/2">Search</Link>
        <Link to="/articles/3">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;

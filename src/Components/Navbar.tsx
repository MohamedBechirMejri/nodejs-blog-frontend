import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import Bookmarks from "./Assets/Bookmark";
import Home from "./Assets/Home";
import Plus from "./Assets/Plus";
import Profile from "./Assets/Profile";
import Search from "./Assets/Search";

const Navbar = () => {
  const [currentTab, setCurrentTab] = React.useState("");
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setCurrentTab("home");
    } else if (path === "/bookmarks") {
      setCurrentTab("bookmarks");
    } else if (path === "/profile") {
      setCurrentTab("profile");
    } else if (path === "/search") {
      setCurrentTab("search");
    } else {
      setCurrentTab("");
    }
  }, [location.pathname]);

  return (
    <nav
      className={`fixed z-50 bottom-2 left-1/2 w-[95%] -translate-x-1/2 h-16 flex items-center justify-center gap-4 p-4 rounded-full bg-[#FAF9FE] text-[#B1B5C8] stroke-[#aaaaaa] xl:border border-[#F26865] max-w-[600px] ${
        (location.pathname.split("/")[1] === "articles" &&
          !location.pathname.split("/").includes("edit")) ||
        location.pathname.split("/")[1] === "signup"
          ? "animate-hide"
          : "animate-reveal"
      }`}
    >
      <div className="flex items-center gap-8 p-4 justify-evenly">
        <Link
          to="/"
          style={{
            stroke: currentTab === "home" ? "#6434D1" : "#aaaaaa",
          }}
          onClick={() => setCurrentTab("home")}
          className="transition-all active:scale-95"
        >
          <Home />
        </Link>
        <Link
          to="/bookmarks"
          style={{
            stroke: currentTab === "bookmarks" ? "#6434D1" : "#aaaaaa",
          }}
          //   onClick={() => setCurrentTab("bookmarks")}
          className="transition-all active:scale-95"
        >
          <Bookmarks />
        </Link>
      </div>
      <Link
        to="/create"
        className="bg-red-500 p-8 rounded-full relative -translate-y-6 bg-gradient-to-br from-[#FF9271] to-[#FF7695] text-white font-bold hover:ring ring-[#FFEBED] transition-all active:scale-90"
      >
        <p className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 stroke-white">
          <Plus />
        </p>
      </Link>
      <div className="flex items-center gap-8 p-4 justify-evenly">
        <Link
          to="/search"
          style={{
            stroke: currentTab === "search" ? "#6434D1" : "#aaaaaa",
          }}
          // onClick={() => setCurrentTab("search")}
          className="transition-all active:scale-95"
        >
          <Search />
        </Link>
        <Link
          to="/profile"
          style={{
            stroke: currentTab === "profile" ? "#6434D1" : "#aaaaaa",
          }}
          //   onClick={() => setCurrentTab("profile")}
          className="transition-all active:scale-95"
        >
          <Profile />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

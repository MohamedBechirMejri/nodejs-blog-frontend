import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null as any);
  const [greeting, setGreeting] = useState("");
  useEffect(() => {
    const timeOfDay = new Date().getHours();
    if (timeOfDay < 12) {
      setGreeting("Good morning");
    } else if (timeOfDay < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:3000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {
          setUser(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return user ? (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-4 p-8 text-3xl font-bold">
      <h1>
        {greeting}, {user.firstName.split(" ")[0]}.
      </h1>
      <p className="text-lg font-light">
        For Now, the only thing you can do is{" "}
      </p>

      <button
        className="w-full p-4 mb-12 text-xl font-bold text-red-500 transition-all bg-red-200 rounded-full text-md active:scale-95"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  ) : (
    <Loader />
  );
};

export default Profile;

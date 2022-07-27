import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Create = () => {
  const [categories, setCategories] = React.useState(
    [] as {
      _id: number;
      name: string;
    }[]
  );
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <form className="flex flex-col items-center justify-center w-full h-full min-h-screen gap-8 p-8 pb-32 animate-revealPage">
      <h1 className="text-3xl font-medium text-center">
        Add Article <br />
      </h1>
      <input
        type="text"
        className="w-full p-5 transition-all rounded-lg border-white focus:border-[#F26865] focus:ring-[#F26865] outline-none placeholder:font-medium"
        placeholder="Title"
        required
        minLength={5}
      />
      <textarea
        className="w-full p-5 transition-all rounded-lg border-white focus:border-[#F26865] focus:ring-[#F26865] outline-none placeholder:font-medium"
        placeholder="Body"
        required
        minLength={250}
      />
      <input
        type="text"
        className="w-full p-5 transition-all rounded-lg border-white focus:border-[#F26865] focus:ring-[#F26865] outline-none placeholder:font-medium"
        placeholder="Image (https://picsum/photos/700)"
        required
      />
      <select
        className="w-full p-5 transition-all rounded-lg border-white focus:border-[#F26865] focus:ring-[#F26865] outline-none placeholder:font-medium"
        placeholder="Category"
        required
      >
        {categories.map(category => (
          <option
            key={category._id}
            value={category._id}
            className="text-xl font-medium transition-all "
          >
            {category.name}
          </option>
        ))}
      </select>
      <button className="w-full p-5 rounded-lg bg-[#F26865] text-white text-xl font-medium shadow-sm shadow-[#F26865] active:bg-[#ca4747] transition-all">
        Submit
      </button>
    </form>
  );
};

export default Create;

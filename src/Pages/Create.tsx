import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Create = () => {
  const [categories, setCategories] = React.useState(
    [] as {
      _id: number;
      name: string;
    }[]
  );
  const navigate = useNavigate();
  const [token, setToken] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [image, setImage] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(
        "https://evening-refuge-13847.herokuapp.com/articles",
        {
          title,
          body,
          category,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(res => {
        navigate(`/articles/${res.data._id}`);
      })
      .catch(err => {
        err.response.data.errors.forEach((err: { msg: string }) => {
          toast.error(err.msg, {});
        });
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      setToken(token);
      axios
        .get("https://evening-refuge-13847.herokuapp.com/categories")
        .then(response => {
          setCategories(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [navigate]);

  return (
    <form
      className="flex flex-col items-center justify-center w-full h-full min-h-screen gap-8 p-8 pb-32 animate-revealPage max-w-[800px] m-auto"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl font-medium text-center">
        Add Article <br />
      </h1>
      <input
        type="text"
        className="w-full p-5 transition-all rounded-lg border-white focus:border-[#F26865] focus:ring-[#F26865] outline-none placeholder:font-medium"
        placeholder="Title"
        required
        minLength={5}
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        className="w-full p-5 transition-all rounded-lg border-white focus:border-[#F26865] focus:ring-[#F26865] outline-none placeholder:font-medium"
        placeholder="Body"
        required
        minLength={250}
        value={body}
        onChange={e => setBody(e.target.value)}
      />
      <input
        type="text"
        className="w-full p-5 transition-all rounded-lg border-white focus:border-[#F26865] focus:ring-[#F26865] outline-none placeholder:font-medium"
        placeholder="Image (https://picsum.photos/700)"
        required
        value={image}
        onChange={e => setImage(e.target.value)}
      />
      <select
        className="w-full p-5 transition-all rounded-lg border-white focus:border-[#F26865] focus:ring-[#F26865] outline-none placeholder:font-medium capitalize"
        placeholder="Category"
        required
        value={category}
        onChange={e => setCategory(e.target.value)}
      >
        {categories.map(category => (
          <option
            key={category._id}
            value={category._id}
            className="text-xl font-medium capitalize transition-all"
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

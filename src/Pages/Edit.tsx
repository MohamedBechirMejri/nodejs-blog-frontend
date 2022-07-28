import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";

const Edit = () => {
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
  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(
        `https://evening-refuge-13847.herokuapp.com/articles/${id}`,
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

          axios
            .get(`https://evening-refuge-13847.herokuapp.com/articles/${id}`)
            .then(res => {
              setTitle(res.data.title);
              setBody(res.data.body);
              setCategory(res.data.category._id);
              setImage(res.data.image);
              setIsLoading(false);
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [id, navigate]);

  return isLoading ? (
    <Loader />
  ) : (
    <form
      className="flex flex-col items-center justify-center w-full h-full min-h-screen gap-8 p-8 pb-32 animate-revealPage max-w-[800px] m-auto"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl font-medium text-center">
        Edit Article <br />
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
        className="w-full p-5 transition-all rounded-lg border-white focus:border-[#F26865] focus:ring-[#F26865] outline-none placeholder:font-medium"
        placeholder="Category"
        required
        value={category}
        onChange={e => setCategory(e.target.value)}
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
      <button className="w-full p-5 rounded-lg bg-[#F26865] text-white text-xl font-bold shadow-sm shadow-[#F26865] active:bg-[#ca4747] transition-all ring ring-white">
        Submit
      </button>
      <button
        className="w-full p-5 rounded-lg bg-white text-[#F26865] text-xl font-bold shadow-sm ring-[#F26865] ring transition-all active:bg-[#F26865] active:text-white"
        onClick={e => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        Back
      </button>
    </form>
  );
};

export default Edit;

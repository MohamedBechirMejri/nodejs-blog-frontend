import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArticleType from "../Types/Article";
import CommentType from "../Types/Comment";

const Comments = ({
  className,
  Comments,
  setArticle,
}: {
  className?: string;
  Comments: CommentType[];
  setArticle: (article: ArticleType) => void;
}) => {
  const { id } = useParams();
  const [comment, setComment] = React.useState("");
  const [token, setToken] = React.useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (token) {
      axios
        .post(
          `https://evening-refuge-13847.herokuapp.com/articles/${id}/comment`,
          {
            body: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(res => {
          setArticle(res.data);
          setComment("");
        })
        .catch(err => {
          console.log(err.response.data);
        });
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <div className={`${className} w-full px-8`}>
      <h1 className="text-3xl font-bold">Comments:</h1>
      {Comments.map((comment, i) => {
        const { body, user, _id } = comment;
        return (
          <div
            key={_id}
            className="flex flex-wrap items-center justify-start w-full gap-4 pt-8"
          >
            <div className="flex items-center justify-center gap-2 pr-4 font-bold min-w-max">
              <img
                src={user.picture}
                alt="user"
                className="w-12 h-12 rounded-full ring ring-[#F26865]"
              />
              <h2 className="flex flex-col items-center justify-center">
                <span>{user.firstName}</span> <span>{user.lastName} </span>
              </h2>
            </div>
            <p>{body}</p>
          </div>
        ) as JSX.Element;
      })}
      <form
        className="flex flex-col items-center justify-center w-full h-full gap-8 py-20 animate-revealPage"
        autoComplete="on"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-medium text-center">Add Comment!</h1>
        <textarea
          className="w-full p-5 transition-all rounded-lg border-white focus:border-[#F26865] focus:ring-[#F26865] outline-none placeholder:font-medium"
          placeholder="Enter Text"
          required
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <button className="w-full p-5 rounded-lg bg-[#F26865] text-white text-xl font-medium shadow-sm shadow-[#F26865] active:bg-[#ca4747] transition-all">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Comments;

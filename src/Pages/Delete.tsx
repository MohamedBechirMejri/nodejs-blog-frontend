import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import { toast } from "react-toastify";

const Delete = () => {
  const { id } = useParams();
  // TODO: fix types
  const [article, setArticle] = React.useState(null as any);
  const [token, setToken] = React.useState(null) as any;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    axios
      .get(`http://localhost:3000/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setArticle(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);

  return !article ? (
    <Loader />
  ) : (
    <div className="flex flex-col items-center justify-center h-screen gap-4 p-8 max-w-[800px] m-auto">
      <h1 className="flex flex-col items-center justify-center gap-2 text-2xl font-bold">
        {/* Are you sure you want to{" "} */}
        {/* <span className="font-bold text-red-500 "> */}
        Delete {article.title} ?{/* </span> */}
      </h1>
      <div className="flex items-center w-full gap-4">
        <button
          className="w-full p-4 font-bold text-green-500 transition-all bg-green-200 rounded-full text-md active:scale-95"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back
        </button>
        <button
          className="w-full p-4 font-bold text-red-500 transition-all bg-red-200 rounded-full text-md active:scale-95"
          onClick={() => {
            axios
              .delete(`http://localhost:3000/articles/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then(res => {
                toast.success("Article deleted successfully");
                navigate("/");
              })
              .catch(err => {
                console.log(err);
                toast.error("Error deleting article");
              });
          }}
        >
          Confirm Deletion
        </button>
      </div>
    </div>
  );
};

export default Delete;

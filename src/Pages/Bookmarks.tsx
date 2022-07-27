import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ArticleType from "../Types/Article";
import Heart from "../Components/Assets/Heart";
import Loader from "../Components/Loader";

const Bookmarks = () => {
  const [articles, setArticles] = React.useState([] as ArticleType[]);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();
  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:3000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          setIsLoading(false);
          setArticles(res.data.bookmarks);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return isLoading ? (
    <Loader />
  ) : articles.length === 0 ? (
    <h1 className="absolute w-full text-3xl font-bold text-center -translate-y-1/2 top-1/2 animate-revealLogo">
      You have no bookmarks
    </h1>
  ) : (
    <div className="">
      <h1 className="fixed top-0 left-0 z-50 w-full px-8 py-4 text-3xl font-bold opacity-0 backdrop-blur-sm animate-revealLogo">
        Bookmarks
      </h1>
      <div className="flex flex-col items-center justify-start gap-20 p-8 pt-20 pb-32 ">
        {articles.map((article, i) => {
          const { title, image, likes, _id } = article;
          return (
            <Link
              to={`/articles/${_id}`}
              key={_id}
              className=" h-[30vh] rounded-[2.5rem] w-[85vw] flex flex-col justify-end items-start text-white font-bold overflow-hidden transition-all hover:ring-4 ring-gray-500 animate-revealPage opacity-0"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                animationDelay: `${(i + 1) * 0.1}s`,
              }}
            >
              <div className="p-4 bg-[#00000055] w-full h-full relative">
                <h1 className="p-4 text-3xl text-white ">{title}</h1>
                {/*<p className="absolute p-2 text-xl text-white bottom-8 left-12 ">{`${author.firstName} ${author.lastName}`}</p>*/}

                <p className="text-white absolute bottom-8 right-12 bg-[#40507855] p-2 rounded-full font-medium px-4 backdrop-blur-3xl stroke-current flex items-center justify-center gap-4">
                  <Heart /> {likes.length}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Bookmarks;

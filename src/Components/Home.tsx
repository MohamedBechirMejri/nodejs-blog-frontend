import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import ArticleType from "../Types/Article";

const Home = () => {
  const [articles, setArticles] = React.useState([] as ArticleType[]);
  React.useEffect(() => {
    axios
      .get("http://localhost:3000/articles")
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1 className="w-full px-8 py-4 font-bold text-3xl fixed top-0 left-0  backdrop-blur-sm z-50">
        Blogs
      </h1>
      <div className="flex flex-col items-center justify-start p-8 gap-20 pt-32 pb-32 ">
        {articles.map(article => {
          const { title, author, image, likes, _id } = article;
          return (
            <Link
              to={`/articles/${_id}`}
              key={_id}
              className=" h-[30vh] rounded-[2.5rem] w-[85vw] flex flex-col justify-end items-start text-white font-bold overflow-hidden transition-all hover:ring-4 ring-gray-500 "
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="p-4 bg-[#00000055] w-full h-full relative">
                <h1 className="text-white text-3xl p-4 ">{title}</h1>
                <p className="text-white text-xl absolute bottom-8 left-12 p-2 ">{`${author.firstName} ${author.lastName}`}</p>

                <p
                  className="text-white absolute bottom-8 right-12 bg-[#40507855] p-2 rounded-full font-medium px-4 backdrop-blur-3xl"
                  style={{}}
                >
                  {likes.length} Likes
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

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
    <div className="flex flex-col items-center justify-start p-8 gap-20 py-32">
      {articles.map(article => {
        const { title, author, image, likes, createdAt, _id } = article;
        return (
          <Link
            to={`/articles/${_id}`}
            key={_id}
            className=" h-[60vh] rounded-xl w-[90vw] flex flex-col justify-end items-start text-white font-bold text-xl overflow-hidden transition-all hover:ring-4 ring-gray-500 "
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="p-4 bg-[#00000055] w-full ">
              <h1 className="text-white text-3xl">{title}</h1>
              <p className="text-white text-xl">{`${author.firstName} ${author.lastName}`}</p>
              <p className="text-white text-xl">{likes.length} Likes</p>
              <p className="text-white text-xl">
                {new Date(createdAt).toLocaleString()}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Home;

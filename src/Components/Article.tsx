import axios from "axios";
import React from "react";
import { useParams, Navigate } from "react-router-dom";
import ArticleType from "../Types/Article";
import Heart from "./Assets/Heart";
import HeartFull from "./Assets/HeartFull";

const Article = () => {
  const { id } = useParams();

  const [article, setArticle] = React.useState(null as ArticleType | null);
  React.useEffect(() => {
    axios
      .get(`http://localhost:3000/articles/${id}`)
      .then(response => {
        console.log(response.data);

        setArticle(response.data);
      })
      .catch(error => {
        <Navigate to="/login" />;
      });
  }, [id]);

  return article ? (
    <div className="min-h-screen w-screen p-3 flex flex-col items-center justify-start">
      <div
        className=" h-[85vw] rounded-[2rem] w-full text-white font-bold overflow-hidden transition-all "
        style={{
          backgroundImage: `url(${article.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="p-4 py-8 w-full h-full flex justify-between items-start">
        <h1 className="text-3xl font-bold">
          <span>{article.title}</span>
        </h1>{" "}
        <p
          className="w-max bg-[#ca505055] text-sm p-2 rounded-full font-medium px-4 backdrop-blur-3xl min-w-max flex gap-2 items-center  justify-center text-[#ca5050] stroke-current fill-current active:scale-90 transition-all"
          style={{}}
        >
          {true ? <HeartFull /> : <Heart />} {article.likes.length}
        </p>
      </div>
      <p className=" text-xl p-2 ">{`${article.author.firstName} ${article.author.lastName}`}</p>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Article;

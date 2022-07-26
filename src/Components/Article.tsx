import axios from "axios";
import React from "react";
import { useParams, Navigate } from "react-router-dom";
import ArticleType from "../Types/Article";
import Heart from "./Assets/Heart";
import HeartFull from "./Assets/HeartFull";
import Back from "./Assets/Back";
import Bookmark from "./Assets/Bookmark";

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
        className=" h-[85vw] rounded-[2rem] w-full text-white font-bold overflow-hidden transition-all fill-white stroke-white relative"
        style={{
          backgroundImage: `url(${article.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <button className="absolute top-8 left-8 bg-[#ffffff55] p-3 rounded-full backdrop-blur-sm transition-all active:scale-95">
          <Back />
        </button>
        <button className="absolute top-8 right-8 bg-[#ffffff55] p-3 rounded-full backdrop-blur-sm transition-all active:scale-95">
          <Bookmark />
        </button>
      </div>
      <div className="p-4 py-8 w-full h-full flex justify-between items-start">
        <h1 className="text-3xl font-bold">
          <span>{article.title}</span>
        </h1>
        <p className="w-max bg-[#ca505055] text-sm p-2 rounded-full font-medium px-4 backdrop-blur-3xl min-w-max flex gap-2 items-center  justify-center text-[#ca5050] stroke-current fill-current active:scale-90 transition-all">
          {true ? <HeartFull /> : <Heart />} {article.likes.length}
        </p>
      </div>
      <hr className="bg-gray-400 w-[90%] rounded-full mb-4" />
      <div className="flex justify-between items-center w-full px-8 text-sm text-gray-700 font-semibold">
        <p className=" text-xl p-2 ">{`${article.author.firstName} ${article.author.lastName}`}</p>
        <p className="p-2 flex gap-4 items-start justify-center">
          <span>
            {new Date(article.createdAt).toLocaleString().split(",")[0]}
          </span>
        </p>
      </div>
      <p className="p-4 w-full text-justify py-8 pb-20">
        {article.body} Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Ratione aliquam delectus cum maiores, autem sit atque, molestiae nihil
        eveniet excepturi fugiat officiis beatae blanditiis? Libero officia amet
        deleniti consequuntur impedit. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Ratione aliquam delectus cum maiores, autem sit atque,
        molestiae nihil eveniet excepturi fugiat officiis beatae blanditiis?
        Libero officia amet deleniti consequuntur impedit. Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Ratione aliquam delectus cum maiores,
        autem sit atque, molestiae nihil eveniet excepturi fugiat officiis
        beatae blanditiis? Libero officia amet deleniti consequuntur impedit.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione aliquam
        delectus cum maiores, autem sit atque, molestiae nihil eveniet excepturi
        fugiat officiis beatae blanditiis? Libero officia amet deleniti
        consequuntur impedit. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Ratione aliquam delectus cum maiores, autem sit atque, molestiae
        nihil eveniet excepturi fugiat officiis beatae blanditiis? Libero
        officia amet deleniti consequuntur impedit.
      </p>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Article;

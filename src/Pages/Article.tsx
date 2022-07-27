import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArticleType from "../Types/Article";
import Heart from "../Components/Assets/Heart";
import HeartFull from "../Components/Assets/HeartFull";
import Back from "../Components/Assets/Back";
import Bookmark from "../Components/Assets/Bookmark";
import Loader from "../Components/Loader";

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [token, setToken] = React.useState<string | null>(null);
  const [article, setArticle] = React.useState(null as ArticleType | null);

  React.useEffect(() => {
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
        navigate("/login");
      });
  }, [id, navigate]);

  return article ? (
    <div className="flex flex-col items-center justify-start w-screen min-h-screen p-3 opacity-0 animate-revealPage">
      <div
        className=" h-[85vw] rounded-[2rem] w-full text-white font-bold overflow-hidden transition-all fill-white stroke-white relative"
        style={{
          backgroundImage: `url(${article.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <button
          className="absolute top-8 left-8 bg-[#ffffff55] p-3 rounded-full backdrop-blur-sm transition-all active:scale-95"
          onClick={() => navigate(-1)}
        >
          <Back />
        </button>
        <button className="absolute top-8 right-8 bg-[#ffffff55] p-3 rounded-full backdrop-blur-sm transition-all active:scale-95">
          <Bookmark />
        </button>
      </div>
      <div className="flex items-start justify-between w-full h-full p-4 py-8">
        <h1 className="text-3xl font-bold">
          <span>{article.title}</span>
        </h1>
        <p className="w-max bg-[#ca505055] text-sm p-2 rounded-full font-medium px-4 backdrop-blur-3xl min-w-max flex gap-2 items-center  justify-center text-[#ca5050] stroke-current fill-current active:scale-90 transition-all">
          {true ? <HeartFull /> : <Heart />} {article.likes.length}
        </p>
      </div>
      <hr className="bg-gray-400 w-[90%] rounded-full mb-4" />
      <div className="flex items-center justify-between w-full px-8 text-sm font-semibold text-gray-700">
        <p className="p-2 text-xl ">{`${article.author.firstName} ${article.author.lastName}`}</p>
        <p className="flex items-start justify-center gap-4 p-2">
          <span>
            {new Date(article.createdAt).toLocaleString().split(",")[0]}
          </span>
        </p>
      </div>
      <p className="w-full p-4 py-8 text-justify">
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
      <button className="w-full p-4 mb-12 font-bold text-purple-500 transition-all bg-purple-200 rounded-full text-md active:scale-95">
        Show Comments
      </button>
    </div>
  ) : (
    <Loader />
  );
};

export default Article;

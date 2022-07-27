import axios from "axios";
import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ArticleType from "../Types/Article";
import Heart from "../Components/Assets/Heart";
import HeartFull from "../Components/Assets/HeartFull";
import Back from "../Components/Assets/Back";
import Bookmark from "../Components/Assets/Bookmark";
import Loader from "../Components/Loader";
import { toast } from "react-toastify";

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [token, setToken] = React.useState<string | null>(null);
  const [article, setArticle] = React.useState(null as ArticleType | null);
  const uid = localStorage.getItem("uid");
  const [isliked, setIsLiked] = React.useState(false);

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

  React.useEffect(() => {
    setIsLiked(false);
    if (uid) {
      const likes = article?.likes;
      if (likes) {
        likes.forEach(like => {
          like = `"${like}"`;
          if (like === uid) {
            setIsLiked(true);
          }
        });
      }
    }
  }, [article?.likes, uid]);

  const handleLike = () => {
    if (token) {
      axios
        .post(
          `http://localhost:3000/articles/${id}/like`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(res => {
          setArticle(res.data);
        })
        .catch(err => {
          toast.error(err.response.data.msg, {});
        });
    }
  };

  const handleBookmark = () => {
    if (token) {
      axios
        .post(
          `http://localhost:3000/articles/${id}/bookmark`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(res => {
          toast.success(res.data, {});
        })
        .catch(err => {
          toast.error(err.response.data.msg, {});
        });
    }
  };

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
          className="absolute top-8 left-8 bg-[#00000055] p-3 rounded-full backdrop-blur-3xl transition-all active:scale-95"
          onClick={() => navigate(-1)}
        >
          <Back />
        </button>
        <button
          className="absolute top-8 right-8 bg-[#00000055] p-3 rounded-full backdrop-blur-3xl transition-all active:scale-95"
          onClick={handleBookmark}
        >
          <Bookmark />
        </button>
      </div>
      <div className="flex items-start justify-between w-full h-full p-4 py-8">
        <h1 className="text-3xl font-bold">
          <span>{article.title}</span>
        </h1>
        <button
          className="w-max bg-[#ca505055] text-sm p-2 rounded-full font-medium px-4 backdrop-blur-3xl min-w-max flex gap-2 items-center  justify-center text-[#ca5050] stroke-current fill-current active:scale-90 transition-all"
          onClick={handleLike}
        >
          {isliked ? <HeartFull /> : <Heart />} {article.likes.length}
        </button>
      </div>
      {!article.isPublished && (
        <button className="w-full p-4 mb-12 font-bold text-green-500 transition-all bg-green-200 rounded-full text-md active:scale-95">
          Publish
        </button>
      )}
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
      {`"${article.author._id}"` === uid && (
        <div className="flex items-center w-full gap-4 px-4 justify-evenly">
          <Link to={`/articles/${id}/edit`} className="w-full">
            <button className="w-full p-4 mb-12 font-bold text-blue-500 transition-all bg-blue-200 rounded-full text-md active:scale-95">
              Edit
            </button>
          </Link>
          <Link to={`/articles/${id}/delete`} className="w-full">
            <button className="w-full p-4 mb-12 font-bold text-red-500 transition-all bg-red-200 rounded-full text-md active:scale-95">
              Delete
            </button>
          </Link>
        </div>
      )}
    </div>
  ) : (
    <Loader />
  );
};

export default Article;

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
    <div className="flex flex-col items-center justify-start p-8 gap-20">
      {articles.map(article => {
        const { title, author, image, likes, createdAt, _id } = article;
        return (
          <Link
            to={`/articles/${_id}`}
            key={_id}
            className=" h-[90vh] border rounded-lg w-[90vw] "
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* <img src={image} alt="" className=" " /> */}
            <h1>{title}</h1>
            <p>{`${author.firstName} ${author.lastName}`}</p>
            <p>{likes.length}</p>
            <p>{new Date(createdAt).toLocaleString()}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Home;

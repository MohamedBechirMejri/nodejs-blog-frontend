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
      {articles.map(article => {
        const {
          title,
          author,
          image,
          category,
          isPublished,
          likes,
          comments,
          createdAt,
          updatedAt,
          _id,
        } = article;
        return (
          <Link to={`/articles/${_id}`} key={_id}>
            <h1>{title}</h1>
            <p>{author}</p>
            <p>{category.name}</p>
            <p>{isPublished}</p>
            <p>{likes}</p>
            <p>{comments.length}</p>
            <p>{createdAt}</p>
            <p>{updatedAt}</p>
            <img src={image} alt="" />
          </Link>
        );
      })}
    </div>
  );
};

export default Home;

import axios from "axios";
import React from "react";
import { useParams, Navigate } from "react-router-dom";
import ArticleType from "../Types/Article";

const Article = () => {
  const { id } = useParams();

  const [article, setArticle] = React.useState({} as ArticleType);
  React.useEffect(() => {
    axios
      .get(`http://localhost:3000/articles/${id}`)
      .then(response => {
        setArticle(response.data);
      })
      .catch(error => {
        <Navigate to="/login" />;
      });
  }, [id]);

  return <div>{article._id}</div>;
};

export default Article;

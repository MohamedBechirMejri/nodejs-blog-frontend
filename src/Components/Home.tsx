import axios from "axios";
import React from "react";
import ArticleType from "../Types/Article";

const Home = () => {
  const [articles, setArticles] = React.useState([] as ArticleType[]);
  React.useEffect(() => {
    axios
      .get("http://localhost:3000/articles")
      .then(response => {
        console.log(response.data);
        setArticles(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {articles.map(article => (
        <div>{article.title}</div>
      ))}
    </div>
  );
};

export default Home;

import CommentType from "./Comment";

type ArticleType = {
  title: string;
  image: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    picture: string;
  };
  body: string;
  category: string;
  isPublished: boolean;
  likes: string[];
  comments: CommentType[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

export default ArticleType;

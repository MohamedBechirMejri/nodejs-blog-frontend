import CommentType from "./Comment";

type ArticleType = {
  title: string;
  image: string;
  author: string;
  body: string;
  category: {
    name: string;
    __v: number;
    _id: string;
  };
  isPublished: boolean;
  likes: string[];
  comments: CommentType[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

export default ArticleType;

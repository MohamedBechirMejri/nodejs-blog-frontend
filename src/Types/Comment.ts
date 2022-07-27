type CommentType = {
  body: string;
  user: {
    firstName: string;
    lastName: string;
    picture: string;
    _id: string;
  };
  __v: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export default CommentType;

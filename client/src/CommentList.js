import React, { useEffect, useState } from "react";
import axios from "axios";

// props destructured  -postId-
// need to know the postId to show the relevant comments for the specific post
// postId data will be coming from PostList to CommentList
export default ({ postId }) => {
  // fetch data
  // set it on state
  // map over that state and produce a list of comments
  // display them to user

  const [comments, setComments] = useState([]);
  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );
    // comments service is hosted on port 4001

    setComments(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderedComments =
    comments.length > 0 ? (
      comments.map((comment) => {
        return <li key={comment.id}>{comment.content}</li>;
      })
    ) : (
      <span></span>
    );

  return <ul>{renderedComments}</ul>;
};

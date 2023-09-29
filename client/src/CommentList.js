import React from "react";

// props destructured  -comments-
// render comments directly after getting it destructured as prop
export default ({ comments }) => {
  // map over that state and produce a list of comments
  // display them to user

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

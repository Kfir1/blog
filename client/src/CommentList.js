import React from "react";

// props destructured  -comments-
// render comments directly after getting it destructured as prop
export default ({ comments }) => {
  // map over that state and produce a list of comments
  // display them to user
  const renderedComments =
    comments.length > 0 ? (
      comments.map((comment) => {
        let content;
        if (comment.status === "approved") {
          content = comment.content;
        }
        if (comment.status === "pending") {
          content = "Comment is awaiting moderation";
        }
        if (comment.status === "rejected") {
          content = "Comment has been rejected";
        }
        return <li key={comment.id}>{content}</li>;
      })
    ) : (
      <span></span>
    );

  return <ul>{renderedComments}</ul>;
};

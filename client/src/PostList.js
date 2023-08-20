import React, { useState, useEffect } from "react";
import axios from "axios";

export default () => {
  // default value will be empty object {}, same as (const posts = {};) on posts service (index.js file)
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4000/posts");

    setPosts(res.data);
  };

  // call useEffect to fetch posts only once

  useEffect(() => {
    fetchPosts();
  }, []);

  // =Object.values builtin JS function that returns an array of all values inside posts object in this case
  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

import React, { useState } from "react";
import axios from "axios";

export default () => {
  const [title, setTitle] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();

    // first argument on post service will be the URL and second will be the object with title (post)
    await axios.post("http://localhost:4000/posts", {
      title,
    });
    // then set title state to empty string
    setTitle("");
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  );
};

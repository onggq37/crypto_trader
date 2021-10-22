import React, { useState, useContext } from "react";
import "./editPost.css";
import axios from "axios";

const EditPost = () => {
  // const handleSubmit = async (e) => {
  //   const [title, setTitle] = useState("");
  //   const [desc, setDesc] = useState("");
  //   const [file, setFile] = useState(null);
  //   const { user } = useContext(Context);
  //   e.preventDefault();
  //   const newPost = {
  //     username: user.username,
  //     title,
  //     desc,
  //   };
  //   if (file) {
  //     const data = new FormData();
  //     const filename = Date.now() + file.name;
  //     data.append("name", filename);
  //     data.append("file", file);
  //     newPost.photo = filename;
  //     try {
  //       await axios.post("/upload", data);
  //     } catch (err) {}
  //   }
  //   try {
  //     const res = await axios.post("/posts", newPost);
  //     window.location.replace("/post/" + res.data._id);
  //   } catch (err) {}
  // };

  return (
    <div className="write">
      <img
        className="writeImg"
        src="https://images.pexels.com/photos/8369836/pexels-photo-8369836.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt="banner"
      />
      <form>
        <div>
          <input className="writeInput" type="file" />
        </div>
        <div>
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
          />
        </div>
        <div>
          <textarea
            className="writeInput writeText"
            placeholder="Latest Crypto news..."
            type="text"
          />
        </div>
        <button className="writeSubmit" type="submit" autoFocus={true}>
          Publish
        </button>
        <hr />
      </form>
    </div>
  );
};
export default EditPost;

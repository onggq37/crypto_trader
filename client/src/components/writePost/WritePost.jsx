import "./writePost.css";
import { Form } from "react-bootstrap";

const WritePost = () => {
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
export default WritePost;

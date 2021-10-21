import PostItem from "../postItem/PostItem";
import "./postsContainer.css";

const PostsContainer = () => {
  return (
    <div className="posts">
      <PostItem img="https://images.pexels.com/photos/1097946/pexels-photo-1097946.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />
      <PostItem img="https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
      <PostItem img="https://images.pexels.com/photos/6771244/pexels-photo-6771244.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
      <PostItem img="https://images.pexels.com/photos/7567486/pexels-photo-7567486.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
      <PostItem img="https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=12600" />
      <PostItem img="https://images.pexels.com/photos/6781340/pexels-photo-6781340.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
    </div>
  );
};
export default PostsContainer;

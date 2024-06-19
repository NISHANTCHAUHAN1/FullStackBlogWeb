import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button } from "../components";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { removePost, fetchPosts } from "../store/postSlice";

function Post() {
  // const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const posts = useSelector((state) => state.post.posts);
  const post = posts.find((post) => post.$id === slug);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  const error = useSelector((state) => state.error);
  // console.log(post);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (error) {
    return (
      <div className="w-full min-h-[80vh] text-center flex items-center justify-center bg-sky-950 text-red-500">
        <h1 className="text-2xl p-10 font-bold inline-block transition duration-200">
          {`Error: ${error}`}
        </h1>
      </div>
    );
  }

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        dispatch(removePost(post.$id));
        // console.log(post);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 w-full min-h-[80vh] flex flex-col items-center justify-center bg-sky-950 text-textColor max-w-7xl mx-auto px-4">
      <div className="w-full sm:w-[80%] h-[45vh] sm:h-[55vh] md:h-[60vh] lg:h-[70vh] lg:w-[60%] relative flex justify-center mb-4 border rounded-xl p-2 mt-10">
        <img
          src={appwriteService.getFilePreview(post.featuredImage)}
          alt={post.title}
          className="rounded-xl object-center object-fill"
        />

        {isAuthor && (
          <div className="absolute right-6 top-6">
            <Link to={`/edit-post/${post.$id}`}>
              <Button bgColor="bg-green-500" className="mr-3">
                Edit
              </Button>
            </Link>
            <Button bgColor="bg-red-500" onClick={deletePost}>
              Delete
            </Button>
          </div>
        )}
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{post.title}</h1>
      </div>
      <div className="browser-css">{parse(post.content)}</div>

      <Button className="mt-5 block mx-auto w-24 sm:w-32 md:w-48 absolute top-16 right-10">
        <Link to="/">Back</Link>
      </Button>
    </div>
  ) : (
    <div className="w-full min-h-[80vh] text-center flex items-center justify-center bg-sky-950 text-textColor">
      <h1 className="text-2xl p-10 font-bold inline-block  transition duration-200">
        Loading...
      </h1>
    </div>
  );
}

export default Post;

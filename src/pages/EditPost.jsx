import React from "react";
import { PostForm } from "../components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function EditPost() {
  const { slug } = useParams();
  const posts = useSelector((state) => state.post.posts);
  const postSlug = posts.find((post) => post.$id === slug);
  // console.log(posta);

  return postSlug ? (
    <>
      <div className="py-8 w-full min-h-[80vh] text-center flex items-center justify-center bg-sky-950 text-textColor">
        <PostForm post={postSlug} />
      </div>
    </>
  ) : (
    <div className="w-full min-h-[80vh] text-center flex items-center justify-center bg-sky-950 text-textColor">
      <h1 className="text-2xl p-10 font-bold inline-block  transition duration-200">
        No post found
      </h1>
    </div>
  );
}

export default EditPost;

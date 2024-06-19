import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts } from "../store/postSlice";

function Home() {
  const userStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.userData);
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    setLoader(false);
  }, [dispatch]);

  // console.log(posts);
  const posts = useSelector((state) => state.post.posts);
  const error = useSelector((state) => state.error);

  return userStatus ? (
    <>
      {loader ? (                                                                            
        <div className="w-full min-h-[80vh] text-center flex items-center justify-center bg-sky-950 text-textColor">
          <h1 className="text-2xl p-10 font-bold inline-block  transition duration-200">
            Loading...
          </h1>
        </div>
      ) : error ? (
        <div className="w-full min-h-[80vh] text-center flex items-center justify-center bg-sky-950 text-red-500">
          <h1 className="text-2xl p-10 font-bold inline-block  transition duration-200">
            {`Error: ${error}`}
          </h1>
        </div>
      ) : (
        <div className="w-full min-h-[80vh] text-center flex-col items-center justify-center bg-sky-950 text-textColor">
          <h1 className="text-2xl p-10 font-bold inline-block">
            {`Welcome ${user.name}`}
          </h1>

          <Container>
            <div className="grid justify-center content-center sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-5 mb-10 mt-0 sm:mt-5">
              {posts?.map((post) => (
                <div
                  key={post.$id}
                  className="hover:scale-105 transition duration-300"
                >
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </Container>

          {!posts && (
            <h1 className="text-2xl p-10 font-bold flex flex-col gap-3 mt-5">
              No posts available{" "}
              <span className="text-textHover inline-block">
                <Link to="/add-post">Create post</Link>
              </span>
            </h1>
          )}
        </div>
      )}
    </>
  ) : (
    <>
      <div className="w-full min-h-[80vh] text-center flex items-center justify-center bg-sky-950 text-textColor">
        <Container>
          <div className="flex items-center justify-center flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold inline-block hover:text-textHover transition duration-200 cursor-pointer">
                <Link to="/login">Login to read Posts</Link>
              </h1>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Home;

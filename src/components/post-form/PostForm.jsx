import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPost, updatePost } from "../../store/postSlice";
import Resizer from "react-image-file-resizer";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  // console.log(userData);
  // console.log(userData.$id);
  const submit = async (data) => {
    if (post) {
      // const file = data.image[0]
      //   ? await appwriteService.uploadFile(data.image[0])
      //   : null;

      const uploadedImg = data.image[0];
      const resizedFile = await new Promise((resolve, reject) => {
        Resizer.imageFileResizer(
          uploadedImg,
          8000,
          8000,
          "JPEG",
          50,
          0,
          (resizedImage) => resolve(resizedImage),
          "file"
        );
      });

      const file = await appwriteService.uploadFile(resizedFile);

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        dispatch(updatePost(dbPost, userData.$id));
        setLoader(false);
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const uploadedImg = data.image[0];
      const resizedFile = await new Promise((resolve, reject) => {
        Resizer.imageFileResizer(
          uploadedImg,
          8000,
          8000,
          "JPEG",
          50,
          0,
          (resizedImage) => resolve(resizedImage),
          "file"
        );
      });

      const file = await appwriteService.uploadFile(resizedFile);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          dispatch(addPost(dbPost, userData.$id));
          setLoader(false);
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="w-[90%] text-center flex flex-col md:flex-row items-center md:items-start gap-24 justify-center bg-sky-950 rounded-xl p-2 sm:p-10 text-textColor min-h-[80vh] border border-sky-500 py-6 relative"
    >
      <div className="md:w-2/3 px-2 text-start">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="md:w-1/3 px-2 text-start">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4 "
          {...register("status", { required: true })}
        />
        {loader ? (
          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className="w-full"
          >
            Processing...
          </Button>
        ) : (
          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className="w-full"
            onClick={() => setLoader(true)}
          >
            {post ? "Update" : "Submit"}
          </Button>
        )}

        <Button className="mt-5 block mx-auto w-full">
          <Link to="/">Back</Link>
        </Button>
      </div>
    </form>
  );
}

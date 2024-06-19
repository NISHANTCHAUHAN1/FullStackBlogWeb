import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full bg-sky-950 min-h-[80vh] text-textColor px-5">
      <div className="mx-auto max-w-xl bg-sky-950 rounded-xl p-8">
        <div className="mb-2 flex justify-center ">
          <span className="inline-block w-full max-w-[100px] text-center">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm ">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-semibold text-sm font-Poppins text-textHover"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email :"
              placeholder="Enter your email"
              type="email"
              // className="bg-transparent"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password :"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />

            <Button type="submit" className="w-full text-base font-medium">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

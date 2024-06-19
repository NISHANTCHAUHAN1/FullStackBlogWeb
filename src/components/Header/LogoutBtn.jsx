import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn({ className = "" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/");
    });
  };

  return (
    <button
      className={`inline-block font-semibold mx-6 duration-200 hover:text-textHover rounded-full ${className}`}
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;

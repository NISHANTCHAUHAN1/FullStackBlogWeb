import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },

    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },

    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },

    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
  ];
  return (
    <header className="py-5 flex items-center justify-between bg-sky-900 text-textColor w-full relative border-b border-sky-500">
      <Container>
        <nav className="flex items-center">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          <ul className="hidden md:flex ml-auto items-center">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block font-semibold mx-6 duration-200 hover:text-textHover rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>

      {/* MOBILE MENU */}

      {isOpen ? (
        <button onClick={toggleMenu} className="md:hidden mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-textColor hover:text-textHover transition duration-200"
          >
            <path d="M18 6l-12 12"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </button>
      ) : (
        <button onClick={toggleMenu} className="md:hidden mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-textColor hover:text-textHover transition duration-200"
          >
            <path d="M4 6l16 0"></path>
            <path d="M4 12l16 0"></path>
            <path d="M4 18l16 0"></path>
          </svg>
        </button>
      )}

      {isOpen && (
        <ul className="flex flex-col gap-8 justify-start pt-[30%] mx-auto items-center h-screen w-[70%] fixed top-0 bg-gray-800 z-50">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className="inline-block text-xl font-semibold mx-6 duration-200 hover:text-textHover rounded-full"
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}

          {authStatus && (
            <li>
              <LogoutBtn className="text-xl" />
            </li>
          )}
        </ul>
      )}
    </header>
  );
}

export default Header;

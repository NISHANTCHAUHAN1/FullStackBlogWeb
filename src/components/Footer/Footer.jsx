import React from "react";
// import { Link } from "react-router-dom";
import Logo from "../Logo";
function Footer() {
  return (
    <section className="w-full overflow-hidden py-8 bg-sky-950 text-textColor border-t border-sky-500">
      <div className="flex h-full items-center justify-between px-12 mx-auto">
        <div className="mb-4 inline-flex items-center">
          <Logo width="100px" />
        </div>
        <div>
          <p className="text-sm font-semibold">
            &copy; 2024{" "}
           <span className="text-textHover">Nishant Chauhan</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Footer;

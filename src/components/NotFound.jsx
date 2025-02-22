import React from "react";
import pagenot from "../assets/images/404-img.cdac141b.svg";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center pt-10 gap-3">
      <h1 className="text-6xl text-[#005490] font-black">Oh No!</h1>
      <h4 className="text-[60px] text-black font-medium">
        This page is not found
      </h4>
      <img src={pagenot} alt="page not found" />
      <div className="max-w-md w-full flex items-center border border-solid border-[#e5e7eb]">
        <Link className="w-full" to='/'>
          <button className="text-lg rounded-lg w-full bg-gradient-to-r py-3 px-8 from-[#006ab6] to-[#00406d] text-white border-1 border-transparent transition duration-500 hover:text-[#005490] hover:border-[#005490] hover:from-white hover:to-white cursor-pointer">
            See More
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;

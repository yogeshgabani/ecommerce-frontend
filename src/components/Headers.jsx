import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo-173855083012.jpg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import project from "../api/project.json";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";

function Headers({ isAuthenticated, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setMenuOpen(false); // Close menu if screen is resized to larger than mobile
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="bg-linear-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
        <div className="container mx-auto px-5 py-3  flex justify-between items-center">
          <div>
            <img
              className="xl:w-full md:w-[80px] xl:h-full md:h-[35px] w-[70px] h-[30px]"
              src={logo}
              alt="logo"
            />
          </div>
          <div className="lg:block hidden">
            <ul className="flex justify-between text-white items-center gap-4">
              {project.headers.map((item) => (
                <>
                  <NavLink className="relative link z-1" to={item.path}>
                    <li key={item.id}>{item.name}</li>
                  </NavLink>
                </>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <button
                className="bg-[#fc097c] text-white text-[14px] font-ubuntu md:font-bold rounded-[10px] font-medium xl:h-[45px] md:h-10 h-7 cursor-pointer xl:px-7 md:px-4 px-2 relative before:absolute  before:w-full before:border-[2px] before:border-black before: border-solid before:top-[4px] before:left-[4px] before:h-[50px] before:-z-1 hover:before:top-0 hover:before:left-0 hover:bg-[#250449]"
                onClick={() => {
                  onLogout();
                  navigate("/");
                }}
              >
                Logout
              </button>
            ) : (
              <div className="flex items-center xl:gap-3 gap-2">
                <button
                  className="bg-[#fc097c] text-white text-[14px] font-ubuntu md:font-bold rounded-[10px] font-medium xl:h-[45px] md:h-10 h-7 cursor-pointer xl:px-7 md:px-4 px-2 relative before:absolute  before:w-full before:border-[2px] before:border-black before: border-solid before:top-[4px] before:left-[4px] before:h-[50px] before:-z-1 hover:before:top-0 hover:before:left-0 hover:bg-[#250449]"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="bg-[#fc097c] text-white text-[14px] font-ubuntu md:font-bold rounded-[10px] xl:h-[45px] md:h-10 h-7 cursor-pointer xl:px-7 md:px-4 px-2 relative before:absolute  before:w-full before:border-[2px] before:border-black before: border-solid before:top-[4px] before:left-[4px] before:h-[50px] before:-z-1 hover:before:top-0 hover:before:left-0 hover:bg-[#250449]"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </div>
            )}
            <div onClick={() => setMenuOpen(!menuOpen)}>
              {" "}
              {!menuOpen ? (
                <IoMdMenu
                  className="text-[24px] lg:hidden block text-white "
                  onClick={() => setMenuOpen(true)}
                />
              ) : (
                <IoClose className="text-2xl text-white " />
              )}
            </div>
          </div>
        </div>

        {/* mobile view */}
        {menuOpen && (
          <div
            className={`bg-linear-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% w-full fixed top-12 z-10 left-0 text-white sm:p-5 p-3 border-t-[1px] border-t-solid border-t-black mt-1 transition-all ease-in-out duration-500 ${
              menuOpen
                ? "block h-max visible "
                : "hidden h-0 invisible transition-all ease-in-out duration-500"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            <ul className="">
              {project.headers.map((item) => (
                <>
                  <NavLink className="relative link z-1" to={item.path}>
                    <li
                      className="p-2 "
                      key={item.id}
                    >
                      {item.name}
                    </li>
                  </NavLink>
                </>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Headers;

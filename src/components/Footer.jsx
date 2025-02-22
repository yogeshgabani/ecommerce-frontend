import React from "react";
import {
  FaArrowRight,
  FaFacebookSquare,
  FaInstagramSquare,
} from "react-icons/fa";
import { FaSquareWhatsapp, FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io5";

function Footer() {
  return (
    <div className="bg-[#f0f0f0] my-[70px] m-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 sm:text-start text-center sm:gap-8 gap-2 m-3">
          <div className="mt-8">
            <h1 className="mb-5 font-medium text-[36px] text-[#222222]">
              Stay Connected
            </h1>
            <div className="border-b-[1px] border-b-solid border-b-[#dedede] flex items-center">
              <input
                className="w-full text-[16px] focus:outline-0 indent-2"
                type="text"
                placeholder="Enter our Email..."
              />
              <FaArrowRight className="text-[#222222] text-[15px]" />
            </div>
          </div>

          <div className="mt-8 ">
            <ul>
              <h1 className="text-[#222222] text-[16px] font-bold mb-5">
                Contact Us
              </h1>
              <li className="text-[#222222] text-[16px] font-medium">
                Careers
              </li>
              <li className="text-[#222222] text-[16px] font-medium">
                Delivery Information
              </li>
              <li className="text-[#222222] text-[16px] font-medium">
                Privacy Policy
              </li>
              <li className="text-[#222222] text-[16px] font-medium">
                Terms & Condition
              </li>
            </ul>
          </div>
          <div className="mt-8">
            <ul>
              <h1 className="text-[#222222] text-[16px] font-bold mb-5">
                Get Help
              </h1>
              <li className="text-[#222222] text-[16px] font-medium">
                Help Center
              </li>
              <li className="text-[#222222] text-[16px] font-medium">
                Return Policy
              </li>
              <li className="text-[#222222] text-[16px] font-medium">
                Shipping Info
              </li>
              <li className="text-[#222222] text-[16px] font-medium">
                Contact Us
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <h1 className="text-[#222222] text-[16px] font-bold mb-5">
              Follow Us
            </h1>
            <div className="flex items-center sm:justify-start justify-center gap-2">
              <FaInstagramSquare className="text-2xl hover:text-red-900 cursor-pointer" />
              <FaFacebookSquare className="text-2xl hover:text-red-900 cursor-pointer" />
              <IoLogoYoutube className="text-2xl hover:text-red-900 cursor-pointer" />
              <FaSquareXTwitter className="text-2xl hover:text-red-900 cursor-pointer" />
              <FaSquareWhatsapp className="text-2xl hover:text-red-900 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

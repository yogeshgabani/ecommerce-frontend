import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [productReview, setProductReview] = useState([]);
  const [userReview, setUserReview] = useState([]);
  const [open, setOpen] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [message, setMessage] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [editingReviewId, setEditingReviewId] = useState(false);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setLoggedInUserId(decoded._id);
    }
  }, []);
  console.log("loggedInUserId", loggedInUserId);

  //view single product in details
  const singleProduct = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3001/api/user/view-single-product/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("single product view", res.data.data);
      setProduct(res.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  // check product alreay wishlist or not
  const checkWishlistStatus = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3001/api/user/wishlist-status/${id}`,
        {},
        {
          headers: { Authorization: token },
        }
      );
      console.log("check wishlist status", res);
      setIsInWishlist(res.data.success);
      console.log("first", res.data.success);
    } catch (error) {
      console.error("Error checking wishlist status", error);
      setIsInWishlist(false);
    }
  };

  //add product to wishlist or remove from wishlist
  const toggleWishlist = async () => {
    setIsInWishlist(!isInWishlist);
    console.log("isInWishlist", isInWishlist);
    try {
      if (isInWishlist) {
        const res = await axios.delete(
          `http://localhost:3001/api/user/wishlistdelete/${id}`,
          {
            headers: { Authorization: token },
          }
        );
        console.log("delete wishlist", res.data.message);
        setMessage(res.data.message);
      } else {
        const res = await axios.post(
          `http://localhost:3001/api/user/wishlistadd/${id}`,
          {},
          {
            headers: { Authorization: token },
          }
        );
        console.log("add wishlist", res.data.message);
        setMessage(res.data.message);
      }
      setTimeout(() => setMessage(""), 5000);
    } catch (error) {
      console.error("Error updating wishlist", error);
    }
  };

  // product review and rating api
  const reviewProduct = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3001/api/user/rating/view/${id}`,
        {},
        {
          headers: { Authorization: token },
        }
      );
      console.log("review products", res);
      setProductReview(res.data.data);
      setUserReview(res.data.data[0].addfield);
    } catch (error) {
      console.error("Error reviewing message", error);
    }
  };

  //add review for perticular product
  const submitReview = async () => {
    setLoading(true);
    setEditingReviewId(false);
    try {
      const res = await axios.post(
        `http://localhost:3001/api/user/rating/${id}`,
        {
          rating: rating,
          description: review,
        },
        {
          headers: { Authorization: token },
        }
      );
      console.log("submit review products", res);

      setTimeout(() => {
        setLoading(false);
        reviewProduct();
        setReview("");
        setRating("");
      }, 5000);
    } catch (error) {
      console.error("Error reviewing message", error);
      setError(error.response.data.msg);
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  // delete ProductReview
  const ProductReviewDelete = async (userId) => {
    setLoading(true);
    if (userId !== loggedInUserId) {
      alert("You can only delete your own review!");
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:3001/api/user/rating/delete/${id}`,
        {},
        {
          headers: { Authorization: token },
        }
      );
      console.log("delete review products ===========>>", res);

      setTimeout(() => {
        setLoading(false);
        reviewProduct();
      }, 3000);
    } catch (error) {
      console.error("Error reviewing message", error);
      setLoading(false);
    }
  };

  //edit product review
  const editHandle = (rating, desc) => {
    setRating(rating);
    setReview(desc);
    setEditingReviewId(true);
  };

  useEffect(() => {
    singleProduct();
    checkWishlistStatus();
    reviewProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="py-5  bg-[#f1f3f6] ">
      <div className="py-[30px] border-b-[1px] border-b-solid text-center border-b-[#f0f0f0] bg-[#f0f0f0]">
        <h1 className="text-[42px]  text-[#222222]">Product</h1>
        <p className="text-[#222222] text-[15px]">
          <Link to="/">Home</Link>&nbsp; &nbsp; &gt; &nbsp; &nbsp;
          <span>product</span>
        </p>
      </div>
      <div className="container mx-auto m-4 p-3  bg-white">
        <Link className="inline-block" to="/product">
          <button className="flex items-center gap-2 hover:text-red-800 cursor-pointer">
            <IoMdArrowRoundBack />
            back to product list
          </button>
        </Link>
      </div>
      <div className="container mx-auto">
        <div className=" bg-white p-2 rounded-[3px] border border-solid border-[#f0f0f0]">
          <div className=" grid md:grid-cols-4 grid-cols-1 md:gap-6 gap-2 mx-2">
            <div className="relative mt-5">
              <img src={product.productImage} alt={product.productName} />

              <FaHeart
                className={`text-[#c2c2c2] absolute top-[-20px] right-[5px] cursor-pointer ${
                  isInWishlist ? "text-[#ff4343]" : ""
                }`}
                onClick={toggleWishlist}
              />
              {isInWishlist ? (
                <p className="absolute bottom-0 left-0 text-green-800">
                  {message}
                </p>
              ) : (
                <p className="absolute bottom-0 left-0 text-red-800">
                  {message}
                </p>
              )}
            </div>
            <div className="md:col-span-2 col-span-full">
              <h1 className="text-[18px] cursor-pointer font-bold text-[#212121] hover:text-blue-700">
                {product.productName}
              </h1>
              <p className="pb-2">Category :- {product.categories.name}</p>
              {productReview.map((item) => (
                <>
                  <div>
                    <span className="bg-[#388e3c] text-[14px] rounded-[3px] text-white inline-block py-[2px] pl-[6px] pr-[4px]">
                      {item.rating.toFixed(2)}
                    </span>
                    <span className="text-[#878787] text-[14px] font-bold pl-2">
                      Total{" "}
                      <span className="text-green-950">{item.totalRating}</span>{" "}
                      Ratings
                    </span>
                    <span
                      className={`ms-4 sm:text-[14px] text-[10px] p-1 cursor-pointer  rounded-[5px] hover:bg-purple-800 text-white ${
                        open ? "bg-pink-800" : "bg-yellow-800"
                      }`}
                      onClick={() => setOpen(!open)}
                    >
                      {!open ? "More" : "Less"}
                    </span>
                  </div>
                </>
              ))}

              <div className={open ? "block" : "hidden"}>
                <ul className="border-t-solid border-t-amber-700 border-t-[1px] p-2 mt-2 h-[250px] overflow-y-auto">
                  {userReview.map((val) => (
                    <li
                      key={val.userId}
                      className="border-b border-b-solid border-b-gray-700 my-2 relative"
                    >
                      <h2 className="text-[#212121] font-medium text-[14px] mb-2">
                        <span className="bg-[#388e3c] text-[14px] mr-2 rounded-[3px] text-white inline-block py-[2px] pl-[6px] pr-[4px]">
                          {val.userRating}
                        </span>
                        {val.user}
                      </h2>
                      <p className="text-[#212121] text-[14px] mb-2">
                        {val.desc}
                      </p>
                      {val.userId === loggedInUserId && (
                        <div className="flex items-center gap-2 absolute top-0 right-0">
                          <MdEdit
                            className={`text-blue-700 text-[20px] desabled ${
                              !editingReviewId
                                ? "hover:text-blue-950 cursor-pointer"
                                : "opacity-50"
                            }`}
                            // disabled={editingReviewId}
                            onClick={() => editHandle(val.userRating, val.desc)}
                          />
                          <MdDelete
                            className="text-red-700 text-[20px] hover:underline hover:text-red-950 cursor-pointer"
                            onClick={() => ProductReviewDelete(val.userId)}
                          />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
                {!loading ? (
                  <div className="mx-3 flex items-center md:flex-row flex-col gap-2 mt-2">
                    <textarea
                      className="w-full min-h-[50px] col-2 border-b-[1px] bg-green-100 indent-2.5 border-b-solid border-b-blue-800 placeholder:text-green-700 focus:outline-0"
                      type="text"
                      placeholder="add review..."
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    />
                    <select
                      className="h-10 w-full focus:outline-0 bg-gray-200"
                      name=""
                      id=""
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="select rating">select rating</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <button
                      className="bg-blue-900 rounded-[10px] px-10 py-3 hover:bg-green-800 cursor-pointer"
                      onClick={submitReview}
                    >
                      <IoSend className="text-white" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-center gap-2">
                      <div className=" spinner"></div>
                      <p className="text-[#3498db] text-[18px]">Loading...</p>
                    </div>
                  </>
                )}
                {error && <p className="mx-4 text-red-600 py-2">{error}</p>}
              </div>
              <div className="my-4">
                <h1 className="underline">Description</h1>
                <h1 className="ms-2">{product.description}</h1>
              </div>
            </div>
            <div>
              <h1 className="text-25px] block text-[#212121] font-bold ">
                ${" "}
                {product.discountPrice === null
                  ? product.price
                  : product.discountPrice}
              </h1>
              <p className="text-[#878787] text-[14px] decoration-1  pt-2">
                <span className="line-through">
                  {product.discountPrice === null ? "" : "$"}
                  {product.discountPrice === null ? "" : product.price}
                </span>
                <span className="text-[#388e3c] text-[13px] leading-[-0.2px] ms-2 font-bold">
                  {product.discountPercent === null
                    ? ""
                    : product.discountPercent}
                  {product.discountPercent === null ? "" : "% off"}
                </span>
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="bg-[#ff9f00] border-0 text-white py-3 px-2 rounded-[2px] text-[14px] font-bold hover:bg-amber-900 cursor-pointer">
              Add to cart{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductView;

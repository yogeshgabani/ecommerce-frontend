import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";

function Cart() {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState([]);
  const [offer, setOffer] = useState();
  const selectedCoupon = coupon.find((item) => item.code === offer);
  const [selectedProductId, setSelectedProductId] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const cartFetch = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/user/cartview`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("response", response);
      setCart(response.data.data.docs);
    } catch (error) {
      console.log("error", error);
    }
  };

  // Handle product selection
  const toggleProductSelection = (id) => {
    setSelectedProductId((prevSelected) => {
      if (!Array.isArray(prevSelected)) prevSelected = [];
      return prevSelected.includes(id)
        ? prevSelected.filter((pid) => pid !== id)
        : [...prevSelected, id];
    });
  };

  // order conform
  const handleConfirmOrder = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:3001/api/user/checkout",
        {
          cartId: selectedProductId,
          couponCode: offer,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("res", res.data);
      setSuccess(res.data);
      setShowSuccessDialog(true);

      setTimeout(() => {
        setShowSuccessDialog(false);
        navigate("/myorder");
      }, 5000);
    } catch (error) {
      console.log("order conform error api", error);
      setError(error);
      setTimeout(() => {
        setError("")
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  console.log("cart", cart);
  useEffect(() => {
    cartFetch();
    const newTotal = cart
      .filter((product) => selectedProductId.includes(product?._id))
      .reduce((sum, product) => sum + product.totalPrice, 0);

    setTotalPrice(newTotal);
  }, [selectedProductId]);

  //coupon list
  const couponList = async () => {
    try {
      const coupons = await axios.post(
        "http://localhost:3001/api/user/view-offer",
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCoupon(coupons.data.data.docs);
    } catch (error) {
      console.log("order conform error api", error);
    }
  };

  useEffect(() => {
    couponList();
  }, []);
  console.log("error", error);

  return (
    <>
      <div className="container mx-auto mt-10">
      <div className="py-[30px] border-b-[1px] border-b-solid text-center border-b-[#f0f0f0] bg-[#f0f0f0] mb-8">
        <h1 className="text-[42px]  text-[#222222]">Cart</h1>
        <p className="text-[#222222] text-[15px]">
          <Link to="/">Home</Link>&nbsp; &nbsp; &gt; &nbsp; &nbsp;
          <span>cart</span>
        </p>
      </div>
        {showSuccessDialog && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-1">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-green-700 text-2xl font-bold">
                🎉 Order id {success.data.orderId} Placed Successfully!
              </h2>
              <p className="text-gray-600 mt-2">
                Your order has been placed. You will be redirected soon.
              </p>
            </div>
          </div>
        )}
        <div className="m-4">
          <h1 className="text-2xl font-bold text-green-700 ">
            Total Price: ${totalPrice.toFixed(2)}
          </h1>
          {error && (
            <p className="text-red-600  font-bold">
              {error.response.data.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-4 mx-2">
          {cart?.map((product) => (
            <div
              key={product._id}
              className={`border rounded-lg p-4 shadow hover:shadow-lg transition
                ${
                  selectedProductId.includes(product._id)
                    ? "border-green-500 bg-green-100"
                    : "border-gray-300"
                }`}
            >
              <input
                type="checkbox"
                checked={selectedProductId.includes(product._id)}
                onChange={() => toggleProductSelection(product._id)}
              />
              <div className="my-5">
                <Slider {...settings}>
                  <div>
                    <img src={product.productImage[0]} alt="image" />
                  </div>
                  <div>
                    <img src={product.productImage[1]} alt="image" />
                  </div>
                  <div>
                    <img src={product.productImage[2]} alt="image" />
                  </div>
                  <div>
                    <img src={product.productImage[3]} alt="image" />
                  </div>
                  <div>
                    <img src={product.productImage[4]} alt="image" />
                  </div>
                </Slider>
              </div>
              <h2 className="text-xl font-semibold truncate">
                {product.productName}
              </h2>
              <p className="text-gray-600 truncate">{product.description}</p>
              <p className="text-gray-600 truncate">
                quantity: {product.quantity}
              </p>
              <p className="text-black font-bold">
                total price:{" "}
                <span className="text-green-500 font-bold">
                  ${product.totalPrice}
                </span>
              </p>
            </div>
          ))}
        </div>
        <div className="m-4">
          <label htmlFor="" className="font-bold text-green-900">
            Offers:-{" "}
          </label>
          <select
            className="text-green-500"
            defaultValue=""
            onChange={(e) => setOffer(e.target.value)}
          >
            <option value="">select coupon code from below</option>
            {coupon.map((item) => (
              <option
                key={item.code}
                className="text-green-500"
                value={item.code}
              >
                {item.code}
              </option>
            ))}
            <h1 className="text-2xl font-bold text-green-700 mb-4">
              Total Price: ${totalPrice.toFixed(2)}
            </h1>
          </select>

          {selectedCoupon && (
            <>
              <p className="text-green-700 mt-2">
                {selectedCoupon.description}
              </p>
              <label htmlFor="" className="text-red-900 font-bold">
                Terms & Conditions
              </label>
              <ul className="list-disc text-[14px] ps-5">
                {selectedCoupon.termAndCondition.map((index) => (
                  <li>{index}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="my-5 md:flex block items-center justify-center gap-4 mx-3">
          <button
            className=" bg-green-700 w-full md:mb-0 mb-3 py-2 px-5 rounded-[24px] text-white text-1xl disabled:bg-gray-400 flex items-center justify-center gap-3"
            onClick={handleConfirmOrder}
            disabled={loading || selectedProductId.length === 0}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Confirm Order"
            )}
          </button>
          <Link to="/">
            <button className=" bg-red-700 w-full py-2 px-5 rounded-[24px] text-white text-1xl">
              back to home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Cart;

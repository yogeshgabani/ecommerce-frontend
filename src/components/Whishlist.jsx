import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

function Whishlist() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:3001/api/user/wishlistview",
        {
          headers: { Authorization: token },
        }
      );
      console.log("wishlist product fetch successfully ===========>>", res);
      setProduct(res.data.data.docs);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetch product wishlist", error);
      setLoading(false);
    }
  };

  const deleteHandle = async (productId) => {
    setLoading(true);
    console.log("productId", productId);

    try {
      const res = await axios.delete(
        `http://localhost:3001/api/user/wishlistdelete/${productId}`,
        {
          headers: { Authorization: token },
        }
      );
      console.log(
        "product deleted successfully from wishlist ===========>>",
        res
      );
      setTimeout(() => {
        setLoading(false);
        fetchData();
      }, 2000);
    } catch (error) {
      console.error("Error deleted product from wishlist", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="container mx-auto my-8">
        <div className="py-[30px] border-b-[1px] border-b-solid text-center border-b-[#f0f0f0] bg-[#f0f0f0]">
          <h1 className="text-[42px]  text-[#222222]">Wishlist</h1>
          <p className="text-[#222222] text-[15px]">
            <Link to="/">Home</Link>&nbsp; &nbsp; &gt; &nbsp; &nbsp;
            <span>wishlist</span>
          </p>
        </div>
        <div
          className="bg-white"
          style={{ boxShadow: "0 2px 4px 0 rgba(0,0,0,.08)" }}
        >
          <div className=" border-b-[1px] border-b-solid border-b-[#e0e0e0] px-5 py-7 text-[17px] font-medium">
            <span className="text-[#212121]">
              My Wishlist ({product.length})
            </span>
          </div>
          {loading ? (
            <div className="p-5 text-center text-gray-600">Loading...</div>
          ) : product.length > 0 ? (
            product.map((prod) => (
              <div
                key={prod.id}
                className=" grid md:grid-cols-4 grid-cols-1 gap-4 border-b-[1px] border-b-solid border-b-[#e0e0e0] px-5 py-7 text-[17px] font-medium relative"
              >
                <div>
                  <img
                    src={prod.productImage[0]}
                    alt={prod.productName}
                    className="w-20 h-20 object-cover"
                  />
                </div>
                <div className="md:col-span-3 col-span-full">
                  <Link to={`/product/${prod.productId}`}>
                    <h1 className="text-lg font-semibold hover:text-blue-600">
                      {prod.productName}
                    </h1>
                  </Link>
                  <p className="text-gray-600">{prod.productdesc}</p>
                  <h1>
                    <span className="mt-3 text-[22px] text-[#212121] font-medium">
                      $
                      {prod.discountPrice === null
                        ? prod.productPrice
                        : prod.discountPrice}
                    </span>
                    <span className="mx-2 text-[#878787] font-[14px] line-through">
                      {prod.discountPrice === null ? "" : "$"}
                      {prod.discountPrice === null ? "" : prod.productPrice}
                    </span>{" "}
                    <span className="text-[#388e3c] font-medium leading-[-0.2] text-[13px] ms-2">
                      {prod.discountPercent === null
                        ? ""
                        : prod.discountPercent}
                      {prod.discountPercent === null ? "" : "% off"}
                    </span>
                  </h1>
                </div>
                <div className="absolute top-[18px] right-8">
                  <MdDelete
                    className="text-red-700 text-[22px] hover:text-red-950 cursor-pointer"
                    onClick={() => deleteHandle(prod.productId)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="p-5 text-center text-gray-600">
              No items in wishlist
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Whishlist;

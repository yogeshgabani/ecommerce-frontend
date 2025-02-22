import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";

function ViewProduct() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  console.log("token", token);
  if (!token) {
    // setError("User not authenticated. Please log in.");
    setLoading(false);
    return;
  }

  const fetchProduct = async (page) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/user/viewproduct`,
        {
          page: page,
          limit: 12,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("response", response);
      setProduct(response.data.data.docs);
      setTotalPages(response.data.data.totalPages);
    } catch (err) {
      console.log("error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct(page);
  }, [page]);

  console.log("product", product);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  if (loading) {
    return <div className="container mx-auto text-center">Loading...</div>;
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="py-[30px] border-b-[1px] border-b-solid text-center border-b-[#f0f0f0] bg-[#f0f0f0]">
        <h1 className="text-[42px]  text-[#222222]">Product</h1>
        <p className="text-[#222222] text-[15px]">
          <Link to="/">Home</Link>&nbsp; &nbsp; &gt; &nbsp; &nbsp;
          <span>product</span>
        </p>
      </div>
      <div className="bg-orange-200">
        <div className="container mx-auto pt-[150px]">
          <h1 className="text-2xl font-bold mb-4 mx-5">Product List</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 m-2">
            {product.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg border-gray-400 p-4 shadow hover:shadow-lg transition"
              >
                <div className="my-5">
                  <Slider {...settings}>
                    {product.productImage.map((val) => (
                      <div>
                        <img src={val} alt={product.productName} />
                      </div>
                    ))}
                  </Slider>
                </div>
                <h2 className="text-xl font-semibold truncate">
                  {product.productName}
                </h2>
                <p className="text-gray-600 truncate">{product.description}</p>
                <p className="text-green-500 font-bold">${product.price}</p>
                <button
                  className="float-right md:p-3 p-2 border border-solid border-[#dbdbdb] bg-white rounded-[4px] hover:bg-yellow-100 cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  View More
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-between p-4">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="self-center">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewProduct;

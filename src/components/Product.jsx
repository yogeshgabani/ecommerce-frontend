import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Slider from "react-slick";

function Product({ name, image, desc, price, key , item}) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  console.log('item', item)
const navigate = useNavigate();
  const handleClick = (key) => {
    navigate(`/product/${key}`)
  }
  return (
    <>
      <div className=" bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <Slider {...settings}>
          <div>
            <img src={image[0]} alt="image" />
          </div>
          <div>
            <img src={image[1]} alt="image" />
          </div>
          <div>
            <img src={image[2]} alt="image" />
          </div>
          <div>
            <img src={image[3]} alt="image" />
          </div>
          <div>
            <img src={image[4]} alt="image" />
          </div>
        </Slider>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2 font-ubuntu">{name}</h2>
          <p className="text-gray-600 mb-4">{desc}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-green-600">
              ${price}
            </span>
            <span>{item.stock}</span>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors cursor-pointer"
              onClick={() => handleClick(key)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;

import product from "../product.json";
import React from "react";
import Product from "./Product";

function Home() {
  console.log("product", product);
  return (
    <>
      <div className='relative z-1 bg-[url("../src/assets/images/hero_bg1.jpg")]  sm:p-[85px] p-0 bg-cover bg-no-repeat bg-center after:absolute after:w-full after:h-full after:bg-linear-to-r after:from-[#1c0087] after:to-[#9a00b0] after:top-0 after:left-0 after:opacity-[0.90] after:-z-1'>
        <div className="py-[30px] text-center  ">
          <h1 className="sm:text-[42px] text-[24px] text-white">Home</h1>
          
        </div>
        
      </div>
      <div className="container mx-auto mt-10">
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-4 m-2">
          {product.product.map((item) => (
            <Product
              key={item._id}
              name={item.productName}
              desc={item.desc}
              image={item.productImage}
              price={item.price}
              item={item}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;

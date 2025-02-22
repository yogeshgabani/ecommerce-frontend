import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function Myorder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const token = localStorage.getItem("authToken");

  const handleOrder = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:3001/api/user/viewordersummary",
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("res", res.data.data);
      setOrderList(res.data.data.docs);
      setFilteredItems(res.data.data.docs);
    } catch (error) {
      console.log("order conform error api", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  //search product
  const searchHandle = () => {
    if (search.trim() === "") {
      setFilteredItems(orderList);
    } else {
      setFilteredItems(
        orderList.filter((item) =>
          item.productName.toLowerCase().includes(search)
        )
      );
    }
  };

  useEffect(() => {
    handleOrder();
    searchHandle();
  }, []);
  console.log("search", search);
  console.log("filteredItems", filteredItems);

  return (
    <>
      <div className="bg-[#f1f3f6] py-10">
        <div className="py-[30px] border-b-[1px] border-b-solid text-center border-b-[#f0f0f0] bg-[#f0f0f0] mb-8">
          <h1 className="text-[42px]  text-[#222222]">My Order</h1>
          <p className="text-[#222222] text-[15px]">
            <Link to="/">Home</Link>&nbsp; &nbsp; &gt; &nbsp; &nbsp;
            <span>order</span>
          </p>
        </div>
        <div className="md:flex block items-center justify-end mx-5">
          <input
            className=" h-10 w-full text-[14px] border border-solid border-[#dbdbdb] p-2 rounded-l-[4px] focus:outline-0 bg-white"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-[#2874f0] md:w-[200px] w-full md:mt-0 mt-3 justify-center text-white border-0 rounded-r-[4px] font-medium text-[13px] cursor-pointer outline-none py-[10px] px-[20px] flex items-center gap-2 "
            style={{ boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)" }}
            onClick={searchHandle}
          >
            <IoSearchOutline />
            Search Orders
          </button>
        </div>
        <div className="pt-4 ms-5">
          <h1 className="text-[18px] text-[#212121] font-bold">
            Order ({filteredItems.length})
          </h1>
        </div>
        {filteredItems.map((item) => (
          <>
            <div
              key={item._id}
              className="m-5 border border-solid border-[#dbdbdb] p-4 bg-white rounded-[4px] text-[14px]"
            >
              <h1 className="text-[#333333] mb-3">{item.orderId}</h1>
              <div className="flex items-start justify-between xl:gap-5 lg:gap-3 gap-3 md:flex-row flex-col">
                <div className="flex md:w-1/3 w-full items-start gap-4">
                  <div className="h-[75px] w-[75px] ">
                    {}
                    <img src={item.productImage[0]} alt={item.productName} />
                  </div>
                  <div>
                    <h1 className="text-[#333333] mb-3">{item.productName}</h1>
                  </div>
                </div>
                <div>
                  <p className="text-[#333333] mb-3">
                    <span className="font-bold">Quantity :- </span>
                    {item.quantity}
                  </p>
                  <p className="text-[#333333] mb-3 font-semibold">
                    <span className="font-bold">Total Price :- </span>$
                    {item.totalPrice}
                  </p>
                </div>
                <div>
                  <h1 className="text-[#333333] mb-3">
                    <span className="font-bold">Order Date :- </span>
                    {item.orderDate}
                  </h1>
                  <h1 className="text-[#333333] mb-3">
                    <span className="font-bold">Order Status :- </span>
                    {item.status}
                  </h1>
                </div>
              </div>
              <div className="pb-6 mb-2">
                <button className="float-right text-white bg-red-800 p-2 rounded-2xl hover:bg-red-900 cursor-pointer">
                  Cancel Order
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default Myorder;

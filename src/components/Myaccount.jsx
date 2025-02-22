import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import pagefooter from "../assets/images/myProfileFooter.png";
import cities from "../api/cities.json";
import country from "../api/country.json";
import state from "../api/state.json";
import { ToastContainer, toast } from "react-toastify";

function Myaccount() {
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    address: "",
    country: "",
    state: "",
    city: "",
  });

  const [states, setStates] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const token = localStorage.getItem("authToken");

  //user data fetch api
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/user/user-view", {
        headers: { Authorization: token },
      });
      console.log("res", res);
      setUser(res.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchUser();
    
  }, []);

  // Update formData when user data is fetched/updated
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        mobile: user.mobile || "",
        gender: user.gender || "",
        address: user.address || "",
        state: user.state || "",
        city: user.city || "",
        country: user.country || "",
      });
    }
  }, [user]);

  // Handle changes for all inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //update user api
  const handleSaveChanges = async () => {
    setLoading(true);
    // toast.success(`${message}`);
    try {
      const res = await axios.put(
        "http://localhost:3001/api/user/update-user",
        formData,
        {
          headers: { Authorization: token },
        }
      );
      console.log("Update response", res);
      setUser(res.data.data);
      setMessage(res.data.message);
      setTimeout(() => {
        setLoading(false);
        setShow(true);
        toast.success(res.data.message, { position: "top-right" });
        setEdit(false);
      }, 5000);
    } catch (error) {
      console.log("Error updating user", error);
    }
  };

  useEffect(() => {
    if (formData.country) {
      const selectedCountry = country.find((c) => c.name === formData.country);
      if (selectedCountry) {
        const filteredStates = state.filter(
          (s) => s.country_id === selectedCountry.id
        );
        setStates(filteredStates);
      }
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.state) {
      const selectedState = state.find((c) => c.name === formData.state);
      if (selectedState) {
        const filteredCity = cities.filter(
          (s) => s.state_id === selectedState.id
        );
        setCitiesList(filteredCity);
      }
    }
  }, [formData.state]);
  console.log("message", message);

  const EditButton = () => {
    setEdit(!edit)
    if (edit === true) {
      fetchUser();
    }
  }

  return (
    <div className="">
      <div className="py-[30px] border-b-[1px] border-b-solid text-center border-b-[#f0f0f0] bg-[#f0f0f0]">
        <h1 className="text-[42px] text-[#222222]">My Account</h1>
        <p className="text-[#222222] text-[15px]">
          <Link to="/">Home</Link>&nbsp; &nbsp; &gt; &nbsp; &nbsp;
          <span>my account</span>
        </p>
      </div>
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-3 mt-3">
          <div>
            <div className="p-4 bg-white rounded-[5px] flex items-center gap-4">
              <img
                className="h-12 w-12"
                src={user.profileImage}
                alt="Profile"
              />
              <div>
                <p className="text-[#212121] text-[12px]">hello,</p>
                <h1 className="text-[16px] text-[#212121] font-bold">
                  {user.firstName} {user.lastName}
                </h1>
              </div>
            </div>
          </div>
          <div className="rounded-[10px] bg-white md:col-span-3 col-span-full m-2">
            <div className="pt-6 md:px-8 px-3">
              <div className="flex items-center pb-6">
                <h1 className="text-[18px] text-[#212121] font-medium">
                  Personal Information
                </h1>
                <span
                  className={`ps-5 cursor-pointer text-[14px] ${
                    !edit ? "text-blue-700" : "text-red-700"
                  }`}
                  // onClick={() => setEdit(!edit)}
                  onClick={EditButton}
                >
                  {!edit ? "Edit" : "Cancel"}
                </span>
              </div>
              <div className="flex items-center gap-3 lg:w-1/2 w-full mb-3">
                <div>
                  <h1 className="mb-1 font-medium text-[16px]">
                    First Name
                    <span
                      className={`${edit ? "text-red-500" : "text-[#878787]"}`}
                    >
                      *
                    </span>
                  </h1>
                  <input
                    type="text"
                    name="firstName"
                    className={`bg-[#fafafa] border border-solid ${
                      !edit ? "border-[#e0e0e0]" : "border-blue-600"
                    } p-4 text-[#878787] h-12 text-[14px] rounded-[2px] outline-0 w-full`}
                    disabled={!edit}
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <h1 className="mb-1 font-medium  text-[16px]">
                    Last Name
                    <span
                      className={`${edit ? "text-red-500" : "text-[#878787]"}`}
                    >
                      *
                    </span>
                  </h1>
                  <input
                    type="text"
                    name="lastName"
                    className={`bg-[#fafafa] border border-solid ${
                      !edit ? "border-[#e0e0e0]" : "border-blue-600"
                    } p-4 text-[#878787] h-12 text-[14px] rounded-[2px] outline-0 w-full`}
                    disabled={!edit}
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="my-4">
                <h1 className="mb-1  text-[16px] font-medium">
                  Your Gender
                  <span
                    className={`${edit ? "text-red-500" : "text-[#878787]"}`}
                  >
                    *
                  </span>
                </h1>
                <div className="flex items-center gap-4">
                  <label
                    className="flex items-center text-[#878787] text-[16px]"
                    htmlFor="male"
                  >
                    <input
                      className="me-2"
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      checked={formData.gender === "male"}
                      disabled={!edit}
                      onChange={handleInputChange}
                    />
                    Male
                  </label>
                  <label
                    className="flex items-center text-[#878787] text-[16px]"
                    htmlFor="female"
                  >
                    <input
                      className="me-2"
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      checked={formData.gender === "female"}
                      disabled={!edit}
                      onChange={handleInputChange}
                    />
                    Female
                  </label>
                </div>
              </div>
              <div className="my-3">
                <h1 className="text-[18px] text-[#212121] font-medium mb-1">
                  Email Address
                  <span
                    className={`${edit ? "text-red-500" : "text-[#878787]"}`}
                  >
                    *
                  </span>
                </h1>
                <input
                  type="email"
                  name="email"
                  className={`bg-[#fafafa] border border-solid ${
                    !edit ? "border-[#e0e0e0]" : "border-blue-600"
                  } p-4 text-[#878787] h-12 text-[14px] rounded-[2px] outline-0 w-full`}
                  disabled={!edit}
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="my-3">
                <h1 className="text-[18px] text-[#212121] font-medium mb-1">
                  Mobile Number
                  <span
                    className={`${edit ? "text-red-500" : "text-[#878787]"}`}
                  >
                    *
                  </span>
                </h1>
                <input
                  type="number"
                  name="mobile"
                  className={`bg-[#fafafa] border border-solid ${
                    !edit ? "border-[#e0e0e0]" : "border-blue-600"
                  } p-4 text-[#878787] h-12 text-[14px] rounded-[2px] outline-0 w-full`}
                  disabled={!edit}
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
              </div>
              <div className="my-3">
                <h1 className="text-[18px] text-[#212121] font-medium mb-1">
                  Address
                  <span
                    className={`${edit ? "text-red-500" : "text-[#878787]"}`}
                  >
                    *
                  </span>
                </h1>
                <input
                  type="text"
                  name="address"
                  className={`bg-[#fafafa] border border-solid ${
                    !edit ? "border-[#e0e0e0]" : "border-blue-600"
                  } p-4 text-[#878787] h-12 text-[14px] rounded-[2px] outline-0 w-full`}
                  disabled={!edit}
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="my-3 w-full">
                  <h1 className="text-[18px] text-[#212121] font-medium mb-1 ">
                    Country
                    <span
                      className={`${edit ? "text-red-500" : "text-[#878787]"}`}
                    >
                      *
                    </span>
                  </h1>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    disabled={!edit}
                    className={`bg-[#fafafa] border border-solid ${
                      !edit ? "border-[#e0e0e0]" : "border-blue-600"
                    } md:px-4 px-1 text-[#878787] md:h-12 h-8 text-[14px] rounded-[2px] outline-0 w-full`}
                  >
                    <option value="">Select Country</option>
                    {country.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="my-3 w-full">
                  <h1 className="text-[18px] text-[#212121] font-medium mb-1">
                    State
                    <span
                      className={`${edit ? "text-red-500" : "text-[#878787]"}`}
                    >
                      *
                    </span>
                  </h1>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    disabled={!edit}
                    className={`bg-[#fafafa] border border-solid ${
                      !edit ? "border-[#e0e0e0]" : "border-blue-600"
                    } md:px-4 px-1 text-[#878787] md:h-12 h-8 text-[14px] rounded-[2px] outline-0 w-full`}
                  >
                    <option value="">Select State</option>
                    {states.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="my-3 w-full">
                  <h1 className="text-[18px] text-[#212121] font-medium mb-1">
                    City
                    <span
                      className={`${edit ? "text-red-500" : "text-[#878787]"}`}
                    >
                      *
                    </span>
                  </h1>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={!edit}
                    className={`bg-[#fafafa] border border-solid ${
                      !edit ? "border-[#e0e0e0]" : "border-blue-600"
                    } md:px-4 px-1 text-[#878787] md:h-12 h-8 text-[14px] rounded-[2px] outline-0 w-full`}
                  >
                    <option value="">Select City</option>
                    {citiesList.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {edit ? (
                <div className="my-8">
                  <button
                    className={`bg-[#2874f0] h-12 w-full  text-white rounded-[5px] font-lg ${
                      loading ? "opacity-50" : "opacity-100 cursor-pointer"
                    }`}
                    onClick={handleSaveChanges}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Save Changes"}
                  </button>
                </div>
              ) : (
                ""
              )}
              <div className="my-3 inline-block">
                <h1 className="text-[14px] text-[#d23276] pt-6 cursor-pointer font-bold hover:underline hover:underline-[#d23276]">
                  Delete Account
                </h1>
              </div>
            </div>
            <div>
              <img className="w-full bg-cover" src={pagefooter} alt="Footer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Myaccount;

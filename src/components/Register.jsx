import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import cities from "../api/cities.json";
import country from "../api/country.json";
import state from "../api/state.json";
import { toast } from "react-toastify";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    gender: "",
    address: "",
    state: "",
    city: "",
    country: "",
  });

  console.log("formData", formData);
  const [showPassword, setShowPassword] = useState(false);
  const [states, setStates] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCountryChange = (e) => {
    const selectedCountryName = e.target.value;
    
    const selectedCountry = country.find((c) => c.name === selectedCountryName);

    setFormData((prev) => ({ ...prev, country: selectedCountry.name }));

    const filteredStates = state.filter(
      (state) => state.country_id === selectedCountry.id
    );
    setStates(filteredStates);
  };

  const handleStateChange = (e) => {
    const selectedStateName = e.target.value;
    const selectedState = state.find((s) => s.name === selectedStateName);

    setFormData((prev) => ({ ...prev, state: selectedState.name }));

    const filteredCities = cities.filter(
      (city) => city.state_id === selectedState.id
    );
    setCitiesList(filteredCities);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("register", setFormData);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/user/register",
        formData
      );
      console.log("response", response);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/login");
        setLoading(false);
      }, 5000);
    } catch (err) {
      console.log("error", err);
      setError(err.response.data);
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <>
      <div className="py-[30px] border-b-[1px] border-b-solid text-center border-b-[#f0f0f0] bg-[#f0f0f0]">
        <h1 className="text-[42px]  text-[#222222]">Register</h1>
        <p className="text-[#222222] text-[15px]">
          <Link to="/">Home</Link>&nbsp; &nbsp; &gt; &nbsp; &nbsp;
          <span>Register</span>
        </p>
      </div>
      <div className="mt-10 grid place-items-center mx-2">
        <form onSubmit={handleSubmit}>
          <div className="md:min-w-2xl w-full grid sm:grid-cols-2 grid-cols-1 gap-4">
            <div className="mt-3">
              <label className="block text-[#222] font-medium mb-1">
                First name <span className="text-red-500">*</span>
              </label>
              <input
                className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                type="text"
                name="firstName"
                value={setFormData.firstName}
                placeholder="First Name"
                onChange={handleChange}
              />
              {error.path === "firstName" ? (
                <p className="text-red-500 ps-2 pt-1 text-[14px]">
                  {error.msg}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="mt-3">
              <label className="block text-[#222] font-medium mb-1">
                Last name <span className="text-red-500">*</span>
              </label>
              <input
                className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                type="text"
                name="lastName"
                value={setFormData.lastName}
                placeholder="Last Name"
                onChange={handleChange}
              />
              {error.path === "lastName" ? (
                <p className="text-red-500 ps-2 pt-1 text-[14px]">
                  {error.msg}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="mt-3">
              <label className="block text-[#222] font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                type="email"
                name="email"
                value={setFormData.email}
                placeholder="Email"
                onChange={handleChange}
              />
              {error.path === "email" ? (
                <p className="text-red-500 ps-2 pt-1 text-[14px]">
                  {error.msg}
                </p>
              ) : (
                ""
              )}
              {error && (
                <p className="text-red-500 ps-2 pt-1 text-[14px]">
                  {error.message}
                </p>
              )}
            </div>
            <div className="mt-3">
              <label className="block text-[#222] font-medium mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <input
                  className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                  name="password"
                  type={!showPassword ? "password" : "text"}
                  value={setFormData.password}
                  placeholder="Password"
                  onChange={handleChange}
                />
                <span
                  className="bg-black text-white py-[6px] w-[80px] px-4 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? "Show" : "Hide"}
                </span>
              </div>
              {error.path === "password" ? (
                <p className="text-red-500 ps-2 pt-1 text-[14px]">
                  {error.msg}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="mt-3">
              <label className="block text-[#222] font-medium mb-1">
                Mobile <span className="text-red-500">*</span>
              </label>
              <input
                className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                type="number"
                name="mobile"
                value={setFormData.mobile}
                placeholder="Mobile"
                onChange={handleChange}
              />
              {error.path === "mobile" ? (
                <p className="text-red-500 ps-2 pt-1 text-[14px]">
                  {error.msg}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="mt-3">
              <label className="block text-[#222] font-medium mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                name="gender"
                value={setFormData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                {/* <option value="other">Other</option> */}
              </select>
              {error.path === "gender" ? (
                <p className="text-red-500 ps-2 pt-1 text-[14px]">
                  {error.msg}
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="mt-3">
              <label className="block text-[#222] font-medium mb-1">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                onChange={handleCountryChange}
                value={setFormData.country}
                name="country"
              >
                <option value="">Select Country</option>
                {country.map((country) => (
                  <option key={country.id} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              {error.path === "country" ? (
                <p className="text-red-500 ps-2 pt-1 text-[14px]">
                  {error.msg}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="mt-3">
              <label className="block text-[#222] font-medium mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <select
                className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                onChange={handleStateChange}
                value={setFormData.state}
                name="state"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.id} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
              {error.path === "state" ? (
                <p className="text-red-500 ps-2 pt-1 text-[14px]">
                  {error.msg}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="mt-3">
              <label className="block text-[#222] font-medium mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <select
                className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                name="city"
                value={setFormData.city}
                onChange={handleChange}
              >
                <option value="">Select City</option>
                {citiesList.map((city, index) => (
                  <option key={index} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              {error.path === "city" ? (
                <p className="text-red-500 ps-2 pt-1 text-[14px]">
                  {error.msg}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="mt-3">
              <label className="block text-[#222] font-medium mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                type="text"
                name="address"
                value={setFormData.address}
                placeholder="Address"
                onChange={handleChange}
              />
              {error.path === "address" ? (
                <p className="text-red-500 ps-2 pt-1 text-[14px]">
                  {error.msg}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>

          <button
            className="bg-black mt-6 w-full rounded-[5px] py-2 px-7 text-[16px] text-white transition-all cursor-pointer"
            type="submit"
          >
            {!loading ? (
              <p className="text-white text-[18px]">Register</p>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <div className="spinner"></div>
                <p className="text-white text-[18px]">Loading...</p>
              </div>
            )}
          </button>

          <p className="text-[#222222] text-[16px] py-5 text-end">
            Already have an account?{" "}
            <Link to="/login" className="hover:text-blue-700 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;

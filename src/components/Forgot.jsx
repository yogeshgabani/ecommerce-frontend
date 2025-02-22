import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Forgot() {
  const [email, setEmail] = useState("kalpesh@gmail.com");
  const [password, setPassword] = useState("12345678");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email, password", email, password);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/user/login",
        {
          email,
          password,
        }
      );
      console.log("response", response);
      console.log(response.data.data.token);
      toast.success(response.data.message);
      navigate("/login");

      const token = response.data.data.token;
      console.log("token", token);
      onLogin(token);
    } catch (err) {
      console.log("error", err);
    }
  };


  return (
    <>
      <div className="py-[60px] border-b-[1px] border-b-solid text-center border-b-[#f0f0f0] bg-[#f0f0f0]">
        <h1 className="text-[42px]  text-[#222222]">Forgot Password</h1>
        <p className="text-[#222222] text-[15px]">
          <Link className="hover:text-red-700" to="/">Home</Link>&nbsp; &nbsp; &#62; &nbsp; &nbsp;
          <span>Forgot</span>
        </p>
      </div>
      <div className="mt-10 grid place-items-center mx-2">
        <div className="md:min-w-2xl w-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-2  w-full">
              <input
                className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee] border-solid"
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className=" mt-3 ">
              <input
                className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee] border-solid"
                type="text"
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button
              className="bg-black mt-4 w-full rounded-[5px] py-2 px-7 text-[16px] transition-all  cursor-pointer  text-white "
              type="submit"
            >
              Change Password
            </button>
             
          </form>
        </div>
      </div>
    </>
  );
}

export default Forgot;

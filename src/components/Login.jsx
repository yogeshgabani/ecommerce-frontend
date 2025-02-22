import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";        
import { toast } from "react-toastify";


function Login({ onLogin }) {
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
      navigate("/product");
      const token = response.data.data.token;
      console.log("token", token);
      onLogin(token);
    } catch (err) {
      console.log("error", err);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch("http://localhost:3001/api/user/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({email, password})
  //     });
  //     console.log('response', response)
  //   } catch (error) {
  //     console.log('error', error)
  //   }
  // };

  return (
    <>
      <div className="ms:py-[60px] py-8 border-b-[1px] border-b-solid text-center border-b-[#f0f0f0] bg-[#f0f0f0]">
        <h1 className="text-[42px]  text-[#222222]">Login</h1>
        <p className="text-[#222222] text-[15px]">
          <Link to="/">Home</Link>&nbsp; &nbsp; &#62; &nbsp; &nbsp;
          <span>Login</span>
        </p>
      </div>
      <div className="mt-10 grid place-items-center md:mx-0 mx-4">
        <div className="md:max-w-2xl w-full">
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
            <Link to='/forgot'>
              <p className="text-[#222222] ms-3 text-[16px] py-5 hover:text-blue-700 hover:underline cursor-pointer">
                Forgot your password?
              </p>
            </Link>
            <button
              className="bg-black mt-4 w-full rounded-[5px] py-2 px-7 text-[16px] transition-all  cursor-pointer scale-100  text-white "
              type="submit"
            >
              Login
            </button>
            <p className="text-[#222222] ms-3 text-[16px] py-5  text-end">
              New Customer?{" "}
              <Link
                to="/register"
                className="hover:text-blue-700 hover:underline cursor-pointer"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

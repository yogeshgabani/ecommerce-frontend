import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Headers from "../components/Headers";
import ViewProduct from "../components/viewProduct";
import Cart from "../components/Cart";
import Myorder from "../components/Myorder";
import ProductView from "../components/ProductView";
import Whishlist from "../components/Whishlist";
import Register from "../components/Register";
import Forgot from "../components/Forgot";
import Footer from "../components/Footer";
import Myaccount from "../components/Myaccount";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "../components/NotFound";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("authToken");
  return token ? element : <Navigate to="/login" />;
};

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) setIsAuthenticated(true);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    toast.success("logout successfully");
  };

  return (
    <BrowserRouter>
      <Headers isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login onLogin={handleLogin} />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot" element={<Forgot />} />
        <Route
          path="myaccount"
          element={<ProtectedRoute element={<Myaccount />} />}
        />
        <Route
          path="product"
          element={<ProtectedRoute element={<ViewProduct />} />}
        />
        <Route
          path="product/:id"
          element={
            <ProtectedRoute element={<ProductView key={useParams().id} />} />
          }
        />
        <Route path="cart" element={<ProtectedRoute element={<Cart />} />} />
        <Route
          path="myorder"
          element={<ProtectedRoute element={<Myorder />} />}
        />
        <Route
          path="wishlist"
          element={<ProtectedRoute element={<Whishlist />} />}
        />
        <Route
          path="about"
          element={<ProtectedRoute element="{<Headers />}" />}
        />
        <Route path="galary" element={<ProtectedRoute element="galary" />} />
        <Route
          path="contact"
          element={<ProtectedRoute element={<Whishlist />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      
    </BrowserRouter>
  );
}

export default AppRoutes;

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import api from "../../../services/api";
import logo from "../../../assets/food-logo.png";
import bgImage from "../../../assets/background.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (values) => {
    try {
      const response = await api.post("/users/login", values);
      login(response.data);
      const from = location.state?.from || "/";
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(formData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl shadow-lg rounded-3xl overflow-hidden bg-white bg-opacity-50 p-10">
        {/* Logo section - unchanged */}
        <div className="md:w-1/2 mb-10 md:mb-0 px-4">
          <div className="flex items-center justify-center md:justify-start">
            <div className="w-[150px] h-[150px] overflow-hidden rounded-full shadow-md border border-[#e0d2c1]">
              <img src={logo} alt="logo" className="object-cover w-full h-full" />
            </div>
            <p className="ml-6 text-6xl font-bold">WOLSOM</p>
          </div>
        </div>

        {/* Form section */}
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 bg-[#fff9f3] p-8 rounded-2xl border border-[#ecdccf] shadow-inner">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Đăng nhập vào tài khoản
          </h2>
          {error && (
            <div className="mb-4 text-red-500 text-center">{error}</div>
          )}
          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-[#d4bfae] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c29669] transition"
            />
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-[#d4bfae] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c29669] transition"
            />
            <button
              type="submit"
              className="w-full bg-[#c29669] text-white font-bold py-3 rounded-lg hover:bg-[#a9794c] transition shadow-md"
            >
              Đăng nhập
            </button>
          </div>
          <p className="mt-6 text-sm text-center">
            Bạn chưa có tài khoản?{" "}
            <Link to="/signin" className="text-[#a35a2a] hover:underline">
              Đăng ký
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
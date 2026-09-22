import React, { useState, useEffect } from "react";
import Logo from "../../assets/food-logo.png";
import { FaCartShopping } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import DarkMode from "./DarkMode";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from '../../contexts/CartContext';

const menu = [
  {
    id: 1,
    name: "Trang chủ",
    link: "/#",
  },
  {
    id: 2,
    name: "Dịch Vụ",
    link: "/#services",
  },
  {
    id: 3,
    name: "Giới Thiệu",
    link: "/about",
  },
  {
    id: 4,
    name: "Sản Phẩm",
    link: "/product",
  },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount, isCartShaking, updateCartCount } = useCart();

  useEffect(() => {
    if (user) {
      updateCartCount();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="h-[80px] flex items-center shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 hover:boder-black">
        <div className="container py-3 sm:py-0">
          <div className="flex justify-between items-center">
            {/* Logo và tên website */}
            <div>
              <a href="/" className="font-bold text-2xl sm:text-3xl flex gap-2">
                <img
                  src={Logo}
                  alt="Logo"
                  className="w-10 border border-black rounded-full"
                />
                WOLSOM
              </a>
            </div>

            {/* Phần bên phải Navbar */}
            <div className="flex justify-between items-center gap-4">
              <div>
                <DarkMode />
              </div>

              {/* Menu */}
              <ul className="hidden sm:flex items-center gap-4">
                {menu.map((menu) => (
                  <li key={menu.id}>
                    {menu.link === "/about" || menu.link === "/product" ? (
                      <Link
                        to={menu.link}
                        className="inline-block py-4 px-4 hover:text-yellow-500"
                      >
                        {menu.name}
                      </Link>
                    ) : (
                      <a
                        href={menu.link}
                        className="inline-block py-4 px-4 hover:text-yellow-500"
                      >
                        {menu.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>

              {/* Giỏ hàng với số lượng */}
              <Link
                to="/cart"
                className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3"
              >
                Giỏ Hàng
                <div className="relative">
                  <FaCartShopping
                    className={`text-xl text-white drop-shadow-sm cursor-pointer ${isCartShaking ? 'animate-shake' : ''}`}
                  />
                  {cartCount > 0 && (
                    <div className="absolute -top-1 -right-2 bg-red-500 text-white w-3.5 h-3.5 rounded-full flex items-center justify-center">
                      <span className="text-[10px] font-bold leading-none">
                        {cartCount}
                      </span>
                    </div>
                  )}
                </div>
              </Link>

              {/* User Profile hoặc Đăng nhập */}
              {user ? (
                <div className="relative group">
                  <button className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white group-hover:bg-primary/90">
                      <FaUserCircle className="text-2xl" />
                    </div>
                  </button>

                  {/* Dropdown menu sẽ hiện khi hover */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50 
                    invisible opacity-0 group-hover:visible group-hover:opacity-100 
                    transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Thông tin tài khoản
                    </Link>
                    <Link
                      to="/history-order" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Đơn hàng của tôi
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-gray-800 hover:bg-gray-700 text-white py-1 px-4 rounded-full duration-200"
                >
                  Đăng Nhập
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
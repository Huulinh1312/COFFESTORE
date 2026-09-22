import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf8f0]">
      <div className="text-center p-8 max-w-xl">
        <h1 className="text-9xl font-bold text-[#6b3f24]">404</h1>
        <div className="h-1.5 w-48 bg-gradient-to-r from-[#d0b59f] via-[#8b5434] to-[#3d1f00] mx-auto rounded-full my-8"></div>
        <h2 className="text-3xl font-semibold text-[#3d1f00] mb-4">
          Không Tìm Thấy Trang
        </h2>
        <p className="text-[#6b3f24] mb-8">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-gradient-to-r from-[#8b5434] to-[#6b3f24] text-white rounded-full font-semibold hover:scale-105 transition-transform duration-200"
        >
          Trở Về Trang Chủ
        </Link>
      </div>
    </div>
  );
};

export default Error404;
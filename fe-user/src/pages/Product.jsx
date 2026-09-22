import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import api from "../services/api";
import { useCart } from '../contexts/CartContext';
import AOS from "aos";
import "aos/dist/aos.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const itemsPerPage = 10;
  const { updateCartCount } = useCart();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  const [apiUrl] = useState(import.meta.env.VITE_API_URL);
  
  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    if (url.includes('gojekapi.com')) return url;
    if (url.startsWith('/uploads')) return `${apiUrl}${url}`;
    return `${apiUrl}/uploads/${url.replace('/uploads/', '')}`;
  };

  // Khởi tạo AOS
  useEffect(() => {
    AOS.init({
      duration: 300,
      easing: 'ease-out-cubic',
      once: true,
      offset: 30, // Khoảng cách từ đầu trang đến vị trí bắt đầu hiệu ứng
      anchorPlacement: 'top-bottom',
    });
  }, []);

  // Gọi lại AOS.refresh() khi trang sản phẩm thay đổi
  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  // Refresh AOS sau khi dữ liệu sản phẩm được tải
  useEffect(() => {
    if (!loading && products.length > 0) {
      AOS.refresh();
    }
  }, [loading, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products?page=${currentPage}&limit=${itemsPerPage}`);
      setProducts(response.data.products);
      setTotalPages(Math.ceil(response.data.totalProducts / itemsPerPage));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (product) => {
    navigate(`/product/${product._id}`, { state: product });
  };

  const showNotification = (text, type) => {
    setMessage({ text, type });
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const handleAddToCart = async (e, product) => {
    e.stopPropagation();
    try {
      await api.post('/cart/add', {
        productId: product._id,
        quantity: 1
      });
      updateCartCount();
      showNotification('Đã thêm sản phẩm vào giỏ hàng!', 'success');
    } catch (error) {
      showNotification(error.response?.data?.message || 'Không thể thêm vào giỏ hàng', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl text-[#6b3f24]" data-aos="fade-in">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#fdf8f0] px-8 py-12 font-sans">
      {/* Notification Message */}
      {showMessage && (
        <div className={`fixed top-20 right-4 px-4 py-3 rounded-lg shadow-lg z-50 animate-fade-in-down
          ${message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-400' : 
           'bg-red-100 text-red-700 border border-red-400'}`}>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" 
                d={message.type === 'success' 
                  ? "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  : "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"}
                clipRule="evenodd" />
            </svg>
            <p>{message.text}</p>
          </div>
        </div>
      )}

      <h1 
        className="text-2xl font-bold text-center text-[#6b3f24] mb-10"
        data-aos="fade-down"
        data-aos-delay="100"
      >
        TẤT CẢ SẢN PHẨM
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10 max-w-5xl mx-auto">
        {products.map((product, index) => (
          <div
            key={product._id}
            onClick={() => handleClick(product)}
            className="flex items-center gap-6 cursor-pointer hover:bg-[#f1e9dd] p-4 rounded-md transition relative group"
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            data-aos-delay={100 + (index % 5) * 50}
            data-aos-duration="600"
          >
            <img
              src={getImageUrl(product.imageUrl[0])}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-full border"
              data-aos="zoom-in"
              data-aos-delay={150 + (index % 5) * 50}
              onError={(e) => {
                console.log("Lỗi tải hình:", e.target.src);
                e.target.onerror = null;
                e.target.src = '/no-image.png';
              }}
            />
            <div 
              className="flex-1 border-b border-dotted border-gray-400"
              data-aos="fade-up"
              data-aos-delay={200 + (index % 5) * 50}
            >
              <span className="font-semibold text-base text-[#6b3f24]">
                {product.name.toUpperCase()}
              </span>
            </div>
            <span 
              className="ml-2 font-bold text-[#6b3f24] whitespace-nowrap text-lg"
              data-aos="fade-left"
              data-aos-delay={250 + (index % 5) * 50}
            >
              {product.price.toLocaleString()}đ
            </span>
            <button
              onClick={(e) => handleAddToCart(e, product)}
              className="absolute top-2 right-2 p-2 bg-[#6b3f24] text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#8b5434]"
              title="Thêm vào giỏ hàng"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <FaCartPlus size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div 
        className="flex justify-center items-center gap-2 mt-10"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-8 h-8 rounded-full border text-sm flex items-center justify-center ${
              currentPage === i + 1
                ? "bg-[#6b3f24] text-white"
                : "bg-white text-[#6b3f24]"
            }`}
          >
            {i + 1}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="w-8 h-8 rounded-full border bg-white text-[#6b3f24] text-sm flex items-center justify-center"
          >
            &rarr;
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
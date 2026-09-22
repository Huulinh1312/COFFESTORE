import React, { useEffect } from "react";
// Import các hình ảnh liên quan đến đồ uống
import BiryaniImg1 from "../../assets/biryani11.png"; // Cà phê đá
import BiryaniImg2 from "../../assets/biryani22.png"; // Trà trái cây
import BiryaniImg3 from "../../assets/biryani33.png"; // Matcha đá
// Import ảnh nền vector
import Vector from "../../assets/vector3.png";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";

// Định nghĩa danh sách các ảnh đồ uống để người dùng có thể lựa chọn
const ImageList = [
  {
    id: 1,
    img: BiryaniImg1,
  },
  {
    id: 2,
    img: BiryaniImg2,
  },
  {
    id: 3,
    img: BiryaniImg3,
  },
];

// Component Hero
const Hero = () => {
  // State để lưu trữ hình ảnh hiện tại đang hiển thị
  const [imageId, setImageId] = React.useState(BiryaniImg1);

  // Khởi tạo AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  // Định nghĩa các thuộc tính cho background, sử dụng hình ảnh vector
  const bgImage = {
    backgroundImage: `url(${Vector})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
  };

  return (
    <>
      {/* Phần Hero với chiều cao tối thiểu và background với hình ảnh vector */}
      <div
        className="min-h-[600px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-black duration-200"
        style={bgImage}
      >
        <div className="container pb-8 sm:pb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Phần nội dung văn bản */}
            <div
              data-aos="zoom-out"
              data-aos-duration="600"
              className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                Welcome{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-primary to-secondary">
                  Wolsom
                </span>{" "}
                Coffee
              </h1>
              <p className="text-sm">
                Thứ hai đến Thứ 7 8:30am - 11:00pm | Hotline:19001879
                <br />
                ----------------------------------------------------------------------------
                <br />
                Tiệm chúng tôi mang đến những tách cà phê, trà và nước
                ép tuyệt hảo, được chọn lọc từ những nguyên liệu đặc biệt và
                tinh túy nhất.
              </p>
              {/* Nút đặt hàng với kiểu gradient */}
              <div>
                <Link
                  to="/product"
                  className="w-[180px] flex items-center justify-center text-center px-4 py-2 rounded-3xl border transition-all transform bg-gradient-to-r from-primary to-secondary text-white hover:border-white hover:bg-white hover:text-white hover:scale-105 duration-200">
                  <span className="text-md font-bold mr-1">Xem sản phẩm</span>
                  {/* Biểu tượng giỏ hàng */}
                  <FaCartShopping className="text-md ml-1 drop-shadow-sm cursor-pointer" />
                </Link>
              </div>
            </div>

            {/* Phần hiển thị hình ảnh chính */}
            <div className="min-h-[450px] sm:min-h-[500px] flex justify-center items-center relative order-1 sm:order-2">
              <div className="h-[350px] sm:h-[500px] overflow-hidden flex justify-center items-center">
                {/* Hình ảnh hiện tại được chọn - Đã tăng kích thước */}
                <img
                  data-aos="zoom-in"
                  data-aos-duration="800"
                  src={imageId}
                  alt="coffee img"
                  className="w-[350px] sm:w-[500px] lg:w-[550px] sm:scale-125 lg:scale-140 mx-auto animate-swing hover:scale-110 transition-all duration-300"
                />
              </div>

              {/* Phần hiển thị các ảnh nhỏ để người dùng có thể chọn */}
              <div className="flex lg:flex-col lg:top-1/2 lg:-translate-y-1/2 lg:py-2 justify-center gap-4 absolute bottom-[0px] lg:-right-12 bg-white/30 rounded-full p-2">
                {ImageList.map((item) => (
                  <img
                    key={item.id}
                    data-aos="zoom-in"
                    data-aos-duration="400"
                    src={item.img}
                    onClick={() => {
                      // Chuyển đổi hình ảnh hiển thị khi người dùng chọn ảnh nhỏ
                      setImageId(
                        item.id === 1
                          ? BiryaniImg1
                          : item.id === 2
                          ? BiryaniImg2
                          : BiryaniImg3
                      );
                    }}
                    alt="coffee variant"
                    className="max-w-[70px] h-[70px] object-contain inline-block hover:scale-125 cursor-pointer transition-all duration-300 rounded-full shadow-md"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
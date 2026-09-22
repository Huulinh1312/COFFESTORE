import React from "react";
import Slider from "react-slick";// Thư viện tạo slider/carousel hiệu ứng trượt ngang

// Dữ liệu giả định về các nhận xét của khách hàng
const testimonialData = [
  {
    id: 1, // 🔴 Lưu ý: Các id đều là 1 => nên sửa thành id khác nhau để tránh lỗi React key trùng nhau
    name: "Hữu Linh",
    text: "Cà phê đậm vị, thơm ngon, đúng gu mình. Đóng gói chắc chắn, không bị đổ. Giao hàng nhanh, nước vẫn còn ấm. Rất hài lòng!",
    img: "https://picsum.photos/101/101",// Ảnh đại diện giả ngẫu nhiên
  },
  {
    id: 1,
    name: "Phi Hùng",
    text: "Đồ uống ngon, giao đúng món. Tuy nhiên đá tan hơi nhiều nên uống bị nhạt chút. Lần sau sẽ dặn ít đá hơn.",
    img: "https://picsum.photos/102/102",
  },
  {
    id: 1,
    name: "Tùng Uy",
    text: "Quán gói kỹ, sạch sẽ. Matcha uống mát lạnh, trái cây tươi. Mình đặt nhiều lần rồi, lần nào cũng ổn áp!",
    img: "https://picsum.photos/103/103",
  },
  {
    id: 1,
    name: "Thiên Ân",
    text: "Cà phê vị ổn nhưng giao hơi lâu, chắc do giờ cao điểm. Mong quán cải thiện thời gian chuẩn bị đơn.",
    img: "https://picsum.photos/103/103",
  },
];

const Testimonial = () => {
  var settings = {
    dots: true,             // Hiện các chấm tròn điều hướng bên dưới slider
    arrows: false,          // Ẩn mũi tên chuyển slide trái/phải
    infinite: true,         // Cho phép lặp lại vô hạn
    speed: 500,             // Thời gian chuyển slide (ms)
    slidesToShow: 1,        // Hiển thị 1 nhận xét mỗi lần
    slidesToScroll: 1,      // Cuộn từng nhận xét một
    autoplay: true,         // Tự động chuyển slide
    autoplaySpeed: 2000,    // Thời gian mỗi slide: 2s
    cssEase: "linear",      // Kiểu chuyển động mượt
    pauseOnHover: true,     // Dừng tự động khi hover
    pauseOnFocus: true,     // Dừng khi người dùng tương tác
  };
  return (
    <>
      <div data-aos="fade-up" data-aos-duration="300" className="py-10">
        <div className="container">
          <div className="text-center mb-8 max-w-[400px] mx-auto">
            <h1 className="text-3xl mb-8 font-bold">Phản Hồi Khách Hàng</h1>
            <p className="text-2x1 max-w-[400px] text-gray-400 mx-aoto">
            "Tôi thực sự ấn tượng với chất lượng đồ uống và dịch vụ. Cà phê ngon, đóng gói cẩn thận, giao nhanh chóng. Tôi chắc chắn sẽ gọi lại nhiều lần!"
            </p>
          </div>
          <div
            data-aos="zoom-in"
            data-aos-duration="300"
            className="grid grid-cols-1 max-w-[600px] mx-auto gap-6"
          >
            <Slider {...settings}>
              {testimonialData.map((data, index) => {
                return (
                  <div key={index} className="my-6">
                    <div
                      className="flex flex-col justify-center items-center gap-4 text-center   shadow-lg p-4 mx-4 rounded-xl dark:bg-gray-800 bg-primary/10 relative"
                    >
                      <img
                        className="rounded-full block mx-auto"
                        src={data.img}
                        alt=""
                      />
                      <p className="text-gray-500 text-sm">{data.text}</p>
                      <h1 className="text-xl font-bold">{data.name}</h1>
                      <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">
                        ,,
                      </p>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;

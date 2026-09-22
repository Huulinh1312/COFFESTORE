import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import quan1 from "../assets/quan1.jpg"; // dùng cho phần Thủ công
import quan2 from "../assets/quan2.jpg"; // dùng cho phần Quan tâm
import quan3 from "../assets/quan3.jpg"; // dùng cho phần Cảm hứng
import quan4 from "../assets/quan4.jpg"; // dùng cho phần Hương vị

const About = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,         // Khoảng cách bắt đầu animation khi cuộn đến (100px)
      duration: 500,       // Thời gian thực hiện animation (500ms)
      easing: "ease-in-sine", // Kiểu chuyển động
      delay: 100,          // Độ trễ trước khi animation bắt đầu
    });
    AOS.refresh(); // Cập nhật lại AOS để đảm bảo mọi thành phần được áp dụng đúng hiệu ứng
  }, []);

  return (
    <div className="px-6 py-12 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Giới thiệu chung */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-2xl font-bold mb-4">"Hương Vị Đặc Trưng Wolsom"</h2>
          <p className="mb-4 max-w-3xl mx-auto">
            Wolsom Coffee luôn tìm kiếm hương vị tinh tế nhất để gửi gắm, từ hương thơm
            đến hậu vị. Mỗi sản phẩm đều được thực hiện một cách tỉ mỉ, thủ công và mang đậm dấu ấn cá nhân.
          </p>
          <img
            src={quan4}
            alt="Đồ uống Wolsom"
            className="mx-auto w-60 my-6 rounded-lg shadow-md"
            data-aos="zoom-in"
          />
          <div className="flex flex-col sm:flex-row justify-center gap-12 mt-6">
            <div className="text-center" data-aos="fade-right">
              <div className="text-3xl mb-2">👁️</div>
              <h4 className="font-semibold">Tầm nhìn</h4>
              <p className="max-w-xs mx-auto">
                Mang người yêu thích đồ uống của Việt Nam tiếp cận giá trị thủ công một cách trọn vẹn.
              </p>
            </div>
            <div className="text-center" data-aos="fade-left">
              <div className="text-3xl mb-2">💡</div>
              <h4 className="font-semibold">Sứ mệnh</h4>
              <p className="max-w-xs mx-auto">
                Đồng hành và nâng đỡ những dấu ấn cá nhân trong quá trình phát triển ngành đồ uống bền vững.
              </p>
            </div>
          </div>
        </div>

        {/* Giá trị cốt lõi */}
        <h2 className="text-2xl font-bold text-center mb-10" data-aos="fade-up">
          Giá trị cốt lõi
        </h2>
        <div className="space-y-12">
          {/* Thủ công */}
          <div className="flex flex-col md:flex-row items-center gap-6" data-aos="fade-right">
            <img src={quan3} alt="Thủ công" className="w-full md:w-1/2 rounded-lg shadow-md" />
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold mb-2">Thủ công</h3>
              <p>
                Tại Wolsom, sản phẩm được tạo nên từ sự tỉ mỉ trong từng công đoạn. 
                Chúng tôi sử dụng kỹ thuật thủ công và chọn lọc nguyên liệu kỹ càng để đảm bảo chất lượng.
              </p>
            </div>
          </div>

          {/* Quan tâm */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-6" data-aos="fade-left">
            <img src={quan2} alt="Quan tâm" className="w-full md:w-1/2 rounded-lg shadow-md" />
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold mb-2">Quan tâm</h3>
              <p>
                Wolsom đề cao giá trị tinh thần trong từng ly đồ uống. 
                Sự tận tâm với khách hàng và cộng đồng là một phần không thể thiếu trong hành trình xây dựng thương hiệu.
              </p>
            </div>
          </div>

          {/* Cảm hứng */}
          <div className="flex flex-col md:flex-row items-center gap-6" data-aos="fade-right">
            <img src={quan1} alt="Cảm hứng" className="w-full md:w-1/2 rounded-lg shadow-md" />
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold mb-2">Cảm hứng</h3>
              <p>
                Chúng tôi mong muốn Wolsom sẽ là nơi truyền cảm hứng cho những ai yêu thích sáng tạo, khởi nghiệp,
                hay đơn giản là tìm kiếm một không gian thư giãn và kết nối.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
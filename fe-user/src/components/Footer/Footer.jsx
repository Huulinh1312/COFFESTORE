import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";
import footerLogo from "../../assets/food-logo.png";

const Footer = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
      <section className="max-w-[1200px] mx-auto px-4">
        <div className="grid md:grid-cols-4 py-5">
          {/* Cột 1 (chiếm 2 cột) */}
          <div className="md:col-span-2 py-8">
            <h1 className="text-2xl font-bold flex items-center gap-3 mb-3">
              <img src={footerLogo} alt="Logo" className="max-w-[50px]" />
              <span className="text-500">WOLSOM</span>
            </h1>
            <p>
              Wolsom là quán cà phê mang đến không gian thư giãn và lý tưởng,
              kết hợp với những tách cà phê đậm đà. Chúng tôi cam kết mang lại
              trải nghiệm tuyệt vời, nơi bạn có thể tận hưởng những phút giây
              thư thái cùng bạn bè và người thân.
            </p>
            <div className="flex items-start gap-3 mt-5">
              <FaLocationArrow className="text-orange-500 mt-1" />
              <p>78 Xô Viết Nghệ Tĩnh, Phường 25, Bình Thạnh, TP.Hồ Chí Minh</p>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <FaMobileAlt className="text-orange-500" />
              <p>+98 3247561</p>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <a href="https://www.instagram.com/wolsom/" className="hover:text-[#E1306C] transition-all duration-200">
                <FaInstagram className="text-3xl" />
              </a>
              <a href="https://www.instagram.com/wolsom/" className="hover:text-[#1877F2] transition-all duration-200">
                <FaFacebook className="text-3xl" />
              </a>
              <a href="https://www.instagram.com/wolsom/" className="hover:text-[#0A66C2]  transition-all duration-200">
                <FaLinkedin className="text-3xl" />
              </a>
            </div>
          </div>

          {/* Cột 2, 3, 4 */}
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 md:pl-10">
            {/* Cột Important Links */}
            <div className="py-8">
              <h1 className="text-xl font-bold mb-3 hover:underline underline-offset-4 decoration-orange-400 transition-all duration-200">
                Important Links
              </h1>
              <ul className="flex flex-col gap-3 text-gray-700 dark:text-gray-300">
                <li className="cursor-pointer hover:text-orange-500 transition-all duration-200">Home</li>
                <li className="cursor-pointer hover:text-orange-500 transition-all duration-200">About</li>
                <li className="cursor-pointer hover:text-orange-500 transition-all duration-200">Services</li>
                <li className="cursor-pointer hover:text-orange-500 transition-all duration-200">Login</li>
              </ul>
            </div>

            {/* Cột Social Media */}
            <div className="py-8">
              <h1 className="text-xl font-bold mb-3 hover:underline underline-offset-4 decoration-orange-400 transition-all duration-200">
                Social Media
              </h1>
              <ul className="flex flex-col gap-3 text-gray-700 dark:text-gray-300">
                <li className="cursor-pointer hover:text-orange-500 transition-all duration-200">Our Social Instagram</li>
                <li className="cursor-pointer hover:text-orange-500 transition-all duration-200">wolsom</li>
              </ul>
            </div>

            {/* Cột Support Email */}
            <div className="py-8">
              <h1 className="text-xl font-bold mb-3 hover:underline underline-offset-4 decoration-orange-400 transition-all duration-200">
                Support Email
              </h1>
              <ul className="flex flex-col gap-3 text-gray-700 dark:text-gray-300">
                <li className="cursor-pointer hover:text-orange-500 transition-all duration-200">wolsom@gmail.com</li>
                <li className="cursor-pointer hover:text-orange-500 transition-all duration-200">wolsom@gmail.com</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center py-10 border-t border-gray-300/50 text-sm text-gray-500">
          © 2025 All rights reserved || Made with ❤️ by{" "}
          <span className="text-orange-500 font-semibold">Wolsom Coffee</span>
        </div>
      </section>
    </div>
  );
};

export default Footer;

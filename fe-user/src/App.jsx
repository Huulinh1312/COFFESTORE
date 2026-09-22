import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { privateRoute } from "./routes";
import DefaultLayout from "./layouts/DefaultLayout";
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import AOS from "aos"; // Thư viện animation on scroll (AOS) để tạo hiệu ứng khi cuộn trang
import "aos/dist/aos.css"; // Nhập file CSS của AOS để hiệu ứng hiển thị đúng

const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 0,         // Khoảng cách bắt đầu animation khi cuộn đến (50px)
      duration: 300,       // Thời gian thực hiện animation (300ms)
      easing: "ease-in-sine", // Kiểu chuyển động
      delay: 50,          // Độ trễ trước khi animation bắt đầu
    });
    AOS.refresh(); // Cập nhật lại AOS để đảm bảo mọi thành phần được áp dụng đúng hiệu ứng
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          {privateRoute.map((route, index) => {
            let Layout = DefaultLayout;

            if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    {route.element}
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;

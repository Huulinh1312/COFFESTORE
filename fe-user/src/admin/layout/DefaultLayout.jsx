
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DefaultLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
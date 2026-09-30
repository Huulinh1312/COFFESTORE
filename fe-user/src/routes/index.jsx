import Home from "../pages/Home";
import About from "../pages/About";
import Cart from "../pages/Cart";
import Payment from "../pages/Payment";
import Product from "../pages/Product";
import DetailProduct from "../pages/DetailProduct";
import Login from "../pages/Auth/Login/Login";
import Signin from "../pages/Auth/Signin/Signin";
import Evaluate from "../pages/Evaluate";
import ThankYou from "../pages/Thankyou";
import HistoryOrder from "../pages/HistoryOrder";
import ProtectedRoute from "../components/ProtectedRoute";
import Error404 from "../pages/Error404";
import Dashboard from "../admin/pages/Dashboard";
import Customers from "../admin/pages/Customers";
import Products from "../admin/pages/Products";
import Orders from "../admin/pages/Orders";
import Settings from "../admin/pages/Settings";
import AdminProtectedRoute from "../admin/components/ProtectedRoute";

const privateRoute = [
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
    { path: "/payment", element: <ProtectedRoute><Payment /></ProtectedRoute> },
    { path: "/product", element: <Product /> },
    { path: "/product/:id", element: <DetailProduct /> },
    { path: "/login", element: <Login />, layout: null },
    { path: "/signin", element: <Signin />, layout: null },
    { path: "/evaluate", element: <ProtectedRoute><Evaluate /></ProtectedRoute>, layout: null },
    { path: "/thankyou", element: <ProtectedRoute><ThankYou /></ProtectedRoute>, layout: null },
    { path: "/history-order", element: <ProtectedRoute><HistoryOrder /></ProtectedRoute> },
    { path: "*", element: <Error404 /> },
];

const adminRoutes = [
    { path: "/admin/dashboard", element: <Dashboard /> },
    { path: "/admin/customers", element: <Customers /> },
    { path: "/admin/products", element: <Products /> },
    { path: "/admin/orders", element: <Orders /> },
    { path: "/admin/settings", element: <Settings /> },
].map((route) => ({
    ...route,
    element: <AdminProtectedRoute>{route.element}</AdminProtectedRoute>,
}));

export { privateRoute, adminRoutes };
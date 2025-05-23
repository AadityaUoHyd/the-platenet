import React, { useContext } from "react";
import Menubar from "./components/Menubar/Menubar";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import ExploreFood from "./pages/ExploreFood/ExploreFood";
import FoodDetails from "./pages/FoodDetails/FoodDetails";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Auth from "./components/Auth/Auth";
import VerifyOtp from "./components/VerifyOtp/VerifyOtp";
import Profile from "./pages/Profile/Profile";
import { ToastContainer } from "react-toastify";
import MyOrders from "./pages/MyOrders/MyOrders";
import { StoreContext } from "./context/StoreContext";
import AdminAddFood from "./admin/pages/AddFood/AdminAddFood";
import AdminListFood from "./admin/pages/ListFood/AdminListFood";
import AdminOrders from "./admin/pages/Orders/AdminOrders";
import AdminDashboard from "./admin/pages/AdminDashboard/AdminDashboard"; 
import AdminMenubar from "./admin/components/AdminMenubar/AdminMenubar";
import ProtectedAdminRoute from "./admin/components/AdminRoute/ProtectedAdminRoute";
import Footer from "./components/Footer/Footer";
import About from "./pages/About/About";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Terms from "./pages/Terms/Terms";
import RefundPolicy from "./pages/Refund/RefundPolicy";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import AdminProfile from "./admin/pages/Profile/AdminProfile.jsx";

const App = () => {
  const { token, isAdmin } = useContext(StoreContext);

  if (isAdmin && window.location.pathname === "/") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div id="wrapper" className="d-flex flex-column min-vh-100 width-auto">
      {isAdmin ? <AdminMenubar /> : <Menubar />}
      <ToastContainer />
      <div className="container-fluid flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/explore" element={<ExploreFood />} />
          <Route path="/food/:id" element={<FoodDetails />} />
          <Route path="/cart" element={token && !isAdmin ? <Cart /> : <Auth />} />
          <Route path="/order" element={token && !isAdmin ? <PlaceOrder /> : <Auth />} />
          <Route path="/auth" element={token ? <Home /> : <Auth />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/profile" element={token ? <Profile /> : <Auth />} />
          <Route path="/myorders" element={token && !isAdmin ? <MyOrders /> : <Auth />} />
          <Route path="/order-history" element={token && !isAdmin ? <OrderHistory /> : <Auth />} />
          <Route
            path="/admin/add"
            element={<ProtectedAdminRoute element={<AdminAddFood />} />}
          />
          <Route
            path="/admin/list"
            element={<ProtectedAdminRoute element={<AdminListFood />} />}
          />
          <Route
            path="/admin/orders"
            element={<ProtectedAdminRoute element={<AdminOrders />} />}
          />
          <Route
            path="/admin/profile"
            element={<ProtectedAdminRoute element={<AdminProfile />} />}
          />
          <Route
            path="/admin/dashboard"
            element={<ProtectedAdminRoute element={<AdminDashboard />} />}
          />
          <Route
            path="/admin"
            element={<ProtectedAdminRoute element={<AdminDashboard />} />}
          />
          <Route
            path="*"
            element={<Navigate to={isAdmin ? "/admin/dashboard" : "/"} replace />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
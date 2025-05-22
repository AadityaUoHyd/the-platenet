import React, { useContext, useState, useEffect } from "react";
import "./Menubar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { getUserProfile } from "../../service/userService";

const Menubar = () => {
  const [active, setActive] = useState("home");
  const { quantities, token, setToken, setQuantities, isAdmin, setIsAdmin } = useContext(StoreContext);
  const [profileImage, setProfileImage] = useState(assets.profile);
  const uniqueItemsInCart = Object.values(quantities || {}).filter((qty) => qty > 0).length;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(token);
        setProfileImage(data.profileImageUrl || assets.profile);
      } catch (error) {
        console.error("Failed to fetch profile image:", error);
      }
    };
    if (token) {
      fetchProfile();
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setToken("");
    setQuantities({});
    setIsAdmin(false);
    navigate("/auth?tab=signin"); 
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link to={isAdmin ? "/admin/orders" : "/"}>
          <img src={assets.logo} alt="" className="mx-4" height={48} width={48} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!isAdmin ? (
              <>
                <li className="nav-item">
                  <Link
                    className={active === "home" ? "nav-link fw-bold active" : "nav-link"}
                    to="/"
                    onClick={() => setActive("home")}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={active === "explore" ? "nav-link fw-bold active" : "nav-link"}
                    to="/explore"
                    onClick={() => setActive("explore")}
                  >
                    Menu
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={active === "about" ? "nav-link fw-bold active" : "nav-link"}
                    to="/about"
                    onClick={() => setActive("about")}
                  >
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={active === "contact-us" ? "nav-link fw-bold active" : "nav-link"}
                    to="/contact"
                    onClick={() => setActive("contact-us")}
                  >
                    Contact
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className={active === "add-food" ? "nav-link fw-bold active" : "nav-link"}
                    to="/admin/add"
                    onClick={() => setActive("add-food")}
                  >
                    Add Food
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={active === "list-food" ? "nav-link fw-bold active" : "nav-link"}
                    to="/admin/list"
                    onClick={() => setActive("list-food")}
                  >
                    List Food
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={active === "orders" ? "nav-link fw-bold active" : "nav-link"}
                    to="/admin/orders"
                    onClick={() => setActive("orders")}
                  >
                    Orders
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="d-flex align-items-center gap-4">
            {!isAdmin && (
              <Link to="/cart">
                <div className="position-relative">
                  <img
                    src={assets.cart}
                    alt=""
                    height={28}
                    width={28}
                    className="position-relative"
                  />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-cart">
                    {uniqueItemsInCart}
                  </span>
                </div>
              </Link>
            )}
            {!token ? (
              <>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => navigate("/auth?tab=signin")}
                >
                  Login
                </button>
                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={() => navigate("/auth?tab=signup")}
                >
                  Signup
                </button>
              </>
            ) : (
              <div className="dropdown text-end">
                <a
                  href="#"
                  className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={profileImage}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-circle"
                  />
                </a>
                <ul className="dropdown-menu text-small">
                  {!isAdmin && (
                    <>
                      <li className="dropdown-item" onClick={() => navigate("/profile")}>
                        Profile
                      </li>
                      <li className="dropdown-item" onClick={() => navigate("/order-history")}>
                        Order History
                      </li>
                      <li className="dropdown-item" onClick={() => navigate("/myorders")}>
                        Recent Orders
                      </li>
                    </>
                  )}
                  <li className="dropdown-item hover-red" onClick={logout}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;
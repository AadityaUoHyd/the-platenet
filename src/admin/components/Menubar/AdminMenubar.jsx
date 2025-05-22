import React, { useContext, useState, useEffect } from "react";
import "./AdminMenubar.css";
import { assets } from "../../../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../../context/StoreContext";
import { getUserProfile } from "../../../service/userService";
import { Badge } from "lucide-react";

const AdminMenubar = ({ toggleSidebar }) => {
    const { token, setToken, setQuantities, setIsAdmin } = useContext(StoreContext);
    const navigate = useNavigate();
    const location = useLocation(); // Get current location
    const [active, setActive] = useState("dashboard");
    const [profileImage, setProfileImage] = useState(assets.profile);

    // Update active state based on current pathname
    useEffect(() => {
        const pathname = location.pathname;
        if (pathname === "/admin/dashboard") {
            setActive("dashboard");
        } else if (pathname === "/admin/add") {
            setActive("add-food");
        } else if (pathname === "/admin/list") {
            setActive("list-food");
        } else if (pathname === "/admin/orders") {
            setActive("orders");
        } else if (pathname === "/admin/profile") {
            setActive(""); // No highlight for profile
        } else {
            setActive("dashboard"); // Default to dashboard for /admin or unknown routes
        }
    }, [location.pathname]);

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
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <Link to="/admin/dashboard">
                    <img src={assets.logo} alt="Logo" className="mx-4" height={48} width={48} />
                </Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        
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
                        <li className="nav-item">
                            <Link
                                className={active === "dashboard" ? "nav-link fw-bold active" : "nav-link"}
                                to="/admin/dashboard"
                                onClick={() => setActive("dashboard")}
                            >
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center gap-4">
                        {token && (

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
                                    <li className="dropdown-item" onClick={() => navigate("/admin/profile")}>
                                        Profile
                                    </li>
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

export default AdminMenubar;
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';
import { Twitter, Instagram, Facebook, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const { isAdmin } = useContext(StoreContext);
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter an email address.');
            return;
        }
        // Simulate newsletter subscription (replace with actual API call)
        toast.success(`Subscribed with ${email}!`);
        setEmail('');
    };

    return (
        <footer className="footer bg-dark text-white py-5">
            <div className="container">
                <div className="row">
                    {/* Quick Links */}
                    <div className="col-md-3 mb-4">
                        <h5 className="mb-3 text-link">Quick Links</h5>
                        <ul className="list-unstyled">
                            {!isAdmin && (
                                <>
                                    <li><Link to="/" className="text-white text-decoration-none footer-link">Home</Link></li>
                                    <li><Link to="/explore" className="text-white text-decoration-none footer-link">Menu</Link></li>
                                    <li><Link to="/cart" className="text-white text-decoration-none footer-link">Cart</Link></li>
                                    <li><Link to="/myorders" className="text-white text-decoration-none footer-link">Recent Orders</Link></li>
                                    <li><Link to="/myorders" className="text-white text-decoration-none footer-link">Order History</Link></li>
                                </>
                            )}
                            {isAdmin && (
                                <>
                                    <li><Link to="/admin/add" className="text-white text-decoration-none footer-link">Add Food</Link></li>
                                    <li><Link to="/admin/list" className="text-white text-decoration-none footer-link">List Food</Link></li>
                                    <li><Link to="/admin/orders" className="text-white text-decoration-none footer-link">Orders</Link></li>
                                    <li><Link to="/admin/dashboard" className="text-white text-decoration-none footer-link">Dashboard</Link></li>
                                    <li><Link to="/admin/profile" className="text-white text-decoration-none footer-link">Profile</Link></li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* Company Info */}
                    <div className="col-md-3 mb-4">
                        <h5 className="mb-3 text-link">Company</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/about" className="text-white text-decoration-none footer-link">About Us</Link></li>
                            <li><Link to="/contact" className="text-white text-decoration-none footer-link">Contact Us</Link></li>
                            <li><Link to="/privacy-policy" className="text-white text-decoration-none footer-link">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-white text-decoration-none footer-link">Terms of Service</Link></li>
                            <li><Link to="/refund-policy" className="text-white text-decoration-none footer-link">Refund Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-md-3 mb-4">
                        <h5 className="mb-3 text-link">Contact</h5>
                        <ul className="list-unstyled">
                            <li>Email: support@theplatenet.com</li>
                            <li>Phone: +91 999-999-9999</li>
                            <li>Address: HiTech City, Hyderabad, India</li>
                        </ul>
                        <div className="social-links mt-3 d-flex gap-3">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-info">
                                <Twitter size={24} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-info">
                                <Instagram size={24} />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-info">
                                <Facebook size={24} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-info">
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="col-md-3 mb-4">
                        <h5 className="mb-3 text-link">Newsletter</h5>
                        Subscribe to get the latest updates and offers.
                        <form onSubmit={handleSubscribe}>
                            <div className="input-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button className="btn btn-primary" type="submit">Subscribe</button>
                            </div>
                            <div className="mt-2">
                                Developed By -{' '}
                                <a
                                    href="https://www.linkedin.com/in/aaditya-bachchu-chatterjee-0485933b/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-warning footer-link"
                                >
                                    Aaditya B Chatterjee
                                </a>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center m-0 p-0">
                    © {new Date().getFullYear()} The Platenet. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
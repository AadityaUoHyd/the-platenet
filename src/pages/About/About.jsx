import React from 'react';
import { Utensils, Users, Star, Linkedin, Heart, Rocket, Smile } from 'lucide-react';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <section className="hero-section text-center py-5">
                <Utensils size={48} className="text-primary mb-3" />
                <h1 className="display-4 fw-bold animate-fade-in text-primary">About The Platenet</h1>
                <p className="lead text-muted">Delivering delicious meals to your doorstep.</p>
            </section>
            <div className="container py-5">
                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <Star size={32} className="text-warning mb-3" />
                                <h3 className="card-title">Our Mission</h3>
                                <p className="card-text">
                                    At The Platenet, we aim to connect food lovers with their favorite meals through a seamless, user-friendly platform. We strive to deliver quality, convenience, and satisfaction with every order.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <Users size={32} className="text-primary mb-3" />
                                <h3 className="card-title">Our Team</h3>
                                <p className="card-text">
                                    Our dedicated team of developers, chefs, and delivery experts work together to ensure your dining experience is exceptional. We're passionate about food and technology!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Our Values Section */}
                <div className="py-5">
                    <h2 className="text-center fw-bold mb-5">Our Values</h2>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-body text-center">
                                    <Heart size={32} className="text-danger mb-3" />
                                    <h4 className="card-title">Quality</h4>
                                    <p className="card-text">
                                        We source the freshest ingredients to ensure every meal is a delight.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-body text-center">
                                    <Rocket size={32} className="text-primary mb-3" />
                                    <h4 className="card-title">Innovation</h4>
                                    <p className="card-text">
                                        We embrace technology to make food ordering fast and intuitive.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-body text-center">
                                    <Smile size={32} className="text-warning mb-3" />
                                    <h4 className="card-title">Customer Satisfaction</h4>
                                    <p className="card-text">
                                        Your happiness is our priority, with top-notch support always.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Team Members Section */}
                <div className="py-5">
                    <h2 className="text-center fw-bold mb-5">Meet Our Team</h2>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card shadow-sm h-100">
                                <img
                                    src="https://github.com/AadityaUoHyd/the-platenet/blob/main/aadi.jpg"
                                    alt="Team Member"
                                    className="card-img-top team-img"
                                />
                                <div className="card-body text-center">
                                    <h4 className="card-title">Aaditya B Chatterjee</h4>
                                    <p className="card-text text-muted">Lead Developer</p>
                                    <a
                                        href="https://www.linkedin.com/in/aaditya-bachchu-chatterjee-0485933b/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="team-link"
                                    >
                                        <Linkedin size={24} className="text-primary" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow-sm h-100">
                                <img
                                    src="https://images.unsplash.com/photo-1659354219028-cae11db067c4?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Team Member"
                                    className="card-img-top team-img"
                                />
                                <div className="card-body text-center">
                                    <h4 className="card-title">Prasanthi Reddy</h4>
                                    <p className="card-text text-muted">Head Chef</p>
                                    <a
                                        href="https://linkedin.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="team-link"
                                    >
                                        <Linkedin size={24} className="text-primary" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow-sm h-100">
                                <img
                                    src="https://plus.unsplash.com/premium_photo-1689977871600-e755257fb5f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Team Member"
                                    className="card-img-top team-img"
                                />
                                <div className="card-body text-center">
                                    <h4 className="card-title">Sameer Bhardawaj</h4>
                                    <p className="card-text text-muted">Delivery Manager</p>
                                    <a
                                        href="https://linkedin.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="team-link"
                                    >
                                        <Linkedin size={24} className="text-primary" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Why Choose Us Section */}
                <div className="col-12 text-center mt-5">
                    <h2 className="fw-bold">Why Choose Us?</h2>
                    <p className="text-muted mb-4">Fast delivery, diverse cuisines, and top-notch customer support.</p>
                    <a href="/explore" className="btn btn-primary btn-lg">Explore Menu</a>
                </div>
            </div>
        </div>
    );
};

export default About;
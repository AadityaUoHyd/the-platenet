import React from 'react';
import { Shield } from 'lucide-react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy-page">
            <section className="hero-section text-center py-5 bg-light">
                <Shield size={48} className="text-primary mb-3" />
                <h1 className="display-4 fw-bold text-primary">Privacy Policy</h1>
                <p className="lead text-muted">Your data, our responsibility.</p>
            </section>
            <div className="container py-5">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title mb-4">Our Commitment to Privacy</h2>
                        <p>
                            At The Platenet, we value your trust and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.
                        </p>
                        <h3 className="mt-4">1. Information We Collect</h3>
                        <ul>
                            <li>Personal details (e.g., name, email, phone) during registration or orders.</li>
                            <li>Payment information processed securely via Razorpay.</li>
                            <li>Usage data (e.g., browsing history, preferences) to improve our services.</li>
                        </ul>
                        <h3 className="mt-4">2. How We Use Your Data</h3>
                        <ul>
                            <li>Process and deliver your orders.</li>
                            <li>Personalize your experience with tailored recommendations.</li>
                            <li>Send updates and offers (if subscribed to our newsletter).</li>
                        </ul>
                        <h3 className="mt-4">3. Data Protection</h3>
                        <p>
                            We use industry-standard encryption and security measures to protect your data. We do not share your information with third parties except as required for order fulfillment or legal compliance.
                        </p>
                        <h3 className="mt-4">4. Your Rights</h3>
                        <p>
                            You can access, update, or delete your personal data by contacting us at support@theplatenet.com.
                        </p>
                        <div className="text-center mt-5">
                            <a href="/contact" className="btn btn-primary">Contact Us</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
import React from 'react';
import { CreditCard } from 'lucide-react';
import './RefundPolicy.css';

const RefundPolicy = () => {
    return (
        <div className="refund-policy-page">
            <section className="hero-section text-center py-5 bg-light">
                <CreditCard size={48} className="text-primary mb-3" />
                <h1 className="display-4 fw-bold text-primary">Refund Policy</h1>
                <p className="lead text-muted">Our commitment to your satisfaction.</p>
            </section>
            <div className="container py-5">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title mb-4">Refund Eligibility</h2>
                        <p>
                            At The Platenet, we strive to ensure your satisfaction. Our Refund Policy outlines when and how refunds are processed.
                        </p>
                        <h3 className="mt-4">1. Eligible Cases</h3>
                        <ul>
                            <li>Non-delivery of orders due to our error.</li>
                            <li>Incorrect or damaged items received.</li>
                            <li>Order cancellation before preparation (within 10 minutes).</li>
                        </ul>
                        <h3 className="mt-4">2. Refund Process</h3>
                        <ul>
                            <li>Contact us at support@theplatenet.com within 48 hours of the issue.</li>
                            <li>Provide order details and evidence (e.g., photos of damaged items).</li>
                            <li>Refunds are processed within 7 business days to your original payment method.</li>
                        </ul>
                        <h3 className="mt-4">3. Non-Refundable Cases</h3>
                        <ul>
                            <li>Orders canceled after preparation.</li>
                            <li>Issues not reported within 48 hours.</li>
                            <li>Customer errors (e.g., incorrect delivery address).</li>
                        </ul>
                        <div className="text-center mt-5">
                            <a href="/contact" className="btn btn-primary">Request a Refund</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RefundPolicy;
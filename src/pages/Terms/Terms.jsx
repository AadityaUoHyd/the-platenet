import React from 'react';
import { FileText } from 'lucide-react';
import './Terms.css';

const Terms = () => {
    return (
        <div className="terms-page">
            <section className="hero-section text-center py-5 bg-light">
                <FileText size={48} className="text-primary mb-3" />
                <h1 className="display-4 fw-bold text-primary">Terms of Service</h1>
                <p className="lead text-muted">Rules for using The Platenet.</p>
            </section>
            <div className="container py-5">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title mb-4">Using Our Platform</h2>
                        <p>
                            By using The Platenet, you agree to these Terms of Service, which govern your interaction with our food delivery platform.
                        </p>
                        <h3 className="mt-4">1. Account Responsibilities</h3>
                        <ul>
                            <li>Keep your account credentials secure.</li>
                            <li>Provide accurate information during registration.</li>
                            <li>You are responsible for all activities under your account.</li>
                        </ul>
                        <h3 className="mt-4">2. Order Placement</h3>
                        <ul>
                            <li>Orders are subject to availability and confirmation.</li>
                            <li>Payments are processed via Razorpay; ensure valid payment details.</li>
                        </ul>
                        <h3 className="mt-4">3. Prohibited Activities</h3>
                        <ul>
                            <li>Do not misuse our platform (e.g., fraud, unauthorized access).</li>
                            <li>Do not post harmful or illegal content.</li>
                        </ul>
                        <h3 className="mt-4">4. Termination</h3>
                        <p>
                            We reserve the right to suspend or terminate accounts for violations of these terms.
                        </p>
                        <div className="text-center mt-5">
                            <a href="/contact" className="btn btn-primary">Contact Support</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
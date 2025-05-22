import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "react-toastify";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending....");
    const form = new FormData();
    form.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
    form.append("firstName", formData.firstName);
    form.append("lastName", formData.lastName);
    form.append("email", formData.email);
    form.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });
      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully!");
        toast.success("Message sent successfully!");
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        setResult(data.message);
        toast.error("Failed to send message. Please try again.");
        console.error("Web3Forms error:", data);
      }
    } catch (error) {
      setResult("An error occurred. Please try again.");
      toast.error("Failed to send message. Please try again.");
      console.error("Contact form error:", error);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="hero-section text-center py-5 bg-light">
        <Mail size={48} className="text-primary mb-3 animate-fade-in" />
        <h1 className="display-4 fw-bold animate-fade-in text-primary">Contact Us</h1>
        <p className="lead text-muted animate-fade-in delay-1">
          Get in touch for support, inquiries, or feedback about your food delivery experience.
        </p>
      </section>

      {/* Contact Info and Map */}
      <section className="contact-info py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <h2 className="h3 fw-bold mb-4">Get in Touch</h2>
              <ul className="list-unstyled contact-details">
                <li className="d-flex align-items-center mb-3">
                  <Mail size={24} className="text-primary me-3" />
                  <span>support@theplatenet.com</span>
                </li>
                <li className="d-flex align-items-center mb-3">
                  <Phone size={24} className="text-primary me-3" />
                  <span>+91 999-999-9999</span>
                </li>
                <li className="d-flex align-items-center mb-3">
                  <MapPin size={24} className="text-primary me-3" />
                  <span>HiTech City, Hyderabad, India</span>
                </li>
              </ul>
            </div>
            <div className="col-lg-6">
              <h2 className="h3 fw-bold mb-4">Find Us</h2>
              <div className="map-container rounded shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.276147399316!2d78.37461457509553!3d17.447080483445876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93e4b357e7db%3A0x7d69ce398f695e76!2sHITEC%20City%2C%20Hyderabad%2C%20Telangana%2C%20India!5e0!3m2!1sen!2sus!4v1697643201234!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Platenet Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="contact-form card shadow-sm p-4 p-md-5">
                <h2 className="text-center h3 fw-bold mb-4">Send Us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control custom-input"
                        placeholder="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control custom-input"
                        placeholder="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="email"
                        className="form-control custom-input"
                        placeholder="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <textarea
                        className="form-control custom-input"
                        rows="5"
                        placeholder="Your Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                        type="submit"
                      >
                        <Send size={20} />
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
                <div className="text-center mt-3">
                  <span>{result}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section py-5">
        <div className="container">
          <h2 className="text-center h3 fw-bold mb-5">Frequently Asked Questions</h2>
          <div className="row g-4">
            <div className="col-md-6">
              <h5 className="fw-bold">How do I track my order?</h5>
              <p className="text-muted">
                Once your order is confirmed, you’ll receive a tracking link via email or in the “My Orders” section.
              </p>
            </div>
            <div className="col-md-6">
              <h5 className="fw-bold">What is your refund policy?</h5>
              <p className="text-muted">
                Refunds are processed within 7 business days for eligible orders. Please contact support for details.
              </p>
            </div>
            <div className="col-md-6">
              <h5 className="fw-bold">Can I modify my order?</h5>
              <p className="text-muted">
                Orders can be modified within 10 minutes of placement. Contact support for assistance.
              </p>
            </div>
            <div className="col-md-6">
              <h5 className="fw-bold">How do I contact support?</h5>
              <p className="text-muted">
                Use this form, email us at support@theplatenet.com, or call +91 999-999-9999.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
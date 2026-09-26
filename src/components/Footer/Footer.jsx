import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    return (
        <footer className="future-footer">

            {/* Background Effects */}
            <div className="footer-grid"></div>
            <div className="footer-glow footer-glow-1"></div>
            <div className="footer-glow footer-glow-2"></div>

            <div className="container position-relative">

                {/* Top CTA */}
                <div className="footer-cta">

                    <div>
                        <span className="footer-badge">
                            <i className="bi bi-stars"></i>
                            AI POWERED LEARNING
                        </span>

                        <h2>
                            Build Your Future
                            <span> With LearnHub.</span>
                        </h2>

                        <p>
                            Learn modern technologies, build real projects,
                            and become industry ready.
                        </p>
                    </div>

                    <Link to="/courses" className="footer-cta-btn">
                        Explore Courses
                        <i className="bi bi-arrow-up-right"></i>
                    </Link>

                </div>


                {/* Footer Main */}
                <div className="row footer-main">

                    {/* Brand */}
                    <div className="col-lg-4 col-md-6 mb-5">

                        <Link to="/" className="footer-logo">
                            <span className="footer-logo-icon">
                                <i className="bi bi-stars"></i>
                            </span>

                            Learn<span>Hub</span>
                        </Link>

                        <p className="footer-description">
                            A futuristic learning platform designed to help
                            students master technology, build real-world
                            projects, and grow their careers.
                        </p>

                        {/* Social */}
                        <div className="footer-socials">

                            <a href="#" aria-label="Facebook">
                                <i className="bi bi-facebook"></i>
                            </a>

                            <a href="#" aria-label="Instagram">
                                <i className="bi bi-instagram"></i>
                            </a>

                            <a href="#" aria-label="LinkedIn">
                                <i className="bi bi-linkedin"></i>
                            </a>

                            <a href="#" aria-label="GitHub">
                                <i className="bi bi-github"></i>
                            </a>

                        </div>

                    </div>


                    {/* Quick Links */}
                    <div className="col-lg-2 col-md-6 mb-5">

                        <h5 className="footer-heading">
                            Platform
                        </h5>

                        <ul className="footer-links">

                            <li>
                                <Link to="/">
                                    <i className="bi bi-chevron-right"></i>
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link to="/about">
                                    <i className="bi bi-chevron-right"></i>
                                    About
                                </Link>
                            </li>

                            <li>
                                <Link to="/courses">
                                    <i className="bi bi-chevron-right"></i>
                                    Courses
                                </Link>
                            </li>

                            <li>
                                <Link to="/blog">
                                    <i className="bi bi-chevron-right"></i>
                                    Blog
                                </Link>
                            </li>

                        </ul>

                    </div>


                    {/* Courses */}
                    <div className="col-lg-3 col-md-6 mb-5">

                        <h5 className="footer-heading">
                            Popular Courses
                        </h5>

                        <ul className="footer-links">

                            <li>
                                <Link to="/courses">
                                    <i className="bi bi-chevron-right"></i>
                                    Java Full Stack
                                </Link>
                            </li>

                            <li>
                                <Link to="/courses">
                                    <i className="bi bi-chevron-right"></i>
                                    MERN Stack
                                </Link>
                            </li>

                            <li>
                                <Link to="/courses">
                                    <i className="bi bi-chevron-right"></i>
                                    Python & AI
                                </Link>
                            </li>

                            <li>
                                <Link to="/courses">
                                    <i className="bi bi-chevron-right"></i>
                                    Web Development
                                </Link>
                            </li>

                        </ul>

                    </div>


                    {/* Contact */}
                    <div className="col-lg-3 col-md-6 mb-5">

                        <h5 className="footer-heading">
                            Connect With Us
                        </h5>

                        <div className="footer-contact">

                            <div className="contact-item">
                                <span>
                                    <i className="bi bi-envelope"></i>
                                </span>

                                <div>
                                    <small>Email</small>
                                    <p>support@learnhub.com</p>
                                </div>
                            </div>


                            <div className="contact-item">
                                <span>
                                    <i className="bi bi-telephone"></i>
                                </span>

                                <div>
                                    <small>Phone</small>
                                    <p>+91 98765 43210</p>
                                </div>
                            </div>


                            <div className="contact-item">
                                <span>
                                    <i className="bi bi-geo-alt"></i>
                                </span>

                                <div>
                                    <small>Location</small>
                                    <p>Lucknow, Uttar Pradesh</p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>


                {/* Bottom */}
                <div className="footer-bottom">

                    <p>
                        © {new Date().getFullYear()} LearnHub.
                        All Rights Reserved.
                    </p>

                    <div>
                        <Link to="/privacy">
                            Privacy Policy
                        </Link>

                        <Link to="/terms">
                            Terms & Conditions
                        </Link>
                    </div>

                </div>

            </div>

        </footer>
    );
}

export default Footer;
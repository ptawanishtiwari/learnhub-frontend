import React from "react";

function Footer() {
    return (
        <footer className="bg-dark text-white pt-5 pb-3 mt-5">

            <div className="container">

                <div className="row">

                    {/* Brand Section */}
                    <div className="col-lg-4 col-md-6 mb-4">

                        <h3 className="fw-bold text-primary">
                            LearnHub
                        </h3>

                        <p className="text-light mt-3">
                            Learn new skills, build amazing projects,
                            and grow your career with LearnHub.
                        </p>

                        <div className="d-flex gap-3 mt-3">

                            <a
                                href="#"
                                className="text-white fs-5"
                                aria-label="Facebook"
                            >
                                <i className="bi bi-facebook"></i>
                            </a>

                            <a
                                href="#"
                                className="text-white fs-5"
                                aria-label="Instagram"
                            >
                                <i className="bi bi-instagram"></i>
                            </a>

                            <a
                                href="#"
                                className="text-white fs-5"
                                aria-label="LinkedIn"
                            >
                                <i className="bi bi-linkedin"></i>
                            </a>

                            <a
                                href="#"
                                className="text-white fs-5"
                                aria-label="GitHub"
                            >
                                <i className="bi bi-github"></i>
                            </a>

                        </div>

                    </div>


                    {/* Quick Links */}
                    <div className="col-lg-2 col-md-6 mb-4">

                        <h5 className="fw-bold mb-3">
                            Quick Links
                        </h5>

                        <ul className="list-unstyled">

                            <li className="mb-2">
                                <a
                                    href="/"
                                    className="text-light text-decoration-none"
                                >
                                    Home
                                </a>
                            </li>

                            <li className="mb-2">
                                <a
                                    href="/about"
                                    className="text-light text-decoration-none"
                                >
                                    About
                                </a>
                            </li>

                            <li className="mb-2">
                                <a
                                    href="/courses"
                                    className="text-light text-decoration-none"
                                >
                                    Courses
                                </a>
                            </li>

                            <li className="mb-2">
                                <a
                                    href="/blog"
                                    className="text-light text-decoration-none"
                                >
                                    Blog
                                </a>
                            </li>

                        </ul>

                    </div>


                    {/* Courses */}
                    <div className="col-lg-3 col-md-6 mb-4">

                        <h5 className="fw-bold mb-3">
                            Popular Courses
                        </h5>

                        <ul className="list-unstyled">

                            <li className="mb-2">
                                <a
                                    href="#"
                                    className="text-light text-decoration-none"
                                >
                                    Java Full Stack
                                </a>
                            </li>

                            <li className="mb-2">
                                <a
                                    href="#"
                                    className="text-light text-decoration-none"
                                >
                                    MERN Stack
                                </a>
                            </li>

                            <li className="mb-2">
                                <a
                                    href="#"
                                    className="text-light text-decoration-none"
                                >
                                    Python & AI
                                </a>
                            </li>

                            <li className="mb-2">
                                <a
                                    href="#"
                                    className="text-light text-decoration-none"
                                >
                                    Web Development
                                </a>
                            </li>

                        </ul>

                    </div>


                    {/* Contact */}
                    <div className="col-lg-3 col-md-6 mb-4">

                        <h5 className="fw-bold mb-3">
                            Contact Us
                        </h5>

                        <p className="mb-2">
                            <i className="bi bi-envelope me-2"></i>
                            support@learnhub.com
                        </p>

                        <p className="mb-2">
                            <i className="bi bi-telephone me-2"></i>
                            +91 98765 43210
                        </p>

                        <p className="mb-2">
                            <i className="bi bi-geo-alt me-2"></i>
                            Lucknow, Uttar Pradesh, India
                        </p>

                    </div>

                </div>


                {/* Divider */}
                <hr className="border-secondary" />


                {/* Bottom Footer */}
                <div className="row align-items-center">

                    <div className="col-md-6 text-center text-md-start">

                        <p className="mb-0 text-secondary">
                            © {new Date().getFullYear()} LearnHub.
                            All Rights Reserved.
                        </p>

                    </div>

                    <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">

                        <a
                            href="/privacy"
                            className="text-secondary text-decoration-none me-3"
                        >
                            Privacy Policy
                        </a>

                        <a
                            href="/terms"
                            className="text-secondary text-decoration-none"
                        >
                            Terms & Conditions
                        </a>

                    </div>

                </div>

            </div>

        </footer>
    );
}

export default Footer;
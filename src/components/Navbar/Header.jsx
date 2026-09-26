
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
    return (
        <nav className="future-navbar navbar navbar-expand-lg">

            <div className="container">

                {/* LOGO */}
                <Link
                    className="navbar-brand future-logo"
                    to="/"
                >
                    <span className="logo-icon">
                        <i className="bi bi-stars"></i>
                    </span>

                    <span>
                        Learn<span>Hub</span>
                    </span>
                </Link>


                {/* MOBILE BUTTON */}
                <button
                    className="navbar-toggler future-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>


                {/* NAVIGATION */}
                <div
                    className="collapse navbar-collapse"
                    id="navbarContent"
                >

                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link
                                className="nav-link future-nav-link"
                                to="/"
                            >
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link future-nav-link"
                                to="/about"
                            >
                                About
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link future-nav-link"
                                to="/courses"
                            >
                                Courses
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link future-nav-link"
                                to="/blog"
                            >
                                Blog
                            </Link>
                        </li>

                    </ul>


                    {/* RIGHT SIDE */}
                    <div className="future-actions">

                        {/* AI */}
                        <Link
                            to="/dashboard"
                            className="ai-nav-button"
                        >
                            <i className="bi bi-stars"></i>
                            AI
                        </Link>

                        {/* LOGIN */}
                        <Link
                            to="/login"
                            className="login-button"
                        >
                            Login
                        </Link>

                        {/* REGISTER */}
                        <Link
                            to="/register"
                            className="register-button"
                        >
                            Get Started
                            <i className="bi bi-arrow-up-right ms-1"></i>
                        </Link>

                    </div>

                </div>

            </div>

        </nav>
    );
}

export default Header;


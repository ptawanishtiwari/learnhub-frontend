
import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
            <div className="container">

                {/* Logo / Brand */}
                <Link className="navbar-brand fw-bold fs-4" to="/">
                    LearnHub
                </Link>

                {/* Mobile Toggle Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Content */}
                <div className="collapse navbar-collapse" id="navbarContent">

                    {/* Left Menu */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/about">
                                About
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/courses">
                                Courses
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/blog">
                                Blog
                            </Link>
                        </li>

                    </ul>

                    {/* Right Side Buttons */}
                    <div className="d-flex gap-2">

                        <Link
                            to="/login"
                            className="btn btn-outline-light"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="btn btn-light text-primary fw-semibold"
                        >
                            Register
                        </Link>

                    </div>

                </div>
            </div>
        </nav>
    );
}

export default Header;

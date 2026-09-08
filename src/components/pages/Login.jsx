import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!user.email || !user.password) {

            Swal.fire({
                icon: "warning",
                title: "Missing Information",
                text: "Please enter your email and password."
            });

            return;
        }

        setLoading(true);

        try {

            /*
             * IMPORTANT:
             * Change this URL according to your actual
             * Spring Boot login API endpoint.
             */

            const response = await fetch(
                "https://learnhub-backend-production-9e84.up.railway.app/customer/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: user.email,
                        password: user.password
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Invalid email or password");
            }

            const data = await response.json();

            console.log("Login Response:", data);

            Swal.fire({
                icon: "success",
                title: "Login Successful!",
                text: "Welcome to LearnHub.",
                timer: 1500,
                showConfirmButton: false
            });

            /*
             * Store user information if required
             */
            localStorage.setItem(
                "user",
                JSON.stringify(data)
            );

            setTimeout(() => {
                navigate("/");
            }, 1500);

        } catch (error) {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Invalid email or password."
            });

        } finally {

            setLoading(false);

        }
    };


    return (

        <div
            className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                background: "linear-gradient(135deg, #0d6efd 0%, #6f42c1 100%)"
            }}
        >

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-lg-5 col-md-7 col-sm-10">

                        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

                            <div className="card-body p-4 p-md-5">

                                {/* Logo */}
                                <div className="text-center mb-4">

                                    <div
                                        className="bg-primary text-white rounded-circle
                                        d-inline-flex align-items-center
                                        justify-content-center shadow"
                                        style={{
                                            width: "75px",
                                            height: "75px"
                                        }}
                                    >
                                        <i className="bi bi-mortarboard-fill fs-2"></i>
                                    </div>

                                    <h2 className="fw-bold mt-3 mb-1">
                                        Welcome Back
                                    </h2>

                                    <p className="text-muted">
                                        Login to your LearnHub account
                                    </p>

                                </div>


                                {/* Login Form */}
                                <form onSubmit={handleSubmit}>

                                    {/* Email */}
                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Email Address
                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text bg-light">
                                                <i className="bi bi-envelope"></i>
                                            </span>

                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Enter your email"
                                                value={user.email}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* Password */}
                                    <div className="mb-3">

                                        <div className="d-flex justify-content-between">

                                            <label className="form-label fw-semibold">
                                                Password
                                            </label>

                                            <Link
                                                to="/forgot-password"
                                                className="text-primary text-decoration-none small"
                                            >
                                                Forgot Password?
                                            </Link>

                                        </div>

                                        <div className="input-group">

                                            <span className="input-group-text bg-light">
                                                <i className="bi bi-lock"></i>
                                            </span>

                                            <input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                name="password"
                                                className="form-control"
                                                placeholder="Enter your password"
                                                value={user.password}
                                                onChange={handleChange}
                                                required
                                            />

                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                            >
                                                <i
                                                    className={
                                                        showPassword
                                                            ? "bi bi-eye-slash"
                                                            : "bi bi-eye"
                                                    }
                                                ></i>
                                            </button>

                                        </div>

                                    </div>


                                    {/* Remember Me */}
                                    <div className="form-check mb-4">

                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="rememberMe"
                                        />

                                        <label
                                            className="form-check-label text-muted"
                                            htmlFor="rememberMe"
                                        >
                                            Remember me
                                        </label>

                                    </div>


                                    {/* Login Button */}
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 py-2 fw-semibold"
                                        disabled={loading}
                                    >

                                        {loading ? (

                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                ></span>

                                                Logging in...
                                            </>

                                        ) : (

                                            <>
                                                Login
                                                <i className="bi bi-arrow-right ms-2"></i>
                                            </>

                                        )}

                                    </button>

                                </form>


                                {/* Divider */}
                                <div className="d-flex align-items-center my-4">

                                    <hr className="flex-grow-1" />

                                    <span className="mx-3 text-muted small">
                                        OR
                                    </span>

                                    <hr className="flex-grow-1" />

                                </div>


                                {/* Register */}
                                <div className="text-center">

                                    <p className="text-muted mb-0">
                                        Don't have an account?
                                    </p>

                                    <Link
                                        to="/register"
                                        className="btn btn-outline-primary mt-2 px-4"
                                    >
                                        Create Account
                                    </Link>

                                </div>

                            </div>

                        </div>


                        {/* Back to Home */}
                        <div className="text-center mt-3">

                            <Link
                                to="/"
                                className="text-white text-decoration-none"
                            >
                                <i className="bi bi-arrow-left me-2"></i>
                                Back to Home
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;
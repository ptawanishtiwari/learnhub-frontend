import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function Register() {

    // Store form data
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    // Handle input changes
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {

        e.preventDefault();

        // Check empty fields
        if (
            !user.name ||
            !user.email ||
            !user.phone ||
            !user.password ||
            !user.confirmPassword
        ) {
            Swal.fire({
                icon: "warning",
                title: "Incomplete Form",
                text: "Please fill all fields."
            });

            return;
        }

        // Check password
        if (user.password !== user.confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Password Error",
                text: "Passwords do not match."
            });

            return;
        }

        try {

            // Send data to Spring Boot
            const response = await fetch(
                "http://localhost:8080/customer/create",
                //  "https://learnhub-backend-production-9e84.up.railway.app/customer/create",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        password: user.password,
                        confirmPassword: user.confirmPassword
                    })
                }
            );

            // Check API response
            if (!response.ok) {
                throw new Error("Registration failed");
            }

            // Convert response into JSON
            const data = await response.json();

            console.log("Backend Response:", data);

            // Success SweetAlert
            Swal.fire({
                icon: "success",
                title: "Registration Successful!",
                text: "Your LearnHub account has been created successfully.",
                confirmButtonText: "OK"
            });

            // Clear form
            setUser({
                name: "",
                email: "",
                phone: "",
                password: "",
                confirmPassword: ""
            });

        } catch (error) {

            console.error("Registration Error:", error);

            // Error SweetAlert
            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: "Unable to connect to the server. Please try again."
            });
        }
    };

    return (
        <>
            <style>
                {`
                    * {
                        box-sizing: border-box;
                    }

                    .register-page {
                        min-height: 100vh;
                        background:
                            radial-gradient(circle at 10% 20%, rgba(124, 58, 237, 0.20), transparent 30%),
                            radial-gradient(circle at 90% 80%, rgba(168, 85, 247, 0.18), transparent 30%),
                            linear-gradient(135deg, #050505 0%, #0b0614 45%, #050505 100%);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 60px 15px;
                        position: relative;
                        overflow: hidden;
                    }

                    /* Animated background circles */
                    .register-page::before,
                    .register-page::after {
                        content: "";
                        position: absolute;
                        border-radius: 50%;
                        filter: blur(3px);
                        pointer-events: none;
                    }

                    .register-page::before {
                        width: 280px;
                        height: 280px;
                        background: rgba(124, 58, 237, 0.13);
                        top: -100px;
                        left: -80px;
                        animation: floatCircle 7s ease-in-out infinite;
                    }

                    .register-page::after {
                        width: 350px;
                        height: 350px;
                        background: rgba(168, 85, 247, 0.10);
                        right: -120px;
                        bottom: -120px;
                        animation: floatCircleReverse 9s ease-in-out infinite;
                    }

                    .register-wrapper {
                        width: 100%;
                        max-width: 560px;
                        position: relative;
                        z-index: 2;
                        animation: slideUp 0.8s ease-out;
                    }

                    .register-card {
                        background: rgba(15, 15, 20, 0.88);
                        border: 1px solid rgba(168, 85, 247, 0.35);
                        border-radius: 24px;
                        padding: 2px;
                        box-shadow:
                            0 0 25px rgba(124, 58, 237, 0.16),
                            0 25px 70px rgba(0, 0, 0, 0.65);
                        backdrop-filter: blur(18px);
                        transition: all 0.4s ease;
                    }

                    .register-card:hover {
                        transform: translateY(-5px);
                        border-color: rgba(168, 85, 247, 0.65);
                        box-shadow:
                            0 0 35px rgba(124, 58, 237, 0.28),
                            0 30px 80px rgba(0, 0, 0, 0.75);
                    }

                    .register-card-body {
                        background: linear-gradient(
                            145deg,
                            rgba(18, 18, 24, 0.98),
                            rgba(8, 8, 12, 0.98)
                        );
                        border-radius: 22px;
                        padding: 38px;
                    }

                    .register-title {
                        color: #ffffff;
                        font-size: 32px;
                        font-weight: 800;
                        text-align: center;
                        margin-bottom: 8px;
                        letter-spacing: 0.5px;
                    }

                    .register-title span {
                        color: #a855f7;
                        text-shadow: 0 0 18px rgba(168, 85, 247, 0.7);
                    }

                    .register-subtitle {
                        text-align: center;
                        color: #888891;
                        font-size: 14px;
                        margin-bottom: 30px;
                    }

                    .register-field {
                        margin-bottom: 20px;
                    }

                    .register-label {
                        display: block;
                        color: #d4d4dc;
                        font-size: 14px;
                        font-weight: 600;
                        margin-bottom: 8px;
                    }

                    .register-input {
                        width: 100%;
                        height: 50px;
                        padding: 0 16px;
                        color: #ffffff;
                        background: rgba(5, 5, 8, 0.85);
                        border: 1px solid #2d2638;
                        border-radius: 12px;
                        outline: none;
                        font-size: 14px;
                        transition: all 0.3s ease;
                    }

                    .register-input::placeholder {
                        color: #666671;
                    }

                    .register-input:hover {
                        border-color: #55318a;
                    }

                    .register-input:focus {
                        border-color: #a855f7;
                        background: rgba(12, 8, 18, 0.95);
                        box-shadow:
                            0 0 0 3px rgba(168, 85, 247, 0.10),
                            0 0 18px rgba(168, 85, 247, 0.22);
                        transform: translateY(-1px);
                    }

                    .register-button {
                        width: 100%;
                        height: 52px;
                        border: none;
                        border-radius: 12px;
                        margin-top: 8px;
                        color: #ffffff;
                        font-size: 16px;
                        font-weight: 700;
                        letter-spacing: 0.4px;
                        cursor: pointer;
                        background: linear-gradient(
                            135deg,
                            #6d28d9,
                            #9333ea,
                            #a855f7
                        );
                        background-size: 200% 200%;
                        box-shadow:
                            0 8px 25px rgba(124, 58, 237, 0.30);
                        transition: all 0.35s ease;
                        animation: gradientMove 4s ease infinite;
                    }

                    .register-button:hover {
                        transform: translateY(-3px);
                        box-shadow:
                            0 12px 35px rgba(168, 85, 247, 0.48),
                            0 0 20px rgba(168, 85, 247, 0.22);
                    }

                    .register-button:active {
                        transform: translateY(0);
                    }

                    .login-text {
                        text-align: center;
                        color: #777783;
                        font-size: 14px;
                        margin-top: 24px;
                        margin-bottom: 0;
                    }

                    .login-link {
                        color: #b56cff;
                        text-decoration: none;
                        font-weight: 700;
                        transition: all 0.3s ease;
                    }

                    .login-link:hover {
                        color: #d8a4ff;
                        text-shadow: 0 0 12px rgba(168, 85, 247, 0.7);
                    }

                    .purple-line {
                        width: 65px;
                        height: 3px;
                        margin: 0 auto 12px;
                        border-radius: 10px;
                        background: linear-gradient(
                            90deg,
                            #6d28d9,
                            #a855f7,
                            #d946ef
                        );
                        box-shadow: 0 0 12px rgba(168, 85, 247, 0.7);
                        animation: linePulse 2s ease-in-out infinite;
                    }

                    .brand-icon {
                        width: 55px;
                        height: 55px;
                        margin: 0 auto 18px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 16px;
                        background: linear-gradient(
                            135deg,
                            #6d28d9,
                            #a855f7
                        );
                        color: white;
                        font-size: 25px;
                        font-weight: 800;
                        box-shadow:
                            0 0 25px rgba(168, 85, 247, 0.35);
                        animation: iconFloat 3s ease-in-out infinite;
                    }

                    @keyframes slideUp {
                        from {
                            opacity: 0;
                            transform: translateY(40px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes floatCircle {
                        0%, 100% {
                            transform: translate(0, 0) scale(1);
                        }
                        50% {
                            transform: translate(40px, 30px) scale(1.08);
                        }
                    }

                    @keyframes floatCircleReverse {
                        0%, 100% {
                            transform: translate(0, 0) scale(1);
                        }
                        50% {
                            transform: translate(-40px, -30px) scale(1.1);
                        }
                    }

                    @keyframes iconFloat {
                        0%, 100% {
                            transform: translateY(0);
                        }
                        50% {
                            transform: translateY(-7px);
                        }
                    }

                    @keyframes linePulse {
                        0%, 100% {
                            opacity: 0.65;
                            transform: scaleX(0.85);
                        }
                        50% {
                            opacity: 1;
                            transform: scaleX(1);
                        }
                    }

                    @keyframes gradientMove {
                        0% {
                            background-position: 0% 50%;
                        }
                        50% {
                            background-position: 100% 50%;
                        }
                        100% {
                            background-position: 0% 50%;
                        }
                    }

                    @media (max-width: 576px) {

                        .register-page {
                            padding: 30px 12px;
                        }

                        .register-card-body {
                            padding: 28px 20px;
                        }

                        .register-title {
                            font-size: 27px;
                        }
                    }
                `}
            </style>

            <div className="register-page">

                <div className="register-wrapper">

                    <div className="register-card">

                        <div className="register-card-body">

                            {/* Logo / Icon */}
                            <div className="brand-icon">
                                L
                            </div>

                            <div className="purple-line"></div>

                            <h2 className="register-title">
                                Create <span>Account</span>
                            </h2>

                            <p className="register-subtitle">
                                Join LearnHub and start your learning journey
                            </p>

                            <form onSubmit={handleSubmit}>

                                {/* Full Name */}
                                <div className="register-field">

                                    <label className="register-label">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        className="register-input"
                                        value={user.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                    />

                                </div>

                                {/* Email */}
                                <div className="register-field">

                                    <label className="register-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="register-input"
                                        value={user.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                    />

                                </div>

                                {/* Phone */}
                                <div className="register-field">

                                    <label className="register-label">
                                        Phone
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        className="register-input"
                                        value={user.phone}
                                        onChange={handleChange}
                                        placeholder="Enter your phone number"
                                    />

                                </div>

                                {/* Password */}
                                <div className="register-field">

                                    <label className="register-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        className="register-input"
                                        value={user.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                    />

                                </div>

                                {/* Confirm Password */}
                                <div className="register-field">

                                    <label className="register-label">
                                        Confirm Password
                                    </label>

                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="register-input"
                                        value={user.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
                                    />

                                </div>

                                {/* Register Button */}
                                <button
                                    type="submit"
                                    className="register-button"
                                >
                                    Register
                                </button>

                                {/* Login Link */}
                                <p className="login-text">
                                    Already have an account?{" "}
                                    <Link
                                        to="/login"
                                        className="login-link"
                                    >
                                        Login
                                    </Link>
                                </p>

                            </form>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Register;


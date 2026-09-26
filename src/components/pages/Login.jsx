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
                text: "Please enter your email and password.",
                confirmButtonColor: "#7c3aed"
            });

            return;
        }

        setLoading(true);

        try {

            const response = await fetch(
                "http://localhost:8080/customer/login",
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

                throw new Error(
                    "Invalid email or password"
                );

            }


            // Backend now returns Customer JSON
            const data = await response.json();

            console.log("Login Response:", data);


            // Make sure customer ID exists
            if (!data.id) {

                throw new Error(
                    "Customer ID was not received from server."
                );

            }


            /*
             * Store login information
             *
             * These values will later be used
             * for course enrollment and Razorpay.
             */

            localStorage.setItem(
                "loginStatus",
                "true"
            );

            localStorage.setItem(
                "userEmail",
                data.email
            );

            localStorage.setItem(
                "customerId",
                data.id
            );

            localStorage.setItem(
                "customer",
                JSON.stringify(data)
            );


            // Success message
            await Swal.fire({
                icon: "success",
                title: "Login Successful!",
                text: `Welcome back, ${data.name || "Student"}!`,
                timer: 1500,
                showConfirmButton: false
            });


            // Go to dashboard
            navigate("/dashboard");


        } catch (error) {

            console.error(
                "Login Error:",
                error
            );


            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text:
                    error.message ===
                    "Customer ID was not received from server."
                        ? "Unable to identify your account. Please try again."
                        : "Invalid email or password.",
                confirmButtonColor: "#7c3aed"
            });


        } finally {

            setLoading(false);

        }

    };


    return (

        <div
            className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                background:
                    "linear-gradient(135deg, #0f0b15 0%, #17131f 50%, #21182e 100%)",
                padding: "30px 15px"
            }}
        >

            <div
                className="container"
                style={{
                    maxWidth: "1100px"
                }}
            >

                <div
                    className="row g-0 overflow-hidden shadow-lg"
                    style={{
                        minHeight: "650px",
                        borderRadius: "24px",
                        border: "1px solid #31244a",
                        background: "#17131f"
                    }}
                >

                    {/* ================================================= */}
                    {/* LEFT SIDE - IMAGE */}
                    {/* ================================================= */}

                    <div
                        className="col-lg-6 d-none d-lg-block position-relative"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85')",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}
                    >

                        {/* Dark / Purple Overlay */}

                        <div
                            style={{
                                position: "absolute",
                                inset: "0",
                                background:
                                    "linear-gradient(135deg, rgba(15,11,21,0.90), rgba(124,58,237,0.72))"
                            }}
                        ></div>


                        {/* Left Content */}

                        <div
                            className="position-relative h-100 d-flex flex-column justify-content-between"
                            style={{
                                padding: "50px"
                            }}
                        >

                            {/* Logo */}

                            <div>

                                <div
                                    className="d-flex align-items-center gap-3"
                                >

                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "55px",
                                            height: "55px",
                                            borderRadius: "15px",
                                            background:
                                                "linear-gradient(135deg, #7c3aed, #9333ea)",
                                            color: "#ffffff",
                                            fontSize: "25px"
                                        }}
                                    >

                                        <i className="bi bi-mortarboard-fill"></i>

                                    </div>


                                    <div>

                                        <h3
                                            className="fw-bold mb-0 text-white"
                                        >
                                            LearnHub
                                        </h3>

                                        <small
                                            style={{
                                                color: "#c4b5fd"
                                            }}
                                        >
                                            Learn. Code. Create.
                                        </small>

                                    </div>

                                </div>

                            </div>


                            {/* Main Text */}

                            <div>

                                <span
                                    style={{
                                        color: "#c4b5fd",
                                        fontWeight: "600",
                                        letterSpacing: "2px",
                                        fontSize: "13px"
                                    }}
                                >
                                    WELCOME BACK
                                </span>


                                <h1
                                    className="fw-bold text-white mt-3"
                                    style={{
                                        fontSize: "42px",
                                        lineHeight: "1.15"
                                    }}
                                >
                                    Continue your
                                    <br />

                                    <span
                                        style={{
                                            color: "#c084fc"
                                        }}
                                    >
                                        learning journey.
                                    </span>

                                </h1>


                                <p
                                    className="mt-4"
                                    style={{
                                        color: "#ddd6fe",
                                        fontSize: "16px",
                                        lineHeight: "1.8",
                                        maxWidth: "430px"
                                    }}
                                >
                                    Access your courses, track your
                                    learning progress, and build
                                    skills that move your career
                                    forward.
                                </p>


                                {/* Features */}

                                <div className="mt-4">

                                    <div className="d-flex align-items-center mb-3">

                                        <div
                                            className="d-flex align-items-center justify-content-center me-3"
                                            style={{
                                                width: "38px",
                                                height: "38px",
                                                borderRadius: "10px",
                                                background:
                                                    "rgba(255,255,255,0.12)"
                                            }}
                                        >

                                            <i
                                                className="bi bi-play-circle"
                                                style={{
                                                    color: "#c084fc"
                                                }}
                                            ></i>

                                        </div>

                                        <span className="text-white">
                                            Learn from practical courses
                                        </span>

                                    </div>


                                    <div className="d-flex align-items-center mb-3">

                                        <div
                                            className="d-flex align-items-center justify-content-center me-3"
                                            style={{
                                                width: "38px",
                                                height: "38px",
                                                borderRadius: "10px",
                                                background:
                                                    "rgba(255,255,255,0.12)"
                                            }}
                                        >

                                            <i
                                                className="bi bi-code-slash"
                                                style={{
                                                    color: "#c084fc"
                                                }}
                                            ></i>

                                        </div>

                                        <span className="text-white">
                                            Build real-world projects
                                        </span>

                                    </div>


                                    <div className="d-flex align-items-center">

                                        <div
                                            className="d-flex align-items-center justify-content-center me-3"
                                            style={{
                                                width: "38px",
                                                height: "38px",
                                                borderRadius: "10px",
                                                background:
                                                    "rgba(255,255,255,0.12)"
                                            }}
                                        >

                                            <i
                                                className="bi bi-award"
                                                style={{
                                                    color: "#c084fc"
                                                }}
                                            ></i>

                                        </div>

                                        <span className="text-white">
                                            Earn course certificates
                                        </span>

                                    </div>

                                </div>

                            </div>


                            {/* Bottom */}

                            <div>

                                <p
                                    className="mb-0"
                                    style={{
                                        color: "#c4b5fd",
                                        fontSize: "13px"
                                    }}
                                >
                                    © {new Date().getFullYear()} LearnHub
                                    &nbsp;•&nbsp; Empowering learners
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* ================================================= */}
                    {/* RIGHT SIDE - LOGIN */}
                    {/* ================================================= */}

                    <div
                        className="col-lg-6"
                        style={{
                            background: "#17131f"
                        }}
                    >

                        <div
                            className="h-100 d-flex flex-column justify-content-center"
                            style={{
                                padding: "50px"
                            }}
                        >

                            {/* Mobile Logo */}

                            <div
                                className="d-lg-none text-center mb-4"
                            >

                                <div
                                    className="d-inline-flex align-items-center justify-content-center"
                                    style={{
                                        width: "65px",
                                        height: "65px",
                                        borderRadius: "18px",
                                        background:
                                            "linear-gradient(135deg, #7c3aed, #9333ea)",
                                        color: "#ffffff",
                                        fontSize: "28px"
                                    }}
                                >

                                    <i className="bi bi-mortarboard-fill"></i>

                                </div>

                                <h3
                                    className="fw-bold text-white mt-3"
                                >
                                    LearnHub
                                </h3>

                            </div>


                            {/* Heading */}

                            <div className="mb-4">

                                <span
                                    style={{
                                        color: "#a78bfa",
                                        fontWeight: "600",
                                        fontSize: "13px",
                                        letterSpacing: "1.5px"
                                    }}
                                >
                                    STUDENT LOGIN
                                </span>


                                <h2
                                    className="fw-bold text-white mt-2 mb-2"
                                    style={{
                                        fontSize: "32px"
                                    }}
                                >
                                    Welcome back!
                                </h2>


                                <p
                                    style={{
                                        color: "#9ca3af"
                                    }}
                                >
                                    Login to continue learning with
                                    LearnHub.
                                </p>

                            </div>


                            {/* Login Form */}

                            <form onSubmit={handleSubmit}>

                                {/* Email */}

                                <div className="mb-4">

                                    <label
                                        className="form-label fw-semibold text-white"
                                    >
                                        Email Address
                                    </label>


                                    <div
                                        className="input-group"
                                    >

                                        <span
                                            className="input-group-text"
                                            style={{
                                                background: "#0f0b15",
                                                border:
                                                    "1px solid #31244a",
                                                color: "#a78bfa"
                                            }}
                                        >

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
                                            style={{
                                                background: "#0f0b15",
                                                border:
                                                    "1px solid #31244a",
                                                color: "#ffffff",
                                                boxShadow: "none"
                                            }}
                                        />

                                    </div>

                                </div>


                                {/* Password */}

                                <div className="mb-3">

                                    <div className="d-flex justify-content-between align-items-center">

                                        <label
                                            className="form-label fw-semibold text-white"
                                        >
                                            Password
                                        </label>


                                        <Link
                                            to="/forgot-password"
                                            className="text-decoration-none"
                                            style={{
                                                color: "#a78bfa",
                                                fontSize: "13px"
                                            }}
                                        >
                                            Forgot Password?
                                        </Link>

                                    </div>


                                    <div
                                        className="input-group"
                                    >

                                        <span
                                            className="input-group-text"
                                            style={{
                                                background: "#0f0b15",
                                                border:
                                                    "1px solid #31244a",
                                                color: "#a78bfa"
                                            }}
                                        >

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
                                            style={{
                                                background: "#0f0b15",
                                                border:
                                                    "1px solid #31244a",
                                                color: "#ffffff",
                                                boxShadow: "none"
                                            }}
                                        />


                                        <button
                                            type="button"
                                            className="btn"
                                            onClick={() =>
                                                setShowPassword(
                                                    !showPassword
                                                )
                                            }
                                            style={{
                                                background: "#0f0b15",
                                                border:
                                                    "1px solid #31244a",
                                                color: "#a78bfa"
                                            }}
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
                                        className="form-check-label"
                                        htmlFor="rememberMe"
                                        style={{
                                            color: "#9ca3af"
                                        }}
                                    >
                                        Remember me
                                    </label>

                                </div>


                                {/* Login Button */}

                                <button
                                    type="submit"
                                    className="btn w-100 py-3 fw-bold"
                                    disabled={loading}
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #7c3aed, #9333ea)",
                                        color: "#ffffff",
                                        border: "none",
                                        borderRadius: "12px",
                                        boxShadow:
                                            "0 10px 30px rgba(124,58,237,0.25)"
                                    }}
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
                                            Login to LearnHub

                                            <i className="bi bi-arrow-right ms-2"></i>
                                        </>

                                    )}

                                </button>

                            </form>


                            {/* Divider */}

                            <div
                                className="d-flex align-items-center my-4"
                            >

                                <hr
                                    className="flex-grow-1"
                                    style={{
                                        borderColor: "#31244a"
                                    }}
                                />

                                <span
                                    className="mx-3"
                                    style={{
                                        color: "#6b6475",
                                        fontSize: "13px"
                                    }}
                                >
                                    OR
                                </span>

                                <hr
                                    className="flex-grow-1"
                                    style={{
                                        borderColor: "#31244a"
                                    }}
                                />

                            </div>


                            {/* Register */}

                            <div className="text-center">

                                <p
                                    className="mb-2"
                                    style={{
                                        color: "#9ca3af"
                                    }}
                                >
                                    Don't have a LearnHub account?
                                </p>


                                <Link
                                    to="/register"
                                    className="btn px-4 py-2"
                                    style={{
                                        border:
                                            "1px solid #7c3aed",
                                        color: "#c4b5fd",
                                        borderRadius: "10px"
                                    }}
                                >

                                    <i className="bi bi-person-plus me-2"></i>

                                    Create Account

                                </Link>

                            </div>


                            {/* Back Home */}

                            <div className="text-center mt-4">

                                <Link
                                    to="/"
                                    className="text-decoration-none"
                                    style={{
                                        color: "#77717f",
                                        fontSize: "14px"
                                    }}
                                >

                                    <i className="bi bi-arrow-left me-2"></i>

                                    Back to Home

                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;
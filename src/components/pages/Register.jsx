
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
                // "http://localhost:8080/customer/create",
                 "https://learnhub-backend-production-9e84.up.railway.app/customer/create",
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
                        confirmPassword : user.confirmPassword
                        
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
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-body p-4">

                            <h2 className="text-center mb-4">
                                Create Account
                            </h2>

                            <form onSubmit={handleSubmit}>

                                {/* Full Name */}
                                <div className="mb-3">

                                    <label className="form-label">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={user.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                    />

                                </div>

                                {/* Email */}
                                <div className="mb-3">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={user.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                    />

                                </div>

                                {/* Phone */}
                                <div className="mb-3">

                                    <label className="form-label">
                                        Phone
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        className="form-control"
                                        value={user.phone}
                                        onChange={handleChange}
                                        placeholder="Enter your phone number"
                                    />

                                </div>

                                {/* Password */}
                                <div className="mb-3">

                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={user.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                    />

                                </div>

                                {/* Confirm Password */}
                                <div className="mb-3">

                                    <label className="form-label">
                                        Confirm Password
                                    </label>

                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="form-control"
                                        value={user.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
                                    />

                                </div>

                                {/* Register Button */}
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Register
                                </button>

                                {/* Login Link */}
                                <p className="text-center mt-3 mb-0">
                                    Already have an account?{" "}
                                    <Link to="/login">
                                        Login
                                    </Link>
                                </p>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;


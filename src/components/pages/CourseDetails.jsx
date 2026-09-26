import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function CourseDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paymentLoading, setPaymentLoading] = useState(false);

    // ===============================
    // FETCH COURSE
    // ===============================
    useEffect(() => {

        fetch(`http://localhost:8080/course/${id}`)
            .then((response) => {

                if (!response.ok) {
                    throw new Error("Course not found");
                }

                return response.json();
            })
            .then((data) => {
                setCourse(data);
                setLoading(false);
            })
            .catch((error) => {

                console.error("Course Error:", error);

                setLoading(false);

                Swal.fire({
                    icon: "error",
                    title: "Course Not Found",
                    text: "Unable to load course details."
                });
            });

    }, [id]);


    // ===============================
    // LOAD RAZORPAY SCRIPT
    // ===============================
    const loadRazorpayScript = () => {

        return new Promise((resolve) => {

            if (window.Razorpay) {
                resolve(true);
                return;
            }

            const script = document.createElement("script");

            script.src =
                "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => {
                resolve(true);
            };

            script.onerror = () => {
                resolve(false);
            };

            document.body.appendChild(script);
        });
    };


    // ===============================
    // ENROLL / PAYMENT
    // ===============================
    const handleEnroll = async () => {

        try {

            // --------------------------------
            // 1. CHECK LOGIN
            // --------------------------------

            const loginStatus =
                localStorage.getItem("loginStatus");

            const customerId =
                localStorage.getItem("customerId");

            const customerData =
                localStorage.getItem("customer");

            if (
                loginStatus !== "true" ||
                !customerId
            ) {

                // Remember course
                localStorage.setItem(
                    "pendingCourseId",
                    course.id
                );

                Swal.fire({
                    icon: "info",
                    title: "Login Required",
                    text: "Please login before enrolling in this course.",
                    confirmButtonText: "Login"
                }).then(() => {

                    navigate("/login");

                });

                return;
            }


            // --------------------------------
            // CUSTOMER INFORMATION
            // --------------------------------

            let customer = {};

            if (customerData) {

                try {
                    customer = JSON.parse(customerData);
                } catch (error) {
                    console.log(
                        "Customer data parsing error"
                    );
                }
            }


            // --------------------------------
            // 2. LOAD RAZORPAY
            // --------------------------------

            setPaymentLoading(true);

            const razorpayLoaded =
                await loadRazorpayScript();

            if (!razorpayLoaded) {

                setPaymentLoading(false);

                Swal.fire({
                    icon: "error",
                    title: "Razorpay Error",
                    text: "Razorpay Checkout could not be loaded."
                });

                return;
            }


            // --------------------------------
            // 3. CREATE ORDER
            // --------------------------------

            const orderResponse =
                await fetch(
                    `http://localhost:8080/payment/create-order?customerId=${customerId}&courseId=${course.id}`,
                    {
                        method: "POST"
                    }
                );


            if (!orderResponse.ok) {

                throw new Error(
                    "Unable to create payment order"
                );
            }


            const orderText =
                await orderResponse.text();


            console.log(
                "Create Order Response:",
                orderText
            );


            const orderData =
                JSON.parse(orderText);


            if (!orderData.success) {

                throw new Error(
                    orderData.message ||
                    "Order creation failed"
                );
            }


            console.log(
                "Razorpay Order:",
                orderData
            );


            // --------------------------------
            // 4. RAZORPAY OPTIONS
            // --------------------------------

            const options = {

                key: orderData.keyId,

                amount: orderData.amountInPaise,

                currency: orderData.currency,

                name: "LearnHub",

                description:
                    course.title,

                order_id:
                    orderData.orderId,


                // Customer information
                prefill: {

                    name:
                        customer.name || "",

                    email:
                        customer.email ||
                        localStorage.getItem(
                            "userEmail"
                        ) ||
                        "",

                    contact:
                        customer.phone || ""
                },


                notes: {

                    customerId:
                        String(customerId),

                    courseId:
                        String(course.id)
                },


                theme: {

                    color: "#7c3aed"
                },


                // --------------------------------
                // PAYMENT SUCCESS
                // --------------------------------

                handler: async function (
                    razorpayResponse
                ) {

                    console.log(
                        "Razorpay Success:",
                        razorpayResponse
                    );


                    try {

                        setPaymentLoading(true);


                        // --------------------------------
                        // 5. VERIFY PAYMENT
                        // --------------------------------

                        const verifyUrl =
                            `http://localhost:8080/payment/verify` +
                            `?customerId=${customerId}` +
                            `&courseId=${course.id}` +
                            `&razorpayOrderId=${encodeURIComponent(
                                razorpayResponse.razorpay_order_id
                            )}` +
                            `&razorpayPaymentId=${encodeURIComponent(
                                razorpayResponse.razorpay_payment_id
                            )}` +
                            `&razorpaySignature=${encodeURIComponent(
                                razorpayResponse.razorpay_signature
                            )}`;


                        const verifyResponse =
                            await fetch(
                                verifyUrl,
                                {
                                    method: "POST"
                                }
                            );


                        const verifyText =
                            await verifyResponse.text();


                        console.log(
                            "Verify Response:",
                            verifyText
                        );


                        const verifyData =
                            JSON.parse(
                                verifyText
                            );


                        // --------------------------------
                        // 6. VERIFY RESULT
                        // --------------------------------

                        if (
                            verifyData.success &&
                            verifyData.status ===
                                "SUCCESS"
                        ) {

                            setPaymentLoading(false);


                            await Swal.fire({

                                icon: "success",

                                title:
                                    "Payment Successful!",

                                html: `
                                    <div style="text-align:center">
                                        <p>
                                            You are successfully enrolled in:
                                        </p>

                                        <strong>
                                            ${course.title}
                                        </strong>

                                        <hr>

                                        <p>
                                            Payment ID:
                                            <br>
                                            <small>
                                                ${verifyData.razorpayPaymentId}
                                            </small>
                                        </p>

                                        <p>
                                            Enrollment ID:
                                            <strong>
                                                ${verifyData.enrollmentId}
                                            </strong>
                                        </p>
                                    </div>
                                `,

                                confirmButtonText:
                                    "Go to Dashboard"

                            });


                            // --------------------------------
                            // 7. REDIRECT
                            // --------------------------------

                            navigate(
                                "/dashboard"
                            );

                        } else {

                            setPaymentLoading(false);

                            Swal.fire({

                                icon: "error",

                                title:
                                    "Payment Verification Failed",

                                text:
                                    verifyData.message ||
                                    "Payment could not be verified."

                            });
                        }


                    } catch (error) {

                        console.error(
                            "Verification Error:",
                            error
                        );

                        setPaymentLoading(false);

                        Swal.fire({

                            icon: "error",

                            title:
                                "Verification Error",

                            text:
                                "Payment was completed, but verification failed. Please contact support."
                        });
                    }
                }
            };


            // --------------------------------
            // 8. CREATE RAZORPAY INSTANCE
            // --------------------------------

            const razorpay =
                new window.Razorpay(
                    options
                );


            // --------------------------------
            // PAYMENT FAILED
            // --------------------------------

            razorpay.on(
                "payment.failed",
                function (response) {

                    console.error(
                        "Payment Failed:",
                        response
                    );

                    setPaymentLoading(false);

                    Swal.fire({

                        icon: "error",

                        title:
                            "Payment Failed",

                        text:
                            response.error
                                ?.description ||
                            "Your payment could not be completed."
                    });
                }
            );


            // --------------------------------
            // 9. OPEN RAZORPAY
            // --------------------------------

            setPaymentLoading(false);

            razorpay.open();


        } catch (error) {

            console.error(
                "Payment Error:",
                error
            );

            setPaymentLoading(false);

            Swal.fire({

                icon: "error",

                title:
                    "Payment Error",

                text:
                    error.message ||
                    "Something went wrong while starting payment."
            });
        }
    };


    // ===============================
    // LOADING
    // ===============================

    if (loading) {

        return (
            <div
                className="min-vh-100 d-flex justify-content-center align-items-center"
                style={{
                    background: "#0f0b15",
                    color: "white"
                }}
            >

                <div className="text-center">

                    <div
                        className="spinner-border text-light mb-3"
                        role="status"
                    />

                    <h5>
                        Loading Course...
                    </h5>

                </div>

            </div>
        );
    }


    // ===============================
    // COURSE NOT FOUND
    // ===============================

    if (!course) {

        return (
            <div
                className="min-vh-100 d-flex justify-content-center align-items-center"
                style={{
                    background: "#0f0b15",
                    color: "white"
                }}
            >

                <h3>
                    Course not found
                </h3>

            </div>
        );
    }


    // ===============================
    // COURSE IMAGE
    // ===============================

    const getCourseImage = () => {

        if (course.thumbnail) {

            return course.thumbnail;
        }

        return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80";
    };


    // ===============================
    // FORMAT PRICE
    // ===============================

    const formatPrice = (price) => {

        if (!price || price <= 0) {

            return "Free";
        }

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0
            }
        ).format(price);
    };


    // ===============================
    // UI
    // ===============================

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#0f0b15",
                color: "white"
            }}
        >

            {/* ================= HEADER ================= */}

            <nav
                className="navbar navbar-dark"
                style={{
                    background: "#21182e",
                    borderBottom:
                        "1px solid #31244a"
                }}
            >

                <div className="container">

                    <button
                        className="btn btn-link text-decoration-none"
                        style={{
                            color: "#a78bfa"
                        }}
                        onClick={() =>
                            navigate("/courses")
                        }
                    >

                        <i className="bi bi-arrow-left me-2"></i>

                        Back to Courses

                    </button>


                    <span
                        className="navbar-brand fw-bold"
                        style={{
                            color: "#a78bfa"
                        }}
                    >

                        LearnHub

                    </span>

                </div>

            </nav>


            {/* ================= HERO ================= */}

            <section
                style={{
                    background:
                        "linear-gradient(135deg, #17131f, #21182e)",
                    padding: "70px 0"
                }}
            >

                <div className="container">

                    <div className="row align-items-center g-5">

                        {/* LEFT */}

                        <div className="col-lg-7">

                            <span
                                className="badge mb-3 px-3 py-2"
                                style={{
                                    background:
                                        "rgba(124,58,237,0.15)",
                                    color: "#a78bfa"
                                }}
                            >

                                {course.category ||
                                    "Development"}

                            </span>


                            <h1
                                className="display-5 fw-bold mb-4"
                            >

                                {course.title}

                            </h1>


                            <p
                                className="lead"
                                style={{
                                    color: "#9ca3af",
                                    lineHeight: "1.8"
                                }}
                            >

                                {course.description}

                            </p>


                            <div
                                className="d-flex flex-wrap gap-4 mt-4"
                                style={{
                                    color: "#d1d5db"
                                }}
                            >

                                <span>

                                    <i className="bi bi-bar-chart me-2"></i>

                                    {course.level ||
                                        "All Levels"}

                                </span>


                                <span>

                                    <i className="bi bi-clock me-2"></i>

                                    {course.duration ||
                                        "Self Paced"}

                                </span>


                                <span>

                                    <i className="bi bi-award me-2"></i>

                                    Certificate

                                </span>

                            </div>

                        </div>


                        {/* RIGHT IMAGE */}

                        <div className="col-lg-5">

                            <img
                                src={getCourseImage()}
                                alt={course.title}
                                className="img-fluid rounded-4 shadow-lg"
                                style={{
                                    width: "100%",
                                    height: "320px",
                                    objectFit: "cover",
                                    border:
                                        "1px solid #31244a"
                                }}
                            />

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= COURSE CONTENT ================= */}

            <section className="py-5">

                <div className="container">

                    <div className="row g-5">

                        {/* CONTENT */}

                        <div className="col-lg-8">

                            <div
                                className="p-4 p-md-5 rounded-4"
                                style={{
                                    background:
                                        "#17131f",
                                    border:
                                        "1px solid #31244a"
                                }}
                            >

                                <h3 className="fw-bold mb-4">

                                    What You'll Learn

                                </h3>


                                <div className="row g-3">

                                    {[
                                        "Practical real-world development",
                                        "Build complete projects",
                                        "Industry best practices",
                                        "Hands-on coding experience",
                                        "Database integration",
                                        "API development",
                                        "Deployment techniques",
                                        "Interview preparation"
                                    ].map(
                                        (
                                            item,
                                            index
                                        ) => (

                                            <div
                                                className="col-md-6"
                                                key={index}
                                            >

                                                <div
                                                    className="d-flex align-items-center"
                                                    style={{
                                                        color:
                                                            "#d1d5db"
                                                    }}
                                                >

                                                    <i
                                                        className="bi bi-check-circle-fill me-3"
                                                        style={{
                                                            color:
                                                                "#a78bfa"
                                                        }}
                                                    ></i>

                                                    {item}

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            </div>

                        </div>


                        {/* ================= PURCHASE CARD ================= */}

                        <div className="col-lg-4">

                            <div
                                className="p-4 rounded-4 sticky-top"
                                style={{
                                    top: "20px",
                                    background:
                                        "#17131f",
                                    border:
                                        "1px solid #31244a"
                                }}
                            >

                                <h6
                                    style={{
                                        color:
                                            "#9ca3af"
                                    }}
                                >
                                    Course Price
                                </h6>


                                <h2
                                    className="fw-bold mb-4"
                                    style={{
                                        color:
                                            "#a78bfa"
                                    }}
                                >

                                    {formatPrice(
                                        course.price
                                    )}

                                </h2>


                                <button
                                    className="btn w-100 py-3 fw-bold"
                                    onClick={
                                        handleEnroll
                                    }
                                    disabled={
                                        paymentLoading
                                    }
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #7c3aed, #9333ea)",
                                        color: "white",
                                        border: "none",
                                        borderRadius:
                                            "12px"
                                    }}
                                >

                                    {paymentLoading ? (

                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                            />

                                            Processing...

                                        </>

                                    ) : (

                                        <>
                                            <i className="bi bi-credit-card me-2"></i>

                                            Enroll Now

                                        </>

                                    )}

                                </button>


                                <div
                                    className="text-center mt-3"
                                    style={{
                                        color:
                                            "#6b7280",
                                        fontSize:
                                            "13px"
                                    }}
                                >

                                    <i className="bi bi-shield-check me-1"></i>

                                    Secure payment powered by Razorpay

                                </div>


                                <hr
                                    style={{
                                        borderColor:
                                            "#31244a"
                                    }}
                                />


                                <div
                                    className="small"
                                    style={{
                                        color:
                                            "#9ca3af"
                                    }}
                                >

                                    <p>

                                        <i className="bi bi-infinity me-2"></i>

                                        Lifetime access

                                    </p>


                                    <p>

                                        <i className="bi bi-play-circle me-2"></i>

                                        Access course lectures

                                    </p>


                                    <p>

                                        <i className="bi bi-award me-2"></i>

                                        Course certificate

                                    </p>


                                    <p className="mb-0">

                                        <i className="bi bi-headset me-2"></i>

                                        Student support

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default CourseDetails;
import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

function Dashboard() {

    // =========================================================
    // API CONFIGURATION
    // =========================================================

    const PAYMENT_API = "http://localhost:8080/payment";
    const COURSE_API = "http://localhost:8080/course";

    // If your CustomerController uses different URLs,
    // change only these two constants.
    const CUSTOMER_API = "http://localhost:8080/customer";


    // =========================================================
    // STATE
    // =========================================================

    const [activeMenu, setActiveMenu] = useState("Dashboard");

    const [customerId, setCustomerId] = useState(null);

    const [student, setStudent] = useState({
        id: "",
        name: "Student",
        email: "",
        phone: "",
        role: "USER"
    });

    const [purchasedCourses, setPurchasedCourses] = useState([]);

    const [loading, setLoading] = useState(true);

    const [courseLoading, setCourseLoading] = useState(false);

    const [profileLoading, setProfileLoading] = useState(false);

    const [profileSaving, setProfileSaving] = useState(false);

    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");

    const [statusFilter, setStatusFilter] = useState("ALL");

    const [profileForm, setProfileForm] = useState({
        name: "",
        email: "",
        phone: ""
    });


    // =========================================================
    // GET LOGGED-IN STUDENT
    // =========================================================

    useEffect(() => {

        const storedCustomerId =
            localStorage.getItem("customerId");

        const storedCustomer =
            localStorage.getItem("customer");

        if (!storedCustomerId) {

            setLoading(false);

            setError(
                "Student login information was not found."
            );

            return;
        }


        setCustomerId(
            Number(storedCustomerId)
        );


        if (storedCustomer) {

            try {

                const customer =
                    JSON.parse(storedCustomer);

                setStudent({
                    id:
                        customer.id ||
                        storedCustomerId,

                    name:
                        customer.name ||
                        customer.username ||
                        "Student",

                    email:
                        customer.email ||
                        "",

                    phone:
                        customer.phone ||
                        "",

                    role:
                        customer.role ||
                        "USER"
                });

            } catch (error) {

                console.error(
                    "Customer parsing error:",
                    error
                );
            }
        }

    }, []);


    // =========================================================
    // FETCH STUDENT PROFILE
    // =========================================================

    const fetchStudentProfile = async (id) => {

        if (!id) {
            return;
        }

        try {

            setProfileLoading(true);

            const response =
                await fetch(
                    `${CUSTOMER_API}/${id}`
                );

            if (!response.ok) {
                throw new Error(
                    "Unable to fetch student profile"
                );
            }

            const data =
                await response.json();


            const updatedStudent = {

                id:
                    data.id ||
                    id,

                name:
                    data.name ||
                    data.username ||
                    "Student",

                email:
                    data.email ||
                    "",

                phone:
                    data.phone ||
                    "",

                role:
                    data.role ||
                    "USER"
            };


            setStudent(
                updatedStudent
            );


            setProfileForm({

                name:
                    updatedStudent.name,

                email:
                    updatedStudent.email,

                phone:
                    updatedStudent.phone
            });


            // Keep localStorage synchronized
            localStorage.setItem(
                "customer",
                JSON.stringify(data)
            );


        } catch (error) {

            console.warn(
                "Profile API unavailable:",
                error
            );

            // Use existing localStorage data
            setProfileForm({

                name:
                    student.name || "",

                email:
                    student.email || "",

                phone:
                    student.phone || ""
            });

        } finally {

            setProfileLoading(false);
        }
    };


    // =========================================================
    // FETCH PURCHASED COURSES
    // =========================================================

    const fetchPurchasedCourses = async (id) => {

        if (!id) {
            return;
        }

        try {

            setCourseLoading(true);

            setError("");


            // -------------------------------------------------
            // Get customer's payment records
            // -------------------------------------------------

            const paymentResponse =
                await fetch(
                    `${PAYMENT_API}/customer/${id}`
                );


            if (!paymentResponse.ok) {

                throw new Error(
                    "Unable to fetch purchased courses"
                );
            }


            const payments =
                await paymentResponse.json();


            // -------------------------------------------------
            // Only SUCCESS payments
            // -------------------------------------------------

            const successfulPayments =
                Array.isArray(payments)
                    ? payments.filter(
                        payment =>
                            String(
                                payment.status || ""
                            ).toUpperCase() === "SUCCESS"
                    )
                    : [];


            // -------------------------------------------------
            // Remove duplicate course purchases
            // -------------------------------------------------

            const uniquePayments = [];

            const courseIds = new Set();


            successfulPayments.forEach(
                payment => {

                    const courseId =
                        Number(
                            payment.courseId
                        );


                    if (
                        courseId &&
                        !courseIds.has(courseId)
                    ) {

                        courseIds.add(courseId);

                        uniquePayments.push(
                            payment
                        );
                    }
                }
            );


            // -------------------------------------------------
            // Fetch course details
            // -------------------------------------------------

            const courseResults =
                await Promise.all(

                    uniquePayments.map(
                        async payment => {

                            try {

                                const response =
                                    await fetch(
                                        `${COURSE_API}/${payment.courseId}`
                                    );


                                if (!response.ok) {

                                    return {
                                        payment,
                                        course: null
                                    };
                                }


                                const course =
                                    await response.json();


                                return {
                                    payment,
                                    course
                                };


                            } catch (error) {

                                console.error(
                                    "Course fetch error:",
                                    error
                                );

                                return {
                                    payment,
                                    course: null
                                };
                            }
                        }
                    )
                );


            // -------------------------------------------------
            // Create final purchased course objects
            // -------------------------------------------------

            const finalCourses =
                courseResults.map(
                    item => {

                        const payment =
                            item.payment;

                        const course =
                            item.course;


                        return {

                            paymentId:
                                payment.id,

                            customerId:
                                payment.customerId,

                            courseId:
                                payment.courseId,

                            enrollmentId:
                                payment.enrollmentId,

                            amount:
                                payment.amount,

                            currency:
                                payment.currency ||
                                "INR",

                            paymentDate:
                                payment.paymentDate,

                            razorpayOrderId:
                                payment.razorpayOrderId,

                            razorpayPaymentId:
                                payment.razorpayPaymentId,

                            status:
                                payment.status,

                            course: course || {

                                id:
                                    payment.courseId,

                                title:
                                    `Course #${payment.courseId}`,

                                description:
                                    "Course details unavailable.",

                                instructor:
                                    "LearnHub Instructor",

                                price:
                                    payment.amount
                            },

                            progress:
                                0
                        };
                    }
                );


            setPurchasedCourses(
                finalCourses
            );


        } catch (error) {

            console.error(
                "Purchased course error:",
                error
            );

            setError(
                error.message ||
                "Unable to load purchased courses"
            );

        } finally {

            setCourseLoading(false);
            setLoading(false);
        }
    };


    // =========================================================
    // LOAD DASHBOARD
    // =========================================================

    useEffect(() => {

        if (!customerId) {
            return;
        }

        fetchPurchasedCourses(
            customerId
        );

        fetchStudentProfile(
            customerId
        );

    }, [customerId]);


    // =========================================================
    // PROFILE FORM CHANGE
    // =========================================================

    const handleProfileChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setProfileForm(
            previous => ({
                ...previous,
                [name]: value
            })
        );
    };


    // =========================================================
    // UPDATE PROFILE
    // =========================================================

    const updateProfile = async (e) => {

        e.preventDefault();


        if (!profileForm.name.trim()) {

            Swal.fire({
                icon: "warning",
                title: "Name Required",
                text: "Please enter your name.",
                background: "#111015",
                color: "#ffffff",
                confirmButtonColor: "#8b5cf6"
            });

            return;
        }


        try {

            setProfileSaving(true);


            const response =
                await fetch(
                    `${CUSTOMER_API}/${customerId}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                profileForm
                            )
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Unable to update profile"
                );
            }


            const updatedCustomer =
                await response.json();


            setStudent(
                previous => ({
                    ...previous,
                    ...updatedCustomer
                })
            );


            localStorage.setItem(
                "customer",
                JSON.stringify(
                    updatedCustomer
                )
            );


            Swal.fire({
                icon: "success",
                title: "Profile Updated",
                text: "Your profile has been updated successfully.",
                background: "#111015",
                color: "#ffffff",
                confirmButtonColor: "#8b5cf6"
            });


        } catch (error) {

            console.error(
                "Profile update error:",
                error
            );


            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text:
                    error.message ||
                    "Unable to update profile.",
                background: "#111015",
                color: "#ffffff",
                confirmButtonColor: "#8b5cf6"
            });

        } finally {

            setProfileSaving(false);
        }
    };


    // =========================================================
    // LOGOUT
    // =========================================================

    const handleLogout = async () => {

        const result =
            await Swal.fire({

                icon: "question",

                title: "Logout?",

                text:
                    "Are you sure you want to logout?",

                background: "#111015",

                color: "#ffffff",

                showCancelButton: true,

                confirmButtonText:
                    "Yes, Logout",

                cancelButtonText:
                    "Cancel",

                confirmButtonColor:
                    "#dc3545",

                cancelButtonColor:
                    "#6c757d"
            });


        if (!result.isConfirmed) {
            return;
        }


        // Clear login information
        localStorage.removeItem(
            "loginStatus"
        );

        localStorage.removeItem(
            "customerId"
        );

        localStorage.removeItem(
            "customer"
        );


        // Redirect to login
        window.location.href =
            "/login";
    };


    // =========================================================
    // CHECK WHETHER COURSE IS PURCHASED
    // =========================================================

    const isCoursePurchased = (
        courseId
    ) => {

        return purchasedCourses.some(
            item =>
                Number(
                    item.courseId
                ) === Number(courseId)
        );
    };


    // =========================================================
    // DOWNLOAD RECEIPT
    // =========================================================

    const downloadReceipt = (item) => {

        const course =
            item.course || {};


        const paymentDate =
            formatDate(
                item.paymentDate
            );


        const receiptHTML = `

            <!DOCTYPE html>

            <html>

            <head>

                <meta charset="UTF-8">

                <title>
                    LearnHub Payment Receipt
                </title>

                <style>

                    body {
                        font-family: Arial, sans-serif;
                        background: #f5f5f5;
                        padding: 30px;
                    }

                    .receipt {
                        max-width: 750px;
                        margin: auto;
                        background: white;
                        padding: 40px;
                        border-radius: 12px;
                        box-shadow: 0 5px 25px rgba(0,0,0,0.1);
                    }

                    .header {
                        text-align: center;
                        border-bottom: 2px solid #8b5cf6;
                        padding-bottom: 20px;
                        margin-bottom: 25px;
                    }

                    .logo {
                        font-size: 30px;
                        font-weight: bold;
                        color: #7c3aed;
                    }

                    .success {
                        color: #198754;
                        font-weight: bold;
                    }

                    .row {
                        display: flex;
                        justify-content: space-between;
                        padding: 12px 0;
                        border-bottom: 1px solid #eee;
                    }

                    .amount {
                        font-size: 24px;
                        font-weight: bold;
                        color: #7c3aed;
                    }

                    .footer {
                        text-align: center;
                        margin-top: 30px;
                        color: #777;
                        font-size: 13px;
                    }

                </style>

            </head>

            <body>

                <div class="receipt">

                    <div class="header">

                        <div class="logo">
                            LearnHub
                        </div>

                        <p>
                            Course Purchase Receipt
                        </p>

                        <div class="success">
                            PAYMENT SUCCESSFUL
                        </div>

                    </div>


                    <div class="row">
                        <strong>Receipt ID</strong>
                        <span>
                            LH-${item.paymentId}
                        </span>
                    </div>


                    <div class="row">
                        <strong>Payment ID</strong>
                        <span>
                            ${item.paymentId}
                        </span>
                    </div>


                    <div class="row">
                        <strong>Student</strong>
                        <span>
                            ${student.name}
                        </span>
                    </div>


                    <div class="row">
                        <strong>Email</strong>
                        <span>
                            ${student.email}
                        </span>
                    </div>


                    <div class="row">
                        <strong>Course</strong>
                        <span>
                            ${course.title || "N/A"}
                        </span>
                    </div>


                    <div class="row">
                        <strong>Course ID</strong>
                        <span>
                            ${item.courseId}
                        </span>
                    </div>


                    <div class="row">
                        <strong>Enrollment ID</strong>
                        <span>
                            ${item.enrollmentId || "N/A"}
                        </span>
                    </div>


                    <div class="row">
                        <strong>Payment Date</strong>
                        <span>
                            ${paymentDate}
                        </span>
                    </div>


                    <div class="row">
                        <strong>Razorpay Order ID</strong>
                        <span>
                            ${item.razorpayOrderId || "N/A"}
                        </span>
                    </div>


                    <div class="row">
                        <strong>Razorpay Payment ID</strong>
                        <span>
                            ${item.razorpayPaymentId || "N/A"}
                        </span>
                    </div>


                    <div
                        style="
                            text-align:right;
                            margin-top:25px;
                        "
                    >

                        <span>
                            Amount Paid:
                        </span>

                        <span class="amount">

                            ${formatCurrency(
                                item.amount
                            )}

                        </span>

                    </div>


                    <div class="footer">

                        Thank you for learning with LearnHub.

                        <br/>

                        This is a computer-generated receipt.

                    </div>

                </div>

            </body>

            </html>
        `;


        const blob =
            new Blob(
                [receiptHTML],
                {
                    type:
                        "text/html;charset=utf-8"
                }
            );


        const url =
            URL.createObjectURL(
                blob
            );


        const link =
            document.createElement(
                "a"
            );


        link.href = url;

        link.download =
            `LearnHub_Receipt_${item.paymentId}.html`;


        document.body.appendChild(
            link
        );

        link.click();

        document.body.removeChild(
            link
        );

        URL.revokeObjectURL(
            url
        );
    };


    // =========================================================
    // FORMAT CURRENCY
    // =========================================================

    const formatCurrency = (
        amount
    ) => {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR"
            }
        ).format(
            Number(amount) || 0
        );
    };


    // =========================================================
    // FORMAT DATE
    // =========================================================

    const formatDate = (
        date
    ) => {

        if (!date) {
            return "N/A";
        }


        const parsedDate =
            new Date(date);


        if (
            isNaN(
                parsedDate.getTime()
            )
        ) {
            return "N/A";
        }


        return parsedDate.toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );
    };


    // =========================================================
    // FILTER COURSES
    // =========================================================

    const filteredCourses =
        useMemo(() => {

            return purchasedCourses.filter(
                item => {

                    const course =
                        item.course || {};


                    const search =
                        searchTerm
                            .toLowerCase()
                            .trim();


                    const matchesSearch =
                        !search ||
                        String(
                            course.title || ""
                        )
                            .toLowerCase()
                            .includes(search) ||

                        String(
                            item.courseId || ""
                        )
                            .includes(search) ||

                        String(
                            item.paymentId || ""
                        )
                            .includes(search);


                    const matchesStatus =
                        statusFilter === "ALL" ||
                        String(
                            item.status
                        ).toUpperCase() ===
                        statusFilter;


                    return (
                        matchesSearch &&
                        matchesStatus
                    );
                }
            );

        }, [
            purchasedCourses,
            searchTerm,
            statusFilter
        ]);


    // =========================================================
    // DASHBOARD STATISTICS
    // =========================================================

    const totalCourses =
        purchasedCourses.length;


    const totalSpent =
        purchasedCourses.reduce(
            (
                total,
                item
            ) =>
                total +
                Number(
                    item.amount || 0
                ),
            0
        );


    const completedCourses =
        purchasedCourses.filter(
            item =>
                Number(
                    item.progress || 0
                ) >= 100
        ).length;


    // =========================================================
    // MENU
    // =========================================================

    const menuItems = [

        {
            name: "Dashboard",
            icon: "bi-speedometer2"
        },

        {
            name: "My Courses",
            icon: "bi-book"
        },

        {
            name: "Tests",
            icon: "bi-file-earmark-text"
        },

        {
            name: "Certificates",
            icon: "bi-award"
        },

        {
            name: "AI Assistant",
            icon: "bi-robot"
        },

        {
            name: "Profile",
            icon: "bi-person"
        }

    ];


    // =========================================================
    // NAVIGATION ACTIONS
    // =========================================================

    const handleMenuClick = (
        menu
    ) => {

        setActiveMenu(
            menu
        );
    };


    // =========================================================
    // LOADING
    // =========================================================

    if (
        loading &&
        purchasedCourses.length === 0
    ) {

        return (

            <div
                className="d-flex justify-content-center align-items-center"
                style={{
                    minHeight: "100vh",
                    background:
                        "#050507",
                    color: "#ffffff"
                }}
            >

                <div className="text-center">

                    <div
                        className="spinner-border"
                        style={{
                            color: "#a78bfa"
                        }}
                    ></div>

                    <h5 className="mt-3">
                        Loading your dashboard...
                    </h5>

                    <p className="text-secondary">
                        Please wait
                    </p>

                </div>

            </div>
        );
    }


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <div
            className="container-fluid p-0"
            style={{
                minHeight: "100vh",
                background:
                    "#050507",
                color: "#ffffff"
            }}
        >

            {/* =================================================
                STAR BACKGROUND
            ================================================= */}

            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    pointerEvents: "none",
                    zIndex: 0,
                    backgroundImage:
                        `
                        radial-gradient(
                            1px 1px at 10% 20%,
                            rgba(255,255,255,.7),
                            transparent
                        ),
                        radial-gradient(
                            1px 1px at 30% 80%,
                            rgba(255,255,255,.5),
                            transparent
                        ),
                        radial-gradient(
                            1px 1px at 70% 30%,
                            rgba(255,255,255,.7),
                            transparent
                        ),
                        radial-gradient(
                            1px 1px at 90% 70%,
                            rgba(255,255,255,.5),
                            transparent
                        ),
                        radial-gradient(
                            1px 1px at 50% 50%,
                            rgba(167,139,250,.8),
                            transparent
                        )
                        `,
                    backgroundSize:
                        "250px 250px"
                }}
            ></div>


            <div
                className="row g-0"
                style={{
                    position: "relative",
                    zIndex: 1
                }}
            >

                {/* =================================================
                    SIDEBAR
                ================================================= */}

                <div
                    className="col-lg-2 col-md-3"
                    style={{
                        minHeight: "100vh",
                        background:
                            "rgba(10,10,14,.96)",
                        borderRight:
                            "1px solid rgba(167,139,250,.15)"
                    }}
                >

                    <div
                        className="p-4"
                        style={{
                            borderBottom:
                                "1px solid rgba(255,255,255,.08)"
                        }}
                    >

                        <h4
                            className="fw-bold mb-1"
                            style={{
                                color: "#c4b5fd"
                            }}
                        >

                            <i className="bi bi-mortarboard-fill me-2"></i>

                            LearnHub

                        </h4>

                        <small className="text-secondary">
                            Student Portal
                        </small>

                    </div>


                    <div className="p-3">

                        {menuItems.map(
                            item => (

                                <button
                                    key={
                                        item.name
                                    }

                                    onClick={() =>
                                        handleMenuClick(
                                            item.name
                                        )
                                    }

                                    className="btn w-100 text-start mb-2"

                                    style={{
                                        background:
                                            activeMenu ===
                                            item.name
                                                ? "linear-gradient(90deg, #7c3aed, #a78bfa)"
                                                : "transparent",

                                        color:
                                            activeMenu ===
                                            item.name
                                                ? "#ffffff"
                                                : "#c4c4cc",

                                        border:
                                            activeMenu ===
                                            item.name
                                                ? "none"
                                                : "1px solid transparent",

                                        borderRadius:
                                            "10px"
                                    }}
                                >

                                    <i
                                        className={`bi ${item.icon} me-3`}
                                    ></i>

                                    {item.name}

                                </button>
                            )
                        )}

                    </div>


                    <div
                        className="p-3"
                        style={{
                            position: "absolute",
                            bottom: 0,
                            width: "100%"
                        }}
                    >

                        <button
                            className="btn btn-outline-danger w-100"
                            onClick={
                                handleLogout
                            }
                        >

                            <i className="bi bi-box-arrow-right me-2"></i>

                            Logout

                        </button>

                    </div>

                </div>


                {/* =================================================
                    MAIN CONTENT
                ================================================= */}

                <div
                    className="col-lg-10 col-md-9 p-4"
                >

                    {/* HEADER */}

                    <div
                        className="d-flex justify-content-between align-items-center mb-4"
                    >

                        <div>

                            <h2 className="fw-bold mb-1">

                                {activeMenu}

                            </h2>

                            <p className="text-secondary mb-0">

                                Continue your learning journey.

                            </p>

                        </div>


                        <div
                            className="d-flex align-items-center gap-3"
                        >

                            <button
                                className="btn"
                                style={{
                                    background:
                                        "rgba(255,255,255,.05)",
                                    color:
                                        "#ffffff",
                                    border:
                                        "1px solid rgba(255,255,255,.1)"
                                }}
                            >

                                <i className="bi bi-bell"></i>

                            </button>


                            <div className="text-end">

                                <strong>
                                    {student.name}
                                </strong>

                                <br />

                                <small className="text-secondary">

                                    {student.email}

                                </small>

                            </div>


                            <div
                                className="rounded-circle d-flex justify-content-center align-items-center"
                                style={{
                                    width: "45px",
                                    height: "45px",
                                    background:
                                        "linear-gradient(135deg,#7c3aed,#c4b5fd)"
                                }}
                            >

                                <i className="bi bi-person-fill"></i>

                            </div>

                        </div>

                    </div>


                    {/* ERROR */}

                    {error && (

                        <div className="alert alert-danger">

                            <i className="bi bi-exclamation-triangle me-2"></i>

                            {error}

                        </div>
                    )}


                    {/* =================================================
                        DASHBOARD
                    ================================================= */}

                    {activeMenu === "Dashboard" && (

                        <>

                            {/* AI */}

                            <div
                                className="card border-0 mb-4"
                                style={{
                                    background:
                                        "linear-gradient(135deg,#171022,#251542)",
                                    borderRadius:
                                        "20px",
                                    boxShadow:
                                        "0 10px 40px rgba(124,58,237,.15)"
                                }}
                            >

                                <div className="card-body p-4">

                                    <div className="row align-items-center">

                                        <div className="col-md-8">

                                            <span
                                                className="badge mb-2"
                                                style={{
                                                    background:
                                                        "rgba(196,181,253,.15)",
                                                    color:
                                                        "#c4b5fd"
                                                }}
                                            >

                                                <i className="bi bi-stars me-1"></i>

                                                AI Powered

                                            </span>


                                            <h3 className="fw-bold">

                                                Hello, {student.name} 👋

                                            </h3>


                                            <p className="text-light opacity-75">

                                                Your learning dashboard is ready.
                                                Continue your purchased courses,
                                                track your progress and manage your profile.

                                            </p>


                                            <button
                                                className="btn"
                                                style={{
                                                    background:
                                                        "#ffffff",
                                                    color:
                                                        "#6d28d9"
                                                }}
                                                onClick={() =>
                                                    setActiveMenu(
                                                        "AI Assistant"
                                                    )
                                                }
                                            >

                                                <i className="bi bi-robot me-2"></i>

                                                Ask AI Assistant

                                            </button>

                                        </div>


                                        <div
                                            className="col-md-4 text-center"
                                        >

                                            <i
                                                className="bi bi-robot"
                                                style={{
                                                    fontSize:
                                                        "100px",
                                                    color:
                                                        "#c4b5fd"
                                                }}
                                            ></i>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* STATISTICS */}

                            <div
                                className="row g-3 mb-4"
                            >

                                <div className="col-md-3">

                                    <StatCard
                                        icon="bi-book"
                                        value={
                                            totalCourses
                                        }
                                        title="Purchased Courses"
                                        iconColor="#a78bfa"
                                    />

                                </div>


                                <div className="col-md-3">

                                    <StatCard
                                        icon="bi-check-circle"
                                        value={
                                            completedCourses
                                        }
                                        title="Completed Courses"
                                        iconColor="#22c55e"
                                    />

                                </div>


                                <div className="col-md-3">

                                    <StatCard
                                        icon="bi-credit-card"
                                        value={
                                            formatCurrency(
                                                totalSpent
                                            )
                                        }
                                        title="Total Spent"
                                        iconColor="#f59e0b"
                                    />

                                </div>


                                <div className="col-md-3">

                                    <StatCard
                                        icon="bi-award"
                                        value="0"
                                        title="Certificates"
                                        iconColor="#38bdf8"
                                    />

                                </div>

                            </div>


                            {/* PURCHASED COURSES */}

                            <PurchasedCourses
                                courses={
                                    filteredCourses
                                }
                                courseLoading={
                                    courseLoading
                                }
                                formatCurrency={
                                    formatCurrency
                                }
                                formatDate={
                                    formatDate
                                }
                                downloadReceipt={
                                    downloadReceipt
                                }
                                setActiveMenu={
                                    setActiveMenu
                                }
                                searchTerm={
                                    searchTerm
                                }
                                setSearchTerm={
                                    setSearchTerm
                                }
                                statusFilter={
                                    statusFilter
                                }
                                setStatusFilter={
                                    setStatusFilter
                                }
                            />

                        </>
                    )}


                    {/* =================================================
                        MY COURSES
                    ================================================= */}

                    {activeMenu === "My Courses" && (

                        <PurchasedCourses
                            courses={
                                filteredCourses
                            }
                            courseLoading={
                                courseLoading
                            }
                            formatCurrency={
                                formatCurrency
                            }
                            formatDate={
                                formatDate
                            }
                            downloadReceipt={
                                downloadReceipt
                            }
                            setActiveMenu={
                                setActiveMenu
                            }
                            searchTerm={
                                searchTerm
                            }
                            setSearchTerm={
                                setSearchTerm
                            }
                            statusFilter={
                                statusFilter
                            }
                            setStatusFilter={
                                setStatusFilter
                            }
                            fullPage
                        />

                    )}


                    {/* =================================================
                        TESTS
                    ================================================= */}

                    {activeMenu === "Tests" && (

                        <EmptySection
                            icon="bi-file-earmark-text"
                            title="Tests"
                            text="Your upcoming and completed tests will appear here."
                        />

                    )}


                    {/* =================================================
                        CERTIFICATES
                    ================================================= */}

                    {activeMenu === "Certificates" && (

                        <EmptySection
                            icon="bi-award"
                            title="Certificates"
                            text="Your earned certificates will appear here."
                        />

                    )}


                    {/* =================================================
                        AI ASSISTANT
                    ================================================= */}

                    {activeMenu === "AI Assistant" && (

                        <EmptySection
                            icon="bi-robot"
                            title="AI Assistant"
                            text="Your AI learning assistant will be available here."
                        />

                    )}


                    {/* =================================================
                        PROFILE
                    ================================================= */}

                    {activeMenu === "Profile" && (

                        <div
                            className="card border-0"
                            style={{
                                background:
                                    "#111015",
                                borderRadius:
                                    "20px"
                            }}
                        >

                            <div className="card-body p-4">

                                <h4 className="fw-bold mb-4">

                                    <i
                                        className="bi bi-person-circle me-2"
                                        style={{
                                            color:
                                                "#a78bfa"
                                        }}
                                    ></i>

                                    My Profile

                                </h4>


                                <form
                                    onSubmit={
                                        updateProfile
                                    }
                                >

                                    <div className="row g-4">

                                        <div className="col-md-6">

                                            <label className="form-label text-secondary">

                                                Full Name

                                            </label>

                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                value={
                                                    profileForm.name
                                                }
                                                onChange={
                                                    handleProfileChange
                                                }
                                                style={
                                                    inputStyle
                                                }
                                            />

                                        </div>


                                        <div className="col-md-6">

                                            <label className="form-label text-secondary">

                                                Email

                                            </label>

                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                value={
                                                    profileForm.email
                                                }
                                                onChange={
                                                    handleProfileChange
                                                }
                                                style={
                                                    inputStyle
                                                }
                                            />

                                        </div>


                                        <div className="col-md-6">

                                            <label className="form-label text-secondary">

                                                Phone

                                            </label>

                                            <input
                                                type="text"
                                                name="phone"
                                                className="form-control"
                                                value={
                                                    profileForm.phone
                                                }
                                                onChange={
                                                    handleProfileChange
                                                }
                                                style={
                                                    inputStyle
                                                }
                                            />

                                        </div>


                                        <div className="col-md-6">

                                            <label className="form-label text-secondary">

                                                Student ID

                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={
                                                    customerId ||
                                                    ""
                                                }
                                                disabled
                                                style={
                                                    inputStyle
                                                }
                                            />

                                        </div>

                                    </div>


                                    <button
                                        type="submit"
                                        className="btn mt-4 px-4"
                                        disabled={
                                            profileSaving
                                        }
                                        style={{
                                            background:
                                                "linear-gradient(135deg,#7c3aed,#a78bfa)",
                                            color:
                                                "#ffffff",
                                            border:
                                                "none"
                                        }}
                                    >

                                        {profileSaving ? (

                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                ></span>

                                                Updating...

                                            </>

                                        ) : (

                                            <>
                                                <i className="bi bi-save me-2"></i>

                                                Update Profile

                                            </>
                                        )}

                                    </button>

                                </form>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}


// =============================================================
// STAT CARD
// =============================================================

function StatCard({
    icon,
    value,
    title,
    iconColor
}) {

    return (

        <div
            className="card border-0 h-100"
            style={{
                background:
                    "#111015",
                borderRadius:
                    "16px",
                boxShadow:
                    "0 8px 25px rgba(0,0,0,.3)"
            }}
        >

            <div className="card-body">

                <i
                    className={`bi ${icon} fs-3`}
                    style={{
                        color:
                            iconColor
                    }}
                ></i>

                <h3 className="fw-bold mt-2">

                    {value}

                </h3>

                <p className="text-secondary mb-0">

                    {title}

                </p>

            </div>

        </div>
    );
}


// =============================================================
// PURCHASED COURSES
// =============================================================

function PurchasedCourses({
    courses,
    courseLoading,
    formatCurrency,
    formatDate,
    downloadReceipt,
    setActiveMenu,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    fullPage = false
}) {

    return (

        <div
            className="card border-0"
            style={{
                background:
                    "#111015",
                borderRadius:
                    "20px"
            }}
        >

            <div className="card-body p-4">

                <div
                    className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4"
                >

                    <div>

                        <h5 className="fw-bold mb-1">

                            <i
                                className="bi bi-book-half me-2"
                                style={{
                                    color:
                                        "#a78bfa"
                                }}
                            ></i>

                            {fullPage
                                ? "My Purchased Courses"
                                : "My Courses"
                            }

                        </h5>

                        <small className="text-secondary">

                            Courses you have successfully purchased

                        </small>

                    </div>


                    <div className="d-flex gap-2">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search course..."
                            value={
                                searchTerm
                            }
                            onChange={e =>
                                setSearchTerm(
                                    e.target.value
                                )
                            }
                            style={{
                                ...inputStyle,
                                width:
                                    "220px"
                            }}
                        />


                        <select
                            className="form-select"
                            value={
                                statusFilter
                            }
                            onChange={e =>
                                setStatusFilter(
                                    e.target.value
                                )
                            }
                            style={{
                                ...inputStyle,
                                width:
                                    "130px"
                            }}
                        >

                            <option value="ALL">
                                All
                            </option>

                            <option value="SUCCESS">
                                Success
                            </option>

                        </select>

                    </div>

                </div>


                {courseLoading ? (

                    <div className="text-center py-5">

                        <div
                            className="spinner-border"
                            style={{
                                color:
                                    "#a78bfa"
                            }}
                        ></div>

                        <p className="text-secondary mt-3">

                            Loading purchased courses...

                        </p>

                    </div>

                ) : courses.length === 0 ? (

                    <div className="text-center py-5">

                        <i
                            className="bi bi-book display-4"
                            style={{
                                color:
                                    "#6d28d9"
                            }}
                        ></i>

                        <h5 className="mt-3">

                            No Purchased Courses

                        </h5>

                        <p className="text-secondary">

                            You haven't purchased any course yet.

                        </p>


                        <button
                            className="btn"
                            style={{
                                background:
                                    "#a78bfa",
                                color:
                                    "#10091a"
                            }}
                            onClick={() =>
                                window.location.href =
                                    "/courses"
                            }
                        >

                            <i className="bi bi-cart me-2"></i>

                            Browse Courses

                        </button>

                    </div>

                ) : (

                    <div className="row g-4">

                        {courses.map(
                            item => {

                                const course =
                                    item.course ||
                                    {};


                                return (

                                    <div
                                        className={
                                            fullPage
                                                ? "col-xl-4 col-md-6"
                                                : "col-lg-6"
                                        }
                                        key={
                                            item.paymentId
                                        }
                                    >

                                        <div
                                            className="h-100"
                                            style={{
                                                background:
                                                    "linear-gradient(145deg,#15121c,#0c0b10)",
                                                border:
                                                    "1px solid rgba(167,139,250,.15)",
                                                borderRadius:
                                                    "18px",
                                                overflow:
                                                    "hidden"
                                            }}
                                        >

                                            {/* COURSE HEADER */}

                                            <div
                                                style={{
                                                    height:
                                                        "130px",
                                                    background:
                                                        "linear-gradient(135deg,#4c1d95,#7c3aed,#a78bfa)",
                                                    position:
                                                        "relative"
                                                }}
                                            >

                                                <div
                                                    className="position-absolute top-50 start-50 translate-middle"
                                                >

                                                    <i
                                                        className="bi bi-mortarboard"
                                                        style={{
                                                            fontSize:
                                                                "55px",
                                                            color:
                                                                "rgba(255,255,255,.8)"
                                                        }}
                                                    ></i>

                                                </div>


                                                <span
                                                    className="badge position-absolute top-0 end-0 m-3"
                                                    style={{
                                                        background:
                                                            "rgba(0,0,0,.4)"
                                                    }}
                                                >

                                                    <i className="bi bi-check-circle me-1"></i>

                                                    Purchased

                                                </span>

                                            </div>


                                            <div className="p-3">

                                                <h5 className="fw-bold">

                                                    {
                                                        course.title ||
                                                        `Course #${item.courseId}`
                                                    }

                                                </h5>


                                                <p
                                                    className="text-secondary small"
                                                    style={{
                                                        minHeight:
                                                            "42px"
                                                    }}
                                                >

                                                    {
                                                        course.description ||
                                                        "Continue learning and improve your skills."
                                                    }

                                                </p>


                                                {/* PROGRESS */}

                                                <div
                                                    className="d-flex justify-content-between mb-2"
                                                >

                                                    <small className="text-secondary">

                                                        Course Progress

                                                    </small>

                                                    <small
                                                        style={{
                                                            color:
                                                                "#c4b5fd"
                                                        }}
                                                    >

                                                        {item.progress || 0}%

                                                    </small>

                                                </div>


                                                <div
                                                    className="progress mb-3"
                                                    style={{
                                                        height:
                                                            "7px",
                                                        background:
                                                            "#29252f"
                                                    }}
                                                >

                                                    <div
                                                        className="progress-bar"
                                                        style={{
                                                            width:
                                                                `${item.progress || 0}%`,
                                                            background:
                                                                "linear-gradient(90deg,#7c3aed,#c4b5fd)"
                                                        }}
                                                    ></div>

                                                </div>


                                                {/* PAYMENT INFO */}

                                                <div
                                                    className="small text-secondary mb-3"
                                                >

                                                    <div className="d-flex justify-content-between mb-1">

                                                        <span>
                                                            Paid:
                                                        </span>

                                                        <strong className="text-white">

                                                            {
                                                                formatCurrency(
                                                                    item.amount
                                                                )
                                                            }

                                                        </strong>

                                                    </div>


                                                    <div className="d-flex justify-content-between mb-1">

                                                        <span>
                                                            Purchase Date:
                                                        </span>

                                                        <span>
                                                            {
                                                                formatDate(
                                                                    item.paymentDate
                                                                )
                                                            }
                                                        </span>

                                                    </div>


                                                    <div className="d-flex justify-content-between">

                                                        <span>
                                                            Enrollment:
                                                        </span>

                                                        <span>
                                                            #
                                                            {
                                                                item.enrollmentId ||
                                                                "N/A"
                                                            }
                                                        </span>

                                                    </div>

                                                </div>


                                                {/* ACTIONS */}

                                                <div
                                                    className="d-flex gap-2"
                                                >

                                                    <button
                                                        className="btn flex-grow-1"
                                                        style={{
                                                            background:
                                                                "linear-gradient(135deg,#7c3aed,#a78bfa)",
                                                            color:
                                                                "#ffffff",
                                                            border:
                                                                "none"
                                                        }}
                                                        onClick={() => {

                                                            // Change this route
                                                            // if your course learning
                                                            // page has a different URL.

                                                            window.location.href =
                                                                `/learn/${item.courseId}`;

                                                        }}
                                                    >

                                                        <i className="bi bi-play-fill me-1"></i>

                                                        Continue

                                                    </button>


                                                    <button
                                                        className="btn"
                                                        title="Download Receipt"
                                                        onClick={() =>
                                                            downloadReceipt(
                                                                item
                                                            )
                                                        }
                                                        style={{
                                                            border:
                                                                "1px solid #a78bfa",
                                                            color:
                                                                "#c4b5fd"
                                                        }}
                                                    >

                                                        <i className="bi bi-download"></i>

                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                );
                            }
                        )}

                    </div>
                )}

            </div>

        </div>
    );
}


// =============================================================
// EMPTY SECTION
// =============================================================

function EmptySection({
    icon,
    title,
    text
}) {

    return (

        <div
            className="card border-0 text-center"
            style={{
                background:
                    "#111015",
                borderRadius:
                    "20px"
            }}
        >

            <div className="card-body py-5">

                <i
                    className={`bi ${icon}`}
                    style={{
                        fontSize:
                            "70px",
                        color:
                            "#a78bfa"
                    }}
                ></i>

                <h3 className="fw-bold mt-3">

                    {title}

                </h3>

                <p className="text-secondary">

                    {text}

                </p>

            </div>

        </div>
    );
}


// =============================================================
// INPUT STYLE
// =============================================================

const inputStyle = {

    background:
        "#09080d",

    color:
        "#ffffff",

    border:
        "1px solid rgba(167,139,250,.25)"
};


export default Dashboard;
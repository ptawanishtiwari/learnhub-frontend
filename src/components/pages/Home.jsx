import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {

    // =========================================================
    // STATES
    // =========================================================

    const [courses, setCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [courseError, setCourseError] = useState("");


    // =========================================================
    // FETCH COURSES FROM BACKEND
    // =========================================================

    useEffect(() => {

        fetch("http://localhost:8080/course/all")
            .then((response) => {

                if (!response.ok) {
                    throw new Error("Unable to fetch courses");
                }

                return response.json();
            })
            .then((data) => {

                console.log("Courses received from backend:", data);

                /*
                 * For now we display maximum 6 courses.
                 *
                 * Later we will add createdAt in the Course entity
                 * and fetch the newest courses properly from backend.
                 */
                setCourses(data.slice(0, 6));

                setLoadingCourses(false);
            })
            .catch((error) => {

                console.error("Course fetch error:", error);

                setCourseError(
                    "Unable to load courses. Please try again later."
                );

                setLoadingCourses(false);
            });

    }, []);


    // =========================================================
    // CATEGORIES
    // =========================================================

    const categories = [
        ["bi-code-slash", "Software Development"],
        ["bi-cpu", "Artificial Intelligence"],
        ["bi-database", "Database & Cloud"],
        ["bi-globe2", "Web Development"]
    ];


    // =========================================================
    // DEFAULT COURSE IMAGE
    // =========================================================

    const defaultCourseImage =
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80";


    // =========================================================
    // COURSE IMAGE
    // =========================================================

    const getCourseImage = (course) => {

        if (
            course.thumbnail &&
            course.thumbnail.trim() !== ""
        ) {
            return course.thumbnail;
        }

        return defaultCourseImage;
    };


    // =========================================================
    // COURSE ICON
    // =========================================================

    const getCourseIcon = (category) => {

        if (!category) {
            return "bi-book";
        }

        const categoryName =
            category.toLowerCase();

        if (
            categoryName.includes("java") ||
            categoryName.includes("software")
        ) {
            return "bi-cup-hot";
        }

        if (
            categoryName.includes("web") ||
            categoryName.includes("mern") ||
            categoryName.includes("react")
        ) {
            return "bi-layers";
        }

        if (
            categoryName.includes("ai") ||
            categoryName.includes("artificial") ||
            categoryName.includes("machine")
        ) {
            return "bi-robot";
        }

        if (
            categoryName.includes("database") ||
            categoryName.includes("cloud")
        ) {
            return "bi-database";
        }

        if (
            categoryName.includes("python")
        ) {
            return "bi-code-square";
        }

        return "bi-book";
    };


    // =========================================================
    // FORMAT PRICE
    // =========================================================

    const formatPrice = (price) => {

        if (
            price === null ||
            price === undefined ||
            Number(price) === 0
        ) {
            return "Free";
        }

        return `₹${Number(price).toLocaleString("en-IN")}`;
    };


    // =========================================================
    // HOME
    // =========================================================

    return (

        <div className="future-home">


            {/* =================================================
                ANIMATED BACKGROUND
            ================================================= */}

            <div className="tech-grid"></div>

            <div className="glow glow-one"></div>

            <div className="glow glow-two"></div>


            {/* =================================================
                HERO
            ================================================= */}

            <section className="future-hero">

                <div className="container position-relative">

                    <div className="row align-items-center min-vh-100">


                        {/* LEFT */}

                        <div className="col-lg-7">

                            <div className="ai-badge mb-4">

                                <span className="pulse-dot"></span>

                                AI POWERED LEARNING

                            </div>


                            <h1 className="future-title">

                                Learn

                                <span>
                                    {" "}Beyond{" "}
                                </span>

                                Limits.

                            </h1>


                            <h2 className="future-subtitle">

                                Powered by Artificial Intelligence

                            </h2>


                            <p className="future-description">

                                Master modern technology through intelligent
                                learning, practical projects and an AI
                                assistant designed to help you learn faster.

                            </p>


                            <div className="d-flex gap-3 flex-wrap">

                                <Link
                                    to="/courses"
                                    className="btn btn-purple btn-lg px-4"
                                >

                                    Explore Courses

                                    <i className="bi bi-arrow-up-right ms-2"></i>

                                </Link>


                                <Link
                                    to="/register"
                                    className="btn btn-outline-light btn-lg px-4"
                                >

                                    Start Learning

                                </Link>

                            </div>


                            {/* STATS */}

                            <div className="row mt-5">

                                <div className="col-4">

                                    <h3 className="stat-number">
                                        5K+
                                    </h3>

                                    <span>
                                        Students
                                    </span>

                                </div>


                                <div className="col-4">

                                    <h3 className="stat-number">
                                        20+
                                    </h3>

                                    <span>
                                        Courses
                                    </span>

                                </div>


                                <div className="col-4">

                                    <h3 className="stat-number">
                                        50+
                                    </h3>

                                    <span>
                                        Projects
                                    </span>

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            AI CORE
                        ================================================= */}

                        <div className="col-lg-5">

                            <div className="ai-core-wrapper">

                                <div className="orbit orbit-one"></div>

                                <div className="orbit orbit-two"></div>

                                <div className="orbit orbit-three"></div>


                                <div className="ai-core">

                                    <div className="core-ring"></div>

                                    <i className="bi bi-stars"></i>


                                    <div className="core-text">

                                        LEARNHUB

                                        <small>
                                            AI CORE
                                        </small>

                                    </div>

                                </div>


                                {/* FLOATING CARDS */}

                                <div className="floating-card card-one">

                                    <i className="bi bi-code-slash"></i>

                                    <span>
                                        Java
                                    </span>

                                </div>


                                <div className="floating-card card-two">

                                    <i className="bi bi-robot"></i>

                                    <span>
                                        AI
                                    </span>

                                </div>


                                <div className="floating-card card-three">

                                    <i className="bi bi-database"></i>

                                    <span>
                                        SQL
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================================
                TECHNOLOGY STRIP
            ================================================= */}

            <section className="technology-strip">

                <div className="container">

                    <div className="row text-center g-3">

                        <div className="col-md-3">

                            <i className="bi bi-cpu"></i>

                            <span>
                                AI Powered
                            </span>

                        </div>


                        <div className="col-md-3">

                            <i className="bi bi-lightning-charge"></i>

                            <span>
                                Project Based
                            </span>

                        </div>


                        <div className="col-md-3">

                            <i className="bi bi-bar-chart"></i>

                            <span>
                                Track Progress
                            </span>

                        </div>


                        <div className="col-md-3">

                            <i className="bi bi-award"></i>

                            <span>
                                Get Certified
                            </span>

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================================
                CATEGORIES
            ================================================= */}

            <section className="future-section">

                <div className="container">


                    <div className="section-heading">

                        <span>
                            EXPLORE TECHNOLOGY
                        </span>


                        <h2>

                            Choose Your

                            <strong>
                                {" "}Future.
                            </strong>

                        </h2>


                        <p>
                            Build skills that power the next generation.
                        </p>

                    </div>


                    <div className="row g-4">

                        {categories.map(
                            ([icon, title]) => (

                                <div
                                    className="col-lg-3 col-md-6"
                                    key={title}
                                >

                                    <div className="tech-card">

                                        <div className="tech-icon">

                                            <i
                                                className={`bi ${icon}`}
                                            ></i>

                                        </div>


                                        <h5>
                                            {title}
                                        </h5>


                                        <p>

                                            Learn modern technologies with
                                            practical training.

                                        </p>


                                        <Link to="/courses">

                                            Explore

                                            <i className="bi bi-arrow-right ms-2"></i>

                                        </Link>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                </div>

            </section>


            {/* =================================================
                DYNAMIC COURSES
            ================================================= */}

            <section className="future-section courses-section">

                <div className="container">


                    <div className="section-heading text-start">

                        <span>
                            LATEST LEARNING PATHS
                        </span>


                        <h2>

                            Learn. Code.

                            <strong>
                                {" "}Create.
                            </strong>

                        </h2>


                        <p>
                            Explore our newest courses created by LearnHub.
                        </p>

                    </div>


                    {/* =================================================
                        LOADING
                    ================================================= */}

                    {loadingCourses && (

                        <div className="text-center py-5">

                            <div
                                className="spinner-border text-light"
                                role="status"
                            >

                                <span className="visually-hidden">
                                    Loading...
                                </span>

                            </div>


                            <p className="text-secondary mt-3">

                                Loading latest courses...

                            </p>

                        </div>

                    )}


                    {/* =================================================
                        ERROR
                    ================================================= */}

                    {!loadingCourses &&
                        courseError && (

                            <div className="alert alert-danger">

                                {courseError}

                            </div>

                        )}


                    {/* =================================================
                        NO COURSES
                    ================================================= */}

                    {!loadingCourses &&
                        !courseError &&
                        courses.length === 0 && (

                            <div className="text-center py-5">

                                <i
                                    className="bi bi-book display-4 text-secondary"
                                ></i>


                                <h4 className="text-white mt-3">

                                    No courses available yet.

                                </h4>


                                <p className="text-secondary">

                                    New courses will appear here when
                                    they are published by the admin.

                                </p>

                            </div>

                        )}


                    {/* =================================================
                        COURSE CARDS
                    ================================================= */}

                    {!loadingCourses &&
                        !courseError &&
                        courses.length > 0 && (

                            <div className="row g-4">

                                {courses.map(
                                    (course) => (

                                        <div
                                            className="col-lg-4 col-md-6"
                                            key={course.id}
                                        >

                                            <div className="future-course-card">


                                                {/* COURSE IMAGE */}

                                                <div className="course-image">

                                                    <img
                                                        src={getCourseImage(course)}
                                                        alt={course.title}
                                                        onError={(event) => {
                                                            event.currentTarget.src =
                                                                defaultCourseImage;
                                                        }}
                                                    />


                                                    <div className="image-overlay"></div>


                                                    <div className="course-icon">

                                                        <i
                                                            className={`bi ${getCourseIcon(
                                                                course.category
                                                            )}`}
                                                        ></i>

                                                    </div>

                                                </div>


                                                {/* COURSE CONTENT */}

                                                <div className="p-4">


                                                    <span className="course-label">

                                                        {course.category ||
                                                            "FUTURE SKILL"}

                                                    </span>


                                                    <h4>

                                                        {course.title}

                                                    </h4>


                                                    <p>

                                                        {course.description ||
                                                            "Learn modern technologies through practical training and real-world projects."}

                                                    </p>


                                                    {/* COURSE META */}

                                                    <div className="course-meta">

                                                        <span>

                                                            <i className="bi bi-clock"></i>

                                                            {course.duration ||
                                                                "Flexible"}

                                                        </span>


                                                        <span>

                                                            <i className="bi bi-bar-chart"></i>

                                                            {course.level ||
                                                                "All Levels"}

                                                        </span>

                                                    </div>


                                                    {/* PRICE */}

                                                    <div className="d-flex justify-content-between align-items-center mt-3">

                                                        <div>

                                                            <small className="text-secondary d-block">

                                                                Course Fee

                                                            </small>


                                                            <strong className="text-white fs-5">

                                                                {formatPrice(
                                                                    course.price
                                                                )}

                                                            </strong>

                                                        </div>

                                                    </div>


                                                    {/* VIEW COURSE */}

                                                    <Link
                                                        to={`/course/${course.id}`}
                                                        className="course-btn mt-3"
                                                    >

                                                        View Course

                                                        <i className="bi bi-arrow-right"></i>

                                                    </Link>

                                                </div>

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        )}


                    {/* =================================================
                        MORE COURSES
                    ================================================= */}

                    <div className="text-center mt-5">

                        <Link
                            to="/courses"
                            className="btn btn-purple btn-lg px-5"
                        >

                            More Courses

                            <i className="bi bi-arrow-right ms-2"></i>

                        </Link>

                    </div>

                </div>

            </section>


            {/* =================================================
                AI SECTION
            ================================================= */}

            <section className="ai-section">

                <div className="container">

                    <div className="ai-panel">

                        <div className="row align-items-center">


                            <div className="col-lg-6">

                                <span className="ai-label">

                                    <i className="bi bi-stars"></i>

                                    LEARNHUB AI

                                </span>


                                <h2>

                                    Your AI.

                                    <br />

                                    Your
                                    <strong>
                                        {" "}Learning Partner.
                                    </strong>

                                </h2>


                                <p>

                                    Ask questions, understand difficult
                                    concepts, debug code and prepare for
                                    technical interviews with AI-powered
                                    assistance.

                                </p>


                                <Link
                                    to="/dashboard"
                                    className="btn btn-purple px-4"
                                >

                                    Enter AI Workspace

                                    <i className="bi bi-arrow-right ms-2"></i>

                                </Link>

                            </div>


                            <div className="col-lg-6 mt-5 mt-lg-0">

                                <div className="ai-chat">


                                    <div className="chat-header">

                                        <span className="pulse-dot"></span>

                                        LearnHub AI

                                        <small>
                                            ONLINE
                                        </small>

                                    </div>


                                    <div className="chat-message user-message">

                                        Explain Spring Boot simply.

                                    </div>


                                    <div className="chat-message ai-message">

                                        <div className="ai-avatar">

                                            <i className="bi bi-stars"></i>

                                        </div>


                                        <div>

                                            Spring Boot helps developers
                                            build Java applications faster
                                            by providing ready-to-use
                                            configuration and tools.

                                        </div>

                                    </div>


                                    <div className="typing">

                                        AI is thinking

                                        <span>.</span>

                                        <span>.</span>

                                        <span>.</span>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================================
                FINAL CTA
            ================================================= */}

            <section className="future-cta">

                <div className="container text-center">

                    <div className="cta-orb"></div>


                    <span>
                        THE FUTURE OF LEARNING IS HERE
                    </span>


                    <h2>

                        Ready to Upgrade

                        <br />

                        Your
                        <strong>
                            {" "}Skills?
                        </strong>

                    </h2>


                    <p>

                        Start learning. Build projects. Create your future.

                    </p>


                    <Link
                        to="/register"
                        className="btn btn-purple btn-lg px-5"
                    >

                        Start Your Journey

                        <i className="bi bi-arrow-up-right ms-2"></i>

                    </Link>

                </div>

            </section>

        </div>
    );
}

export default Home;


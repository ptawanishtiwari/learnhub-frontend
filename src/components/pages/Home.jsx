import React from "react";
import { Link } from "react-router-dom";

function Home() {

    const courses = [
        {
            icon: "bi bi-code-slash",
            title: "Java Full Stack",
            description: "Master Java, Spring Boot, MySQL, REST APIs and frontend development.",
            duration: "6 Months",
            students: "1,200+ Students"
        },
        {
            icon: "bi bi-layers",
            title: "MERN Stack",
            description: "Learn MongoDB, Express.js, React and Node.js by building real projects.",
            duration: "5 Months",
            students: "950+ Students"
        },
        {
            icon: "bi bi-robot",
            title: "Python & AI",
            description: "Learn Python, data analysis, machine learning and AI fundamentals.",
            duration: "4 Months",
            students: "800+ Students"
        }
    ];

    const features = [
        {
            icon: "bi bi-play-circle-fill",
            title: "Learn Anytime",
            description: "Access your courses and learning materials whenever you want."
        },
        {
            icon: "bi bi-laptop",
            title: "Practical Projects",
            description: "Build real-world projects to strengthen your development skills."
        },
        {
            icon: "bi bi-award-fill",
            title: "Get Certified",
            description: "Complete your courses and earn certificates to showcase your skills."
        },
        {
            icon: "bi bi-person-check-fill",
            title: "Expert Instructors",
            description: "Learn from experienced instructors with practical industry knowledge."
        }
    ];

    return (
        <div>

            {/* ================= HERO SECTION ================= */}
            <section className="bg-primary text-white py-5">

                <div className="container py-5">

                    <div className="row align-items-center">

                        {/* Hero Content */}
                        <div className="col-lg-7 mb-5 mb-lg-0">

                            <span className="badge bg-light text-primary px-3 py-2 mb-3">
                                🚀 Start Learning Today
                            </span>

                            <h1 className="display-4 fw-bold mb-4">
                                Learn Skills.
                                <br />
                                Build Your Future.
                            </h1>

                            <p className="lead mb-4">
                                LearnHub is your learning platform for mastering
                                programming, web development, AI and modern
                                technology through practical learning.
                            </p>

                            <div className="d-flex flex-wrap gap-3">

                                <Link
                                    to="/courses"
                                    className="btn btn-light btn-lg px-4 fw-semibold"
                                >
                                    Explore Courses
                                    <i className="bi bi-arrow-right ms-2"></i>
                                </Link>

                                <Link
                                    to="/about"
                                    className="btn btn-outline-light btn-lg px-4"
                                >
                                    Learn More
                                </Link>

                            </div>

                        </div>


                        {/* Hero Card */}
                        <div className="col-lg-5">

                            <div className="bg-white text-dark rounded-4 shadow-lg p-4">

                                <div className="text-center mb-4">

                                    <div
                                        className="bg-primary text-white rounded-circle d-inline-flex
                                        align-items-center justify-content-center"
                                        style={{
                                            width: "80px",
                                            height: "80px"
                                        }}
                                    >
                                        <i className="bi bi-mortarboard-fill fs-1"></i>
                                    </div>

                                    <h3 className="fw-bold mt-3">
                                        Start Learning
                                    </h3>

                                    <p className="text-muted">
                                        Build skills that matter.
                                    </p>

                                </div>

                                <div className="row text-center">

                                    <div className="col-4">
                                        <h4 className="fw-bold text-primary">
                                            20+
                                        </h4>
                                        <small className="text-muted">
                                            Courses
                                        </small>
                                    </div>

                                    <div className="col-4">
                                        <h4 className="fw-bold text-primary">
                                            5K+
                                        </h4>
                                        <small className="text-muted">
                                            Students
                                        </small>
                                    </div>

                                    <div className="col-4">
                                        <h4 className="fw-bold text-primary">
                                            50+
                                        </h4>
                                        <small className="text-muted">
                                            Projects
                                        </small>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= STATS ================= */}
            <section className="py-4 bg-light">

                <div className="container">

                    <div className="row text-center">

                        <div className="col-md-3 col-6 mb-3 mb-md-0">
                            <h2 className="fw-bold text-primary mb-1">
                                5K+
                            </h2>
                            <p className="text-muted mb-0">
                                Active Students
                            </p>
                        </div>

                        <div className="col-md-3 col-6 mb-3 mb-md-0">
                            <h2 className="fw-bold text-primary mb-1">
                                20+
                            </h2>
                            <p className="text-muted mb-0">
                                Professional Courses
                            </p>
                        </div>

                        <div className="col-md-3 col-6">
                            <h2 className="fw-bold text-primary mb-1">
                                50+
                            </h2>
                            <p className="text-muted mb-0">
                                Real Projects
                            </p>
                        </div>

                        <div className="col-md-3 col-6">
                            <h2 className="fw-bold text-primary mb-1">
                                95%
                            </h2>
                            <p className="text-muted mb-0">
                                Student Satisfaction
                            </p>
                        </div>

                    </div>

                </div>

            </section>


            {/* ================= POPULAR COURSES ================= */}
            <section className="py-5">

                <div className="container py-4">

                    <div className="text-center mb-5">

                        <span className="text-primary fw-semibold">
                            LEARN & GROW
                        </span>

                        <h2 className="fw-bold mt-2">
                            Popular Courses
                        </h2>

                        <p className="text-muted">
                            Choose a course and start building your
                            technology career today.
                        </p>

                    </div>


                    <div className="row">

                        {courses.map((course, index) => (

                            <div
                                className="col-lg-4 col-md-6 mb-4"
                                key={index}
                            >

                                <div className="card h-100 border-0 shadow-sm rounded-4">

                                    <div className="card-body p-4">

                                        <div
                                            className="bg-primary bg-opacity-10 text-primary
                                            rounded-3 d-inline-flex align-items-center
                                            justify-content-center mb-4"
                                            style={{
                                                width: "60px",
                                                height: "60px"
                                            }}
                                        >
                                            <i className={`${course.icon} fs-3`}></i>
                                        </div>

                                        <h4 className="fw-bold">
                                            {course.title}
                                        </h4>

                                        <p className="text-muted">
                                            {course.description}
                                        </p>

                                        <div className="d-flex justify-content-between
                                            border-top pt-3 mt-4">

                                            <small className="text-muted">
                                                <i className="bi bi-clock me-1"></i>
                                                {course.duration}
                                            </small>

                                            <small className="text-muted">
                                                <i className="bi bi-people me-1"></i>
                                                {course.students}
                                            </small>

                                        </div>

                                    </div>

                                    <div className="card-footer bg-white border-0 p-4 pt-0">

                                        <Link
                                            to="/courses"
                                            className="btn btn-outline-primary w-100"
                                        >
                                            View Course
                                            <i className="bi bi-arrow-right ms-2"></i>
                                        </Link>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>


                    <div className="text-center mt-3">

                        <Link
                            to="/courses"
                            className="btn btn-primary px-4"
                        >
                            View All Courses
                            <i className="bi bi-arrow-right ms-2"></i>
                        </Link>

                    </div>

                </div>

            </section>


            {/* ================= WHY LEARNHUB ================= */}
            <section className="py-5 bg-light">

                <div className="container py-4">

                    <div className="text-center mb-5">

                        <span className="text-primary fw-semibold">
                            WHY LEARNHUB
                        </span>

                        <h2 className="fw-bold mt-2">
                            Everything You Need to Learn
                        </h2>

                        <p className="text-muted">
                            Learn practical skills with a simple and
                            effective learning experience.
                        </p>

                    </div>


                    <div className="row">

                        {features.map((feature, index) => (

                            <div
                                className="col-lg-3 col-md-6 mb-4"
                                key={index}
                            >

                                <div className="text-center bg-white rounded-4
                                    shadow-sm p-4 h-100">

                                    <div
                                        className="bg-primary text-white rounded-circle
                                        d-inline-flex align-items-center
                                        justify-content-center mb-3"
                                        style={{
                                            width: "65px",
                                            height: "65px"
                                        }}
                                    >
                                        <i className={`${feature.icon} fs-3`}></i>
                                    </div>

                                    <h5 className="fw-bold">
                                        {feature.title}
                                    </h5>

                                    <p className="text-muted mb-0">
                                        {feature.description}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* ================= CTA ================= */}
            <section className="py-5">

                <div className="container py-4">

                    <div className="bg-primary text-white rounded-4
                        p-5 text-center shadow">

                        <i className="bi bi-rocket-takeoff-fill fs-1"></i>

                        <h2 className="fw-bold mt-3">
                            Ready to Start Learning?
                        </h2>

                        <p className="lead mb-4">
                            Join LearnHub and take the next step
                            towards your technology career.
                        </p>

                        <Link
                            to="/register"
                            className="btn btn-light btn-lg px-5"
                        >
                            Get Started
                            <i className="bi bi-arrow-right ms-2"></i>
                        </Link>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Home;
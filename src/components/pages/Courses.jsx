import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Courses() {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const defaultCourseImage =
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80";

    useEffect(() => {

        fetch("http://localhost:8080/course/all")

            .then((response) => {

                if (!response.ok) {
                    throw new Error("Unable to fetch courses");
                }

                return response.json();
            })

            .then((data) => {

                console.log("All courses:", data);

                setCourses(data);
                setLoading(false);
            })

            .catch((error) => {

                console.error("Course fetch error:", error);

                setError(
                    "Unable to load courses. Please try again later."
                );

                setLoading(false);
            });

    }, []);


    const getCourseImage = (course) => {

        if (
            course.thumbnail &&
            course.thumbnail.trim() !== ""
        ) {
            return course.thumbnail;
        }

        return defaultCourseImage;
    };


    const getCourseIcon = (category) => {

        if (!category) {
            return "bi-book";
        }

        const categoryName = category.toLowerCase();

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

        if (categoryName.includes("python")) {
            return "bi-code-square";
        }

        return "bi-book";
    };


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


    return (

        <div
            style={{
                background: "#0f0b15",
                minHeight: "100vh",
                color: "#ffffff",
                paddingBottom: "80px"
            }}
        >

            {/* ================= HERO ================= */}

            <section
                style={{
                    background:
                        "linear-gradient(135deg, #21182e, #0f0b15)",
                    padding: "90px 20px 70px"
                }}
            >

                <div className="container">

                    <div className="text-center">

                        <span
                            style={{
                                color: "#a78bfa",
                                fontWeight: "600",
                                letterSpacing: "2px"
                            }}
                        >
                            LEARNHUB COURSES
                        </span>

                        <h1
                            className="fw-bold mt-3"
                            style={{
                                fontSize: "clamp(2.2rem, 5vw, 4rem)"
                            }}
                        >
                            Learn Skills.
                            <span
                                style={{
                                    color: "#9333ea"
                                }}
                            >
                                {" "}Build Your Future.
                            </span>
                        </h1>

                        <p
                            className="mt-3 mx-auto"
                            style={{
                                maxWidth: "700px",
                                color: "#9ca3af",
                                fontSize: "18px"
                            }}
                        >
                            Explore our complete collection of
                            industry-focused courses and start
                            building real-world skills.
                        </p>

                    </div>

                </div>

            </section>


            {/* ================= COURSES ================= */}

            <section className="container mt-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold mb-1">
                            All Courses
                        </h2>

                        <p
                            style={{
                                color: "#9ca3af"
                            }}
                            className="mb-0"
                        >
                            Choose the right course for your career.
                        </p>

                    </div>

                    {!loading && !error && (
                        <span
                            style={{
                                background: "#21182e",
                                border: "1px solid #31244a",
                                color: "#a78bfa",
                                padding: "8px 15px",
                                borderRadius: "20px"
                            }}
                        >
                            {courses.length} Courses
                        </span>
                    )}

                </div>


                {/* ================= LOADING ================= */}

                {loading && (

                    <div className="text-center py-5">

                        <div
                            className="spinner-border"
                            style={{
                                color: "#9333ea"
                            }}
                        ></div>

                        <p
                            className="mt-3"
                            style={{
                                color: "#9ca3af"
                            }}
                        >
                            Loading courses...
                        </p>

                    </div>

                )}


                {/* ================= ERROR ================= */}

                {!loading && error && (

                    <div className="alert alert-danger text-center">

                        {error}

                    </div>

                )}


                {/* ================= EMPTY ================= */}

                {!loading &&
                    !error &&
                    courses.length === 0 && (

                        <div
                            className="text-center py-5"
                            style={{
                                background: "#17131f",
                                border: "1px solid #31244a",
                                borderRadius: "15px"
                            }}
                        >

                            <i
                                className="bi bi-book"
                                style={{
                                    fontSize: "50px",
                                    color: "#9333ea"
                                }}
                            ></i>

                            <h4 className="mt-3">
                                No courses available
                            </h4>

                            <p
                                style={{
                                    color: "#9ca3af"
                                }}
                            >
                                New courses will be available soon.
                            </p>

                        </div>

                    )}


                {/* ================= COURSE GRID ================= */}

                {!loading &&
                    !error &&
                    courses.length > 0 && (

                        <div className="row g-4">

                            {courses.map((course) => (

                                <div
                                    className="col-lg-4 col-md-6"
                                    key={course.id}
                                >

                                    <div
                                        className="h-100"
                                        style={{
                                            background: "#17131f",
                                            border: "1px solid #31244a",
                                            borderRadius: "18px",
                                            overflow: "hidden",
                                            transition: "0.3s"
                                        }}
                                    >

                                        {/* IMAGE */}

                                        <div
                                            style={{
                                                height: "220px",
                                                position: "relative",
                                                overflow: "hidden"
                                            }}
                                        >

                                            <img
                                                src={getCourseImage(course)}
                                                alt={course.title}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover"
                                                }}
                                                onError={(event) => {
                                                    event.currentTarget.src =
                                                        defaultCourseImage;
                                                }}
                                            />

                                            <div
                                                style={{
                                                    position: "absolute",
                                                    inset: "0",
                                                    background:
                                                        "linear-gradient(to top, rgba(15,11,21,0.9), transparent)"
                                                }}
                                            ></div>


                                            {/* COURSE ICON */}

                                            <div
                                                style={{
                                                    position: "absolute",
                                                    bottom: "15px",
                                                    left: "20px",
                                                    width: "50px",
                                                    height: "50px",
                                                    borderRadius: "12px",
                                                    background:
                                                        "linear-gradient(135deg, #7c3aed, #9333ea)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: "23px"
                                                }}
                                            >

                                                <i
                                                    className={`bi ${getCourseIcon(
                                                        course.category
                                                    )}`}
                                                ></i>

                                            </div>

                                        </div>


                                        {/* COURSE CONTENT */}

                                        <div className="p-4">

                                            {/* CATEGORY */}

                                            <span
                                                style={{
                                                    color: "#a78bfa",
                                                    fontSize: "13px",
                                                    fontWeight: "600",
                                                    textTransform: "uppercase"
                                                }}
                                            >
                                                {course.category ||
                                                    "Future Skill"}
                                            </span>


                                            {/* TITLE */}

                                            <h4
                                                className="fw-bold mt-2"
                                                style={{
                                                    minHeight: "55px"
                                                }}
                                            >
                                                {course.title}
                                            </h4>


                                            {/* DESCRIPTION */}

                                            <p
                                                style={{
                                                    color: "#9ca3af",
                                                    minHeight: "70px"
                                                }}
                                            >
                                                {course.description ||
                                                    "Learn modern technologies through practical training and real-world projects."}
                                            </p>


                                            {/* META */}

                                            <div
                                                className="d-flex gap-3 flex-wrap mb-3"
                                                style={{
                                                    color: "#9ca3af",
                                                    fontSize: "14px"
                                                }}
                                            >

                                                <span>

                                                    <i className="bi bi-clock me-1"></i>

                                                    {course.duration ||
                                                        "Flexible"}

                                                </span>

                                                <span>

                                                    <i className="bi bi-bar-chart me-1"></i>

                                                    {course.level ||
                                                        "All Levels"}

                                                </span>

                                            </div>


                                            <hr
                                                style={{
                                                    borderColor: "#31244a"
                                                }}
                                            />


                                            {/* PRICE + BUTTON */}

                                            <div
                                                className="d-flex justify-content-between align-items-center mt-3"
                                            >

                                                <div>

                                                    <small
                                                        style={{
                                                            color: "#9ca3af"
                                                        }}
                                                    >
                                                        Course Fee
                                                    </small>

                                                    <div
                                                        className="fw-bold fs-5"
                                                        style={{
                                                            color: "#ffffff"
                                                        }}
                                                    >
                                                        {formatPrice(
                                                            course.price
                                                        )}
                                                    </div>

                                                </div>


                                                <Link
                                                    to={`/course/${course.id}`}
                                                    className="text-decoration-none"
                                                    style={{
                                                        background:
                                                            "linear-gradient(135deg, #7c3aed, #9333ea)",
                                                        color: "#ffffff",
                                                        padding:
                                                            "10px 18px",
                                                        borderRadius:
                                                            "10px",
                                                        fontWeight: "600"
                                                    }}
                                                >

                                                    Enroll Now

                                                    <i className="bi bi-arrow-right ms-2"></i>

                                                </Link>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

            </section>

        </div>

    );
}

export default Courses;
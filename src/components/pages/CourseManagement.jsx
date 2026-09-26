
import React, { useEffect, useState } from "react";
import axios from "axios";

function CourseManagement() {

    const API = "http://localhost:8080";

    // =========================
    // STATES
    // =========================
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        level: "Beginner",
        price: "",
        thumbnail: "",
        duration: "",
        status: "DRAFT"
    });


    // =========================
    // FETCH COURSES
    // =========================
    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await axios.get(
                `${API}/course/all`
            );

            setCourses(response.data);

        } catch (err) {

            console.error(err);

            setError(
                "Unable to load courses. Please check your backend."
            );

        } finally {

            setLoading(false);

        }
    };


    // =========================
    // FORM INPUT
    // =========================
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    // =========================
    // OPEN ADD MODAL
    // =========================
    const handleAddCourse = () => {

        setEditingCourse(null);

        setFormData({
            title: "",
            description: "",
            category: "",
            level: "Beginner",
            price: "",
            thumbnail: "",
            duration: "",
            status: "DRAFT"
        });

        setShowModal(true);
    };


    // =========================
    // OPEN EDIT MODAL
    // =========================
    const handleEdit = (course) => {

        setEditingCourse(course);

        setFormData({
            title: course.title || "",
            description: course.description || "",
            category: course.category || "",
            level: course.level || "Beginner",
            price: course.price ?? "",
            thumbnail: course.thumbnail || "",
            duration: course.duration || "",
            status: course.status || "DRAFT"
        });

        setShowModal(true);
    };


    // =========================
    // CREATE / UPDATE
    // =========================
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const courseData = {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                level: formData.level,
                price: Number(formData.price),
                thumbnail: formData.thumbnail,
                duration: formData.duration,
                status: formData.status
            };


            if (editingCourse) {

                await axios.put(
                    `${API}/course/${editingCourse.id}`,
                    courseData
                );

                alert("Course updated successfully!");

            } else {

                await axios.post(
                    `${API}/course/create`,
                    courseData
                );

                alert("Course created successfully!");

            }

            setShowModal(false);

            setEditingCourse(null);

            fetchCourses();

        } catch (err) {

            console.error(err);

            alert(
                "Something went wrong while saving the course."
            );

        }

    };


    // =========================
    // DELETE COURSE
    // =========================
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this course?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await axios.delete(
                `${API}/course/${id}`
            );

            alert("Course deleted successfully!");

            fetchCourses();

        } catch (err) {

            console.error(err);

            alert(
                "Unable to delete course."
            );

        }

    };


    // =========================
    // PUBLISH / DRAFT
    // =========================
    const handleStatusChange = async (course) => {

        try {

            const newStatus =
                course.status === "PUBLISHED"
                    ? "DRAFT"
                    : "PUBLISHED";


            const updatedCourse = {
                title: course.title,
                description: course.description,
                category: course.category,
                level: course.level,
                price: Number(course.price),
                thumbnail: course.thumbnail,
                duration: course.duration,
                status: newStatus
            };


            await axios.put(
                `${API}/course/${course.id}`,
                updatedCourse
            );

            fetchCourses();

        } catch (err) {

            console.error(err);

            alert(
                "Unable to change course status."
            );

        }

    };


    // =========================
    // SEARCH
    // =========================
    const filteredCourses = courses.filter((course) => {

        const searchText = search.toLowerCase();

        return (
            course.title?.toLowerCase().includes(searchText) ||
            course.category?.toLowerCase().includes(searchText) ||
            course.level?.toLowerCase().includes(searchText)
        );

    });


    // =========================
    // LOADING
    // =========================
    if (loading) {

        return (
            <div
                className="text-center py-5"
                style={{
                    color: "#b8a9ff"
                }}
            >

                <div
                    className="spinner-border"
                    role="status"
                ></div>

                <p className="mt-3">
                    Loading courses...
                </p>

            </div>
        );

    }


    // =========================
    // UI
    // =========================
    return (

        <div
            className="container-fluid"
            style={{
                color: "#ffffff"
            }}
        >

            {/* ================= HEADER ================= */}

            <div
                className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3"
            >

                <div>

                    <h2
                        className="fw-bold mb-1"
                        style={{
                            color: "#ffffff"
                        }}
                    >
                        Course Management
                    </h2>

                    <p
                        className="mb-0"
                        style={{
                            color: "#9ca3af"
                        }}
                    >
                        Manage your LearnHub courses
                    </p>

                </div>


                <button
                    className="btn fw-semibold"
                    onClick={handleAddCourse}
                    style={{
                        background:
                            "linear-gradient(135deg, #7c3aed, #9333ea)",
                        color: "#fff",
                        border: "none",
                        padding: "11px 20px",
                        borderRadius: "10px"
                    }}
                >
                    + Add Course
                </button>

            </div>


            {/* ================= ERROR ================= */}

            {error && (

                <div
                    className="alert"
                    style={{
                        background: "#2a1720",
                        color: "#ff8fa3",
                        border: "1px solid #7f1d3d"
                    }}
                >
                    {error}
                </div>

            )}


            {/* ================= SEARCH ================= */}

            <div
                className="mb-4"
            >

                <div
                    className="input-group"
                    style={{
                        maxWidth: "500px"
                    }}
                >

                    <span
                        className="input-group-text"
                        style={{
                            background: "#17131f",
                            border: "1px solid #31244a",
                            color: "#a78bfa"
                        }}
                    >
                        🔍
                    </span>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search courses..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        style={{
                            background: "#17131f",
                            border: "1px solid #31244a",
                            color: "#fff"
                        }}
                    />

                </div>

            </div>


            {/* ================= COURSE COUNT ================= */}

            <div
                className="row mb-4"
            >

                <div className="col-md-4">

                    <div
                        className="p-3"
                        style={{
                            background: "#17131f",
                            border: "1px solid #31244a",
                            borderRadius: "12px"
                        }}
                    >

                        <small
                            style={{
                                color: "#9ca3af"
                            }}
                        >
                            Total Courses
                        </small>

                        <h3
                            className="fw-bold mb-0 mt-1"
                            style={{
                                color: "#a78bfa"
                            }}
                        >
                            {courses.length}
                        </h3>

                    </div>

                </div>


                <div className="col-md-4 mt-3 mt-md-0">

                    <div
                        className="p-3"
                        style={{
                            background: "#17131f",
                            border: "1px solid #31244a",
                            borderRadius: "12px"
                        }}
                    >

                        <small
                            style={{
                                color: "#9ca3af"
                            }}
                        >
                            Published
                        </small>

                        <h3
                            className="fw-bold mb-0 mt-1"
                            style={{
                                color: "#4ade80"
                            }}
                        >
                            {
                                courses.filter(
                                    c => c.status === "PUBLISHED"
                                ).length
                            }
                        </h3>

                    </div>

                </div>


                <div className="col-md-4 mt-3 mt-md-0">

                    <div
                        className="p-3"
                        style={{
                            background: "#17131f",
                            border: "1px solid #31244a",
                            borderRadius: "12px"
                        }}
                    >

                        <small
                            style={{
                                color: "#9ca3af"
                            }}
                        >
                            Draft
                        </small>

                        <h3
                            className="fw-bold mb-0 mt-1"
                            style={{
                                color: "#fbbf24"
                            }}
                        >
                            {
                                courses.filter(
                                    c =>
                                        c.status !== "PUBLISHED"
                                ).length
                            }
                        </h3>

                    </div>

                </div>

            </div>


            {/* ================= COURSE TABLE ================= */}

            <div
                className="table-responsive"
                style={{
                    background: "#17131f",
                    border: "1px solid #31244a",
                    borderRadius: "14px",
                    overflow: "hidden"
                }}
            >

                <table
                    className="table table-dark table-hover align-middle mb-0"
                    style={{
                        background: "#17131f"
                    }}
                >

                    <thead>

                        <tr
                            style={{
                                background: "#21182e"
                            }}
                        >

                            <th className="px-3 py-3">
                                #
                            </th>

                            <th>
                                Course
                            </th>

                            <th>
                                Category
                            </th>

                            <th>
                                Level
                            </th>

                            <th>
                                Price
                            </th>

                            <th>
                                Duration
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredCourses.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="8"
                                    className="text-center py-5"
                                    style={{
                                        color: "#9ca3af"
                                    }}
                                >
                                    No courses found.
                                </td>

                            </tr>

                        ) : (

                            filteredCourses.map(
                                (course, index) => (

                                    <tr key={course.id}>

                                        <td className="px-3">
                                            {index + 1}
                                        </td>


                                        {/* COURSE */}

                                        <td>

                                            <div
                                                className="d-flex align-items-center gap-3"
                                            >

                                                <div
                                                    style={{
                                                        width: "48px",
                                                        height: "48px",
                                                        borderRadius: "9px",
                                                        background:
                                                            "linear-gradient(135deg, #6d28d9, #9333ea)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        overflow: "hidden",
                                                        flexShrink: 0
                                                    }}
                                                >

                                                    {course.thumbnail ? (

                                                        <img
                                                            src={course.thumbnail}
                                                            alt={course.title}
                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                objectFit: "cover"
                                                            }}
                                                            onError={(e) => {
                                                                e.target.style.display =
                                                                    "none";
                                                            }}
                                                        />

                                                    ) : (

                                                        <span
                                                            style={{
                                                                fontSize: "20px"
                                                            }}
                                                        >
                                                            📚
                                                        </span>

                                                    )}

                                                </div>


                                                <div>

                                                    <div
                                                        className="fw-semibold"
                                                    >
                                                        {course.title}
                                                    </div>

                                                    <small
                                                        style={{
                                                            color: "#6b7280"
                                                        }}
                                                    >
                                                        ID: #{course.id}
                                                    </small>

                                                </div>

                                            </div>

                                        </td>


                                        <td>

                                            <span
                                                className="badge"
                                                style={{
                                                    background: "#31244a",
                                                    color: "#c4b5fd"
                                                }}
                                            >
                                                {course.category || "N/A"}
                                            </span>

                                        </td>


                                        <td>
                                            {course.level || "N/A"}
                                        </td>


                                        <td>

                                            ₹
                                            {Number(
                                                course.price || 0
                                            ).toLocaleString("en-IN")}

                                        </td>


                                        <td>
                                            {course.duration || "N/A"}
                                        </td>


                                        {/* STATUS */}

                                        <td>

                                            <button
                                                onClick={() =>
                                                    handleStatusChange(
                                                        course
                                                    )
                                                }
                                                className="btn btn-sm"
                                                style={{
                                                    background:
                                                        course.status ===
                                                        "PUBLISHED"
                                                            ? "#143d2b"
                                                            : "#3d3014",
                                                    color:
                                                        course.status ===
                                                        "PUBLISHED"
                                                            ? "#4ade80"
                                                            : "#fbbf24",
                                                    border: "none",
                                                    borderRadius: "20px",
                                                    padding:
                                                        "5px 12px"
                                                }}
                                            >

                                                {course.status ===
                                                "PUBLISHED"
                                                    ? "● Published"
                                                    : "● Draft"}

                                            </button>

                                        </td>


                                        {/* ACTIONS */}

                                        <td>

                                            <div
                                                className="d-flex gap-2"
                                            >

                                                <button
                                                    className="btn btn-sm"
                                                    onClick={() =>
                                                        handleEdit(
                                                            course
                                                        )
                                                    }
                                                    style={{
                                                        background:
                                                            "#29203d",
                                                        color:
                                                            "#c4b5fd",
                                                        border:
                                                            "1px solid #4c3575"
                                                    }}
                                                >
                                                    ✏️
                                                </button>


                                                <button
                                                    className="btn btn-sm"
                                                    onClick={() =>
                                                        handleDelete(
                                                            course.id
                                                        )
                                                    }
                                                    style={{
                                                        background:
                                                            "#3b1820",
                                                        color:
                                                            "#fb7185",
                                                        border:
                                                            "1px solid #7f1d3d"
                                                    }}
                                                >
                                                    🗑️
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                )
                            )

                        )}

                    </tbody>

                </table>

            </div>


            {/* ================= MODAL ================= */}

            {showModal && (

                <div
                    className="modal d-block"
                    style={{
                        background:
                            "rgba(0,0,0,0.75)"
                    }}
                >

                    <div
                        className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
                    >

                        <div
                            className="modal-content"
                            style={{
                                background: "#17131f",
                                color: "#fff",
                                border:
                                    "1px solid #4c3575",
                                borderRadius: "15px"
                            }}
                        >

                            {/* MODAL HEADER */}

                            <div
                                className="modal-header"
                                style={{
                                    borderBottom:
                                        "1px solid #31244a"
                                }}
                            >

                                <h5
                                    className="modal-title fw-bold"
                                >
                                    {editingCourse
                                        ? "Edit Course"
                                        : "Add New Course"}
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                ></button>

                            </div>


                            {/* MODAL BODY */}

                            <form
                                onSubmit={handleSubmit}
                            >

                                <div className="modal-body">

                                    <div className="row">


                                        {/* TITLE */}

                                        <div className="col-md-8 mb-3">

                                            <label className="form-label">
                                                Course Title
                                            </label>

                                            <input
                                                type="text"
                                                name="title"
                                                value={
                                                    formData.title
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                className="form-control"
                                                placeholder="Enter course title"
                                                required
                                                style={{
                                                    background:
                                                        "#0f0b15",
                                                    color: "#fff",
                                                    border:
                                                        "1px solid #31244a"
                                                }}
                                            />

                                        </div>


                                        {/* CATEGORY */}

                                        <div className="col-md-4 mb-3">

                                            <label className="form-label">
                                                Category
                                            </label>

                                            <input
                                                type="text"
                                                name="category"
                                                value={
                                                    formData.category
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                className="form-control"
                                                placeholder="Java"
                                                required
                                                style={{
                                                    background:
                                                        "#0f0b15",
                                                    color: "#fff",
                                                    border:
                                                        "1px solid #31244a"
                                                }}
                                            />

                                        </div>


                                        {/* DESCRIPTION */}

                                        <div className="col-12 mb-3">

                                            <label className="form-label">
                                                Description
                                            </label>

                                            <textarea
                                                name="description"
                                                value={
                                                    formData.description
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                className="form-control"
                                                rows="4"
                                                placeholder="Enter course description"
                                                required
                                                style={{
                                                    background:
                                                        "#0f0b15",
                                                    color: "#fff",
                                                    border:
                                                        "1px solid #31244a"
                                                }}
                                            />

                                        </div>


                                        {/* LEVEL */}

                                        <div className="col-md-4 mb-3">

                                            <label className="form-label">
                                                Level
                                            </label>

                                            <select
                                                name="level"
                                                value={
                                                    formData.level
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                className="form-select"
                                                style={{
                                                    background:
                                                        "#0f0b15",
                                                    color: "#fff",
                                                    border:
                                                        "1px solid #31244a"
                                                }}
                                            >

                                                <option value="Beginner">
                                                    Beginner
                                                </option>

                                                <option value="Intermediate">
                                                    Intermediate
                                                </option>

                                                <option value="Advanced">
                                                    Advanced
                                                </option>

                                            </select>

                                        </div>


                                        {/* PRICE */}

                                        <div className="col-md-4 mb-3">

                                            <label className="form-label">
                                                Price (₹)
                                            </label>

                                            <input
                                                type="number"
                                                name="price"
                                                value={
                                                    formData.price
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                className="form-control"
                                                placeholder="4999"
                                                min="0"
                                                required
                                                style={{
                                                    background:
                                                        "#0f0b15",
                                                    color: "#fff",
                                                    border:
                                                        "1px solid #31244a"
                                                }}
                                            />

                                        </div>


                                        {/* DURATION */}

                                        <div className="col-md-4 mb-3">

                                            <label className="form-label">
                                                Duration
                                            </label>

                                            <input
                                                type="text"
                                                name="duration"
                                                value={
                                                    formData.duration
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                className="form-control"
                                                placeholder="6 Months"
                                                required
                                                style={{
                                                    background:
                                                        "#0f0b15",
                                                    color: "#fff",
                                                    border:
                                                        "1px solid #31244a"
                                                }}
                                            />

                                        </div>


                                        {/* THUMBNAIL */}

                                        <div className="col-md-8 mb-3">

                                            <label className="form-label">
                                                Thumbnail URL / Path
                                            </label>

                                            <input
                                                type="text"
                                                name="thumbnail"
                                                value={
                                                    formData.thumbnail
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                className="form-control"
                                                placeholder="java-full-stack.jpg"
                                                style={{
                                                    background:
                                                        "#0f0b15",
                                                    color: "#fff",
                                                    border:
                                                        "1px solid #31244a"
                                                }}
                                            />

                                        </div>


                                        {/* STATUS */}

                                        <div className="col-md-4 mb-3">

                                            <label className="form-label">
                                                Status
                                            </label>

                                            <select
                                                name="status"
                                                value={
                                                    formData.status
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                className="form-select"
                                                style={{
                                                    background:
                                                        "#0f0b15",
                                                    color: "#fff",
                                                    border:
                                                        "1px solid #31244a"
                                                }}
                                            >

                                                <option value="DRAFT">
                                                    Draft
                                                </option>

                                                <option value="PUBLISHED">
                                                    Published
                                                </option>

                                            </select>

                                        </div>

                                    </div>

                                </div>


                                {/* MODAL FOOTER */}

                                <div
                                    className="modal-footer"
                                    style={{
                                        borderTop:
                                            "1px solid #31244a"
                                    }}
                                >

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() =>
                                            setShowModal(false)
                                        }
                                    >
                                        Cancel
                                    </button>


                                    <button
                                        type="submit"
                                        className="btn fw-semibold"
                                        style={{
                                            background:
                                                "linear-gradient(135deg, #7c3aed, #9333ea)",
                                            color: "#fff",
                                            border: "none"
                                        }}
                                    >

                                        {editingCourse
                                            ? "Update Course"
                                            : "Create Course"}

                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}

export default CourseManagement;


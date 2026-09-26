import React, { useEffect, useState } from "react";
import axios from "axios";

function LectureManagement() {

    const API = "http://localhost:8080";

    const [courses, setCourses] = useState([]);
    const [lectures, setLectures] = useState([]);

    const [selectedCourse, setSelectedCourse] = useState("");

    const [form, setForm] = useState({
        title: "",
        description: "",
        duration: "",
        lectureOrder: 1,
        preview: false
    });

    const [video, setVideo] = useState(null);
    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    // =========================
    // LOAD COURSES
    // =========================
    useEffect(() => {
        loadCourses();
    }, []);


    const loadCourses = async () => {
        try {
            const response = await axios.get(`${API}/course/all`);
            setCourses(response.data);
        } catch (error) {
            console.error(error);
            setError("Unable to load courses");
        }
    };


    // =========================
    // LOAD LECTURES
    // =========================
    const loadLectures = async (courseId) => {

        if (!courseId) {
            setLectures([]);
            return;
        }

        try {
            const response = await axios.get(
                `${API}/lecture/course/${courseId}`
            );

            setLectures(response.data);

        } catch (error) {
            console.error(error);
            setError("Unable to load lectures");
        }
    };


    // =========================
    // COURSE CHANGE
    // =========================
    const handleCourseChange = (e) => {

        const courseId = e.target.value;

        setSelectedCourse(courseId);
        loadLectures(courseId);

        resetForm();
    };


    // =========================
    // FORM CHANGE
    // =========================
    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });
    };


    // =========================
    // VIDEO CHANGE
    // =========================
    const handleVideoChange = (e) => {

        const selectedFile = e.target.files[0];

        if (selectedFile) {
            setVideo(selectedFile);
        }
    };


    // =========================
    // CREATE / UPDATE LECTURE
    // =========================
    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        if (!selectedCourse) {
            setError("Please select a course");
            return;
        }

        if (!form.title.trim()) {
            setError("Lecture title is required");
            return;
        }

        setLoading(true);

        try {

            let lectureResponse;

            const lectureData = {
                courseId: Number(selectedCourse),
                title: form.title,
                description: form.description,
                duration: form.duration,
                lectureOrder: Number(form.lectureOrder),
                preview: form.preview
            };


            // =========================
            // UPDATE
            // =========================
            if (editingId) {

                lectureResponse = await axios.put(
                    `${API}/lecture/${editingId}`,
                    lectureData
                );

                setMessage("Lecture updated successfully");

            }

            // =========================
            // CREATE
            // =========================
            else {

                lectureResponse = await axios.post(
                    `${API}/lecture/create`,
                    lectureData
                );

                setMessage("Lecture created successfully");
            }


            // =========================
            // UPLOAD VIDEO
            // =========================
            const lectureId =
                editingId || lectureResponse.data.id;

            if (video) {

                const formData = new FormData();

                formData.append("video", video);

                await axios.post(
                    `${API}/lecture/upload/${lectureId}`,
                    formData
                );

                setMessage(
                    editingId
                        ? "Lecture updated and video uploaded successfully"
                        : "Lecture created and video uploaded successfully"
                );
            }


            await loadLectures(selectedCourse);

            resetForm();

        } catch (error) {

            console.error(error);

            if (error.response?.data) {
                setError(
                    typeof error.response.data === "string"
                        ? error.response.data
                        : "Operation failed"
                );
            } else {
                setError("Something went wrong");
            }

        } finally {

            setLoading(false);
        }
    };


    // =========================
    // EDIT
    // =========================
    const handleEdit = (lecture) => {

        setEditingId(lecture.id);

        setForm({
            title: lecture.title || "",
            description: lecture.description || "",
            duration: lecture.duration || "",
            lectureOrder: lecture.lectureOrder || 1,
            preview: lecture.preview || false
        });

        setVideo(null);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // =========================
    // DELETE
    // =========================
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this lecture?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await axios.delete(`${API}/lecture/${id}`);

            setMessage("Lecture deleted successfully");

            loadLectures(selectedCourse);

        } catch (error) {

            console.error(error);
            setError("Unable to delete lecture");
        }
    };


    // =========================
    // RESET FORM
    // =========================
    const resetForm = () => {

        setEditingId(null);

        setForm({
            title: "",
            description: "",
            duration: "",
            lectureOrder: 1,
            preview: false
        });

        setVideo(null);

        const fileInput =
            document.getElementById("lectureVideo");

        if (fileInput) {
            fileInput.value = "";
        }
    };


    return (

        <div
            className="container-fluid py-4"
            style={{
                background: "#0b0b0f",
                minHeight: "100vh",
                color: "white"
            }}
        >

            {/* ================= HEADER ================= */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h2 className="fw-bold mb-1">
                        <span style={{ color: "#8b5cf6" }}>
                            Lecture
                        </span>{" "}
                        Management
                    </h2>

                    <p className="text-secondary mb-0">
                        Manage course lectures and upload videos
                    </p>
                </div>

            </div>


            {/* ================= ALERTS ================= */}

            {message && (

                <div className="alert alert-success">
                    {message}
                </div>

            )}

            {error && (

                <div className="alert alert-danger">
                    {error}
                </div>

            )}


            {/* ================= COURSE SELECT ================= */}

            <div
                className="card border-0 shadow mb-4"
                style={{
                    background: "#15151d",
                    borderRadius: "15px"
                }}
            >

                <div className="card-body">

                    <label className="form-label fw-semibold">
                        Select Course
                    </label>

                    <select
                        className="form-select bg-dark text-white border-secondary"
                        value={selectedCourse}
                        onChange={handleCourseChange}
                    >

                        <option value="">
                            -- Select Course --
                        </option>

                        {courses.map((course) => (

                            <option
                                key={course.id}
                                value={course.id}
                            >
                                {course.title}
                            </option>

                        ))}

                    </select>

                </div>

            </div>


            {/* ================= ADD / EDIT FORM ================= */}

            {selectedCourse && (

                <div
                    className="card border-0 shadow mb-4"
                    style={{
                        background: "#15151d",
                        borderRadius: "15px"
                    }}
                >

                    <div className="card-body p-4">

                        <h4 className="fw-bold mb-4">

                            {editingId
                                ? "Edit Lecture"
                                : "Add New Lecture"}

                        </h4>


                        <form onSubmit={handleSubmit}>

                            <div className="row g-3">

                                {/* TITLE */}

                                <div className="col-md-8">

                                    <label className="form-label">
                                        Lecture Title
                                    </label>

                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control bg-dark text-white border-secondary"
                                        placeholder="Introduction to Java"
                                        value={form.title}
                                        onChange={handleChange}
                                    />

                                </div>


                                {/* ORDER */}

                                <div className="col-md-4">

                                    <label className="form-label">
                                        Lecture Order
                                    </label>

                                    <input
                                        type="number"
                                        name="lectureOrder"
                                        min="1"
                                        className="form-control bg-dark text-white border-secondary"
                                        value={form.lectureOrder}
                                        onChange={handleChange}
                                    />

                                </div>


                                {/* DESCRIPTION */}

                                <div className="col-12">

                                    <label className="form-label">
                                        Description
                                    </label>

                                    <textarea
                                        name="description"
                                        rows="3"
                                        className="form-control bg-dark text-white border-secondary"
                                        placeholder="Enter lecture description..."
                                        value={form.description}
                                        onChange={handleChange}
                                    />

                                </div>


                                {/* DURATION */}

                                <div className="col-md-4">

                                    <label className="form-label">
                                        Duration
                                    </label>

                                    <input
                                        type="text"
                                        name="duration"
                                        className="form-control bg-dark text-white border-secondary"
                                        placeholder="25 Minutes"
                                        value={form.duration}
                                        onChange={handleChange}
                                    />

                                </div>


                                {/* VIDEO */}

                                <div className="col-md-8">

                                    <label className="form-label">
                                        Lecture Video
                                    </label>

                                    <input
                                        id="lectureVideo"
                                        type="file"
                                        accept="video/*"
                                        className="form-control bg-dark text-white border-secondary"
                                        onChange={handleVideoChange}
                                    />

                                    {video && (

                                        <small className="text-success">
                                            Selected: {video.name}
                                        </small>

                                    )}

                                </div>


                                {/* PREVIEW */}

                                <div className="col-12">

                                    <div className="form-check">

                                        <input
                                            type="checkbox"
                                            name="preview"
                                            className="form-check-input"
                                            checked={form.preview}
                                            onChange={handleChange}
                                            id="previewLecture"
                                        />

                                        <label
                                            className="form-check-label"
                                            htmlFor="previewLecture"
                                        >
                                            Allow students to preview this lecture
                                        </label>

                                    </div>

                                </div>


                                {/* BUTTONS */}

                                <div className="col-12 mt-4">

                                    <button
                                        type="submit"
                                        className="btn px-4 me-2"
                                        disabled={loading}
                                        style={{
                                            background: "#8b5cf6",
                                            color: "white"
                                        }}
                                    >

                                        {loading
                                            ? "Processing..."
                                            : editingId
                                                ? "Update Lecture"
                                                : "Create Lecture"}

                                    </button>


                                    {editingId && (

                                        <button
                                            type="button"
                                            className="btn btn-secondary px-4"
                                            onClick={resetForm}
                                        >
                                            Cancel
                                        </button>

                                    )}

                                </div>

                            </div>

                        </form>

                    </div>

                </div>

            )}


            {/* ================= LECTURES ================= */}

            {selectedCourse && (

                <div
                    className="card border-0 shadow"
                    style={{
                        background: "#15151d",
                        borderRadius: "15px"
                    }}
                >

                    <div className="card-body p-4">

                        <div className="d-flex justify-content-between align-items-center mb-4">

                            <h4 className="fw-bold mb-0">
                                Course Lectures
                            </h4>

                            <span
                                className="badge"
                                style={{
                                    background: "#8b5cf6"
                                }}
                            >
                                {lectures.length} Lectures
                            </span>

                        </div>


                        {lectures.length === 0 ? (

                            <div className="text-center py-5 text-secondary">

                                <h5>
                                    No lectures found
                                </h5>

                                <p>
                                    Add your first lecture above.
                                </p>

                            </div>

                        ) : (

                            <div className="row g-4">

                                {lectures.map((lecture) => (

                                    <div
                                        className="col-lg-6"
                                        key={lecture.id}
                                    >

                                        <div
                                            className="card h-100 border-secondary"
                                            style={{
                                                background: "#0f0f14",
                                                borderRadius: "12px"
                                            }}
                                        >

                                            <div className="card-body">

                                                <div className="d-flex justify-content-between">

                                                    <div>

                                                        <span
                                                            className="badge me-2"
                                                            style={{
                                                                background: "#8b5cf6"
                                                            }}
                                                        >
                                                            Lecture {lecture.lectureOrder}
                                                        </span>

                                                        {lecture.preview && (

                                                            <span className="badge bg-success">
                                                                Preview
                                                            </span>

                                                        )}

                                                    </div>

                                                </div>


                                                <h5 className="fw-bold mt-3">
                                                    {lecture.title}
                                                </h5>


                                                <p className="text-secondary">
                                                    {lecture.description}
                                                </p>


                                                <div className="small text-secondary mb-3">

                                                    ⏱ {lecture.duration || "N/A"}

                                                </div>


                                                {/* VIDEO */}

                                                {lecture.videoUrl ? (

                                                    <video
                                                        controls
                                                        className="w-100 rounded mb-3"
                                                        style={{
                                                            maxHeight: "250px",
                                                            background: "black"
                                                        }}
                                                    >

                                                        <source
                                                            src={`${API}${lecture.videoUrl}`}
                                                            type="video/mp4"
                                                        />

                                                        Your browser does not support video playback.

                                                    </video>

                                                ) : (

                                                    <div
                                                        className="text-center p-4 mb-3"
                                                        style={{
                                                            background: "#191923",
                                                            borderRadius: "10px"
                                                        }}
                                                    >
                                                        <span className="text-secondary">
                                                            No video uploaded
                                                        </span>
                                                    </div>

                                                )}


                                                {/* ACTIONS */}

                                                <div className="d-flex gap-2">

                                                    <button
                                                        className="btn btn-outline-light btn-sm"
                                                        onClick={() =>
                                                            handleEdit(lecture)
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() =>
                                                            handleDelete(lecture.id)
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                </div>

            )}

        </div>
    );
}

export default LectureManagement;
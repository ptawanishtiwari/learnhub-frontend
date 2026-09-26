import React, { useEffect, useMemo, useState } from "react";

function EnrollmentManagement() {

    const API = "http://localhost:8080";

    const [enrollments, setEnrollments] = useState([]);
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [showAddModal, setShowAddModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

    const [selectedEnrollment, setSelectedEnrollment] = useState(null);

    const [form, setForm] = useState({
        customerId: "",
        courseId: "",
        status: "ACTIVE"
    });

    // =====================================================
    // FETCH ALL DATA
    // =====================================================

    const fetchData = async () => {

        try {

            setLoading(true);
            setError("");

            const [
                enrollmentResponse,
                studentResponse,
                courseResponse
            ] = await Promise.all([

                fetch(`${API}/enrollment/all`),
                fetch(`${API}/customer/all-user`),
                fetch(`${API}/course/all`)
            ]);

            if (!enrollmentResponse.ok) {
                throw new Error("Failed to fetch enrollments");
            }

            if (!studentResponse.ok) {
                throw new Error("Failed to fetch students");
            }

            if (!courseResponse.ok) {
                throw new Error("Failed to fetch courses");
            }

            const enrollmentData = await enrollmentResponse.json();
            const studentData = await studentResponse.json();
            const courseData = await courseResponse.json();

            setEnrollments(enrollmentData);
            setStudents(studentData);
            setCourses(courseData);

        } catch (err) {

            console.error(err);
            setError(err.message || "Something went wrong");

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // =====================================================
    // FIND STUDENT
    // =====================================================

    const getStudent = (customerId) => {

        return students.find(
            student => Number(student.id) === Number(customerId)
        );
    };

    // =====================================================
    // FIND COURSE
    // =====================================================

    const getCourse = (courseId) => {

        return courses.find(
            course => Number(course.id) === Number(courseId)
        );
    };

    // =====================================================
    // FILTER ENROLLMENTS
    // =====================================================

    const filteredEnrollments = useMemo(() => {

        const value = search.toLowerCase().trim();

        if (!value) {
            return enrollments;
        }

        return enrollments.filter(enrollment => {

            const student = getStudent(enrollment.customerId);
            const course = getCourse(enrollment.courseId);

            const studentName =
                student?.name?.toLowerCase() || "";

            const studentEmail =
                student?.email?.toLowerCase() || "";

            const courseTitle =
                course?.title?.toLowerCase() || "";

            const status =
                enrollment.status?.toLowerCase() || "";

            return (
                studentName.includes(value) ||
                studentEmail.includes(value) ||
                courseTitle.includes(value) ||
                status.includes(value)
            );
        });

    }, [enrollments, students, courses, search]);

    // =====================================================
    // COUNTS
    // =====================================================

    const totalEnrollments = enrollments.length;

    const activeEnrollments = enrollments.filter(
        enrollment =>
            enrollment.status?.toUpperCase() === "ACTIVE"
    ).length;

    const completedEnrollments = enrollments.filter(
        enrollment =>
            enrollment.status?.toUpperCase() === "COMPLETED"
    ).length;

    const cancelledEnrollments = enrollments.filter(
        enrollment =>
            enrollment.status?.toUpperCase() === "CANCELLED"
    ).length;

    // =====================================================
    // FORM CHANGE
    // =====================================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // =====================================================
    // CREATE ENROLLMENT
    // =====================================================

    const handleCreateEnrollment = async (e) => {

        e.preventDefault();

        if (!form.customerId || !form.courseId) {

            alert("Please select student and course");
            return;
        }

        try {

            const response = await fetch(
                `${API}/enrollment/create`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        customerId: Number(form.customerId),
                        courseId: Number(form.courseId),
                        status: form.status
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    data.error ||
                    "Failed to create enrollment"
                );
            }

            alert("Student enrolled successfully");

            setShowAddModal(false);

            setForm({
                customerId: "",
                courseId: "",
                status: "ACTIVE"
            });

            fetchData();

        } catch (err) {

            console.error(err);
            alert(err.message || "Failed to create enrollment");
        }
    };

    // =====================================================
    // UPDATE STATUS
    // =====================================================

    const handleStatusChange = async (id, status) => {

        try {

            const response = await fetch(
                `${API}/enrollment/${id}/status`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        status: status
                    })
                }
            );

            if (!response.ok) {

                throw new Error(
                    "Failed to update enrollment status"
                );
            }

            fetchData();

        } catch (err) {

            console.error(err);
            alert(err.message);
        }
    };

    // =====================================================
    // DELETE ENROLLMENT
    // =====================================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to remove this enrollment?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await fetch(
                `${API}/enrollment/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {

                throw new Error(
                    "Failed to delete enrollment"
                );
            }

            alert("Enrollment removed successfully");

            fetchData();

        } catch (err) {

            console.error(err);
            alert(err.message);
        }
    };

    // =====================================================
    // VIEW ENROLLMENT
    // =====================================================

    const handleView = (enrollment) => {

        setSelectedEnrollment(enrollment);
        setShowViewModal(true);
    };

    // =====================================================
    // DATE FORMAT
    // =====================================================

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    // =====================================================
    // STATUS BADGE
    // =====================================================

    const getStatusStyle = (status) => {

        const value = status?.toUpperCase();

        if (value === "ACTIVE") {

            return {
                background: "rgba(74, 222, 128, 0.12)",
                color: "#4ade80",
                border: "1px solid rgba(74, 222, 128, 0.25)"
            };
        }

        if (value === "COMPLETED") {

            return {
                background: "rgba(96, 165, 250, 0.12)",
                color: "#60a5fa",
                border: "1px solid rgba(96, 165, 250, 0.25)"
            };
        }

        if (value === "CANCELLED") {

            return {
                background: "rgba(251, 113, 133, 0.12)",
                color: "#fb7185",
                border: "1px solid rgba(251, 113, 133, 0.25)"
            };
        }

        return {
            background: "rgba(251, 191, 36, 0.12)",
            color: "#fbbf24",
            border: "1px solid rgba(251, 191, 36, 0.25)"
        };
    };

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{
                    minHeight: "500px",
                    color: "#a78bfa"
                }}
            >
                <div className="text-center">

                    <div
                        className="spinner-border mb-3"
                        style={{ color: "#8b5cf6" }}
                    />

                    <div>
                        Loading enrollments...
                    </div>

                </div>
            </div>
        );
    }

    // =====================================================
    // UI
    // =====================================================

    return (

        <div
            style={{
                color: "#fff"
            }}
        >

            {/* ========================================= */}
            {/* HEADER */}
            {/* ========================================= */}

            <div
                className="d-flex justify-content-between align-items-center mb-4"
                style={{
                    gap: "15px",
                    flexWrap: "wrap"
                }}
            >

                <div>

                    <h3
                        className="fw-bold mb-1"
                        style={{ color: "#fff" }}
                    >
                        Enrollment Management
                    </h3>

                    <p
                        className="mb-0"
                        style={{
                            color: "#9ca3af"
                        }}
                    >
                        Manage student course enrollments
                    </p>

                </div>

                <button
                    className="btn fw-semibold"
                    onClick={() => setShowAddModal(true)}
                    style={{
                        background:
                            "linear-gradient(135deg, #7c3aed, #9333ea)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        padding: "10px 18px"
                    }}
                >

                    <i className="bi bi-person-plus me-2"></i>

                    Enroll Student

                </button>

            </div>

            {/* ========================================= */}
            {/* ERROR */}
            {/* ========================================= */}

            {error && (

                <div
                    className="alert"
                    style={{
                        background: "rgba(251, 113, 133, 0.1)",
                        color: "#fb7185",
                        border: "1px solid rgba(251, 113, 133, 0.25)"
                    }}
                >
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                </div>

            )}

            {/* ========================================= */}
            {/* STAT CARDS */}
            {/* ========================================= */}

            <div className="row g-3 mb-4">

                {/* TOTAL */}

                <div className="col-xl-3 col-md-6">

                    <div
                        className="p-4 h-100"
                        style={{
                            background: "#17131f",
                            border: "1px solid #31244a",
                            borderRadius: "12px"
                        }}
                    >

                        <div className="d-flex justify-content-between">

                            <div>

                                <p
                                    className="mb-2"
                                    style={{
                                        color: "#9ca3af"
                                    }}
                                >
                                    Total Enrollments
                                </p>

                                <h3 className="fw-bold mb-0">
                                    {totalEnrollments}
                                </h3>

                            </div>

                            <div
                                style={{
                                    width: "45px",
                                    height: "45px",
                                    borderRadius: "10px",
                                    background:
                                        "rgba(139, 92, 246, 0.12)",
                                    color: "#a78bfa",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <i className="bi bi-people fs-5"></i>
                            </div>

                        </div>

                    </div>

                </div>

                {/* ACTIVE */}

                <div className="col-xl-3 col-md-6">

                    <div
                        className="p-4 h-100"
                        style={{
                            background: "#17131f",
                            border: "1px solid #31244a",
                            borderRadius: "12px"
                        }}
                    >

                        <p
                            className="mb-2"
                            style={{
                                color: "#9ca3af"
                            }}
                        >
                            Active
                        </p>

                        <h3
                            className="fw-bold mb-0"
                            style={{ color: "#4ade80" }}
                        >
                            {activeEnrollments}
                        </h3>

                    </div>

                </div>

                {/* COMPLETED */}

                <div className="col-xl-3 col-md-6">

                    <div
                        className="p-4 h-100"
                        style={{
                            background: "#17131f",
                            border: "1px solid #31244a",
                            borderRadius: "12px"
                        }}
                    >

                        <p
                            className="mb-2"
                            style={{
                                color: "#9ca3af"
                            }}
                        >
                            Completed
                        </p>

                        <h3
                            className="fw-bold mb-0"
                            style={{ color: "#60a5fa" }}
                        >
                            {completedEnrollments}
                        </h3>

                    </div>

                </div>

                {/* CANCELLED */}

                <div className="col-xl-3 col-md-6">

                    <div
                        className="p-4 h-100"
                        style={{
                            background: "#17131f",
                            border: "1px solid #31244a",
                            borderRadius: "12px"
                        }}
                    >

                        <p
                            className="mb-2"
                            style={{
                                color: "#9ca3af"
                            }}
                        >
                            Cancelled
                        </p>

                        <h3
                            className="fw-bold mb-0"
                            style={{ color: "#fb7185" }}
                        >
                            {cancelledEnrollments}
                        </h3>

                    </div>

                </div>

            </div>

            {/* ========================================= */}
            {/* SEARCH */}
            {/* ========================================= */}

            <div
                className="p-3 mb-4"
                style={{
                    background: "#17131f",
                    border: "1px solid #31244a",
                    borderRadius: "12px"
                }}
            >

                <div className="input-group">

                    <span
                        className="input-group-text"
                        style={{
                            background: "#0f0b15",
                            color: "#9ca3af",
                            border: "1px solid #31244a"
                        }}
                    >
                        <i className="bi bi-search"></i>
                    </span>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search student, email, course or status..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        style={{
                            background: "#0f0b15",
                            color: "#fff",
                            border: "1px solid #31244a"
                        }}
                    />

                </div>

            </div>

            {/* ========================================= */}
            {/* TABLE */}
            {/* ========================================= */}

            <div
                style={{
                    background: "#17131f",
                    border: "1px solid #31244a",
                    borderRadius: "12px",
                    overflow: "hidden"
                }}
            >

                <div
                    className="table-responsive"
                >

                    <table
                        className="table mb-0 align-middle"
                        style={{
                            color: "#fff"
                        }}
                    >

                        <thead>

                            <tr
                                style={{
                                    background: "#21182e",
                                    borderBottom:
                                        "1px solid #31244a"
                                }}
                            >

                                <th className="px-4 py-3">
                                    #
                                </th>

                                <th className="py-3">
                                    Student
                                </th>

                                <th className="py-3">
                                    Course
                                </th>

                                <th className="py-3">
                                    Enrollment Date
                                </th>

                                <th className="py-3">
                                    Status
                                </th>

                                <th className="py-3 text-center">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredEnrollments.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="text-center py-5"
                                        style={{
                                            color: "#9ca3af"
                                        }}
                                    >

                                        <i
                                            className="bi bi-inbox fs-2 d-block mb-2"
                                        ></i>

                                        No enrollments found

                                    </td>

                                </tr>

                            ) : (

                                filteredEnrollments.map(
                                    (enrollment, index) => {

                                        const student =
                                            getStudent(
                                                enrollment.customerId
                                            );

                                        const course =
                                            getCourse(
                                                enrollment.courseId
                                            );

                                        return (

                                            <tr
                                                key={enrollment.id}
                                                style={{
                                                    borderBottom:
                                                        "1px solid #31244a"
                                                }}
                                            >

                                                {/* ID */}

                                                <td className="px-4">

                                                    <span
                                                        style={{
                                                            color: "#a78bfa",
                                                            fontWeight: "600"
                                                        }}
                                                    >
                                                        {enrollment.id}
                                                    </span>

                                                </td>

                                                {/* STUDENT */}

                                                <td>

                                                    <div
                                                        className="fw-semibold"
                                                    >
                                                        {student?.name ||
                                                            `Customer #${enrollment.customerId}`}
                                                    </div>

                                                    <small
                                                        style={{
                                                            color: "#9ca3af"
                                                        }}
                                                    >
                                                        {student?.email || "-"}
                                                    </small>

                                                </td>

                                                {/* COURSE */}

                                                <td>

                                                    <div
                                                        className="fw-semibold"
                                                    >
                                                        {course?.title ||
                                                            `Course #${enrollment.courseId}`}
                                                    </div>

                                                    {course?.category && (

                                                        <small
                                                            style={{
                                                                color: "#9ca3af"
                                                            }}
                                                        >
                                                            {course.category}
                                                        </small>

                                                    )}

                                                </td>

                                                {/* DATE */}

                                                <td
                                                    style={{
                                                        color: "#d1d5db"
                                                    }}
                                                >
                                                    {formatDate(
                                                        enrollment.enrollmentDate
                                                    )}
                                                </td>

                                                {/* STATUS */}

                                                <td>

                                                    <select
                                                        value={
                                                            enrollment.status ||
                                                            "ACTIVE"
                                                        }
                                                        onChange={(e) =>
                                                            handleStatusChange(
                                                                enrollment.id,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="form-select form-select-sm"
                                                        style={{
                                                            width: "130px",
                                                            background:
                                                                "#0f0b15",
                                                            color: "#fff",
                                                            border:
                                                                "1px solid #31244a"
                                                        }}
                                                    >

                                                        <option value="ACTIVE">
                                                            ACTIVE
                                                        </option>

                                                        <option value="COMPLETED">
                                                            COMPLETED
                                                        </option>

                                                        <option value="CANCELLED">
                                                            CANCELLED
                                                        </option>

                                                    </select>

                                                </td>

                                                {/* ACTIONS */}

                                                <td>

                                                    <div
                                                        className="d-flex justify-content-center gap-2"
                                                    >

                                                        <button
                                                            className="btn btn-sm"
                                                            title="View"
                                                            onClick={() =>
                                                                handleView(
                                                                    enrollment
                                                                )
                                                            }
                                                            style={{
                                                                background:
                                                                    "rgba(139, 92, 246, 0.12)",
                                                                color: "#a78bfa",
                                                                border:
                                                                    "1px solid #4c3575"
                                                            }}
                                                        >

                                                            <i className="bi bi-eye"></i>

                                                        </button>

                                                        <button
                                                            className="btn btn-sm"
                                                            title="Delete"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    enrollment.id
                                                                )
                                                            }
                                                            style={{
                                                                background:
                                                                    "rgba(251, 113, 133, 0.1)",
                                                                color: "#fb7185",
                                                                border:
                                                                    "1px solid rgba(251, 113, 133, 0.25)"
                                                            }}
                                                        >

                                                            <i className="bi bi-trash"></i>

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        );
                                    }
                                )

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* ========================================= */}
            {/* ADD ENROLLMENT MODAL */}
            {/* ========================================= */}

            {showAddModal && (

                <div
                    className="modal d-block"
                    style={{
                        background: "rgba(0, 0, 0, 0.75)"
                    }}
                >

                    <div className="modal-dialog modal-dialog-centered">

                        <div
                            className="modal-content"
                            style={{
                                background: "#17131f",
                                border: "1px solid #4c3575",
                                borderRadius: "12px",
                                color: "#fff"
                            }}
                        >

                            <div
                                className="modal-header"
                                style={{
                                    borderBottom:
                                        "1px solid #31244a"
                                }}
                            >

                                <h5 className="modal-title fw-bold">

                                    <i className="bi bi-person-plus me-2"></i>

                                    Enroll Student

                                </h5>

                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={() =>
                                        setShowAddModal(false)
                                    }
                                ></button>

                            </div>

                            <form onSubmit={handleCreateEnrollment}>

                                <div className="modal-body">

                                    {/* STUDENT */}

                                    <div className="mb-3">

                                        <label
                                            className="form-label"
                                            style={{
                                                color: "#d1d5db"
                                            }}
                                        >
                                            Select Student
                                        </label>

                                        <select
                                            name="customerId"
                                            value={form.customerId}
                                            onChange={handleChange}
                                            className="form-select"
                                            required
                                            style={{
                                                background: "#0f0b15",
                                                color: "#fff",
                                                border:
                                                    "1px solid #4c3575"
                                            }}
                                        >

                                            <option value="">
                                                -- Select Student --
                                            </option>

                                            {students.map(student => (

                                                <option
                                                    key={student.id}
                                                    value={student.id}
                                                >
                                                    {student.name} - {student.email}
                                                </option>

                                            ))}

                                        </select>

                                    </div>

                                    {/* COURSE */}

                                    <div className="mb-3">

                                        <label
                                            className="form-label"
                                            style={{
                                                color: "#d1d5db"
                                            }}
                                        >
                                            Select Course
                                        </label>

                                        <select
                                            name="courseId"
                                            value={form.courseId}
                                            onChange={handleChange}
                                            className="form-select"
                                            required
                                            style={{
                                                background: "#0f0b15",
                                                color: "#fff",
                                                border:
                                                    "1px solid #4c3575"
                                            }}
                                        >

                                            <option value="">
                                                -- Select Course --
                                            </option>

                                            {courses.map(course => (

                                                <option
                                                    key={course.id}
                                                    value={course.id}
                                                >
                                                    {course.title}
                                                </option>

                                            ))}

                                        </select>

                                    </div>

                                    {/* STATUS */}

                                    <div className="mb-3">

                                        <label
                                            className="form-label"
                                            style={{
                                                color: "#d1d5db"
                                            }}
                                        >
                                            Status
                                        </label>

                                        <select
                                            name="status"
                                            value={form.status}
                                            onChange={handleChange}
                                            className="form-select"
                                            style={{
                                                background: "#0f0b15",
                                                color: "#fff",
                                                border:
                                                    "1px solid #4c3575"
                                            }}
                                        >

                                            <option value="ACTIVE">
                                                ACTIVE
                                            </option>

                                            <option value="COMPLETED">
                                                COMPLETED
                                            </option>

                                            <option value="CANCELLED">
                                                CANCELLED
                                            </option>

                                        </select>

                                    </div>

                                </div>

                                <div
                                    className="modal-footer"
                                    style={{
                                        borderTop:
                                            "1px solid #31244a"
                                    }}
                                >

                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={() =>
                                            setShowAddModal(false)
                                        }
                                        style={{
                                            background: "#2a2235",
                                            color: "#d1d5db",
                                            border:
                                                "1px solid #4c3575"
                                        }}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn"
                                        style={{
                                            background:
                                                "linear-gradient(135deg, #7c3aed, #9333ea)",
                                            color: "#fff",
                                            border: "none"
                                        }}
                                    >

                                        <i className="bi bi-check-lg me-2"></i>

                                        Enroll Student

                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            )}

            {/* ========================================= */}
            {/* VIEW MODAL */}
            {/* ========================================= */}

            {showViewModal && selectedEnrollment && (

                <div
                    className="modal d-block"
                    style={{
                        background: "rgba(0, 0, 0, 0.75)"
                    }}
                >

                    <div className="modal-dialog modal-dialog-centered">

                        <div
                            className="modal-content"
                            style={{
                                background: "#17131f",
                                border: "1px solid #4c3575",
                                borderRadius: "12px",
                                color: "#fff"
                            }}
                        >

                            <div
                                className="modal-header"
                                style={{
                                    borderBottom:
                                        "1px solid #31244a"
                                }}
                            >

                                <h5 className="modal-title fw-bold">

                                    Enrollment Details

                                </h5>

                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={() =>
                                        setShowViewModal(false)
                                    }
                                ></button>

                            </div>

                            <div className="modal-body">

                                {(() => {

                                    const student =
                                        getStudent(
                                            selectedEnrollment.customerId
                                        );

                                    const course =
                                        getCourse(
                                            selectedEnrollment.courseId
                                        );

                                    return (

                                        <div>

                                            <div className="mb-3">

                                                <small
                                                    style={{
                                                        color: "#9ca3af"
                                                    }}
                                                >
                                                    Enrollment ID
                                                </small>

                                                <div
                                                    className="fw-semibold"
                                                >
                                                    #{selectedEnrollment.id}
                                                </div>

                                            </div>

                                            <div className="mb-3">

                                                <small
                                                    style={{
                                                        color: "#9ca3af"
                                                    }}
                                                >
                                                    Student
                                                </small>

                                                <div
                                                    className="fw-semibold"
                                                >
                                                    {student?.name ||
                                                        `Customer #${selectedEnrollment.customerId}`}
                                                </div>

                                                <small
                                                    style={{
                                                        color: "#9ca3af"
                                                    }}
                                                >
                                                    {student?.email || "-"}
                                                </small>

                                            </div>

                                            <div className="mb-3">

                                                <small
                                                    style={{
                                                        color: "#9ca3af"
                                                    }}
                                                >
                                                    Course
                                                </small>

                                                <div
                                                    className="fw-semibold"
                                                >
                                                    {course?.title ||
                                                        `Course #${selectedEnrollment.courseId}`}
                                                </div>

                                            </div>

                                            <div className="mb-3">

                                                <small
                                                    style={{
                                                        color: "#9ca3af"
                                                    }}
                                                >
                                                    Enrollment Date
                                                </small>

                                                <div>
                                                    {formatDate(
                                                        selectedEnrollment.enrollmentDate
                                                    )}
                                                </div>

                                            </div>

                                            <div>

                                                <small
                                                    style={{
                                                        color: "#9ca3af"
                                                    }}
                                                >
                                                    Status
                                                </small>

                                                <div className="mt-1">

                                                    <span
                                                        className="badge px-3 py-2"
                                                        style={{
                                                            ...getStatusStyle(
                                                                selectedEnrollment.status
                                                            ),
                                                            borderRadius:
                                                                "6px"
                                                        }}
                                                    >
                                                        {
                                                            selectedEnrollment.status
                                                        }
                                                    </span>

                                                </div>

                                            </div>

                                        </div>

                                    );

                                })()}

                            </div>

                            <div
                                className="modal-footer"
                                style={{
                                    borderTop:
                                        "1px solid #31244a"
                                }}
                            >

                                <button
                                    className="btn"
                                    onClick={() =>
                                        setShowViewModal(false)
                                    }
                                    style={{
                                        background: "#2a2235",
                                        color: "#d1d5db",
                                        border:
                                            "1px solid #4c3575"
                                    }}
                                >
                                    Close
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default EnrollmentManagement;
import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentManagement() {

    const API = "http://localhost:8080";

    // =========================
    // STATES
    // =========================

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

    const [editingStudent, setEditingStudent] = useState(null);
    const [viewingStudent, setViewingStudent] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "USER"
    });


    // =========================
    // FETCH STUDENTS
    // =========================

    useEffect(() => {
        fetchStudents();
    }, []);


    const fetchStudents = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await axios.get(
                `${API}/customer/all-user`
            );

            setStudents(response.data);

        } catch (err) {

            console.error(err);

            setError(
                "Unable to load students. Please check your backend."
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
    // OPEN ADD STUDENT MODAL
    // =========================

    const handleAddStudent = () => {

        setEditingStudent(null);

        setFormData({
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            role: "USER"
        });

        setShowModal(true);
    };


    // =========================
    // OPEN EDIT MODAL
    // =========================

    const handleEdit = (student) => {

        setEditingStudent(student);

        setFormData({
            name: student.name || "",
            email: student.email || "",
            phone: student.phone || "",
            password: "",
            confirmPassword: "",
            role: student.role || "USER"
        });

        setShowModal(true);
    };


    // =========================
    // VIEW STUDENT
    // =========================

    const handleView = async (id) => {

        try {

            const response = await axios.get(
                `${API}/customer/${id}`
            );

            setViewingStudent(response.data);

            setShowViewModal(true);

        } catch (err) {

            console.error(err);

            alert(
                "Unable to load student details."
            );

        }
    };


    // =========================
    // CREATE / UPDATE
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            // =========================
            // PASSWORD VALIDATION
            // =========================

            if (!editingStudent) {

                if (
                    formData.password !==
                    formData.confirmPassword
                ) {

                    alert(
                        "Password and Confirm Password do not match."
                    );

                    return;
                }

            }


            // =========================
            // DATA
            // =========================

            const studentData = {

                name: formData.name,

                email: formData.email,

                phone: formData.phone,

                role: formData.role

            };


            // =========================
            // PASSWORD
            // =========================

            if (formData.password) {

                studentData.password =
                    formData.password;

            }

            if (formData.confirmPassword) {

                studentData.confirmPassword =
                    formData.confirmPassword;

            }


            // =========================
            // UPDATE
            // =========================

            if (editingStudent) {

                await axios.put(

                    `${API}/customer/${editingStudent.id}`,

                    studentData

                );

                alert(
                    "Student updated successfully!"
                );

            }

            // =========================
            // CREATE
            // =========================

            else {

                await axios.post(

                    `${API}/customer/create`,

                    studentData

                );

                alert(
                    "Student created successfully!"
                );

            }


            setShowModal(false);

            setEditingStudent(null);

            fetchStudents();


        } catch (err) {

            console.error(err);

            alert(
                "Something went wrong while saving the student."
            );

        }

    };


    // =========================
    // DELETE STUDENT
    // =========================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(

            "Are you sure you want to delete this student?"

        );

        if (!confirmDelete) {

            return;

        }


        try {

            await axios.delete(
                `${API}/customer/${id}`
            );

            alert(
                "Student deleted successfully!"
            );

            fetchStudents();

        } catch (err) {

            console.error(err);

            alert(
                "Unable to delete student."
            );

        }

    };


    // =========================
    // SEARCH
    // =========================

    const filteredStudents = students.filter(
        (student) => {

            const searchText =
                search.toLowerCase();

            return (

                String(student.id || "")
                    .toLowerCase()
                    .includes(searchText)

                ||

                student.name
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                student.email
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                String(student.phone || "")
                    .toLowerCase()
                    .includes(searchText)

                ||

                student.role
                    ?.toLowerCase()
                    .includes(searchText)

            );

        }
    );


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
                    Loading students...
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
                        Student Management
                    </h2>

                    <p
                        className="mb-0"
                        style={{
                            color: "#9ca3af"
                        }}
                    >
                        Manage your LearnHub students
                    </p>

                </div>


                <button
                    className="btn fw-semibold"
                    onClick={handleAddStudent}
                    style={{
                        background:
                            "linear-gradient(135deg, #7c3aed, #9333ea)",
                        color: "#fff",
                        border: "none",
                        padding: "11px 20px",
                        borderRadius: "10px"
                    }}
                >
                    + Add Student
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

            <div className="mb-4">

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
                        placeholder="Search students..."
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


            {/* ================= STUDENT COUNT ================= */}

            <div className="row mb-4">

                {/* TOTAL */}

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
                            Total Students
                        </small>

                        <h3
                            className="fw-bold mb-0 mt-1"
                            style={{
                                color: "#a78bfa"
                            }}
                        >
                            {students.length}
                        </h3>

                    </div>

                </div>


                {/* USERS */}

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
                            Users
                        </small>

                        <h3
                            className="fw-bold mb-0 mt-1"
                            style={{
                                color: "#4ade80"
                            }}
                        >

                            {
                                students.filter(
                                    student =>
                                        student.role === "USER"
                                ).length
                            }

                        </h3>

                    </div>

                </div>


                {/* ADMINS */}

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
                            Admins
                        </small>

                        <h3
                            className="fw-bold mb-0 mt-1"
                            style={{
                                color: "#fbbf24"
                            }}
                        >

                            {
                                students.filter(
                                    student =>
                                        student.role === "ADMIN"
                                ).length
                            }

                        </h3>

                    </div>

                </div>

            </div>


            {/* ================= STUDENT TABLE ================= */}

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
                                Student
                            </th>

                            <th>
                                Email
                            </th>

                            <th>
                                Phone
                            </th>

                            <th>
                                Role
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredStudents.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="text-center py-5"
                                    style={{
                                        color: "#9ca3af"
                                    }}
                                >

                                    No students found.

                                </td>

                            </tr>

                        ) : (

                            filteredStudents.map(
                                (student, index) => (

                                    <tr
                                        key={student.id}
                                    >

                                        {/* ID */}

                                        <td className="px-3">

                                            {index + 1}

                                        </td>


                                        {/* STUDENT */}

                                        <td>

                                            <div
                                                className="d-flex align-items-center gap-3"
                                            >

                                                <div
                                                    style={{
                                                        width: "45px",
                                                        height: "45px",
                                                        borderRadius: "50%",
                                                        background:
                                                            "linear-gradient(135deg, #6d28d9, #9333ea)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        flexShrink: 0
                                                    }}
                                                >

                                                    <span
                                                        style={{
                                                            fontSize: "20px"
                                                        }}
                                                    >
                                                        👤
                                                    </span>

                                                </div>


                                                <div>

                                                    <div
                                                        className="fw-semibold"
                                                    >
                                                        {student.name ||
                                                            "N/A"}
                                                    </div>

                                                    <small
                                                        style={{
                                                            color: "#6b7280"
                                                        }}
                                                    >
                                                        ID: #
                                                        {student.id}
                                                    </small>

                                                </div>

                                            </div>

                                        </td>


                                        {/* EMAIL */}

                                        <td>

                                            {student.email ||
                                                "N/A"}

                                        </td>


                                        {/* PHONE */}

                                        <td>

                                            {student.phone ||
                                                "N/A"}

                                        </td>


                                        {/* ROLE */}

                                        <td>

                                            <span
                                                className="badge"
                                                style={{
                                                    background:
                                                        student.role ===
                                                        "ADMIN"
                                                            ? "#3d3014"
                                                            : "#31244a",

                                                    color:
                                                        student.role ===
                                                        "ADMIN"
                                                            ? "#fbbf24"
                                                            : "#c4b5fd"
                                                }}
                                            >

                                                {student.role ||
                                                    "USER"}

                                            </span>

                                        </td>


                                        {/* ACTIONS */}

                                        <td>

                                            <div
                                                className="d-flex gap-2"
                                            >

                                                {/* VIEW */}

                                                <button
                                                    className="btn btn-sm"
                                                    title="View Student"
                                                    onClick={() =>
                                                        handleView(
                                                            student.id
                                                        )
                                                    }
                                                    style={{
                                                        background:
                                                            "#182b3b",
                                                        color:
                                                            "#67e8f9",
                                                        border:
                                                            "1px solid #164e63"
                                                    }}
                                                >
                                                    👁️
                                                </button>


                                                {/* EDIT */}

                                                <button
                                                    className="btn btn-sm"
                                                    title="Edit Student"
                                                    onClick={() =>
                                                        handleEdit(
                                                            student
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


                                                {/* DELETE */}

                                                <button
                                                    className="btn btn-sm"
                                                    title="Delete Student"
                                                    onClick={() =>
                                                        handleDelete(
                                                            student.id
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


            {/* ================================================= */}
            {/* ADD / EDIT MODAL */}
            {/* ================================================= */}

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

                            {/* HEADER */}

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

                                    {editingStudent
                                        ? "Edit Student"
                                        : "Add New Student"}

                                </h5>


                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                ></button>

                            </div>


                            {/* FORM */}

                            <form
                                onSubmit={
                                    handleSubmit
                                }
                            >

                                <div className="modal-body">

                                    <div className="row">


                                        {/* NAME */}

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label">
                                                Student Name
                                            </label>

                                            <input
                                                type="text"
                                                name="name"
                                                value={
                                                    formData.name
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                className="form-control"
                                                placeholder="Enter student name"
                                                required
                                                style={{
                                                    background:
                                                        "#0f0b15",
                                                    color:
                                                        "#fff",
                                                    border:
                                                        "1px solid #31244a"
                                                }}
                                            />

                                        </div>


                                        {/* EMAIL */}

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label">
                                                Email
                                            </label>

                                            <input
                                                type="email"
                                                name="email"
                                                value={
                                                    formData.email
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                className="form-control"
                                                placeholder="student@gmail.com"
                                                required
                                                style={{
                                                    background:
                                                        "#0f0b15",
                                                    color:
                                                        "#fff",
                                                    border:
                                                        "1px solid #31244a"
                                                }}
                                            />

                                        </div>


                                        {/* PHONE */}

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label">
                                                Phone
                                            </label>

                                            <input
                                                type="text"
                                                name="phone"
                                                value={
                                                    formData.phone
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                className="form-control"
                                                placeholder="Enter phone number"
                                                required
                                                style={{
                                                    background:
                                                        "#0f0b15",
                                                    color:
                                                        "#fff",
                                                    border:
                                                        "1px solid #31244a"
                                                }}
                                            />

                                        </div>


                                        {/* ROLE */}

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label">
                                                Role
                                            </label>

                                            <select
                                                name="role"
                                                value={
                                                    formData.role
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                className="form-select"
                                                style={{
                                                    background:
                                                        "#0f0b15",
                                                    color:
                                                        "#fff",
                                                    border:
                                                        "1px solid #31244a"
                                                }}
                                            >

                                                <option value="USER">
                                                    USER
                                                </option>

                                                <option value="ADMIN">
                                                    ADMIN
                                                </option>

                                            </select>

                                        </div>


                                        {/* PASSWORD */}

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label">

                                                {editingStudent
                                                    ? "New Password (Optional)"
                                                    : "Password"}

                                            </label>

                                            <input
                                                type="password"
                                                name="password"
                                                value={
                                                    formData.password
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                className="form-control"
                                                placeholder={
                                                    editingStudent
                                                        ? "Leave blank to keep current password"
                                                        : "Enter password"
                                                }
                                                required={
                                                    !editingStudent
                                                }
                                                style={{
                                                    background:
                                                        "#0f0b15",
                                                    color:
                                                        "#fff",
                                                    border:
                                                        "1px solid #31244a"
                                                }}
                                            />

                                        </div>


                                        {/* CONFIRM PASSWORD */}

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label">
                                                Confirm Password
                                            </label>

                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={
                                                    formData.confirmPassword
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                className="form-control"
                                                placeholder="Confirm password"
                                                required={
                                                    !editingStudent
                                                }
                                                style={{
                                                    background:
                                                        "#0f0b15",
                                                    color:
                                                        "#fff",
                                                    border:
                                                        "1px solid #31244a"
                                                }}
                                            />

                                        </div>

                                    </div>

                                </div>


                                {/* FOOTER */}

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

                                        {editingStudent
                                            ? "Update Student"
                                            : "Create Student"}

                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            )}


            {/* ================================================= */}
            {/* VIEW STUDENT MODAL */}
            {/* ================================================= */}

            {showViewModal &&
                viewingStudent && (

                    <div
                        className="modal d-block"
                        style={{
                            background:
                                "rgba(0,0,0,0.75)"
                        }}
                    >

                        <div
                            className="modal-dialog modal-dialog-centered"
                        >

                            <div
                                className="modal-content"
                                style={{
                                    background:
                                        "#17131f",
                                    color: "#fff",
                                    border:
                                        "1px solid #4c3575",
                                    borderRadius: "15px"
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

                                        Student Details

                                    </h5>


                                    <button
                                        type="button"
                                        className="btn-close btn-close-white"
                                        onClick={() =>
                                            setShowViewModal(
                                                false
                                            )
                                        }
                                    ></button>

                                </div>


                                <div className="modal-body">

                                    <div
                                        className="text-center mb-4"
                                    >

                                        <div
                                            className="mx-auto mb-3"
                                            style={{
                                                width: "80px",
                                                height: "80px",
                                                borderRadius:
                                                    "50%",
                                                background:
                                                    "linear-gradient(135deg, #6d28d9, #9333ea)",
                                                display:
                                                    "flex",
                                                alignItems:
                                                    "center",
                                                justifyContent:
                                                    "center",
                                                fontSize:
                                                    "32px"
                                            }}
                                        >
                                            👤
                                        </div>


                                        <h4 className="fw-bold">

                                            {
                                                viewingStudent.name ||
                                                "N/A"
                                            }

                                        </h4>


                                        <span
                                            className="badge"
                                            style={{
                                                background:
                                                    "#31244a",
                                                color:
                                                    "#c4b5fd"
                                            }}
                                        >

                                            {
                                                viewingStudent.role ||
                                                "USER"
                                            }

                                        </span>

                                    </div>


                                    <div className="row g-3">

                                        <div className="col-12">

                                            <small
                                                style={{
                                                    color:
                                                        "#9ca3af"
                                                }}
                                            >
                                                Student ID
                                            </small>

                                            <div className="fw-semibold">

                                                #
                                                {
                                                    viewingStudent.id
                                                }

                                            </div>

                                        </div>


                                        <div className="col-12">

                                            <small
                                                style={{
                                                    color:
                                                        "#9ca3af"
                                                }}
                                            >
                                                Email
                                            </small>

                                            <div className="fw-semibold">

                                                {
                                                    viewingStudent.email ||
                                                    "N/A"
                                                }

                                            </div>

                                        </div>


                                        <div className="col-12">

                                            <small
                                                style={{
                                                    color:
                                                        "#9ca3af"
                                                }}
                                            >
                                                Phone
                                            </small>

                                            <div className="fw-semibold">

                                                {
                                                    viewingStudent.phone ||
                                                    "N/A"
                                                }

                                            </div>

                                        </div>

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
                                        className="btn fw-semibold"
                                        onClick={() =>
                                            setShowViewModal(
                                                false
                                            )
                                        }
                                        style={{
                                            background:
                                                "linear-gradient(135deg, #7c3aed, #9333ea)",
                                            color: "#fff",
                                            border: "none"
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

export default StudentManagement;
import React, { useState } from "react";

import LectureManagement from "./LectureManagement";
import EnrollmentManagement from "./EnrollmentManagement";
import PaymentManagement from "./PaymentManagement";
import CertificateManagement from "./CertificateManagement";
import AnalyticsManagement from "./AnalyticsManagement";

import CourseManagement from "./CourseManagement";
import StudentManagement from "./StudentManagement";

function AdminDashboard() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState("Dashboard");


    // =========================================================
    // DASHBOARD DATA
    // =========================================================

    const stats = [
        {
            title: "Total Students",
            value: "12,480",
            change: "+12.8%",
            icon: "👨‍🎓"
        },
        {
            title: "Active Courses",
            value: "86",
            change: "+8.4%",
            icon: "📚"
        },
        {
            title: "Total Trainers",
            value: "42",
            change: "+5.2%",
            icon: "👨‍🏫"
        },
        {
            title: "Total Revenue",
            value: "₹24.8L",
            change: "+18.6%",
            icon: "💰"
        }
    ];


    const recentStudents = [
        {
            id: 1,
            name: "Rahul Sharma",
            email: "rahul@gmail.com",
            course: "Java Full Stack",
            status: "Active"
        },
        {
            id: 2,
            name: "Priya Singh",
            email: "priya@gmail.com",
            course: "MERN Stack",
            status: "Active"
        },
        {
            id: 3,
            name: "Amit Kumar",
            email: "amit@gmail.com",
            course: "Python AI",
            status: "Pending"
        },
        {
            id: 4,
            name: "Neha Verma",
            email: "neha@gmail.com",
            course: "Data Science",
            status: "Active"
        },
        {
            id: 5,
            name: "Rohit Yadav",
            email: "rohit@gmail.com",
            course: "Java Backend",
            status: "Active"
        }
    ];


    const payments = [
        {
            id: "#PAY1024",
            student: "Rahul Sharma",
            course: "Java Full Stack",
            amount: "₹4,999",
            status: "Success"
        },
        {
            id: "#PAY1023",
            student: "Priya Singh",
            course: "MERN Stack",
            amount: "₹5,499",
            status: "Success"
        },
        {
            id: "#PAY1022",
            student: "Amit Kumar",
            course: "Python AI",
            amount: "₹3,999",
            status: "Pending"
        },
        {
            id: "#PAY1021",
            student: "Neha Verma",
            course: "Data Science",
            amount: "₹6,999",
            status: "Success"
        }
    ];


    const courses = [
        {
            name: "Java Full Stack Development",
            students: 3240,
            progress: 84
        },
        {
            name: "MERN Stack Development",
            students: 2180,
            progress: 72
        },
        {
            name: "Python & AI",
            students: 1850,
            progress: 67
        },
        {
            name: "Data Science",
            students: 1420,
            progress: 58
        }
    ];


    // =========================================================
    // MENU
    // =========================================================

    const menuItems = [
        {
            section: "MAIN",
            items: [
                { name: "Dashboard", icon: "▦" },
                { name: "Students", icon: "👨‍🎓" },
                { name: "Courses", icon: "📚" },
                { name: "Trainers", icon: "👨‍🏫" }
            ]
        },
        {
            section: "MANAGEMENT",
            items: [
                { name: "Lectures", icon: "🎥" },
                { name: "Enrollments", icon: "📝" },
                { name: "Payments", icon: "💳" },
                { name: "Certificates", icon: "🏆" },
                { name: "Analytics", icon: "📊" }
            ]
        },
        {
            section: "SYSTEM",
            items: [
                { name: "Notifications", icon: "🔔" },
                { name: "Settings", icon: "⚙️" }
            ]
        }
    ];


    // =========================================================
    // HANDLE MENU CLICK
    // =========================================================

    const handleMenuClick = (name) => {

        setActiveMenu(name);

        setSidebarOpen(false);

        // Scroll page to top
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // =========================================================
    // PAGE TITLE
    // =========================================================

    const getPageTitle = () => {

        switch (activeMenu) {

            case "Dashboard":
                return "Dashboard";

            case "Students":
                return "Student Management";

            case "Courses":
                return "Course Management";

            case "Trainers":
                return "Trainer Management";

            case "Lectures":
                return "Lecture Management";

            case "Enrollments":
                return "Enrollment Management";

            case "Payments":
                return "Payment Management";

            case "Certificates":
                return "Certificate Management";

            case "Analytics":
                return "Analytics";

            case "Notifications":
                return "Notifications";

            case "Settings":
                return "Settings";

            default:
                return "Dashboard";
        }
    };


    // =========================================================
    // GENERIC PAGE HEADER
    // =========================================================

    const PageHeader = ({ title, description, buttonText }) => {

        return (
            <div className="page-header-custom">

                <div>

                    <h2>
                        {title}
                    </h2>

                    <p>
                        {description}
                    </p>

                </div>

                {buttonText && (
                    <button className="primary-button">
                        + {buttonText}
                    </button>
                )}

            </div>
        );
    };


    // =========================================================
    // STUDENTS PAGE
    // =========================================================

    const StudentsPage = () => {

        return (
            <div>

                <PageHeader
                    title="Student Management"
                    description="Manage all registered students"
                    buttonText="Add Student"
                />

                <div className="row g-4 mb-4">

                    <div className="col-md-4">

                        <div className="management-card">

                            <div className="management-icon">
                                👨‍🎓
                            </div>

                            <div>

                                <small>
                                    Total Students
                                </small>

                                <h3>
                                    12,480
                                </h3>

                            </div>

                        </div>

                    </div>


                    <div className="col-md-4">

                        <div className="management-card">

                            <div className="management-icon">
                                🟢
                            </div>

                            <div>

                                <small>
                                    Active Students
                                </small>

                                <h3>
                                    11,840
                                </h3>

                            </div>

                        </div>

                    </div>


                    <div className="col-md-4">

                        <div className="management-card">

                            <div className="management-icon">
                                ⏳
                            </div>

                            <div>

                                <small>
                                    Pending
                                </small>

                                <h3>
                                    640
                                </h3>

                            </div>

                        </div>

                    </div>

                </div>


                <div className="dashboard-card">

                    <div className="card-header-custom">

                        <h5 className="card-title">
                            Recent Students
                        </h5>

                        <span className="card-link">
                            View All
                        </span>

                    </div>


                    <div className="table-responsive">

                        <table className="table table-custom">

                            <thead>

                                <tr>
                                    <th>ID</th>
                                    <th>Student</th>
                                    <th>Email</th>
                                    <th>Course</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>

                            </thead>


                            <tbody>

                                {recentStudents.map((student) => (

                                    <tr key={student.id}>

                                        <td>
                                            #{student.id}
                                        </td>

                                        <td>

                                            <span className="student-avatar">
                                                {student.name.charAt(0)}
                                            </span>

                                            {student.name}

                                        </td>

                                        <td>
                                            {student.email}
                                        </td>

                                        <td>
                                            {student.course}
                                        </td>

                                        <td>

                                            <span
                                                className={`status ${
                                                    student.status === "Active"
                                                        ? "status-success"
                                                        : "status-pending"
                                                }`}
                                            >
                                                {student.status}
                                            </span>

                                        </td>

                                        <td>

                                            <button className="action-button">
                                                View
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        );
    };


    // =========================================================
    // COURSES PAGE
    // =========================================================

    const CoursesPage = () => {

        return (
            <div>

                <PageHeader
                    title="Course Management"
                    description="Create and manage LearnHub courses"
                    buttonText="Add Course"
                />


                <div className="row g-4">

                    {courses.map((course, index) => (

                        <div
                            className="col-lg-6"
                            key={index}
                        >

                            <div className="course-management-card">

                                <div className="course-management-icon">
                                    📚
                                </div>


                                <div className="flex-grow-1">

                                    <h5>
                                        {course.name}
                                    </h5>

                                    <p>
                                        {course.students.toLocaleString()} students
                                    </p>


                                    <div className="progress-custom">

                                        <div
                                            className="progress-fill"
                                            style={{
                                                width: `${course.progress}%`
                                            }}
                                        />

                                    </div>

                                    <div className="course-meta mt-2">

                                        <span>
                                            Completion
                                        </span>

                                        <span>
                                            {course.progress}%
                                        </span>

                                    </div>

                                </div>


                                <button className="action-button">
                                    Manage
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>
        );
    };


    // =========================================================
    // TRAINERS PAGE
    // =========================================================

    const TrainersPage = () => {

        const trainers = [
            {
                id: 1,
                name: "Awanish Tiwari",
                specialization: "Java Full Stack",
                students: 2400,
                status: "Active"
            },
            {
                id: 2,
                name: "Vivek Sharma",
                specialization: "MERN Stack",
                students: 1850,
                status: "Active"
            },
            {
                id: 3,
                name: "Rahul Singh",
                specialization: "Python & AI",
                students: 1250,
                status: "Active"
            },
            {
                id: 4,
                name: "Neha Verma",
                specialization: "Data Science",
                students: 980,
                status: "Inactive"
            }
        ];


        return (
            <div>

                <PageHeader
                    title="Trainer Management"
                    description="Manage LearnHub trainers and instructors"
                    buttonText="Add Trainer"
                />


                <div className="dashboard-card">

                    <div className="table-responsive">

                        <table className="table table-custom">

                            <thead>

                                <tr>
                                    <th>ID</th>
                                    <th>Trainer</th>
                                    <th>Specialization</th>
                                    <th>Students</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>

                            </thead>


                            <tbody>

                                {trainers.map((trainer) => (

                                    <tr key={trainer.id}>

                                        <td>
                                            #{trainer.id}
                                        </td>

                                        <td>

                                            <span className="student-avatar">
                                                {trainer.name.charAt(0)}
                                            </span>

                                            {trainer.name}

                                        </td>

                                        <td>
                                            {trainer.specialization}
                                        </td>

                                        <td>
                                            {trainer.students.toLocaleString()}
                                        </td>

                                        <td>

                                            <span
                                                className={`status ${
                                                    trainer.status === "Active"
                                                        ? "status-success"
                                                        : "status-pending"
                                                }`}
                                            >
                                                {trainer.status}
                                            </span>

                                        </td>

                                        <td>

                                            <button className="action-button">
                                                Manage
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        );
    };


    // =========================================================
    // NOTIFICATIONS PAGE
    // =========================================================

    const NotificationsPage = () => {

        return (
            <div>

                <PageHeader
                    title="Notifications"
                    description="Manage system notifications and announcements"
                    buttonText="Create Notification"
                />


                <div className="row g-4">

                    <div className="col-lg-4">

                        <div className="notification-card">

                            <div className="notification-large-icon">
                                🔔
                            </div>

                            <h5>
                                New Student Registration
                            </h5>

                            <p>
                                Get notified whenever a new student
                                registers on LearnHub.
                            </p>

                            <button className="toggle-button active">
                                Enabled
                            </button>

                        </div>

                    </div>


                    <div className="col-lg-4">

                        <div className="notification-card">

                            <div className="notification-large-icon">
                                💳
                            </div>

                            <h5>
                                Payment Notification
                            </h5>

                            <p>
                                Receive notifications for successful
                                and failed payments.
                            </p>

                            <button className="toggle-button active">
                                Enabled
                            </button>

                        </div>

                    </div>


                    <div className="col-lg-4">

                        <div className="notification-card">

                            <div className="notification-large-icon">
                                📚
                            </div>

                            <h5>
                                Course Updates
                            </h5>

                            <p>
                                Notify students when a course or lecture
                                is updated.
                            </p>

                            <button className="toggle-button">
                                Disabled
                            </button>

                        </div>

                    </div>

                </div>


                <div className="dashboard-card mt-4">

                    <div className="card-header-custom">

                        <h5 className="card-title">
                            Recent Notifications
                        </h5>

                    </div>


                    <div className="notification-list">

                        <div className="notification-list-item">

                            <span>
                                🎓
                            </span>

                            <div>

                                <strong>
                                    New student registered
                                </strong>

                                <small>
                                    Rahul Sharma joined LearnHub
                                </small>

                            </div>

                        </div>


                        <div className="notification-list-item">

                            <span>
                                💰
                            </span>

                            <div>

                                <strong>
                                    Payment received
                                </strong>

                                <small>
                                    ₹4,999 payment received
                                </small>

                            </div>

                        </div>


                        <div className="notification-list-item">

                            <span>
                                🎥
                            </span>

                            <div>

                                <strong>
                                    New lecture uploaded
                                </strong>

                                <small>
                                    Introduction to Java
                                </small>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        );
    };


    // =========================================================
    // SETTINGS PAGE
    // =========================================================

    const SettingsPage = () => {

        return (
            <div>

                <PageHeader
                    title="Settings"
                    description="Configure your LearnHub admin panel"
                />


                <div className="row g-4">

                    <div className="col-lg-6">

                        <div className="settings-card">

                            <h5>
                                General Settings
                            </h5>

                            <p>
                                Basic LMS configuration
                            </p>


                            <div className="setting-row">

                                <div>
                                    <strong>
                                        Platform Name
                                    </strong>

                                    <small>
                                        Name displayed throughout the platform
                                    </small>
                                </div>

                                <input
                                    type="text"
                                    className="setting-input"
                                    defaultValue="LearnHub"
                                />

                            </div>


                            <div className="setting-row">

                                <div>
                                    <strong>
                                        Admin Email
                                    </strong>

                                    <small>
                                        Main administrator email
                                    </small>
                                </div>

                                <input
                                    type="email"
                                    className="setting-input"
                                    defaultValue="admin@learnhub.com"
                                />

                            </div>


                            <div className="setting-row">

                                <div>
                                    <strong>
                                        Maintenance Mode
                                    </strong>

                                    <small>
                                        Temporarily disable the platform
                                    </small>
                                </div>

                                <button className="toggle-button">
                                    Disabled
                                </button>

                            </div>


                            <button className="primary-button mt-3">
                                Save Changes
                            </button>

                        </div>

                    </div>


                    <div className="col-lg-6">

                        <div className="settings-card">

                            <h5>
                                Security Settings
                            </h5>

                            <p>
                                Manage administrator security
                            </p>


                            <div className="setting-row">

                                <div>
                                    <strong>
                                        Two Factor Authentication
                                    </strong>

                                    <small>
                                        Add extra protection to admin account
                                    </small>
                                </div>

                                <button className="toggle-button">
                                    Disabled
                                </button>

                            </div>


                            <div className="setting-row">

                                <div>
                                    <strong>
                                        Login Alerts
                                    </strong>

                                    <small>
                                        Receive alerts for new logins
                                    </small>
                                </div>

                                <button className="toggle-button active">
                                    Enabled
                                </button>

                            </div>


                            <div className="setting-row">

                                <div>
                                    <strong>
                                        Session Timeout
                                    </strong>

                                    <small>
                                        Automatically logout inactive users
                                    </small>
                                </div>

                                <select className="setting-input">

                                    <option>
                                        30 Minutes
                                    </option>

                                    <option>
                                        1 Hour
                                    </option>

                                    <option>
                                        2 Hours
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        );
    };


    // =========================================================
    // DASHBOARD PAGE
    // =========================================================

    const DashboardPage = () => {

        return (
            <>

                {/* WELCOME */}

                <div className="welcome-banner">

                    <span className="welcome-tag">
                        ✦ AI POWERED ADMIN PANEL
                    </span>

                    <h1 className="welcome-title">
                        Welcome back, Admin 👋
                    </h1>

                    <p className="welcome-text">
                        Here's what's happening with your LearnHub platform today.
                    </p>

                </div>


                {/* STATISTICS */}

                <div className="row g-4 mb-4">

                    {stats.map((stat, index) => (

                        <div
                            className="col-xl-3 col-md-6"
                            key={index}
                        >

                            <div className="stat-card">

                                <div className="stat-top">

                                    <div className="stat-icon">
                                        {stat.icon}
                                    </div>

                                    <span className="stat-change">
                                        {stat.change}
                                    </span>

                                </div>


                                <div className="stat-value">
                                    {stat.value}
                                </div>

                                <div className="stat-title">
                                    {stat.title}
                                </div>

                            </div>

                        </div>

                    ))}

                </div>


                {/* CHART + AI */}

                <div className="row g-4 mb-4">

                    <div className="col-lg-8">

                        <div className="dashboard-card">

                            <div className="card-header-custom">

                                <h5 className="card-title">
                                    Revenue Overview
                                </h5>

                                <span className="card-link">
                                    This Year
                                </span>

                            </div>


                            <div className="chart-container">

                                <div className="chart-bars">

                                    {[45, 65, 52, 78, 62, 84, 72, 90, 76, 88, 94, 100]
                                        .map((height, index) => (

                                            <div
                                                className="bar-group"
                                                key={index}
                                            >

                                                <div
                                                    className="bar"
                                                    style={{
                                                        height: `${height}%`
                                                    }}
                                                />

                                                <div className="bar-label">
                                                    {[
                                                        "Jan",
                                                        "Feb",
                                                        "Mar",
                                                        "Apr",
                                                        "May",
                                                        "Jun",
                                                        "Jul",
                                                        "Aug",
                                                        "Sep",
                                                        "Oct",
                                                        "Nov",
                                                        "Dec"
                                                    ][index]}
                                                </div>

                                            </div>

                                        ))}

                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="col-lg-4">

                        <div className="ai-insight">

                            <div className="ai-label">
                                ✦ AI INSIGHT
                            </div>

                            <h4>
                                Platform performance is growing
                            </h4>

                            <p>
                                Student enrollment has increased significantly
                                this month. Java Full Stack is currently the
                                highest-performing course.
                            </p>


                            <div className="ai-recommendation">

                                💡 Recommendation:
                                <br />

                                Add more Java and Spring Boot advanced
                                lectures to improve course completion.

                            </div>

                        </div>

                    </div>

                </div>


                {/* COURSE PERFORMANCE */}

                <div className="row g-4 mb-4">

                    <div className="col-lg-6">

                        <div className="dashboard-card">

                            <div className="card-header-custom">

                                <h5 className="card-title">
                                    Course Performance
                                </h5>

                                <span className="card-link">
                                    View All
                                </span>

                            </div>


                            {courses.map((course, index) => (

                                <div
                                    className="course-item"
                                    key={index}
                                >

                                    <div className="course-name">
                                        {course.name}
                                    </div>


                                    <div className="course-meta">

                                        <span>
                                            {course.students.toLocaleString()} Students
                                        </span>

                                        <span>
                                            {course.progress}% completion
                                        </span>

                                    </div>


                                    <div className="progress-custom">

                                        <div
                                            className="progress-fill"
                                            style={{
                                                width: `${course.progress}%`
                                            }}
                                        />

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>


                    {/* QUICK MANAGEMENT */}

                    <div className="col-lg-6">

                        <div className="dashboard-card">

                            <div className="card-header-custom">

                                <h5 className="card-title">
                                    Quick Management
                                </h5>

                            </div>


                            <div className="quick-management">

                                <button
                                    onClick={() =>
                                        handleMenuClick("Students")
                                    }
                                    className="quick-button"
                                >
                                    👨‍🎓
                                    <span>
                                        Manage Students
                                    </span>
                                </button>


                                <button
                                    onClick={() =>
                                        handleMenuClick("Courses")
                                    }
                                    className="quick-button"
                                >
                                    📚
                                    <span>
                                        Manage Courses
                                    </span>
                                </button>


                                <button
                                    onClick={() =>
                                        handleMenuClick("Lectures")
                                    }
                                    className="quick-button"
                                >
                                    🎥
                                    <span>
                                        Manage Lectures
                                    </span>
                                </button>


                                <button
                                    onClick={() =>
                                        handleMenuClick("Payments")
                                    }
                                    className="quick-button"
                                >
                                    💳
                                    <span>
                                        Manage Payments
                                    </span>
                                </button>

                            </div>

                        </div>

                    </div>

                </div>


                {/* RECENT STUDENTS */}

                <div className="dashboard-card mb-4">

                    <div className="card-header-custom">

                        <h5 className="card-title">
                            Recent Students
                        </h5>

                        <span
                            className="card-link"
                            onClick={() =>
                                handleMenuClick("Students")
                            }
                        >
                            View All
                        </span>

                    </div>


                    <div className="table-responsive">

                        <table className="table table-custom">

                            <thead>

                                <tr>

                                    <th>
                                        Student
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Course
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {recentStudents.map((student) => (

                                    <tr key={student.id}>

                                        <td>

                                            <span className="student-avatar">
                                                {student.name.charAt(0)}
                                            </span>

                                            {student.name}

                                        </td>

                                        <td>
                                            {student.email}
                                        </td>

                                        <td>
                                            {student.course}
                                        </td>

                                        <td>

                                            <span
                                                className={`status ${
                                                    student.status === "Active"
                                                        ? "status-success"
                                                        : "status-pending"
                                                }`}
                                            >
                                                {student.status}
                                            </span>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>


                {/* PAYMENTS */}

                <div className="dashboard-card">

                    <div className="card-header-custom">

                        <h5 className="card-title">
                            Recent Payments
                        </h5>

                        <span
                            className="card-link"
                            onClick={() =>
                                handleMenuClick("Payments")
                            }
                        >
                            View All
                        </span>

                    </div>


                    <div className="table-responsive">

                        <table className="table table-custom">

                            <thead>

                                <tr>

                                    <th>
                                        Payment ID
                                    </th>

                                    <th>
                                        Student
                                    </th>

                                    <th>
                                        Course
                                    </th>

                                    <th>
                                        Amount
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {payments.map((payment) => (

                                    <tr key={payment.id}>

                                        <td>
                                            {payment.id}
                                        </td>

                                        <td>
                                            {payment.student}
                                        </td>

                                        <td>
                                            {payment.course}
                                        </td>

                                        <td>
                                            {payment.amount}
                                        </td>

                                        <td>

                                            <span
                                                className={`status ${
                                                    payment.status === "Success"
                                                        ? "status-success"
                                                        : "status-pending"
                                                }`}
                                            >
                                                {payment.status}
                                            </span>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </>
        );
    };


    // =========================================================
    // RENDER PAGE
    // =========================================================

    const renderPage = () => {

        switch (activeMenu) {

            // MAIN

            case "Dashboard":
                return <DashboardPage />;

            case "Students":
                return <StudentManagement />;

            case "Courses":
                return <CourseManagement />;

            case "Trainers":
                return <TrainersPage />;


            // MANAGEMENT

            case "Lectures":
                return <LectureManagement />;

            case "Enrollments":
                return <EnrollmentManagement />;

            case "Payments":
                return <PaymentManagement />;

            case "Certificates":
                return <CertificateManagement />;

            case "Analytics":
                return <AnalyticsManagement />;


            // SYSTEM

            case "Notifications":
                return <NotificationsPage />;

            case "Settings":
                return <SettingsPage />;


            default:
                return <DashboardPage />;
        }
    };


    // =========================================================
    // UI
    // =========================================================

    return (

        <div className="admin-wrapper">


            {/* ==================================================
                CUSTOM CSS
            ================================================== */}

            <style>
                {`

                * {
                    box-sizing: border-box;
                }

                body {
                    margin: 0;
                    background: #07070b;
                    font-family: Inter, Arial, sans-serif;
                }

                .admin-wrapper {
                    min-height: 100vh;

                    background:
                        radial-gradient(
                            circle at 80% 10%,
                            rgba(168,85,247,0.12),
                            transparent 30%
                        ),
                        radial-gradient(
                            circle at 20% 90%,
                            rgba(124,58,237,0.08),
                            transparent 30%
                        ),
                        #07070b;

                    color: white;
                }


                /* SIDEBAR */

                .admin-sidebar {
                    position: fixed;
                    left: 0;
                    top: 0;

                    width: 260px;
                    height: 100vh;

                    background:
                        linear-gradient(
                            180deg,
                            #111118,
                            #0a0a0f
                        );

                    border-right:
                        1px solid
                        rgba(168,85,247,0.20);

                    padding: 22px 15px;

                    z-index: 1000;

                    overflow-y: auto;
                }


                .brand {
                    display: flex;
                    align-items: center;
                    gap: 12px;

                    padding: 10px 12px 25px;

                    border-bottom:
                        1px solid
                        rgba(255,255,255,0.07);
                }


                .brand-logo {
                    width: 42px;
                    height: 42px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 12px;

                    background:
                        linear-gradient(
                            135deg,
                            #7c3aed,
                            #a855f7
                        );

                    font-size: 22px;

                    box-shadow:
                        0 0 25px
                        rgba(168,85,247,0.35);
                }


                .brand-name {
                    font-size: 21px;
                    font-weight: 800;
                }


                .brand-subtitle {
                    font-size: 11px;
                    color: #a1a1aa;
                    margin-top: 2px;
                }


                .menu-section {
                    margin-top: 25px;
                }


                .menu-heading {
                    color: #71717a;

                    font-size: 10px;
                    font-weight: 700;

                    letter-spacing: 1.5px;

                    padding:
                        0 12px
                        8px;
                }


                .menu-item {
                    width: 100%;

                    border: none;
                    background: transparent;

                    color: #a1a1aa;

                    display: flex;
                    align-items: center;

                    gap: 13px;

                    padding: 12px;

                    border-radius: 10px;

                    margin-bottom: 5px;

                    cursor: pointer;

                    text-align: left;

                    transition: 0.25s;
                }


                .menu-item:hover {
                    color: white;

                    background:
                        rgba(168,85,247,0.10);
                }


                .menu-item.active {
                    color: white;

                    background:
                        linear-gradient(
                            90deg,
                            rgba(124,58,237,0.35),
                            rgba(168,85,247,0.12)
                        );

                    border:
                        1px solid
                        rgba(168,85,247,0.22);

                    box-shadow:
                        0 5px 20px
                        rgba(124,58,237,0.12);
                }


                .menu-icon {
                    width: 22px;
                    text-align: center;
                }


                /* MAIN */

                .admin-main {
                    margin-left: 260px;
                    min-height: 100vh;
                }


                /* TOPBAR */

                .admin-topbar {
                    height: 75px;

                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    padding:
                        0 30px;

                    background:
                        rgba(8,8,12,0.85);

                    border-bottom:
                        1px solid
                        rgba(255,255,255,0.06);

                    backdrop-filter: blur(15px);

                    position: sticky;
                    top: 0;

                    z-index: 500;
                }


                .mobile-menu {
                    display: none;

                    background: transparent;
                    border: none;

                    color: white;

                    font-size: 24px;
                }


                .search-box {
                    display: flex;
                    align-items: center;

                    width: 330px;

                    background: #111118;

                    border:
                        1px solid
                        rgba(168,85,247,0.18);

                    border-radius: 10px;

                    padding:
                        9px 14px;
                }


                .search-box input {
                    width: 100%;

                    background: transparent;

                    border: none;
                    outline: none;

                    color: white;

                    margin-left: 8px;
                }


                .search-box input::placeholder {
                    color: #71717a;
                }


                .top-actions {
                    display: flex;
                    align-items: center;

                    gap: 20px;
                }


                .notification {
                    width: 40px;
                    height: 40px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    background: #111118;

                    border:
                        1px solid
                        rgba(168,85,247,0.18);

                    border-radius: 10px;

                    cursor: pointer;
                }


                .admin-profile {
                    display: flex;
                    align-items: center;

                    gap: 10px;
                }


                .admin-avatar {
                    width: 40px;
                    height: 40px;

                    border-radius: 50%;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    background:
                        linear-gradient(
                            135deg,
                            #7c3aed,
                            #a855f7
                        );

                    font-weight: 800;
                }


                .admin-name {
                    font-size: 14px;
                    font-weight: 700;
                }


                .admin-role {
                    font-size: 11px;
                    color: #71717a;
                }


                /* CONTENT */

                .admin-content {
                    padding: 30px;
                }


                /* PAGE HEADER */

                .page-header-custom {
                    display: flex;

                    align-items: center;

                    justify-content: space-between;

                    margin-bottom: 25px;

                    padding: 5px 0;
                }


                .page-header-custom h2 {
                    font-size: 27px;

                    font-weight: 800;

                    margin: 0 0 5px;
                }


                .page-header-custom p {
                    color: #a1a1aa;

                    margin: 0;

                    font-size: 13px;
                }


                .primary-button {
                    border: none;

                    padding:
                        11px 18px;

                    border-radius: 10px;

                    color: white;

                    font-weight: 700;

                    background:
                        linear-gradient(
                            135deg,
                            #7c3aed,
                            #a855f7
                        );

                    cursor: pointer;

                    box-shadow:
                        0 8px 25px
                        rgba(124,58,237,0.20);

                    transition: .25s;
                }


                .primary-button:hover {
                    transform:
                        translateY(-2px);

                    box-shadow:
                        0 12px 30px
                        rgba(124,58,237,0.30);
                }


                /* WELCOME */

                .welcome-banner {
                    padding: 30px;

                    border-radius: 20px;

                    background:
                        linear-gradient(
                            135deg,
                            #16121f,
                            #0f0f15
                        );

                    border:
                        1px solid
                        rgba(168,85,247,0.25);

                    position: relative;

                    overflow: hidden;

                    margin-bottom: 25px;
                }


                .welcome-banner::after {
                    content: "";

                    position: absolute;

                    width: 250px;
                    height: 250px;

                    right: -80px;
                    top: -100px;

                    background:
                        rgba(168,85,247,0.15);

                    filter: blur(50px);

                    border-radius: 50%;
                }


                .welcome-tag {
                    display: inline-block;

                    color: #c084fc;

                    background:
                        rgba(168,85,247,0.10);

                    border:
                        1px solid
                        rgba(168,85,247,0.20);

                    padding:
                        6px 12px;

                    border-radius: 20px;

                    font-size: 11px;

                    font-weight: 700;
                }


                .welcome-title {
                    font-size: 30px;

                    font-weight: 800;

                    margin-top: 12px;

                    margin-bottom: 5px;
                }


                .welcome-text {
                    color: #a1a1aa;
                    margin: 0;
                }


                /* STAT CARDS */

                .stat-card {
                    background:
                        rgba(17,17,24,0.90);

                    border:
                        1px solid
                        rgba(168,85,247,0.18);

                    border-radius: 18px;

                    padding: 20px;

                    transition: 0.3s;

                    height: 100%;
                }


                .stat-card:hover {
                    transform:
                        translateY(-4px);

                    border-color:
                        rgba(192,132,252,0.45);

                    box-shadow:
                        0 15px 40px
                        rgba(124,58,237,0.12);
                }


                .stat-top {
                    display: flex;

                    justify-content:
                        space-between;

                    align-items: center;
                }


                .stat-icon {
                    width: 44px;
                    height: 44px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 12px;

                    background:
                        rgba(168,85,247,0.10);

                    font-size: 21px;
                }


                .stat-change {
                    color: #86efac;

                    font-size: 11px;

                    background:
                        rgba(34,197,94,0.08);

                    padding:
                        5px 8px;

                    border-radius: 15px;
                }


                .stat-value {
                    font-size: 28px;

                    font-weight: 800;

                    margin-top: 18px;
                }


                .stat-title {
                    color: #a1a1aa;

                    font-size: 13px;

                    margin-top: 4px;
                }


                /* CARDS */

                .dashboard-card {
                    background:
                        rgba(15,15,20,0.95);

                    border:
                        1px solid
                        rgba(168,85,247,0.18);

                    border-radius: 18px;

                    overflow: hidden;

                    height: 100%;
                }


                .management-card {
                    background:
                        rgba(15,15,20,0.95);

                    border:
                        1px solid
                        rgba(168,85,247,0.18);

                    border-radius: 18px;

                    padding: 20px;

                    display: flex;

                    align-items: center;

                    gap: 15px;

                    height: 100%;
                }


                .management-icon {
                    width: 50px;
                    height: 50px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 14px;

                    background:
                        rgba(168,85,247,0.10);

                    font-size: 23px;
                }


                .management-card small {
                    color: #71717a;
                }


                .management-card h3 {
                    margin: 4px 0 0;

                    font-weight: 800;
                }


                .card-header-custom {
                    padding:
                        18px 20px;

                    border-bottom:
                        1px solid
                        rgba(255,255,255,0.06);

                    display: flex;

                    align-items: center;

                    justify-content: space-between;
                }


                .card-title {
                    margin: 0;

                    font-size: 16px;

                    font-weight: 700;
                }


                .card-link {
                    color: #c084fc;

                    font-size: 12px;

                    cursor: pointer;
                }


                /* CHART */

                .chart-container {
                    padding:
                        25px 20px;
                }


                .chart-bars {
                    height: 220px;

                    display: flex;

                    align-items: end;

                    justify-content:
                        space-around;

                    gap: 10px;
                }


                .bar-group {
                    flex: 1;

                    display: flex;

                    flex-direction: column;

                    align-items: center;

                    justify-content: end;

                    height: 100%;
                }


                .bar {
                    width: 70%;

                    max-width: 45px;

                    border-radius:
                        7px 7px 2px 2px;

                    background:
                        linear-gradient(
                            180deg,
                            #c084fc,
                            #7c3aed
                        );

                    box-shadow:
                        0 0 18px
                        rgba(168,85,247,0.18);
                }


                .bar-label {
                    margin-top: 10px;

                    color: #71717a;

                    font-size: 10px;
                }


                /* AI */

                .ai-insight {
                    padding: 20px;

                    background:
                        linear-gradient(
                            135deg,
                            rgba(124,58,237,0.16),
                            rgba(168,85,247,0.04)
                        );

                    border:
                        1px solid
                        rgba(168,85,247,0.20);

                    border-radius: 18px;
                }


                .ai-label {
                    color: #c084fc;

                    font-size: 11px;

                    font-weight: 800;

                    letter-spacing: 1px;
                }


                .ai-insight h4 {
                    font-size: 18px;

                    margin:
                        10px 0 7px;
                }


                .ai-insight p {
                    color: #a1a1aa;

                    font-size: 13px;

                    line-height: 1.6;
                }


                .ai-recommendation {
                    padding: 12px;

                    background:
                        rgba(0,0,0,0.20);

                    border-radius: 10px;

                    font-size: 12px;

                    color: #d4d4d8;
                }


                /* COURSE */

                .course-item {
                    padding:
                        16px 20px;

                    border-bottom:
                        1px solid
                        rgba(255,255,255,0.05);
                }


                .course-item:last-child {
                    border-bottom: none;
                }


                .course-name {
                    font-size: 13px;

                    font-weight: 600;

                    margin-bottom: 7px;
                }


                .course-meta {
                    display: flex;

                    justify-content:
                        space-between;

                    color: #71717a;

                    font-size: 11px;
                }


                .progress-custom {
                    height: 6px;

                    background: #27272a;

                    border-radius: 10px;

                    overflow: hidden;

                    margin-top: 9px;
                }


                .progress-fill {
                    height: 100%;

                    background:
                        linear-gradient(
                            90deg,
                            #7c3aed,
                            #c084fc
                        );

                    border-radius: 10px;
                }


                /* COURSE MANAGEMENT */

                .course-management-card {
                    background:
                        rgba(15,15,20,0.95);

                    border:
                        1px solid
                        rgba(168,85,247,0.18);

                    border-radius: 18px;

                    padding: 20px;

                    display: flex;

                    align-items: center;

                    gap: 15px;

                    height: 100%;
                }


                .course-management-icon {
                    width: 55px;
                    height: 55px;

                    flex-shrink: 0;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 14px;

                    background:
                        rgba(168,85,247,0.10);

                    font-size: 24px;
                }


                .course-management-card h5 {
                    margin: 0 0 5px;

                    font-size: 14px;
                }


                .course-management-card p {
                    color: #71717a;

                    font-size: 11px;

                    margin: 0;
                }


                /* TABLE */

                .table-custom {
                    margin: 0;

                    color: white;

                    --bs-table-bg: transparent;
                }


                .table-custom th {
                    color: #a1a1aa;

                    font-size: 11px;

                    text-transform:
                        uppercase;

                    letter-spacing: .5px;

                    border-color:
                        rgba(255,255,255,0.06);

                    padding:
                        14px 20px;
                }


                .table-custom td {
                    color: #d4d4d8;

                    font-size: 12px;

                    border-color:
                        rgba(255,255,255,0.06);

                    padding:
                        15px 20px;

                    vertical-align:
                        middle;
                }


                .student-avatar {
                    width: 32px;
                    height: 32px;

                    border-radius: 50%;

                    background:
                        rgba(168,85,247,0.15);

                    display: inline-flex;

                    align-items: center;
                    justify-content: center;

                    margin-right: 8px;
                }


                .status {
                    padding:
                        5px 9px;

                    border-radius: 15px;

                    font-size: 10px;

                    font-weight: 700;
                }


                .status-success {
                    color: #86efac;

                    background:
                        rgba(34,197,94,0.10);
                }


                .status-pending {
                    color: #fde68a;

                    background:
                        rgba(234,179,8,0.10);
                }


                .action-button {
                    border:
                        1px solid
                        rgba(168,85,247,0.25);

                    background:
                        rgba(168,85,247,0.08);

                    color: #c084fc;

                    border-radius: 7px;

                    padding:
                        5px 10px;

                    font-size: 11px;

                    cursor: pointer;
                }


                .action-button:hover {
                    background:
                        rgba(168,85,247,0.18);

                    color: white;
                }


                /* QUICK MANAGEMENT */

                .quick-management {
                    padding: 20px;

                    display: grid;

                    grid-template-columns:
                        1fr 1fr;

                    gap: 12px;
                }


                .quick-button {
                    border:
                        1px solid
                        rgba(168,85,247,0.15);

                    background:
                        rgba(168,85,247,0.05);

                    color: #d4d4d8;

                    border-radius: 12px;

                    padding: 18px 12px;

                    display: flex;

                    align-items: center;

                    gap: 10px;

                    cursor: pointer;

                    transition: .25s;
                }


                .quick-button:hover {
                    background:
                        rgba(168,85,247,0.14);

                    border-color:
                        rgba(168,85,247,0.30);

                    color: white;
                }


                /* NOTIFICATIONS */

                .notification-card {
                    background:
                        rgba(15,15,20,0.95);

                    border:
                        1px solid
                        rgba(168,85,247,0.18);

                    border-radius: 18px;

                    padding: 25px;

                    height: 100%;
                }


                .notification-large-icon {
                    width: 55px;
                    height: 55px;

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    background:
                        rgba(168,85,247,0.10);

                    border-radius: 14px;

                    font-size: 25px;

                    margin-bottom: 18px;
                }


                .notification-card h5 {
                    font-size: 15px;
                }


                .notification-card p {
                    color: #a1a1aa;

                    font-size: 12px;

                    line-height: 1.6;
                }


                .toggle-button {
                    border:
                        1px solid
                        rgba(255,255,255,0.10);

                    background:
                        rgba(255,255,255,0.04);

                    color: #a1a1aa;

                    border-radius: 20px;

                    padding:
                        6px 12px;

                    font-size: 10px;

                    cursor: pointer;
                }


                .toggle-button.active {
                    color: #86efac;

                    background:
                        rgba(34,197,94,0.10);

                    border-color:
                        rgba(34,197,94,0.20);
                }


                .notification-list {
                    padding: 5px 20px;
                }


                .notification-list-item {
                    display: flex;

                    align-items: center;

                    gap: 15px;

                    padding:
                        15px 0;

                    border-bottom:
                        1px solid
                        rgba(255,255,255,0.05);
                }


                .notification-list-item > span {
                    width: 40px;
                    height: 40px;

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    background:
                        rgba(168,85,247,0.10);

                    border-radius: 10px;
                }


                .notification-list-item strong {
                    display: block;

                    font-size: 12px;
                }


                .notification-list-item small {
                    display: block;

                    color: #71717a;

                    font-size: 10px;

                    margin-top: 3px;
                }


                /* SETTINGS */

                .settings-card {
                    background:
                        rgba(15,15,20,0.95);

                    border:
                        1px solid
                        rgba(168,85,247,0.18);

                    border-radius: 18px;

                    padding: 25px;
                }


                .settings-card h5 {
                    margin-bottom: 5px;
                }


                .settings-card > p {
                    color: #71717a;

                    font-size: 12px;

                    margin-bottom: 25px;
                }


                .setting-row {
                    display: flex;

                    align-items: center;

                    justify-content: space-between;

                    gap: 20px;

                    padding:
                        17px 0;

                    border-bottom:
                        1px solid
                        rgba(255,255,255,0.06);
                }


                .setting-row strong {
                    display: block;

                    font-size: 12px;
                }


                .setting-row small {
                    display: block;

                    color: #71717a;

                    font-size: 10px;

                    margin-top: 4px;
                }


                .setting-input {
                    width: 170px;

                    padding:
                        8px 10px;

                    background: #111118;

                    color: white;

                    border:
                        1px solid
                        rgba(168,85,247,0.18);

                    border-radius: 8px;

                    outline: none;
                }


                /* RESPONSIVE */

                @media(max-width: 992px) {

                    .admin-sidebar {
                        transform:
                            translateX(-100%);

                        transition: 0.3s;
                    }


                    .admin-sidebar.open {
                        transform:
                            translateX(0);
                    }


                    .admin-main {
                        margin-left: 0;
                    }


                    .mobile-menu {
                        display: block;
                    }


                    .search-box {
                        width: 220px;
                    }

                }


                @media(max-width: 768px) {

                    .admin-topbar {
                        padding:
                            0 15px;
                    }


                    .admin-content {
                        padding: 18px;
                    }


                    .search-box {
                        display: none;
                    }


                    .admin-name {
                        display: none;
                    }


                    .welcome-title {
                        font-size: 24px;
                    }


                    .table-custom {
                        min-width: 700px;
                    }


                    .page-header-custom {
                        align-items: flex-start;

                        flex-direction: column;

                        gap: 15px;
                    }


                    .quick-management {
                        grid-template-columns:
                            1fr;
                    }


                    .setting-row {
                        align-items: flex-start;

                        flex-direction: column;
                    }


                    .setting-input {
                        width: 100%;
                    }

                }


                @media(max-width: 480px) {

                    .top-actions {
                        gap: 8px;
                    }


                    .welcome-banner {
                        padding: 20px;
                    }


                    .stat-value {
                        font-size: 23px;
                    }

                }

                `}
            </style>


            {/* ==================================================
                SIDEBAR
            ================================================== */}

            <aside
                className={`admin-sidebar ${
                    sidebarOpen ? "open" : ""
                }`}
            >

                <div className="brand">

                    <div className="brand-logo">
                        ✦
                    </div>

                    <div>

                        <div className="brand-name">
                            LearnHub
                        </div>

                        <div className="brand-subtitle">
                            AI ADMIN PANEL
                        </div>

                    </div>

                </div>


                {menuItems.map((section, index) => (

                    <div
                        className="menu-section"
                        key={index}
                    >

                        <div className="menu-heading">
                            {section.section}
                        </div>


                        {section.items.map((item) => (

                            <button
                                key={item.name}
                                className={`menu-item ${
                                    activeMenu === item.name
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() =>
                                    handleMenuClick(item.name)
                                }
                            >

                                <span className="menu-icon">
                                    {item.icon}
                                </span>

                                <span>
                                    {item.name}
                                </span>

                            </button>

                        ))}

                    </div>

                ))}

            </aside>


            {/* ==================================================
                MAIN
            ================================================== */}

            <main className="admin-main">


                {/* TOPBAR */}

                <header className="admin-topbar">

                    <div className="d-flex align-items-center gap-3">

                        <button
                            className="mobile-menu"
                            onClick={() =>
                                setSidebarOpen(!sidebarOpen)
                            }
                        >
                            ☰
                        </button>


                        <div className="search-box">

                            🔍

                            <input
                                type="text"
                                placeholder="Search students, courses..."
                            />

                        </div>

                    </div>


                    <div className="top-actions">

                        <div className="notification">
                            🔔
                        </div>


                        <div className="admin-profile">

                            <div className="admin-avatar">
                                A
                            </div>


                            <div>

                                <div className="admin-name">
                                    Admin
                                </div>

                                <div className="admin-role">
                                    Super Administrator
                                </div>

                            </div>

                        </div>

                    </div>

                </header>


                {/* ==================================================
                    PAGE CONTENT
                ================================================== */}

                <div className="admin-content">

                    {/* Current Page Name */}

                    {activeMenu !== "Dashboard" && (
                        <div
                            style={{
                                color: "#71717a",
                                fontSize: "11px",
                                marginBottom: "15px"
                            }}
                        >
                            LearnHub / {getPageTitle()}
                        </div>
                    )}


                    {renderPage()}


                    {/* FOOTER */}

                    <div
                        className="text-center py-3"
                        style={{
                            color: "#52525b",
                            fontSize: "11px"
                        }}
                    >
                        LearnHub AI Admin Dashboard © 2026
                    </div>

                </div>

            </main>

        </div>
    );
}

export default AdminDashboard;
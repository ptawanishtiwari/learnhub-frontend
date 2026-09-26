
import React, { useEffect, useState } from "react";

function Customers() {

    const API_URL = "http://localhost:8080/customer";

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const [updateData, setUpdateData] = useState({
        name: "",
        email: "",
        phone: ""
    });

    // ============================
    // GET ALL CUSTOMERS
    // ============================
    const fetchCustomers = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await fetch(`${API_URL}/all-user`);

            if (!response.ok) {
                throw new Error("Failed to fetch customer data");
            }

            const data = await response.json();

            setCustomers(data);

        } catch (error) {

            console.error(error);
            setError("Unable to fetch customer data");

        } finally {

            setLoading(false);
        }
    };

    // Load customers when page opens
    useEffect(() => {
        fetchCustomers();
    }, []);


    // ============================
    // VIEW CUSTOMER
    // ============================
    const handleView = async (id) => {

        try {

            const response = await fetch(`${API_URL}/${id}`);

            if (!response.ok) {
                throw new Error("Customer not found");
            }

            const data = await response.json();

            setSelectedCustomer(data);
            setShowViewModal(true);

        } catch (error) {

            console.error(error);
            alert("Unable to fetch customer details");

        }
    };


    // ============================
    // OPEN UPDATE MODAL
    // ============================
    const handleUpdateOpen = (customer) => {

        setSelectedCustomer(customer);

        setUpdateData({
            name: customer.name || "",
            email: customer.email || "",
            phone: customer.phone || ""
        });

        setShowUpdateModal(true);
    };


    // ============================
    // UPDATE CUSTOMER
    // ============================
    const handleUpdate = async (e) => {

        e.preventDefault();

        if (!selectedCustomer) return;

        try {

            const response = await fetch(
                `${API_URL}/${selectedCustomer.id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(updateData)
                }
            );

            if (!response.ok) {
                throw new Error("Update failed");
            }

            const updatedCustomer = await response.json();

            // Update frontend list without refreshing page
            setCustomers((prevCustomers) =>
                prevCustomers.map((customer) =>
                    customer.id === updatedCustomer.id
                        ? updatedCustomer
                        : customer
                )
            );

            setShowUpdateModal(false);

            alert("Customer updated successfully!");

        } catch (error) {

            console.error(error);
            alert("Unable to update customer");

        }
    };


    // ============================
    // DELETE CUSTOMER
    // ============================
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this customer?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
                throw new Error("Delete failed");
            }

            // Remove deleted customer from UI
            setCustomers((prevCustomers) =>
                prevCustomers.filter(
                    (customer) => customer.id !== id
                )
            );

            alert("Customer deleted successfully!");

        } catch (error) {

            console.error(error);
            alert("Unable to delete customer");

        }
    };


    return (

        <div className="customers-page">

            {/* ============================
                CUSTOM CSS
            ============================ */}

            <style>
                {`

                .customers-page {
                    min-height: 100vh;
                    background:
                        radial-gradient(
                            circle at top right,
                            rgba(124, 58, 237, 0.20),
                            transparent 35%
                        ),
                        radial-gradient(
                            circle at bottom left,
                            rgba(168, 85, 247, 0.12),
                            transparent 30%
                        ),
                        #08080c;

                    color: #ffffff;
                    padding: 40px 0;
                }

                .dashboard-container {
                    max-width: 1400px;
                    margin: auto;
                }

                .ai-header {
                    background: linear-gradient(
                        135deg,
                        #111118,
                        #171020,
                        #0d0d12
                    );

                    border: 1px solid rgba(168, 85, 247, 0.30);
                    border-radius: 22px;
                    padding: 30px;
                    margin-bottom: 25px;

                    box-shadow:
                        0 0 35px rgba(124, 58, 237, 0.12),
                        inset 0 0 20px rgba(255,255,255,0.02);
                }

                .ai-title {
                    font-size: 32px;
                    font-weight: 800;
                    background: linear-gradient(
                        90deg,
                        #ffffff,
                        #c084fc,
                        #a855f7
                    );

                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .ai-subtitle {
                    color: #a1a1aa;
                    margin-top: 5px;
                }

                .ai-badge {
                    display: inline-block;
                    background: rgba(168, 85, 247, 0.12);
                    border: 1px solid rgba(168, 85, 247, 0.35);
                    color: #c084fc;
                    padding: 7px 14px;
                    border-radius: 30px;
                    font-size: 13px;
                    font-weight: 600;
                }

                .stats-card {
                    background: rgba(17, 17, 24, 0.90);
                    border: 1px solid rgba(168, 85, 247, 0.22);
                    border-radius: 18px;
                    padding: 20px;
                    height: 100%;

                    transition: 0.3s;
                }

                .stats-card:hover {
                    transform: translateY(-3px);
                    border-color: rgba(192, 132, 252, 0.55);

                    box-shadow:
                        0 10px 35px rgba(124, 58, 237, 0.15);
                }

                .stats-number {
                    font-size: 28px;
                    font-weight: 800;
                    color: #c084fc;
                }

                .stats-label {
                    color: #a1a1aa;
                    font-size: 14px;
                }

                .table-card {
                    background: rgba(15, 15, 20, 0.95);
                    border: 1px solid rgba(168, 85, 247, 0.25);
                    border-radius: 22px;
                    overflow: hidden;

                    box-shadow:
                        0 15px 50px rgba(0,0,0,0.35);
                }

                .table-header {
                    padding: 20px 25px;
                    border-bottom: 1px solid rgba(255,255,255,0.07);
                    background: rgba(255,255,255,0.02);
                }

                .table-title {
                    font-size: 20px;
                    font-weight: 700;
                    margin: 0;
                }

                .ai-table {
                    margin: 0;
                    color: #ffffff;
                    --bs-table-bg: transparent;
                }

                .ai-table thead {
                    background: #15111c;
                }

                .ai-table thead th {
                    color: #c084fc;
                    border-bottom: 1px solid rgba(168,85,247,0.25);
                    padding: 17px;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .ai-table tbody td {
                    padding: 16px;
                    color: #d4d4d8;
                    border-color: rgba(255,255,255,0.06);
                    vertical-align: middle;
                }

                .ai-table tbody tr {
                    transition: 0.25s;
                }

                .ai-table tbody tr:hover {
                    background: rgba(168,85,247,0.07);
                }

                .customer-id {
                    color: #c084fc;
                    font-weight: 700;
                }

                .customer-name {
                    color: #ffffff;
                    font-weight: 600;
                }

                .customer-email {
                    color: #a1a1aa;
                }

                .action-btn {
                    border: none;
                    border-radius: 9px;
                    padding: 7px 12px;
                    margin: 2px;

                    font-size: 13px;
                    font-weight: 600;

                    transition: 0.25s;
                }

                .btn-view {
                    background: rgba(168,85,247,0.15);
                    color: #c084fc;
                    border: 1px solid rgba(168,85,247,0.25);
                }

                .btn-view:hover {
                    background: #a855f7;
                    color: #ffffff;
                }

                .btn-update {
                    background: rgba(59,130,246,0.12);
                    color: #93c5fd;
                    border: 1px solid rgba(59,130,246,0.25);
                }

                .btn-update:hover {
                    background: #2563eb;
                    color: #ffffff;
                }

                .btn-delete {
                    background: rgba(239,68,68,0.12);
                    color: #fca5a5;
                    border: 1px solid rgba(239,68,68,0.20);
                }

                .btn-delete:hover {
                    background: #dc2626;
                    color: #ffffff;
                }

                .modal-content {
                    background: #111118;
                    color: #ffffff;
                    border: 1px solid rgba(168,85,247,0.35);
                    border-radius: 20px;
                    box-shadow: 0 0 60px rgba(124,58,237,0.25);
                }

                .modal-header {
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                }

                .modal-footer {
                    border-top: 1px solid rgba(255,255,255,0.08);
                }

                .modal-title {
                    color: #c084fc;
                    font-weight: 700;
                }

                .form-label {
                    color: #d4d4d8;
                    font-weight: 600;
                }

                .ai-input {
                    background: #09090d !important;
                    border: 1px solid rgba(168,85,247,0.25) !important;
                    color: #ffffff !important;
                    border-radius: 10px;
                    padding: 11px 14px;
                }

                .ai-input:focus {
                    border-color: #a855f7 !important;
                    box-shadow: 0 0 0 3px rgba(168,85,247,0.12) !important;
                }

                .info-box {
                    background: rgba(168,85,247,0.06);
                    border: 1px solid rgba(168,85,247,0.18);
                    border-radius: 14px;
                    padding: 18px;
                }

                .info-label {
                    color: #a1a1aa;
                    font-size: 13px;
                    margin-bottom: 4px;
                }

                .info-value {
                    color: #ffffff;
                    font-size: 16px;
                    font-weight: 600;
                }

                .empty-state {
                    padding: 50px;
                    text-align: center;
                    color: #a1a1aa;
                }

                .ai-spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid rgba(168,85,247,0.2);
                    border-top-color: #a855f7;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                    margin: auto;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                @media(max-width: 768px) {

                    .customers-page {
                        padding: 20px 10px;
                    }

                    .ai-title {
                        font-size: 25px;
                    }

                    .action-btn {
                        display: block;
                        width: 100%;
                    }

                }

                `}
            </style>


            <div className="container-fluid dashboard-container">

                {/* ============================
                    HEADER
                ============================ */}

                <div className="ai-header">

                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                        <div>

                            <span className="ai-badge">
                                ✨ AI ADMIN PANEL
                            </span>

                            <h1 className="ai-title mt-3 mb-1">
                                Customer Intelligence
                            </h1>

                            <p className="ai-subtitle mb-0">
                                Manage and monitor your LearnHub customers
                            </p>

                        </div>

                        <div className="text-end">

                            <div className="stats-number">
                                {customers.length}
                            </div>

                            <div className="stats-label">
                                Total Customers
                            </div>

                        </div>

                    </div>

                </div>


                {/* ============================
                    STATISTICS
                ============================ */}

                <div className="row g-3 mb-4">

                    <div className="col-md-4">

                        <div className="stats-card">

                            <div className="stats-number">
                                {customers.length}
                            </div>

                            <div className="stats-label">
                                Registered Customers
                            </div>

                        </div>

                    </div>


                    <div className="col-md-4">

                        <div className="stats-card">

                            <div className="stats-number">
                                {customers.length > 0 ? "ACTIVE" : "—"}
                            </div>

                            <div className="stats-label">
                                System Status
                            </div>

                        </div>

                    </div>


                    <div className="col-md-4">

                        <div className="stats-card">

                            <div className="stats-number">
                                AI
                            </div>

                            <div className="stats-label">
                                Intelligent Dashboard
                            </div>

                        </div>

                    </div>

                </div>


                {/* ============================
                    ERROR
                ============================ */}

                {error && (

                    <div className="alert alert-danger">
                        {error}

                        <button
                            className="btn btn-sm btn-outline-light ms-3"
                            onClick={fetchCustomers}
                        >
                            Retry
                        </button>

                    </div>

                )}


                {/* ============================
                    TABLE
                ============================ */}

                <div className="table-card">

                    <div className="table-header d-flex justify-content-between align-items-center">

                        <h3 className="table-title">
                            👥 Customer Database
                        </h3>

                        <button
                            className="btn btn-outline-light btn-sm"
                            onClick={fetchCustomers}
                        >
                            ↻ Refresh
                        </button>

                    </div>


                    {loading ? (

                        <div className="empty-state">

                            <div className="ai-spinner"></div>

                            <p className="mt-3">
                                Loading customer intelligence...
                            </p>

                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="table ai-table">

                                <thead>

                                    <tr>

                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Actions</th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {customers.length > 0 ? (

                                        customers.map((customer) => (

                                            <tr key={customer.id}>

                                                <td>
                                                    <span className="customer-id">
                                                        #{customer.id}
                                                    </span>
                                                </td>

                                                <td>
                                                    <span className="customer-name">
                                                        {customer.name}
                                                    </span>
                                                </td>

                                                <td>
                                                    <span className="customer-email">
                                                        {customer.email}
                                                    </span>
                                                </td>

                                                <td>
                                                    {customer.phone}
                                                </td>

                                                <td>

                                                    {/* VIEW */}
                                                    <button
                                                        className="action-btn btn-view"
                                                        onClick={() =>
                                                            handleView(customer.id)
                                                        }
                                                    >
                                                        👁 View
                                                    </button>


                                                    {/* UPDATE */}
                                                    <button
                                                        className="action-btn btn-update"
                                                        onClick={() =>
                                                            handleUpdateOpen(customer)
                                                        }
                                                    >
                                                        ✏ Update
                                                    </button>


                                                    {/* DELETE */}
                                                    <button
                                                        className="action-btn btn-delete"
                                                        onClick={() =>
                                                            handleDelete(customer.id)
                                                        }
                                                    >
                                                        🗑 Delete
                                                    </button>

                                                </td>

                                            </tr>

                                        ))

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="5"
                                                className="empty-state"
                                            >
                                                No customers found.

                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>


            {/* ==================================================
                VIEW CUSTOMER MODAL
            ================================================== */}

            {showViewModal && selectedCustomer && (

                <div
                    className="modal d-block"
                    style={{
                        background: "rgba(0,0,0,0.75)"
                    }}
                >

                    <div className="modal-dialog modal-dialog-centered">

                        <div className="modal-content">

                            <div className="modal-header">

                                <h5 className="modal-title">
                                    👁 Customer Profile
                                </h5>

                                <button
                                    className="btn-close btn-close-white"
                                    onClick={() =>
                                        setShowViewModal(false)
                                    }
                                ></button>

                            </div>


                            <div className="modal-body">

                                <div className="info-box mb-3">

                                    <div className="info-label">
                                        Customer ID
                                    </div>

                                    <div className="info-value">
                                        #{selectedCustomer.id}
                                    </div>

                                </div>


                                <div className="info-box mb-3">

                                    <div className="info-label">
                                        Name
                                    </div>

                                    <div className="info-value">
                                        {selectedCustomer.name}
                                    </div>

                                </div>


                                <div className="info-box mb-3">

                                    <div className="info-label">
                                        Email
                                    </div>

                                    <div className="info-value">
                                        {selectedCustomer.email}
                                    </div>

                                </div>


                                <div className="info-box">

                                    <div className="info-label">
                                        Phone
                                    </div>

                                    <div className="info-value">
                                        {selectedCustomer.phone}
                                    </div>

                                </div>

                            </div>


                            <div className="modal-footer">

                                <button
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        setShowViewModal(false)
                                    }
                                >
                                    Close
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}


            {/* ==================================================
                UPDATE CUSTOMER MODAL
            ================================================== */}

            {showUpdateModal && selectedCustomer && (

                <div
                    className="modal d-block"
                    style={{
                        background: "rgba(0,0,0,0.75)"
                    }}
                >

                    <div className="modal-dialog modal-dialog-centered">

                        <div className="modal-content">

                            <form onSubmit={handleUpdate}>

                                <div className="modal-header">

                                    <h5 className="modal-title">
                                        ✨ Update Customer
                                    </h5>

                                    <button
                                        type="button"
                                        className="btn-close btn-close-white"
                                        onClick={() =>
                                            setShowUpdateModal(false)
                                        }
                                    ></button>

                                </div>


                                <div className="modal-body">

                                    {/* NAME */}

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control ai-input"
                                            value={updateData.name}
                                            onChange={(e) =>
                                                setUpdateData({
                                                    ...updateData,
                                                    name: e.target.value
                                                })
                                            }
                                            required
                                        />

                                    </div>


                                    {/* EMAIL */}

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            className="form-control ai-input"
                                            value={updateData.email}
                                            onChange={(e) =>
                                                setUpdateData({
                                                    ...updateData,
                                                    email: e.target.value
                                                })
                                            }
                                            required
                                        />

                                    </div>


                                    {/* PHONE */}

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Phone
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control ai-input"
                                            value={updateData.phone}
                                            onChange={(e) =>
                                                setUpdateData({
                                                    ...updateData,
                                                    phone: e.target.value
                                                })
                                            }
                                            required
                                        />

                                    </div>

                                </div>


                                <div className="modal-footer">

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() =>
                                            setShowUpdateModal(false)
                                        }
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        ✨ Save Changes
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

export default Customers;


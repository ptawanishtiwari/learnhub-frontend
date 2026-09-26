import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

function PaymentManagement() {

    const API_BASE_URL = "http://localhost:8080/payment";

    // =========================================================
    // STATES
    // =========================================================

    const [payments, setPayments] = useState([]);

    const [totalCount, setTotalCount] = useState(0);
    const [successCount, setSuccessCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [failedCount, setFailedCount] = useState(0);
    const [revenue, setRevenue] = useState(0);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");


    // =========================================================
    // FETCH ALL PAYMENT DATA
    // =========================================================

    const fetchPaymentData = async () => {

        try {

            setError("");

            const [
                paymentsResponse,
                countResponse,
                successCountResponse,
                pendingCountResponse,
                failedCountResponse,
                revenueResponse
            ] = await Promise.all([

                fetch(`${API_BASE_URL}/all`),

                fetch(`${API_BASE_URL}/count`),

                fetch(`${API_BASE_URL}/count/success`),

                fetch(`${API_BASE_URL}/count/pending`),

                fetch(`${API_BASE_URL}/count/failed`),

                fetch(`${API_BASE_URL}/revenue`)
            ]);


            // -------------------------------------------------
            // Check responses
            // -------------------------------------------------

            if (!paymentsResponse.ok) {
                throw new Error("Unable to fetch payment records");
            }

            if (!countResponse.ok) {
                throw new Error("Unable to fetch payment count");
            }

            if (!successCountResponse.ok) {
                throw new Error("Unable to fetch successful payment count");
            }

            if (!pendingCountResponse.ok) {
                throw new Error("Unable to fetch pending payment count");
            }

            if (!failedCountResponse.ok) {
                throw new Error("Unable to fetch failed payment count");
            }

            if (!revenueResponse.ok) {
                throw new Error("Unable to fetch payment revenue");
            }


            // -------------------------------------------------
            // Convert responses
            // -------------------------------------------------

            const paymentData = await paymentsResponse.json();

            const totalData = await countResponse.json();

            const successData =
                await successCountResponse.json();

            const pendingData =
                await pendingCountResponse.json();

            const failedData =
                await failedCountResponse.json();

            const revenueData =
                await revenueResponse.json();


            // -------------------------------------------------
            // Set states
            // -------------------------------------------------

            setPayments(
                Array.isArray(paymentData)
                    ? paymentData
                    : []
            );

            setTotalCount(
                Number(totalData) || 0
            );

            setSuccessCount(
                Number(successData) || 0
            );

            setPendingCount(
                Number(pendingData) || 0
            );

            setFailedCount(
                Number(failedData) || 0
            );

            setRevenue(
                Number(revenueData) || 0
            );


        } catch (err) {

            console.error(
                "Payment API Error:",
                err
            );

            setError(
                err.message ||
                "Unable to load payment data"
            );

        } finally {

            setLoading(false);
            setRefreshing(false);
        }
    };


    // =========================================================
    // INITIAL LOAD
    // =========================================================

    useEffect(() => {

        fetchPaymentData();

    }, []);


    // =========================================================
    // REFRESH
    // =========================================================

    const handleRefresh = () => {

        setRefreshing(true);

        fetchPaymentData();
    };


    // =========================================================
    // FORMAT CURRENCY
    // =========================================================

    const formatCurrency = (amount) => {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 2
            }
        ).format(
            Number(amount) || 0
        );
    };


    // =========================================================
    // FORMAT DATE
    // =========================================================

    const formatDate = (date) => {

        if (!date) {
            return "N/A";
        }

        const parsedDate =
            new Date(date);

        if (isNaN(parsedDate.getTime())) {
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
    // STATUS BADGE
    // =========================================================

    const getStatusBadge = (status) => {

        const normalizedStatus =
            String(status || "")
                .toUpperCase();


        if (normalizedStatus === "SUCCESS") {

            return (
                <span className="badge rounded-pill bg-success">
                    <i className="bi bi-check-circle me-1"></i>
                    SUCCESS
                </span>
            );
        }


        if (normalizedStatus === "PENDING") {

            return (
                <span className="badge rounded-pill bg-warning text-dark">
                    <i className="bi bi-clock me-1"></i>
                    PENDING
                </span>
            );
        }


        if (normalizedStatus === "FAILED") {

            return (
                <span className="badge rounded-pill bg-danger">
                    <i className="bi bi-x-circle me-1"></i>
                    FAILED
                </span>
            );
        }


        return (
            <span className="badge rounded-pill bg-secondary">
                {normalizedStatus || "UNKNOWN"}
            </span>
        );
    };


    // =========================================================
    // FILTER + SEARCH
    // =========================================================

    const filteredPayments = useMemo(() => {

        return payments.filter((payment) => {

            const status =
                String(payment.status || "")
                    .toUpperCase();


            // -------------------------------------------------
            // Status filter
            // -------------------------------------------------

            const matchesStatus =
                statusFilter === "ALL" ||
                status === statusFilter;


            if (!matchesStatus) {
                return false;
            }


            // -------------------------------------------------
            // Search
            // -------------------------------------------------

            const search =
                searchTerm
                    .toLowerCase()
                    .trim();


            if (!search) {
                return true;
            }


            const searchableText = [

                payment.id,

                payment.customerId,

                payment.courseId,

                payment.enrollmentId,

                payment.amount,

                payment.currency,

                payment.status,

                payment.razorpayOrderId,

                payment.razorpayPaymentId,

                payment.paymentDate

            ]
                .filter(
                    value =>
                        value !== null &&
                        value !== undefined
                )
                .join(" ")
                .toLowerCase();


            return searchableText.includes(search);
        });

    }, [
        payments,
        searchTerm,
        statusFilter
    ]);


    // =========================================================
    // EXPORT CSV
    // =========================================================

    const exportPayments = () => {

        if (filteredPayments.length === 0) {

            Swal.fire({
                icon: "info",
                title: "No Data",
                text: "There are no payment records to export.",
                background: "#15121c",
                color: "#ffffff"
            });

            return;
        }


        const headers = [

            "Payment ID",
            "Customer ID",
            "Course ID",
            "Enrollment ID",
            "Amount",
            "Currency",
            "Status",
            "Payment Date",
            "Razorpay Order ID",
            "Razorpay Payment ID"
        ];


        const rows =
            filteredPayments.map(
                (payment) => [

                    payment.id ?? "",

                    payment.customerId ?? "",

                    payment.courseId ?? "",

                    payment.enrollmentId ?? "",

                    payment.amount ?? "",

                    payment.currency ?? "INR",

                    payment.status ?? "",

                    payment.paymentDate ?? "",

                    payment.razorpayOrderId ?? "",

                    payment.razorpayPaymentId ?? ""
                ]
            );


        const csvContent = [

            headers,

            ...rows

        ]
            .map(row =>
                row
                    .map(value =>
                        `"${String(value).replace(/"/g, '""')}"`
                    )
                    .join(",")
            )
            .join("\n");


        const blob =
            new Blob(
                [csvContent],
                {
                    type: "text/csv;charset=utf-8;"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            `LearnHub_Payments_${new Date()
                .toISOString()
                .slice(0, 10)}.csv`;


        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);


        Swal.fire({
            icon: "success",
            title: "Export Successful",
            text: `${filteredPayments.length} payment records exported.`,
            timer: 1800,
            showConfirmButton: false,
            background: "#15121c",
            color: "#ffffff"
        });
    };


    // =========================================================
    // PAYMENT DETAILS
    // =========================================================

    const showPaymentDetails = (payment) => {

        Swal.fire({

            title: "Payment Details",

            background: "#15121c",

            color: "#ffffff",

            width: "600px",

            html: `

                <div style="text-align:left">

                    <div class="mb-3">
                        <strong>Payment ID:</strong>
                        <span>${payment.id ?? "N/A"}</span>
                    </div>

                    <div class="mb-3">
                        <strong>Customer ID:</strong>
                        <span>${payment.customerId ?? "N/A"}</span>
                    </div>

                    <div class="mb-3">
                        <strong>Course ID:</strong>
                        <span>${payment.courseId ?? "N/A"}</span>
                    </div>

                    <div class="mb-3">
                        <strong>Enrollment ID:</strong>
                        <span>${payment.enrollmentId ?? "N/A"}</span>
                    </div>

                    <div class="mb-3">
                        <strong>Amount:</strong>
                        <span>
                            ${formatCurrency(payment.amount)}
                        </span>
                    </div>

                    <div class="mb-3">
                        <strong>Status:</strong>
                        <span>
                            ${payment.status ?? "N/A"}
                        </span>
                    </div>

                    <div class="mb-3">
                        <strong>Payment Date:</strong>
                        <span>
                            ${formatDate(payment.paymentDate)}
                        </span>
                    </div>

                    <div class="mb-3">
                        <strong>Razorpay Order ID:</strong>
                        <br/>
                        <small>
                            ${payment.razorpayOrderId ?? "N/A"}
                        </small>
                    </div>

                    <div class="mb-3">
                        <strong>Razorpay Payment ID:</strong>
                        <br/>
                        <small>
                            ${payment.razorpayPaymentId ?? "N/A"}
                        </small>
                    </div>

                </div>
            `,

            confirmButtonText: "Close",

            confirmButtonColor: "#6f42c1"
        });
    };


    // =========================================================
    // LOADING SCREEN
    // =========================================================

    if (loading) {

        return (

            <div
                className="container-fluid d-flex justify-content-center align-items-center"
                style={{
                    minHeight: "70vh"
                }}
            >

                <div className="text-center">

                    <div
                        className="spinner-border text-primary mb-3"
                        role="status"
                    >
                    </div>

                    <h5 className="text-white">
                        Loading payment data...
                    </h5>

                    <p className="text-secondary">
                        Please wait
                    </p>

                </div>

            </div>
        );
    }


    // =========================================================
    // MAIN UI
    // =========================================================

    return (

        <div
            className="container-fluid py-4"
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg, #08070c 0%, #100b18 50%, #08070c 100%)",
                color: "#ffffff"
            }}
        >

            {/* =================================================
                HEADER
            ================================================= */}

            <div
                className="d-flex flex-wrap justify-content-between align-items-center mb-4"
            >

                <div>

                    <h2 className="fw-bold mb-1">

                        <i
                            className="bi bi-credit-card-2-front-fill me-2"
                            style={{
                                color: "#9b5cff"
                            }}
                        ></i>

                        Payment Management

                    </h2>

                    <p className="text-secondary mb-0">
                        Manage and monitor all LearnHub payments
                    </p>

                </div>


                <div className="d-flex gap-2 mt-3 mt-md-0">

                    <button
                        className="btn btn-outline-light"
                        onClick={handleRefresh}
                        disabled={refreshing}
                    >

                        {refreshing ? (

                            <>
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                ></span>

                                Refreshing...
                            </>

                        ) : (

                            <>
                                <i className="bi bi-arrow-clockwise me-2"></i>
                                Refresh
                            </>
                        )}

                    </button>


                    <button
                        className="btn"
                        onClick={exportPayments}
                        style={{
                            background:
                                "linear-gradient(135deg, #6f42c1, #9b5cff)",
                            color: "#fff",
                            border: "none"
                        }}
                    >

                        <i className="bi bi-download me-2"></i>

                        Export CSV

                    </button>

                </div>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

                <div
                    className="alert alert-danger d-flex justify-content-between align-items-center"
                >

                    <span>

                        <i className="bi bi-exclamation-triangle me-2"></i>

                        {error}

                    </span>

                    <button
                        className="btn btn-sm btn-danger"
                        onClick={fetchPaymentData}
                    >
                        Try Again
                    </button>

                </div>
            )}


            {/* =================================================
                STATISTICS
            ================================================= */}

            <div className="row g-4 mb-4">


                {/* TOTAL REVENUE */}

                <div className="col-xl-3 col-md-6">

                    <div
                        className="card h-100 border-0 shadow-lg"
                        style={{
                            background:
                                "linear-gradient(145deg, #171220, #0f0c14)",
                            borderRadius: "18px"
                        }}
                    >

                        <div className="card-body">

                            <div className="d-flex justify-content-between">

                                <div>

                                    <p className="text-secondary mb-2">
                                        Total Revenue
                                    </p>

                                    <h3 className="fw-bold mb-0">
                                        {formatCurrency(revenue)}
                                    </h3>

                                </div>

                                <div
                                    className="rounded-circle d-flex justify-content-center align-items-center"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        background:
                                            "rgba(111,66,193,0.2)",
                                        color: "#a970ff"
                                    }}
                                >

                                    <i className="bi bi-currency-rupee fs-4"></i>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* TOTAL PAYMENTS */}

                <div className="col-xl-3 col-md-6">

                    <div
                        className="card h-100 border-0 shadow-lg"
                        style={{
                            background:
                                "linear-gradient(145deg, #171220, #0f0c14)",
                            borderRadius: "18px"
                        }}
                    >

                        <div className="card-body">

                            <div className="d-flex justify-content-between">

                                <div>

                                    <p className="text-secondary mb-2">
                                        Total Payments
                                    </p>

                                    <h3 className="fw-bold mb-0">
                                        {totalCount}
                                    </h3>

                                </div>

                                <div
                                    className="rounded-circle d-flex justify-content-center align-items-center"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        background:
                                            "rgba(13,110,253,0.15)",
                                        color: "#5ca8ff"
                                    }}
                                >

                                    <i className="bi bi-wallet2 fs-4"></i>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* SUCCESS */}

                <div className="col-xl-3 col-md-6">

                    <div
                        className="card h-100 border-0 shadow-lg"
                        style={{
                            background:
                                "linear-gradient(145deg, #171220, #0f0c14)",
                            borderRadius: "18px"
                        }}
                    >

                        <div className="card-body">

                            <div className="d-flex justify-content-between">

                                <div>

                                    <p className="text-secondary mb-2">
                                        Successful
                                    </p>

                                    <h3 className="fw-bold text-success mb-0">
                                        {successCount}
                                    </h3>

                                </div>

                                <div
                                    className="rounded-circle d-flex justify-content-center align-items-center"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        background:
                                            "rgba(25,135,84,0.15)",
                                        color: "#48d597"
                                    }}
                                >

                                    <i className="bi bi-check-circle fs-4"></i>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* FAILED / PENDING */}

                <div className="col-xl-3 col-md-6">

                    <div
                        className="card h-100 border-0 shadow-lg"
                        style={{
                            background:
                                "linear-gradient(145deg, #171220, #0f0c14)",
                            borderRadius: "18px"
                        }}
                    >

                        <div className="card-body">

                            <div className="d-flex justify-content-between">

                                <div>

                                    <p className="text-secondary mb-2">
                                        Pending / Failed
                                    </p>

                                    <h3 className="fw-bold mb-0">

                                        <span className="text-warning">
                                            {pendingCount}
                                        </span>

                                        <span className="text-secondary mx-2">
                                            /
                                        </span>

                                        <span className="text-danger">
                                            {failedCount}
                                        </span>

                                    </h3>

                                </div>

                                <div
                                    className="rounded-circle d-flex justify-content-center align-items-center"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        background:
                                            "rgba(255,193,7,0.1)",
                                        color: "#ffc107"
                                    }}
                                >

                                    <i className="bi bi-clock-history fs-4"></i>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* =================================================
                SEARCH + FILTER
            ================================================= */}

            <div
                className="card border-0 shadow-lg mb-4"
                style={{
                    background: "#121019",
                    borderRadius: "18px"
                }}
            >

                <div className="card-body">

                    <div className="row g-3">

                        {/* SEARCH */}

                        <div className="col-lg-8">

                            <div className="input-group">

                                <span
                                    className="input-group-text border-secondary"
                                    style={{
                                        background: "#0d0b11",
                                        color: "#9b5cff"
                                    }}
                                >

                                    <i className="bi bi-search"></i>

                                </span>

                                <input
                                    type="text"
                                    className="form-control border-secondary"
                                    placeholder="Search by payment ID, customer ID, course ID, Razorpay ID..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(
                                            e.target.value
                                        )
                                    }
                                    style={{
                                        background: "#0d0b11",
                                        color: "#ffffff"
                                    }}
                                />

                            </div>

                        </div>


                        {/* STATUS */}

                        <div className="col-lg-4">

                            <select
                                className="form-select border-secondary"
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(
                                        e.target.value
                                    )
                                }
                                style={{
                                    background: "#0d0b11",
                                    color: "#ffffff"
                                }}
                            >

                                <option value="ALL">
                                    All Payments
                                </option>

                                <option value="SUCCESS">
                                    Successful
                                </option>

                                <option value="PENDING">
                                    Pending
                                </option>

                                <option value="FAILED">
                                    Failed
                                </option>

                            </select>

                        </div>

                    </div>


                    <div className="mt-3 text-secondary">

                        Showing{" "}

                        <strong className="text-white">
                            {filteredPayments.length}
                        </strong>

                        {" "}of{" "}

                        <strong className="text-white">
                            {payments.length}
                        </strong>

                        {" "}payments

                    </div>

                </div>

            </div>


            {/* =================================================
                PAYMENT TABLE
            ================================================= */}

            <div
                className="card border-0 shadow-lg"
                style={{
                    background: "#121019",
                    borderRadius: "18px",
                    overflow: "hidden"
                }}
            >

                <div className="card-body p-0">

                    {filteredPayments.length === 0 ? (

                        <div className="text-center py-5">

                            <i
                                className="bi bi-receipt fs-1"
                                style={{
                                    color: "#6f42c1"
                                }}
                            ></i>

                            <h5 className="mt-3">
                                No Payment Records
                            </h5>

                            <p className="text-secondary mb-0">

                                {payments.length === 0
                                    ? "No payments have been recorded yet."
                                    : "No payments match your search or filter."
                                }

                            </p>

                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table
                                className="table table-dark table-hover align-middle mb-0"
                                style={{
                                    background: "#121019"
                                }}
                            >

                                <thead>

                                    <tr
                                        style={{
                                            background: "#0c0a10"
                                        }}
                                    >

                                        <th className="px-4 py-3">
                                            ID
                                        </th>

                                        <th>
                                            Customer
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

                                        <th>
                                            Date
                                        </th>

                                        <th>
                                            Razorpay
                                        </th>

                                        <th>
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {filteredPayments.map(
                                        (payment) => (

                                            <tr
                                                key={
                                                    payment.id
                                                }
                                            >

                                                {/* ID */}

                                                <td className="px-4">

                                                    <span
                                                        className="fw-bold"
                                                        style={{
                                                            color: "#b47cff"
                                                        }}
                                                    >
                                                        #
                                                        {payment.id}
                                                    </span>

                                                </td>


                                                {/* CUSTOMER */}

                                                <td>

                                                    <div>

                                                        <div className="fw-semibold">
                                                            Customer #
                                                            {
                                                                payment.customerId
                                                            }
                                                        </div>

                                                        <small className="text-secondary">
                                                            ID:{" "}
                                                            {
                                                                payment.customerId
                                                            }
                                                        </small>

                                                    </div>

                                                </td>


                                                {/* COURSE */}

                                                <td>

                                                    <div>

                                                        <div className="fw-semibold">
                                                            Course #
                                                            {
                                                                payment.courseId
                                                            }
                                                        </div>

                                                        <small className="text-secondary">
                                                            Enrollment #
                                                            {
                                                                payment.enrollmentId ??
                                                                "N/A"
                                                            }
                                                        </small>

                                                    </div>

                                                </td>


                                                {/* AMOUNT */}

                                                <td>

                                                    <span className="fw-bold">

                                                        {formatCurrency(
                                                            payment.amount
                                                        )}

                                                    </span>

                                                    <small className="d-block text-secondary">

                                                        {
                                                            payment.currency ||
                                                            "INR"
                                                        }

                                                    </small>

                                                </td>


                                                {/* STATUS */}

                                                <td>

                                                    {getStatusBadge(
                                                        payment.status
                                                    )}

                                                </td>


                                                {/* DATE */}

                                                <td>

                                                    <span className="small">

                                                        {formatDate(
                                                            payment.paymentDate
                                                        )}

                                                    </span>

                                                </td>


                                                {/* RAZORPAY */}

                                                <td>

                                                    <div
                                                        style={{
                                                            maxWidth:
                                                                "180px"
                                                        }}
                                                    >

                                                        <small
                                                            className="d-block text-secondary"
                                                            title={
                                                                payment.razorpayOrderId
                                                            }
                                                        >

                                                            Order:

                                                        </small>

                                                        <code
                                                            style={{
                                                                color:
                                                                    "#c49cff",
                                                                fontSize:
                                                                    "11px"
                                                            }}
                                                        >

                                                            {
                                                                payment.razorpayOrderId ||
                                                                "N/A"
                                                            }

                                                        </code>


                                                        <small
                                                            className="d-block text-secondary mt-1"
                                                        >

                                                            Payment:

                                                        </small>

                                                        <code
                                                            style={{
                                                                color:
                                                                    "#c49cff",
                                                                fontSize:
                                                                    "11px"
                                                            }}
                                                        >

                                                            {
                                                                payment.razorpayPaymentId ||
                                                                "N/A"
                                                            }

                                                        </code>

                                                    </div>

                                                </td>


                                                {/* ACTION */}

                                                <td>

                                                    <button
                                                        className="btn btn-sm"
                                                        onClick={() =>
                                                            showPaymentDetails(
                                                                payment
                                                            )
                                                        }
                                                        style={{
                                                            background:
                                                                "rgba(111,66,193,0.15)",
                                                            color:
                                                                "#b47cff",
                                                            border:
                                                                "1px solid rgba(111,66,193,0.4)"
                                                        }}
                                                        title="View payment details"
                                                    >

                                                        <i className="bi bi-eye"></i>

                                                    </button>

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>


            {/* =================================================
                FOOTER INFO
            ================================================= */}

            <div className="text-center mt-4">

                <small className="text-secondary">

                    LearnHub Payment Management • Razorpay

                </small>

            </div>

        </div>
    );
}

export default PaymentManagement;
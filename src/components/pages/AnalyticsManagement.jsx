import React from "react";

function AnalyticsManagement() {

    return (
        <div className="container-fluid p-4">

            <div className="mb-4">

                <h2 className="fw-bold text-white">
                    Analytics
                </h2>

                <p className="text-secondary">
                    View LMS performance and statistics
                </p>

            </div>

            <div className="row g-4">

                <div className="col-lg-3 col-md-6">

                    <div className="card bg-dark border-secondary text-white">

                        <div className="card-body">

                            <small className="text-secondary">
                                Total Students
                            </small>

                            <h2 className="mt-2">
                                0
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="card bg-dark border-secondary text-white">

                        <div className="card-body">

                            <small className="text-secondary">
                                Total Courses
                            </small>

                            <h2 className="mt-2">
                                0
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="card bg-dark border-secondary text-white">

                        <div className="card-body">

                            <small className="text-secondary">
                                Total Lectures
                            </small>

                            <h2 className="mt-2">
                                0
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="card bg-dark border-secondary text-white">

                        <div className="card-body">

                            <small className="text-secondary">
                                Revenue
                            </small>

                            <h2 className="mt-2">
                                ₹0
                            </h2>

                        </div>

                    </div>

                </div>

            </div>

            <div className="card bg-dark border-secondary mt-4">

                <div className="card-body">

                    <h5 className="text-white">
                        Analytics Dashboard
                    </h5>

                    <p className="text-secondary mb-0">
                        Charts and detailed analytics will be connected
                        with backend APIs here.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default AnalyticsManagement;
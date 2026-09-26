import React from "react";

function CertificateManagement() {

    return (
        <div className="container-fluid p-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h2 className="fw-bold text-white">
                        Certificate Management
                    </h2>

                    <p className="text-secondary">
                        Manage student certificates
                    </p>
                </div>

                <button className="btn btn-primary">
                    + Generate Certificate
                </button>

            </div>

            <div className="card bg-dark border-secondary">

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-dark table-hover align-middle">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Certificate ID</th>
                                    <th>Student</th>
                                    <th>Course</th>
                                    <th>Issue Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr>

                                    <td colSpan="6"
                                        className="text-center text-secondary py-5">

                                        No certificates available

                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default CertificateManagement;
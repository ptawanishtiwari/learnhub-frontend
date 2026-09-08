import React, { useEffect, useState } from "react";

function Customers() {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        fetch("https://learnhub-backend-production-9e84.up.railway.app/customer/all-user")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch customer data");
                }
                return response.json();
            })
            .then((data) => {
                setCustomers(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError("Unable to fetch customer data");
                setLoading(false);
            });

    }, []);

    return (
        <div className="container mt-5">

            <h2 className="text-center mb-4">
                Customer Details
            </h2>

            {/* Loading */}
            {loading && (
                <div className="text-center">
                    <div className="spinner-border text-primary"></div>
                    <p className="mt-2">Loading data...</p>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="alert alert-danger text-center">
                    {error}
                </div>
            )}

            {/* Data Table */}
            {!loading && !error && (
                <div className="table-responsive">

                    <table className="table table-bordered table-striped table-hover">

                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                            </tr>
                        </thead>

                        <tbody>

                            {customers.length > 0 ? (

                                customers.map((customer) => (

                                    <tr key={customer.id}>
                                        <td>{customer.id}</td>
                                        <td>{customer.name}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.phone}</td>
                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td colSpan="4" className="text-center">
                                        No customers found
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>
            )}

        </div>
    );
}

export default Customers;
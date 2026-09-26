import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from "react-router-dom";

import Header from "./components/Navbar/Header";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import Customers from "./components/pages/Customers";
import AdminDashboard from "./components/pages/AdminDashboard";

import Footer from "./components/Footer/Footer";
import Courses from "./components/pages/Courses";
import CourseDetails from "./components/pages/CourseDetails";
import CourseLearning from "./components/pages/CourseLearning";


// ==================================================
// LAYOUT
// ==================================================

function AppLayout() {

    const location = useLocation();

    // Pages where Header/Footer should NOT appear
    const hideHeaderFooter =
        location.pathname === "/dashboard" ||
        location.pathname === "/blog" ||
        location.pathname.startsWith("/learn/");

    return (
        <>
            {/* HEADER */}

            {!hideHeaderFooter && <Header />}


            {/* ROUTES */}

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/blog"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/courses"
                    element={<Courses />}
                />

                <Route
                    path="/course/:id"
                    element={<CourseDetails />}
                />

                <Route
                    path="/learn/:courseId"
                    element={<CourseLearning />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

            </Routes>


            {/* FOOTER */}

            {!hideHeaderFooter && <Footer />}
        </>
    );
}


// ==================================================
// APP
// ==================================================

function App() {

    return (

        <BrowserRouter>

            <AppLayout />

        </BrowserRouter>
    );
}

export default App;
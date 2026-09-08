
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Navbar/Header";

// import Home from "./pages/Home";
// import About from "./pages/About";
// import Courses from "./pages/Courses";
// import Blog from "./pages/Blog";
// import Login from "./pages/Login";
import Register from "./components/pages/Register";
import Customers from "./components/pages/Customers";
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <BrowserRouter>

            <Header />

            <Routes>
                {/* <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
               
                <Route path="/blog" element={<Blog />} />
                <Route path="/login" element={<Login />} /> */}
                <Route path="/courses" element={<Customers />} />
                <Route path="/register" element={<Register />} />
            </Routes>

            <Footer />

        </BrowserRouter>
    );
}

export default App;

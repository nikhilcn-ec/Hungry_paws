import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./homepage.css";
import Sidebar from "../sidebar/Sidebar";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useAuthContext } from "../../../context/AuthContext";
import Navbar from "../sidebar/Navbar";

const Homepage = () => {
    // const { user } = useAuthContext();

    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <React.Fragment>
            <main className="spaceToggle">
                <Navbar toggle={toggle} />
                <aside className="sidebar" style={{ width: isOpen ? "250px" : "100px" }}>
                    <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
                </aside>
                <div className="content">
                    <Outlet />
                </div>

            </main>
        </React.Fragment>
    );
};

export default Homepage;

import React from "react";
 import "./Dashboard.css";
 import { Link, Outlet } from "react-router-dom";

const DashboardEmp = () => {
    return (
        <>
        {/* <div>Dashobard page  and your logged in</div> */}
        <Outlet />
        
        </>
    );
};

export default DashboardEmp;
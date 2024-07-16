import React from "react";
import { Outlet } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/charts">Charts</a>
          </li>
          <li>
            <a href="/progress">Progress</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">
        <div className="app-bar">
          <h1>Dashboard</h1>
        </div>

        <div className="main-content">
          {/* Cards for different sections */}
          <div className="card">
            <h2>ARTICLE</h2>
            <p>Some content for Section 1</p>
          </div>

          <div className="card">
            <h2>CATEGORY</h2>
            <p>Some content for Section 2</p>
          </div>

          <div className="card">
            <h2>FARMER</h2>
            <p>Some content for Section 3</p>
          </div>
          <div className="card">
            <h2>USERS</h2>
            <p>Some content for Section 3</p>
          </div>

          {/* Nested Routes */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

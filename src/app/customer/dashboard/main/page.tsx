"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import "./dashboardMain.css";
const Dashboard = () => {
  const router = useRouter();
  

  return (
    <div className="dashboard">
     
     <section className="dashboard-block">
        <h2>Work Flow Emails</h2>
       
      </section>
      <section className="dashboard-block">
        <h2>Notifications By Status</h2>
        <ul>
          <li>Active Notifications</li>
          <li>Completed Notifications</li>
        </ul>
      </section>

      <section className="dashboard-block">
        <h2>Notifications By Priority</h2>
        <ul>
          <li>Emergency Notifications</li>
          <li>Urgent Notifications</li>
          <li>Normal Notifications</li>
        </ul>
      </section>

      <section className="dashboard-block">
        <h2>Notifications By Category</h2>
        <ul>
          <li>Plumbing</li>
          <li>Electrical</li>
          <li>Painting</li>
        </ul>
        <button>Explore Categories</button>
      </section>

      <section className="dashboard-block">
        <h2>Material Management</h2>
        <ul>
          <li>List of Materials</li>
          <li>Request Material</li>
        </ul>
      </section>

      <section className="dashboard-block">
        <h2>Orders Management</h2>
        <ul>
          <li>High Budget Orders</li>
          <li>Orders History</li>
        </ul>
      </section>
      <section className="dashboard-block">
        <h2>Track Order Status</h2>
        <ul>
          <li>Contact Technician</li>
          <li>Contact Planner</li>
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;

# Flatcare Maintenance Platform Documentation
## Project Overview
Welcome to the **Flatcare Maintenance** platform! This system is designed to streamline communication between customers, technicians, and planners.
 <img src="/public/assets/images/logo.png" alt="Flatcare Logo" width="200" style="border-radius: 8px; border: 1px solid #ddd;"/>
## User Roles and Responsibilities
<div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
    <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; background-color: #f9f9f9;">
        <h3 style="margin-top: 0;">Customers</h3>
        <ul>
            <li><strong>Create notifications</strong></li>
            <li><strong>Order materials</strong></li>
            <li><strong>Update profiles</strong></li>
        </ul>
        <div style="display: flex; flex-wrap: wrap; gap: 15px;">
         <img src="/public/assets/images/loginInterface.PNG" alt="Login Interface" width="200" style="border-radius: 8px; border: 1px solid #ddd;"/>
    <img src="/public/assets/images/signupInterface.PNG" alt="Signup Interface" width="200" style="border-radius: 8px; border: 1px solid #ddd;"/>
        </div>
    </div>
    <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; background-color: #f9f9f9;">
        <h3 style="margin-top: 0;">Technicians</h3>
        <ul>
            <li><strong>View notifications</strong></li>
            <li><strong>Visit sites</strong></li>
            <li><strong>Recommend materials</strong></li>
        </ul>
    </div>
    <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; background-color: #f9f9f9;">
        <h3 style="margin-top: 0;">Planners</h3>
        <ul>
            <li><strong>Create and update work orders</strong></li>
            <li><strong>Track material deliveries</strong></li>
        </ul>
    </div>
    <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; background-color: #f9f9f9;">
        <h3 style="margin-top: 0;">Admins</h3>
        <ul>
            <li><strong>Approve accounts</strong></li>
            <li><strong>Oversee administrative tasks</strong></li>
        </ul>
    </div>
</div>
## Major Technology Stack
<div style="display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 20px;">
    <div style="flex: 1; min-width: 200px; border: 1px solid #ddd; border-radius: 8px; padding: 15px; background-color: #f0f0f0;">
        <h4 style="margin-top: 0;">Next.js with TypeScript</h4>
        <p>For building the front-end interface.</p>
    </div>
    <div style="flex: 1; min-width: 200px; border: 1px solid #ddd; border-radius: 8px; padding: 15px; background-color: #f0f0f0;">
        <h4 style="margin-top: 0;">MongoDB with Mongoose ODM</h4>
        <p>For managing and querying the database.</p>
    </div>
    <div style="flex: 1; min-width: 200px; border: 1px solid #ddd; border-radius: 8px; padding: 15px; background-color: #f0f0f0;">
        <h4 style="margin-top: 0;">Firebase</h4>
        <p>For storing images.</p>
    </div>
    <div style="flex: 1; min-width: 200px; border: 1px solid #ddd; border-radius: 8px; padding: 15px; background-color: #f0f0f0;">
        <h4 style="margin-top: 0;">Nodemailer</h4>
        <p>For sending emails.</p>
    </div>
    <div style="flex: 1; min-width: 200px; border: 1px solid #ddd; border-radius: 8px; padding: 15px; background-color: #f0f0f0;">
        <h4 style="margin-top: 0;">Custom Authentication</h4>
        <p>Using <strong>JSON Web Tokens (JWT)</strong> and <strong>bcryptjs</strong> for user authentication and authorization.</p>
    </div>
</div>
## Images
<div style="display: flex; flex-wrap: wrap; gap: 15px;">
   
    <img src="/public/assets/images/dashboardlayout.PNG" alt="Dashboard Layout" width="200" style="border-radius: 8px; border: 1px solid #ddd;"/>
</div>

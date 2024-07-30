# Flatcare Maintenance Platform Documentation
## Project Overview
Welcome to the **Flatcare Maintenance** platform! This system is designed to streamline communication between customers, technicians, and planners.
 <img src="/public/assets/images/logo.png" alt="Flatcare Logo" width="200" style="border-radius: 8px; border: 1px solid #ddd;"/>
## User Roles and Responsibilities
### Customers
- **Create notifications**
- **Order materials**
- **Update profiles**
### Technicians
- **View notifications**
- **Visit sites**
- **Recommend materials**
### Planners
- **Create and update work orders**
- **Track material deliveries**
### Admins
- **Approve accounts**
- **Oversee administrative tasks**
## Major Technology Stack
- **Next.js** with **TypeScript**: For building the front-end interface.
- **MongoDB** with **Mongoose ODM**: For managing and querying the database.
- **Firebase**: For storing images.
- **Nodemailer**: For sending emails.
- **Custom Authentication**: Using **JSON Web Tokens (JWT)** and **bcryptjs** for user authentication and authorization.
![Flatcare Logo](/public/assets/images/logo.png)
![Flatcare Logo](/public/assets/images/loginInterface.PNG)
![Flatcare Logo](/public/assets/images/signupInterface.PNG)
![Flatcare Logo](/public/assets/images/userModes.PNG)
![Flatcare Logo](/public/assets/images/footer.PNG)
![Flatcare Logo](/public/assets/images/dashboardlayout.PNG)


Challenges:-
1) Update the counters at the home page.
- store current time when page mounts.
-store current time when update animation function runs.
- difference between these two times divide by duration will bring the progress.
- we need to clamp that progress below 1 using math.min.
-now if we multiply progress by actual number, we can set that value to the jsx.


## E-commerce Application using MERN Stack

# Project Overview
This is a fully functional e-commerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application allows users to browse products, add them to their cart, and proceed to checkout.

The project is deployed on an AWS EC2 instance and can be accessed via the following link:[http://54.66.130.211/] (Live Demo)

# Features
- User authentication and authorization (Sign Up, Login, Logout)
- Product catalog with categories and search functionality
- Shopping cart and checkout system
- Admin panel for managing products, categories, and orders
- Responsive design for mobile and desktop devices

# Tech Stack
- Frontend: React.js, Bootstrap
- Backend: Node.js, Express.js
- Database: MongoDB (MongoDB Atlas)
- Deployment: AWS EC2

# Deployment
The application is deployed on an AWS EC2 instance. Here are the key steps taken:
1. Setup EC2 Instance:
- Created an EC2 instance and configured security groups to allow HTTP and SSH access.
- Installed Node.js, MongoDB tools, and NGINX on the instance.
2. Deploy Code:
- Uploaded the application code to the EC2 instance using SCP or Git.
- Installed dependencies and started the backend and frontend services.
3. Configure NGINX:
- Configured NGINX as a reverse proxy to route traffic to the backend and serve the frontend.

# Access the Application
Visit the live project at [http://54.66.130.211/] (http://54.66.130.211/)

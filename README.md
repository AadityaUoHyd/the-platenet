# The Platenet

The Platenet is a full-stack food ordering web application built with Spring Boot (backend), React (frontend), and MongoDB (database). It allows customers to browse food items, add them to a cart, place orders, and view order history, while providing an admin panel for managing food items and orders. This repository contains only frontend code.
![](https://github.com/AadityaUoHyd/the-platenet/blob/main/screenshot.png)

## Features

### Customer Features
- **Browse Food Items**: View food items categorized as Biryani, Pizza, Burger, etc.
- **Cart Management**: Add, update, or remove items in the cart.
- **Order Placement**: Place orders with integrated payment processing (Razorpay).
- **Order History**: View past orders via the "My Orders" page.
- **User Authentication**: Register and log in to access personalized features.

### Admin Features
- **Manage Food Items**: Add new food items with details (name, description, price, category, image) at `/admin/add`.
- **List Food Items**: View and manage existing food items at `/admin/list`.
- **View Orders**: Monitor all customer orders at `/admin/orders`.
- **Secure Admin Access**: Restricted to authenticated admin users via JWT.

## Tech Stack

### Backend
- **Spring Boot**: Java framework for RESTful APIs.
- **Spring Security**: JWT-based authentication and authorization.
- **MongoDB**: NoSQL database for storing users, food items, and orders.
- **Maven**: Dependency management and build tool.

### Frontend
- **React**: JavaScript library for building the user interface.
- **React Router**: Client-side routing for navigation.
- **Axios**: HTTP client for API requests.
- **Bootstrap**: CSS framework for responsive design.
- **React Toastify**: Notifications for user feedback.
- **Inter Font**: Modern sans-serif font for typography (via Google Fonts).

### Others
- **Vite**: Frontend build tool for fast development.
- **Razorpay**: Payment gateway integration (partial implementation).
- **JWT**: Token-based authentication for secure API access.

## Project Structure

```
the-platenet-backend/           # Spring Boot backend
    ├── src/main/java/          # Java source code
    │   ├── org/aadi/platenet/  # Application package
    │       ├── controller/     # REST controllers (e.g., AuthController)
    │       ├── service/        # Business logic (e.g., AppUserDetailsService)
    │       ├── entity/         # MongoDB entities (e.g., UserEntity)
    │       ├── io/             # DTOs (e.g., AuthenticationResponse)
    │       ├── repository/     # MongoDB repositories
    │       ├── util/           # Utilities (e.g., JwtUtil)
    ├── pom.xml                 # Maven dependencies


the-platenet/                  
├── src/                       # React frontend
│   ├── admin/                 # Admin panel components and pages
│   │   ├── components/        # Admin UI components
│   │   │   ├── Menubar/       # AdminMenubar.jsx
│   │   │   ├── AdminRoute/    # ProtectedAdminRoute.jsx
│   │   ├── pages/             # Admin pages
│   │   │   ├── AddFood/       # AdminAddFood.jsx
│   │   │   ├── ListFood/      # AdminListFood.jsx
│   │   │   ├── Orders/        # AdminOrders.jsx
│   ├── assets/                # Static assets (images, fonts)
│   │   ├── assets.js          # Image exports (logo, profile, etc.)
│   ├── components/            # Customer UI components
│   │   ├── Login/             # Login.jsx
│   │   ├── Register/          # Register.jsx
│   │   ├── Menubar/           # Menubar.jsx
│   ├── context/               # React context
│   │   ├── StoreContext.jsx   # Global state management
│   ├── pages/                 # Customer pages
│   │   ├── Home/              # Home.jsx
│   │   ├── Cart/              # Cart.jsx
│   │   ├── PlaceOrder/        # PlaceOrder.jsx
│   │   ├── MyOrders/          # MyOrders.jsx
│   ├── services/              # API service calls
│   │   ├── authService.js     # Authentication APIs
│   │   ├── adminFoodService.js # Admin food management APIs
│   │   ├── orderService.js    # Order management APIs
│   ├── index.css              # Global styles with Inter font
│   ├── App.jsx                # Main app component with routing
│   ├── index.js               # Entry point
├── package.json               # Node dependencies and scripts
├── vite.config.js             # Vite configuration
├── README.md                  # Project documentation

```
## Prerequisites

- **Java 17 or higher**: For Spring Boot backend.
- **Node.js 18 or higher**: For React frontend.
- **MongoDB**: Local or cloud instance (e.g., MongoDB Atlas).
- **Maven**: For backend build.
- **Git**: For version control.

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/AadityaUoHyd/the-platenet.git
cd the-platenet

2. Backend Setup

Navigate to Backend:cd backend


Configure MongoDB:
Update src/main/resources/application.properties with your MongoDB URI:spring.data.mongodb.uri=mongodb://localhost:27017/theplatenet

I have used monfo atlas cloud.



Install Dependencies:mvn clean install


Run Backend:mvn spring-boot:run


The backend runs on http://localhost:8080.



3. Frontend Setup

Navigate to Frontend:cd ../


Install Dependencies:npm install


Configure API URL:
Update src/services/authService.js (and other services) with the backend URL:const API_URL = 'http://localhost:8080/api';




Run Frontend:npm run dev


The frontend runs on http://localhost:5173.



4. MongoDB Setup

Ensure MongoDB is running locally or via a cloud provider.
Create a database named theplatenet.
Insert an admin user for testing:use theplatenet
db.users.insertOne({
  email: "aadiraj48@gmail.com",
  password: "$2a$10$...", // Hashed password (use BCrypt)
  name: "Admin",
  isAdmin: true
})



## Usage
Customer Flow

Register/Login: Access /register or /login to create or sign in to an account.
Browse Food: Visit /explore to view food items.
Add to Cart: Add items to the cart at /cart.
Place Order: Proceed to /order for payment (Razorpay).
View Orders: Check order history at /myorders.

## Admin Flow

Login as Admin: Use admin credentials (e.g., aadiraj48@gmail.com, Password$123).
Access Admin Panel: Redirects to /admin/orders.
Manage Food:
Add food at /admin/add.
List/edit food at /admin/list.
View orders at /admin/orders.


Logout: Use the dropdown in AdminMenubar to log out.

API Endpoints
Authentication

POST /api/login: Authenticate user/admin (returns JWT and isAdmin).
POST /api/register: Register a new user.

Food Management (Admin)

POST /api/foods: Add a new food item (multipart form with image).
GET /api/foods: List all food items.
PUT /api/foods/:id: Update a food item.
DELETE /api/foods/:id: Delete a food item.

Orders

POST /api/orders: Place a new order.
GET /api/orders/all: Get all orders (admin only).
GET /api/orders/myorders: Get user’s orders.

Screenshots
To be added: Screenshots of Home, Add Food form, Admin Orders page.
```
## Deploy in Render
```
Created set-env.ps1 for powershell execution of .env file, in order to create "mvn clean package" for the-platenet-backend.jar. Open powershell, go to source code root directory.
.\set-env.ps1
mvn clean package
Now when you get build success by powershell, need to push that .jar in dockerhub. (used dockerfile)
docker build -t aadiraj48dockerhub/the-platenet-backend .
docker push aadiraj48dockerhub/the-platenet-backend
Deploy on render.
```
## Contributing
```
Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m 'Add your feature').
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.
```
## Future Improvements
```
Complete Razorpay integration for seamless payments.
Add unit tests for backend (JUnit) and frontend (Jest).
Implement food item search/filter in /admin/list.
Add pagination for order listings in /admin/orders.
```
## License
This project is licensed under the MIT License.

## Demo
https://the-platenet.vercel.app


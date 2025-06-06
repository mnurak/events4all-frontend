# 🎉 Events4All — Frontend

Events4All is a web platform built to streamline event registration and management for colleges and students. This repository contains the **frontend** codebase built with React and Tailwind CSS, connected to a backend API for full functionality.

🔗 **Live Demo:** [https://events4all.vercel.app](https://events4all.vercel.app)  
🔗 **Backend Repo:** [https://github.com/mnurak/events4all-backend](https://github.com/mnurak/events4all-backend)

---

## 🚀 Project Overview

Events4All enables students and colleges to register and manage events easily through a simple, intuitive UI:

- Students can sign up, browse events, register their teams, and request corrections.
- Colleges can create events, view registered teams, and update event details.
- Secure authentication flow using JWT tokens.
- Real-time form validation with user feedback.
- Responsive design for all device sizes.

---

## 🛠 Technologies Used

### Frontend
- React.js (functional components, hooks)
- React Router for navigation
- Tailwind CSS for utility-first styling
- Context API for global state management (authentication)
- Fetch API for backend communication

### Backend (see backend repo)
- Node.js with Express.js REST API
- MongoDB database
- JWT for authentication tokens

---

## 📁 Frontend Folder Structure

src/
├── components/ # Reusable UI components (Alert, Navbar, Buttons)
├── context/ # React Context for authentication and global state
├── pages/ # Route-based pages (Login, Signup, Events, Edit)
│ ├── edit/ # Pages for editing/correcting registrations
│ └── getRegistered/ # Pages displaying registered events
├── App.js # Main app routing and layout
└── index.js # Entry point


---

## 🔧 Getting Started (Frontend)

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

bash
git clone https://github.com/YOUR_USERNAME/events4all-frontend.git
cd events4all-frontend
npm install

### Running Locally
Make sure you have the backend API running locally or update the backend URL in your context provider (AuthContext).

- npm start
- Open http://localhost:3000 to view the app in your browser.
---
---
### 🔐 Authentication Flow

- **User Types:** Users choose their role — *Student* or *College* — before signing up or logging in.
- **Login/Signup:** Users authenticate using email and password.
- **JWT Token:** The backend issues a JWT token upon successful login, which is stored securely in `localStorage`.
- **Context API:** `AuthContext` manages authentication state and user role across the app.
- **Protected Routes:** Components verify authentication and role to guard access to sensitive pages.
- **Auto Logout:** Tokens expire based on backend policy. Users are automatically logged out and redirected to the login page when unauthenticated.

---

### 🌐 How to Use the Website

1. **Choose User Type**  
   Select either *Student* or *College* on the landing/login page.

2. **Sign Up or Log In**  
   Provide a valid email and a password (minimum 8 characters).  
   Client-side validation provides immediate feedback on input errors.

3. **For Students**  
   - Browse available events.  
   - Register yourself or your team for events.  
   - View your registrations.  
   - Request corrections if needed.

4. **For Colleges**  
   - Create new events.  
   - Update event details.  
   - View all team registrations.  
   - Approve or manage student correction requests.

5. **Alerts & Feedback**  
   - The app shows real-time validation alerts below inputs.  
   - After each action (e.g., login, register, create event), a success or error message appears to confirm the outcome.

---

### 🛠 API Integration

All frontend API requests communicate with a backend API hosted separately.

- **Backend Repository:** [https://github.com/mnurak/events4all-backend](https://github.com/mnurak/events4all-backend)
- The base API URL is configured in the `AuthContext` provider under the variable `BACKEND_LINK`.

---

### 🧪 Testing & Validation

- Inputs are validated on every change to enable or disable the submission buttons.
- Alerts display error messages for 3 seconds when validation fails.
- Disabled buttons prevent invalid submissions, ensuring a smooth user experience.

---

### 📈 Future Enhancements

- Advanced event filtering and search functionality.
- Email verification during signup.
- Admin dashboard with detailed analytics.
- Native mobile application for a better on-the-go experience.

---

### 🙏 Acknowledgments

Built with ❤️ by **Karun M** and contributors.  
Special thanks to the open-source community for React, Tailwind CSS, and other supporting tools.

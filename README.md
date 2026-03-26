# Fullstack Application – Frontend (React)

## 📌 Description
Frontend application for a fullstack system focused on movie reviews, allowing users to manage their content, visualize usage metrics, and interact with a REST API.

The application includes authentication flows, a dynamic dashboard, real-time updates, and state management using Redux.

---

## 🎯 Objective
To build a responsive and interactive frontend that consumes a backend API, applying best practices in state management, validation, and user experience.

---

## 🛠️ Technologies
- React
- Redux (global state management)
- React Router (navigation)
- i18n (internationalization – partial implementation)
- HTML, CSS, JavaScript

---

## 🏗️ Architecture & Design
The application is structured using a component-based architecture:

- **Pages**: Main application views (Login, Register, Dashboard)  
- **Components**: Reusable UI elements (forms, lists, charts, etc.)  
- **State Management (Redux)**: Centralized state for user session and data  
- **Routing**: Managed through React Router  

Additional considerations:
- Separation between UI logic and data handling  
- Controlled forms with validation  
- Persistent session using localStorage  

---

## 🔐 Authentication Flow
- User registration with password confirmation  
- Login with validation and error handling  
- Session persistence using localStorage  
- Logout functionality  

---

## ⚙️ Features

### 👤 User Management
- Registration with field validation  
- Login with disabled actions on invalid input  
- Auto-login after successful registration

### 📊 Dashboard
All main functionality is handled within a single interface:

#### 📝 Movie Reviews CREW Management
- Create new reviews (documents)  
- List all user reviews  
- Edit reviews (inline editing)  
- Delete reviews  
- Filter by date (last week, last month, all time)  

#### 📈 Usage Metrics
- Display usage percentage for Plus users  
- Display total documents for Premium users  

#### 🔄 Plan Management
- Upgrade from Plus to Premium  

#### 📉 Data Visualization
- Graphical representation of relevant application data  

---

## 🔄 API Integration
- Full consumption of backend REST API  
- Handling of asynchronous requests  
- Error handling and user feedback based on API responses  

---

## 🧪 Validation
- Frontend validation to prevent unnecessary API calls  
- Form control and input restrictions  
- Consistency with backend validation rules  


# RateMyStore

A full-stack rating and management platform where Administrators manage stores and users, Store Owners track their performance, and Users rate their experiences.

## Architecture & Flow

This project follows a **Role-Based Access Control (RBAC)** architecture using REST API with a React Frontend.

**System Flow:**
1. **System Admin** creates `Store Owners` and `Stores` (linking them together).
2. **System Admin** creates `Normal Users` (or users sign up themselves).
3. **Normal Users** log in and submit ratings (1-5 stars) for specific stores.
4. **Store Owners** log in to a private dashboard to view their store's average rating and specific customer feedback.

## Tech Stack

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** PostgreSQL
* **ORM:** Prisma (Schema & Migrations)
* **Authentication:** JWT (JSON Web Tokens) & Bcrypt

### Frontend
* **Framework:** React (Vite)
* **Styling:** Tailwind CSS
* **HTTP Client:** Axios (with Interceptors)
* **Routing:** React Router DOM (v6) with Role-Based Route Guards

## Project Structure

```text
/
├── backend/         # Express API & Prisma Schema
├── client/          # React Frontend application
├── backend.md       # Server setup instructions
└── frontend.md      # Client setup instructions

## 🚀 Local Setup (Recommended)

### Prerequisites
* Node.js 18+
* PostgreSQL

### Clone Repository
```bash
git clone https://github.com/abhinm7/Store-Management.git
cd Store-Management
```

### [Backend Setup](./BACKEND.md)
> *Go here to set up the API and Database.*

### [Frontend Setup](./FRONTEND.md)
> *Go here to set up the React.js client and environment.*
# Backend Setup Instructions 

Follow these steps to get the Node.js/Express server running.

## Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** PostgreSQL
* **ORM:** Prisma (Schema & Migrations)
* **Authentication:** JWT (JSON Web Tokens) & Bcrypt

## Prerequisites
* Node.js (v18 or higher)
* PostgreSQL (Running locally or via a cloud provider like Neon/Supabase)

## Installation

1.  **Navigate to the backend directory:**
    ```bash
    cd server
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the `backend/` root directory and add the following:
    ```env
    PORT=3000
    # Replace with your actual Postgres connection string
    DATABASE_URL="postgresql://username:password@localhost:5432/ratemystore?schema=public"
    # Use a strong secret key for JWT signing
    JWT_SECRET="your_super_secret_key_change_this"
    ```

4.  **Database Setup (Prisma):**
    Run the migrations to create the Users, Stores, and Ratings tables in your database.
    ```bash
    # Generate the Prisma Client
    npx prisma generate

    # Push schema to the database
    npx prisma migrate dev --name init
    ```

## Running the Server

* **Development Mode:**
    ```bash
    npm run dev
    # OR
    node server.js
    ```

The server will start at: `http://localhost:3000`

## API Roles
* `SYSTEM_ADMIN`: Full access (Manage Users/Stores).
* `STORE_OWNER`: Read-only access to own Store Dashboard.
* `NORMAL_USER`: Can list stores and submit ratings.
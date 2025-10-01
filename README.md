## Project Name
    Event Management

## Project Start Commands
    cd /var/www/html/personal
    git clone <repo-url>
    cd event_management

    Run Docker Compose:
        docker-compose up --d --build

    Open in browser:
        Frontend: http://localhost:3000
        Backend: http://localhost:8000

## Project Structure
    event_management/
    │
    ├── backend/
    │   ├── api_service/
    |   |    ├── routes.py                  # 🚦 Central file to define all API endpoints (similar to routes/index.js in Node.js)
    |   |    │                              #    - This includes routes for auth, user, collection, logs, etc.
    |   |    │
    |   |    ├── main.py                    # 🚀 Entry point of the API app (like app.js or server.js in Express)
    |   |    │                              #    - You run this to start the FastAPI server
    |   |    │
    |   |    ├── controllers/               # 🧠 Logic for handling API requests (like Express route handlers/controllers)
    |   |    │   ├── auth_controller.py     # Handles login, signup, forgot/reset password
    |   |    │   ├── user_controller.py     # Handles getting/updating user profile
    |   |    │   ├── monitor_controller.py  # Starts monitoring jobs
    |   |    │   └── report_controller.py   # Fetches logs/reports for a user
    |   |    │
    |   |    ├── services/                  # ⚙️ Business logic (called by controllers)
    |   |    │   ├── auth_service.py        # Handles user registration, login, token creation
    |   |    │   ├── user_service.py        # Handles database operations for users
    |   |    │   ├── monitor_service.py     # Executes Postman collections and saves logs
    |   |    │   └── report_service.py      # Reads logs, summarizes pass/fail, analytics
    |   |    │
    |   |    ├── models/                    # 📦 MongoDB models (like Mongoose schemas)
    |   |    │   ├── user.py                # User model/schema (email, password, etc.)
    |   |    │   └── monitoring.py          # Monitoring schema (collection info, log files)
    |   |    │
    |   |    ├── config/                    # ⚙️ Configuration (like .env, DB setup)
    |   |    │   ├── db.py                  # Connects to MongoDB using PyMongo or Beanie
    |   |    │   └── settings.py            # Loads config variables from .env
    |   |    │
    |   |    ├── utils/                     # 🧰 Helper functions used everywhere
    |   |    │   ├── auth.py                # JWT encoding/decoding, password hashing
    |   |    │   └── logger.py              # Custom logging formatter (logs to console or file)
    |   |    │
    |   |    ├── .env                       # 🔐 Environment variables (e.g., DB URI, JWT secret)
    |   |    │                              #    - Never commit this file to GitHub!
    |   |    │
    |   |    └── requirements.txt           # 📦 Python dependencies (like package.json in Node.js)
    │
    ├── frontend/
    │   ├── public/
    │   ├── src/
    │   │   ├── pages/
    │   │   │   ├── index.tsx
    │   │   │   ├── login.tsx
    │   │   │   ├── signup.tsx
    │   │   │   ├── forgot-password.tsx
    │   │   │   ├── reset-password.tsx
    │   │   │   ├── dashboard.tsx
    │   │   │   ├── user.tsx
    │   │   │   └── collections/
    │   │   │       ├── index.tsx           # List of user's collections
    │   │   │       ├── [id].tsx            # View/Edit a collection
    │   │   │       └── create.tsx
    │   │   ├── components/
    │   │   │   ├── Auth/
    │   │   │   ├── Dashboard/
    │   │   │   ├── Collection/
    │   │   │   └── Logs/
    │   │   ├── services/                   # API calls (e.g. login, createCollection)
    │   │   ├── context/                    # Auth context (user state)
    │   │   └── utils/
    │   ├── .env.local
    │   └── package.json
    │
    ├── docker-compose.yml
    └── README.md

## Features
    Key Function

## Configuration
    Env Templates
        └── backend
            cp .env.example .env
            --> add these lines to connect with the postgres database
                DB_CONNECTION=pgsql
                DB_HOST=127.0.0.1
                DB_PORT=5432
                DB_DATABASE=event_management
                DB_USERNAME=postgres
                DB_PASSWORD=root

        └── frontend
            NEXT_PUBLIC_API_BASE=http://localhost:8000/api


## License


## Contact/ Author Info
    Name: Sukhpreet Singh Sodhi
    Email: ssingh77022@gmail.com
    Mobile Number: +91 62399 10788

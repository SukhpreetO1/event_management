## Project Name
    Event Management

## Project Start Commands
    cd /var/www/html/personal
    git clone <repo-url>
    cd event_management

    Run Docker Compose:
        docker-compose up -d --build

    Open in browser:
        Frontend: http://localhost:3000
        Backend: http://localhost:8000

## Configuration
    Env Templates
        └── backend
            cp .env.example .env
            --> add these lines to connect with the postgres database
                DB_CONNECTION=pgsql
                DB_HOST=127.0.0.1 (postgres --> if project runs on docker)
                DB_PORT=5432
                DB_DATABASE=event_management
                DB_USERNAME=postgres
                DB_PASSWORD=root (postgres --> if project runs on docker)

        └── frontend
            NEXT_PUBLIC_API_BASE=http://localhost:8000/api

## Contact/ Author Info
    Name: Sukhpreet Singh Sodhi
    Email: ssingh77022@gmail.com
    Mobile Number: +91 62399 10788

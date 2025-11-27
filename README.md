# Home Services Platform

A modern full-stack web application for booking and managing home services. This platform connects customers with service providers for various home services like cleaning, plumbing, electrical work, and more.

## Project Structure

This is a monorepo containing both the frontend and backend applications:

```
home-service-booking-app/
├── frontend/               # React TypeScript frontend application
│   ├── public/             # Static assets
│   ├── src/                # React source code
│   ├── Dockerfile          # Frontend Docker configuration
│   ├── nginx.conf          # Nginx configuration for production
│   ├── package.json        # Frontend dependencies
│   └── README.md           # Frontend-specific documentation
├── backend/                # Java Spring Boot backend application
│   ├── src/                # Java source code
│   ├── pom.xml             # Maven dependencies
│   ├── Dockerfile          # Backend Docker configuration
│   └── README.md           # Backend-specific documentation
├── docker-compose.yml      # Docker Compose for full stack
└── README.md               # This file
```

## Tech Stack

### Frontend
- React 18 with TypeScript
- Material-UI (MUI) for UI Components
- React Router for Navigation
- Formik & Yup for Form Handling
- Framer Motion for Animations
- Axios for API Requests

### Backend
- Java 21 with Spring Boot
- Spring Security for Authentication
- Spring Data JPA for Database Access
- MySQL Database
- Maven for Build Management

## Quick Start

### Option 1: Docker Compose (Recommended)

The easiest way to run the entire stack:

```bash
# From the root directory
docker-compose up --build
```

This will start:
- MySQL database on port 3306
- Backend server on port 5000
- Frontend server on port 3000

Access the application at [http://localhost:3000](http://localhost:3000)

### Option 2: Run Separately

#### Frontend

```bash
cd frontend
npm install
npm start
```

Frontend will be available at [http://localhost:3000](http://localhost:3000)

#### Backend

```bash
cd backend
./mvnw spring-boot:run
```

Backend will be available at [http://localhost:5000](http://localhost:5000)

**Note:** The backend requires MySQL to be running. See `backend/README.md` for database setup.

## Features

- User Authentication (Customers and Service Providers)
- Service Request Creation and Management
- Real-time Service Tracking
- Service Provider Matching
- Rating and Review System
- Admin Dashboard for Platform Management
- Responsive Design for Mobile and Desktop

## Development

### Prerequisites

- Node.js (v18 or higher) - for frontend
- Java 21 or higher - for backend
- MySQL 8.0 - for database
- Docker & Docker Compose (optional, for containerized development)

### Environment Variables

#### Frontend (.env in frontend/)
```env
REACT_APP_API_URL=http://localhost:5000
```

#### Backend (application.properties in backend/src/main/resources/)
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/home_service
spring.datasource.username=root
spring.datasource.password=your_password
```

## Docker

### Build Images Separately

```bash
# Build frontend
cd frontend
docker build -t homeservice-frontend .

# Build backend
cd backend
docker build -t homeservice-backend .
```

### Run with Docker Compose

```bash
docker-compose up --build
```

### Stop Services

```bash
docker-compose down
```

### Remove volumes (database data)

```bash
docker-compose down -v
```

## Utility Scripts (Windows)

| Script | Description |
|--------|-------------|
| `StartServer.bat` | Interactive menu to start different server configurations |
| `StartBackendServer.bat` | Start the Spring Boot backend |
| `KillServerProcesses.bat` | Kill processes using ports 3000 and 5000 |
| `RestartMySQLServer.bat` | Restart MySQL service |
| `TestDBConnection.bat` | Test database connectivity |

## API Endpoints

The backend provides RESTful APIs at `http://localhost:5000/api/`:

- `/api/auth/*` - Authentication endpoints
- `/api/services/*` - Service management
- `/api/bookings/*` - Booking management
- `/api/users/*` - User management
- `/api/admin/*` - Admin endpoints

See `backend/README.md` for full API documentation.

## Troubleshooting

### Backend Connection Error

If the frontend shows "Backend server is not available":

1. Ensure the backend is running on port 5000
2. Check if MySQL is running and accessible
3. Use `KillServerProcesses.bat` if port 5000 is occupied
4. Check firewall settings

### Port Already in Use

```bash
# On Windows PowerShell
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or use the provided script
.\KillServerProcesses.bat
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Authors

- **Aman Ranjan** - *Founder & Lead Developer* 
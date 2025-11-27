# Home Services - Frontend

This is the React frontend application for the Home Services platform. It provides a modern, responsive user interface for customers to book home services and for service providers to manage their work.

## Tech Stack

- **React 18** with TypeScript
- **Material-UI (MUI)** for UI Components
- **React Router** for Navigation
- **Formik & Yup** for Form Handling and Validation
- **Framer Motion** for Animations
- **Axios** for API Requests

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Getting Started

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory (optional):
```env
REACT_APP_API_URL=http://localhost:5000
```

### Development

Start the development server:
```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production

Create a production build:
```bash
npm run build
```

The build output will be in the `build/` directory.

### Testing

Run tests:
```bash
npm test
```

## Project Structure

```
frontend/
├── public/              # Static assets and index.html
│   ├── images/          # Image assets
│   ├── index.html       # Main HTML template
│   └── manifest.json    # PWA manifest
├── src/
│   ├── assets/          # Images and static files used in components
│   ├── components/      # Reusable UI components
│   │   ├── ui/          # Base UI components
│   │   └── ...          # Feature-specific components
│   ├── contexts/        # React context providers
│   ├── pages/           # Page components
│   ├── services/        # API and service integrations
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main App component
│   ├── index.tsx        # Application entry point
│   └── theme.ts         # Material-UI theme configuration
├── Dockerfile           # Docker configuration for frontend
├── nginx.conf           # Nginx configuration for production
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Docker

### Build the Docker image:
```bash
docker build -t homeservice-frontend .
```

### Run the container:
```bash
docker run -p 3000:3000 homeservice-frontend
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:5000` |
| `NODE_ENV` | Environment mode | `development` |

## Available Scripts

- `npm start` - Start development server
- `npm build` - Create production build
- `npm test` - Run tests
- `npm eject` - Eject from Create React App (not recommended)

## Features

- User Authentication (Login/Register)
- Service Browsing and Booking
- Customer Dashboard
- Service Provider Dashboard
- Admin Dashboard
- Real-time Service Status
- Responsive Design

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests
4. Submit a pull request

## License

This project is private and proprietary.

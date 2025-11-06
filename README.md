# Professional Cars Client Application

A modern React-based client application for the Professional Cars website, featuring vehicle browsing, contact forms, and responsive design.

## Features

- **Vehicle Browsing**: Browse available vehicles with filtering and search
- **Contact Forms**: Customer inquiry forms with validation
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI**: Clean, professional interface with smooth animations
- **State Management**: Redux Toolkit for global state management
- **Routing**: React Router for client-side navigation
- **Form Handling**: Comprehensive form validation and submission

## Tech Stack

- **Framework**: React 19 with Hooks
- **Build Tool**: Vite
- **State Management**: Redux Toolkit + React Redux
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS with PostCSS
- **Icons**: Lucide React icons
- **Notifications**: React Toastify
- **Development**: ESLint, Hot Module Replacement

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. **Navigate to client directory:**

   ```bash
   cd frontend/client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the client directory:

   ```env
   # API Configuration
   VITE_API_URL=http://localhost:5000

   # App Configuration
   VITE_APP_ENV=development
   ```

## Development Setup

1. **Start development server:**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5175`

2. **Build for production:**

   ```bash
   npm run build
   ```

3. **Preview production build:**

   ```bash
   npm run preview
   ```

4. **Lint code:**
   ```bash
   npm run lint
   ```

## Project Structure

```
frontend/client/
├── public/           # Static assets
│   ├── favicon.ico
│   └── images/
├── src/
│   ├── components/   # Reusable UI components
│   │   ├── common/   # Shared components
│   │   ├── layout/   # Layout components
│   │   └── ui/       # UI-specific components
│   ├── pages/        # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Vehicles.jsx
│   │   └── VehicleDetails.jsx
│   ├── redux/        # Redux store and slices
│   │   ├── slices/   # Redux slices
│   │   ├── store.js  # Store configuration
│   │   └── selectors.js
│   ├── hooks/        # Custom React hooks
│   ├── utils/        # Utility functions
│   ├── services/     # API service functions
│   ├── App.jsx       # Main app component
│   ├── main.jsx      # App entry point
│   └── index.css     # Global styles
├── index.html        # HTML template
├── vite.config.js    # Vite configuration
├── tailwind.config.js # Tailwind configuration
├── postcss.config.js  # PostCSS configuration
└── package.json      # Dependencies and scripts
```

## Key Components

### Layout Components

- **Header**: Navigation bar with logo and menu
- **Footer**: Site footer with contact information
- **ScrollToTop**: Button for smooth scrolling to top

### Page Components

- **Home**: Landing page with hero section and featured vehicles
- **Vehicles**: Vehicle listing with filters and search
- **VehicleDetails**: Individual vehicle information page
- **Contact**: Contact form and information
- **About**: Company information page

### UI Components

- **VehicleCard**: Vehicle display card with image and details
- **ContactForm**: Form component with validation
- **FilterPanel**: Vehicle filtering controls
- **SearchBar**: Vehicle search functionality

## State Management

The application uses Redux Toolkit for state management:

### Slices

- **vehiclesSlice**: Vehicle data and filtering state
- **contactSlice**: Contact form state
- **uiSlice**: UI state (modals, loading, etc.)

### Store Configuration

- Configured with Redux DevTools for development
- Persisted state using redux-persist

## API Integration

The client communicates with the backend API through service functions:

```javascript
// Example API call
import { apiService } from '../services/apiService';

const vehicles = await apiService.getVehicles();
const contactResult = await apiService.submitContact(formData);
```

## Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Custom Components**: Reusable styled components
- **Animations**: CSS transitions and transforms

## Development Guidelines

### Component Structure

```jsx
// Example component structure
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const MyComponent = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.mySlice.data);

  const handleAction = () => {
    dispatch(myAction());
  };

  return <div className="my-component">{/* Component JSX */}</div>;
};

export default MyComponent;
```

### State Management

- Use Redux for global state
- Use local state (useState) for component-specific state
- Dispatch actions for state updates

### API Calls

- Use service functions for API communication
- Handle loading states and errors appropriately
- Use React Toastify for user notifications

## Environment Variables

| Variable       | Description             | Default               | Required |
| -------------- | ----------------------- | --------------------- | -------- |
| `VITE_API_URL` | Backend API URL         | http://localhost:5000 | Yes      |
| `VITE_APP_ENV` | Application environment | development           | No       |

## Deployment

### Vercel Deployment

1. Connect the `frontend/client` directory to Vercel
2. Set `VITE_API_URL` environment variable to your backend URL
3. Deploy automatically

### Manual Deployment

```bash
npm run build
# Deploy the 'dist' folder to your hosting provider
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow React and Redux best practices
2. Use ESLint configuration
3. Test components thoroughly
4. Update documentation for new features

## License

Private and proprietary to Professional Cars Limited.

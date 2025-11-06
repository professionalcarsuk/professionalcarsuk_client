import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { clientRoutes } from './routes';

function RouteContainer() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.key}>
      {clientRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <RouteContainer />
      </Router>
    </AuthProvider>
  );
}

export default App;

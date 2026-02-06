import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { SiteSettingsProvider } from './contexts/SiteSettingsContext';
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
    <Router>
      <AuthProvider>
        <SiteSettingsProvider>
          <RouteContainer />
        </SiteSettingsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

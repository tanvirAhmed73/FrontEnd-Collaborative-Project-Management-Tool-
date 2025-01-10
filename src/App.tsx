import './App.css';
import IntroPage from './components/LandingPage/IntroPage/IntroPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import AuthContext, { AuthProvider } from './context/AuthProvider';
import { useContext, useEffect } from 'react';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoutes';

function App() {
  
  return (
    <Router>
        <AuthProvider>
        <Routes>
          <Route path="/" element={ <IntroPage />} />
          <Route path="/dashboard" element={<Dashboard /> } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        
        </Routes>
    </AuthProvider>
      </Router>
  );
}

export default App;

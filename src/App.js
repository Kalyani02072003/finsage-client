import React from 'react';
import { BrowserRouter as Router,  Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './components/HomePage/MainPage/MainPage';
import Investments from './components/Investments/Investments'
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import UserProfile from './components/UserProfile/UserProfile';
import { AuthProvider } from './components/AuthContext/AuthContext';
import Insights from './components/Insights/Insights'
import Dashboard from './components/Dashboard/Dashboard';
import Chatroom from './components/Chatroom/Chatroom';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chatroom" element={<Chatroom />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

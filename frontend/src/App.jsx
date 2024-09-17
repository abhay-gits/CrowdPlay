import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignIn } from './pages/SignIn.jsx';
import { HomePage } from './pages/HomePage.jsx';
import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/api/user')
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <SignIn />} />
        <Route path="/home" element={user ? <HomePage user={user} setUser={setUser} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
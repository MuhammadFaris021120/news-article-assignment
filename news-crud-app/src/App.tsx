import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateUpdatePage from './pages/CreateUpdatePage';
import DisplayPage from './pages/DisplayPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateUpdatePage />} />
        <Route path="/display" element={<DisplayPage />} />
      </Routes>
    </Router>
  );
}

export default App;

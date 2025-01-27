import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Importing the main App component
import './index.css';  // Optional, for styling

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

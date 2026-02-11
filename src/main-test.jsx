import React from 'react';
import ReactDOM from 'react-dom/client';

// Simple test component to verify React is working
function TestApp() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ color: 'green' }}>🌱 Hindavi Nursery - Test Page</h1>
      <p>If you can see this, React is working!</p>
      <p>Environment variables:</p>
      <ul>
        <li>Backend URL: {import.meta.env.VITE_BACKEND_URL}</li>
        <li>Mode: {import.meta.env.MODE}</li>
      </ul>
      <button onClick={() => alert('Button works!')}>Test Button</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<TestApp />);
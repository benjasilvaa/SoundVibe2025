// App.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <main style={{ padding: '1rem', maxWidth: '100vw', overflowX: 'hidden' }}>
      <Outlet />
    </main>
  );
}

import React from 'react';
import { createRoot } from 'react-dom/client';
import { StoreProvider } from './context/StoreContext';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);

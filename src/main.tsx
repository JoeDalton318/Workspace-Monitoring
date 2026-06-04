import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { bootstrap } from './app/bootstrap';

// EN: Bootstrap app before rendering
// FR: Initialiser l'application avant le rendu
bootstrap().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}).catch(console.error);

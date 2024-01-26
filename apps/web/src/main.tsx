import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './app';

if (import.meta.env.DEV) {
  await import('./mocks/browser').then(({ worker }) => {
    worker.start({ onUnhandledRequest: 'bypass' });
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

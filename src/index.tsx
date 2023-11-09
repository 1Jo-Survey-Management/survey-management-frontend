// eslint-disable-next-line import/no-extraneous-dependencies
import 'aos/dist/aos.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import AOS from 'aos';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

AOS.init(); // AOS 초기화

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

reportWebVitals();

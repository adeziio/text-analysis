import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { StrictMode } from 'react';

// ✅ now importing from react-dom/client
import { createRoot } from 'react-dom/client';


// 👇️ IMPORTANT: make sure to specify correct ID
// must be the ID of the div element in your index.html file
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

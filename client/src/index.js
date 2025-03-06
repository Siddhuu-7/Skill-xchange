import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="562665725157-j4mk0j4tt29vttichc170vceava13i4o.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
);



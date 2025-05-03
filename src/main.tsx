import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain="dev-4lan6cvp12u5vo84.us.auth0.com"
    clientId="JIrpcv4L4ZQKmnSsITqsZjUJoY184038"
    authorizationParams={{
      redirect_uri: 'https://quickdarshan-ncuk60v1w-111faizans-projects.vercel.app/callback'
    }}
  >
    <App />
  </Auth0Provider>
);

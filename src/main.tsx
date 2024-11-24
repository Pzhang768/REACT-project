import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { BrowserRouter } from 'react-router-dom'
import App from "./App";
import AuthProvider from '@/context/AuthContext';
import QueryProvider from '@/lib/react-query/QueryProvider'
//import { store } from './services/store.js';
import './index.css'; 

const rootElement = document.getElementById('root');

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);





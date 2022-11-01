import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'normalize.css';
import { AuthContextProvider } from './context/AuthContext';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* AuthContextProvider를 App component를 감싸면 컴포넌트들은 context 정보에 접근이 가능하다 */}
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
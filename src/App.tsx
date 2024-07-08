import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import './App.css';
import React, { Suspense } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/mainPage';
import AuthGoogle from './pages/auth/google';
// import AuthTest from './pages/auth/test';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './context/userContext';

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */
box-sizing: border-box;

  body {
  margin: 0;
  font-family: Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  font-size: 20px;
  font-weight: 500;

  -moz-osx-font-smoothing: grayscale;
  }

  header {
    font-family: Inter;
  }

  code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }
`;

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <React.Fragment>
      <Providers>
        <GlobalStyle />
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/auth/google" element={<AuthGoogle />} />
              {/* <Route path="/auth/test" element={<AuthTest />} /> */}
              <Route path="/*" element={<MainPage />} />
            </Routes>
          </Suspense>
        </Router>
      </Providers>
    </React.Fragment>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </UserProvider>
  );
}

export default App;

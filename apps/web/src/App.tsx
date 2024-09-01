import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import './App.css';
import React, { Suspense } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/mainPage';
import AuthGoogle from './pages/auth/google';
// import AuthTest from './pages/auth/test';
import {
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from '@tanstack/react-query';
import { UserProvider } from './context/userContext';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './pages/errorPage';

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

function App() {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <React.Fragment>
      <Providers>
        <GlobalStyle />
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary FallbackComponent={ErrorPage} onReset={reset}>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/auth/google" element={<AuthGoogle />} />
                {/* <Route path="/auth/test" element={<AuthTest />} /> */}
                <Route path="/*" element={<MainPage />} />
              </Routes>
            </ErrorBoundary>
          </Suspense>
        </Router>
      </Providers>
    </React.Fragment>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: 0, throwOnError: true },
      mutations: { throwOnError: true },
    },
  });

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </UserProvider>
  );
}

export default App;

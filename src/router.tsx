/** @format */
import React, { Suspense } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Email from './pages/Input/Email';
const MainDashboard = React.lazy(() => import('@/layout/MainDashboard'));

// Main dashboard route with nested child routes
const mainDashboardRoute: RouteObject = {
  path: '/',
  element: (
    <Suspense fallback={<div>Loading...</div>}>
      <MainDashboard />
    </Suspense>
  ),
  errorElement: <div>Error</div>,
  children: [
    {
      path: 'input', // this will be '/input' in URL
      errorElement: <div>Error loading Input Page</div>,
      children: [
        {
          path: 'email', // this will be '/input/email' in URL
          element: <Email />,
          errorElement: <div>Error loading Email Component</div>,
        },
      ],
    },
  ],
};

// Create the router with Main Dashboard and nested routes
const router = createBrowserRouter([mainDashboardRoute]);

export default router;
// The above code sets up a basic routing structure for a React application using React Router.

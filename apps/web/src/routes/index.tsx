import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { Error404 } from '@/pages/error-404';
import { Home } from '@/pages/home';

const ReactQuery = lazy(() => import('@/pages/react-query'));
const Zustand = lazy(() => import('@/pages/zustand'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error404 />,
    children: [
      {
        path: 'query',
        element: (
          <Suspense>
            <ReactQuery />
          </Suspense>
        ),
      },
      {
        path: 'zustand',
        element: (
          <Suspense>
            <Zustand />
          </Suspense>
        ),
      },
    ],
  },
]);

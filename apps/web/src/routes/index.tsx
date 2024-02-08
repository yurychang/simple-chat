import { createBrowserRouter } from 'react-router-dom';

import { Error404 } from '@/pages/error-404';
import { Home } from '@/pages/home';
import Login from '@/pages/login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error404 />,
  },
  {
    path: 'login',
    element: <Login />,
  },
]);

import { createBrowserRouter } from 'react-router-dom';

import { Error404 } from '@/pages/error-404';
import { Home } from '@/pages/home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error404 />,
  },
]);

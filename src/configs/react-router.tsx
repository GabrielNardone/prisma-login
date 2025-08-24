import {
  Navigate,
  type RouteObject,
  createBrowserRouter,
} from 'react-router-dom';

import ErrorBoundaryFallback from '@/components/error/ErrorBoundaryFallback';
import NotFound from '@/components/error/NotFound';
import ConfirmPassword from '@/pages/auth/ConfirmPassword';
import ConfirmUser from '@/pages/auth/ConfirmUser';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import ResendConfirmationCode from '@/pages/auth/ResendConfirmationCode';
import SignIn from '@/pages/auth/SignIn';
import SignOut from '@/pages/auth/SignOut';
import SignUp from '@/pages/auth/SignUp';

import Root from '@pages/Root';

const authentication: RouteObject[] = [
  {
    path: 'auth/sign-in',
    element: <SignIn />,
  },
  {
    path: 'auth/sign-up',
    element: <SignUp />,
  },
  {
    path: 'auth/confirm-user',
    element: <ConfirmUser />,
  },
  {
    path: 'auth/confirm-password',
    element: <ConfirmPassword />,
  },
  {
    path: 'auth/resend-confirmation-code',
    element: <ResendConfirmationCode />,
  },
  {
    path: 'auth/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: 'auth/sign-out',
    element: <SignOut />,
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorBoundaryFallback />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/sign-in" replace />,
      },
      ...authentication,
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;

import { type RouteObject, createBrowserRouter } from 'react-router-dom';

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
    index: true,
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
    children: [...authentication],
  },
]);

export default router;

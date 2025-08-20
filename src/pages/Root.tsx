import { CookiesProvider } from 'react-cookie';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from '@/context/AuthProvider';

export default function Root() {
  return (
    <>
      <CookiesProvider>
        <AuthProvider>
          <div id="pages" className="flex min-h-screen flex-1">
            <Outlet />
          </div>
        </AuthProvider>
        <div data-test="toast-container">
          <ToastContainer data-test="toast-container" />
        </div>
      </CookiesProvider>
    </>
  );
}

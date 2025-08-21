import { CookiesProvider } from 'react-cookie';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from '@/components/navbar/NavBar';
import { AuthProvider } from '@/context/AuthProvider';

export default function Root() {
  return (
    <>
      <CookiesProvider>
        <AuthProvider>
          <div id="pages" className="min-h-screen">
            <NavBar />
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

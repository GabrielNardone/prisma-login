import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoToSignIn = () => {
    navigate('/auth/sign-in');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
          <svg
            className="h-6 w-6 text-yellow-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>
        </div>

        <h1 className="mb-2 text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">
          Page Not Found
        </h2>

        <p className="mb-8 text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="space-y-3 sm:flex sm:justify-center sm:space-y-0 sm:space-x-3">
          <button
            onClick={handleGoBack}
            className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none sm:w-auto"
          >
            Go Back
          </button>

          <button
            onClick={handleGoToSignIn}
            className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none sm:w-auto"
          >
            Go to Sign In
          </button>
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-500">
            Lost? Here are some helpful links:
          </p>
          <div className="mt-2 space-x-4 text-sm">
            <button
              onClick={() => (window.location.href = '/auth/sign-in')}
              className="text-blue-600 hover:text-blue-500"
            >
              Sign In
            </button>
            <button
              onClick={() => (window.location.href = '/auth/sign-up')}
              className="text-blue-600 hover:text-blue-500"
            >
              Sign Up
            </button>
            <button
              onClick={() => (window.location.href = '/auth/forgot-password')}
              className="text-blue-600 hover:text-blue-500"
            >
              Forgot Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

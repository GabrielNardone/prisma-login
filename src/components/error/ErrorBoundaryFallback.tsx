import { useNavigate, useRouteError } from 'react-router-dom';

const ErrorBoundaryFallback = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let errorMessage: string;
  let errorStatus: string | number = 'Unknown Error';

  errorMessage =
    error instanceof Error ? error.message : 'An unexpected error occurred';

  const handleReload = () => {
    window.location.reload();
  };

  const handleGoToSignIn = () => {
    navigate('/auth/sign-in');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Oops! Something went wrong
        </h1>

        <div className="mb-4">
          <p className="mb-1 text-sm text-gray-500">Error {errorStatus}</p>
          <p className="text-gray-700">{errorMessage}</p>
        </div>

        <div className="space-y-3 sm:flex sm:justify-center sm:space-y-0 sm:space-x-3">
          <button
            onClick={handleReload}
            className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none sm:w-auto"
          >
            Try Again
          </button>

          <button
            onClick={handleGoToSignIn}
            className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none sm:w-auto"
          >
            Go to Sign In
          </button>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          <p>If this problem persists, please contact support.</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundaryFallback;

export const TestError: React.FC = () => {
  const throwError = () => {
    throw new Error('This is a test error to see the error boundary!');
  };

  throwError();

  return <div>This won't render</div>;
};

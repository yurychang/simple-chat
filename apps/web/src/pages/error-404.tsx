import { useRouteError } from 'react-router-dom';

export const Error404 = () => {
  const error = useRouteError() as any;
  console.error(error);

  return (
    <div
      id="error-page"
      className="flex flex-col items-center justify-center h-screen"
    >
      <h1 className="text-4xl text-center">Oops!</h1>
      <p className="mt-10 text-neutral-700">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="mt-10 text-neutral-500">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default Error404;


import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">

      <h1 className="text-8xl font-extrabold text-blue-600">
        404
      </h1>

      <h2 className="text-3xl font-bold mt-4 text-gray-800">
        Page Not Found!
      </h2>

      <p className="text-gray-500 mt-3 max-w-md">
        Sorry, the page you are looking for does not exist
        or may have been moved.
      </p>

      <Link
        href="/"
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>

    </div>
  );
};

export default NotFound;

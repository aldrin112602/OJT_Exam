import { useEffect } from "react";

const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = "404 Page Not Found";
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto py-10">
        <h1 className="text-5xl font-extrabold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found!
        </h2>
        <p className="text-lg text-gray-600 my-5 px-5">
          Sorry, the page you’re looking for doesn’t exist. You can go back to
          the homepage.
        </p>
        <a
          href="/"
          className="inline-block text-sm px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default NotFound;

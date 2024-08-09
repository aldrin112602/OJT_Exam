import { useEffect } from "react";

const Home: React.FC = () => {
  useEffect(() => {
    document.title = "Welcome Page";
  }, []);

  return (
    <div className="bg-gray-100 min-h-96 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to My CRUD Application
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Start exploring what I have Made In this Application hehe.
          </p>
          <div className="flex justify-center">
            <a
              href="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded mr-4"
            >
              Click to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

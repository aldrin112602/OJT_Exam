import { Link } from "react-router-dom";

interface NavbarProps {
  isAuth: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAuth }) => {
  const onLogout = () => {

  }
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between p-5">
        <div className="text-2xl font-bold">
          <Link to="/">MyApp</Link>
        </div>
        <ul className="flex items-center gap-7">
          {isAuth ? (
            <>
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={onLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/home" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-gray-300">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

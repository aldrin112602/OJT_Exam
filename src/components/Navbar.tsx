import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <>
      <nav>
        <ul className="flex items-center justify-end gap-7 p-5 px-9">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;

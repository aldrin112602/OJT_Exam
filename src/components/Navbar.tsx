import { Link } from "react-router-dom";
import Swal from "sweetalert2";

interface NavbarProps {
  isAuth: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAuth }) => {
  const onLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are going to Log Out",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Yes, Log Out!",
      icon: "warning"
    }).then(res => {
      if(res?.isConfirmed) {
        localStorage.removeItem("authToken");
        Swal.fire({
          title: "Success!",
          text: "Log Out Successfully!",
          icon: 'success'
        }).then(() => {
          location.reload();
        })
      }
    });
  };
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between p-5">
        <div className="text-2xl font-bold">
          <Link to="/">CRUD App</Link>
        </div>
        <ul className="flex items-center gap-7">
          {isAuth ? (
            <>
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

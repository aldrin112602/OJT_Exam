import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../axiosInstance";

interface FormInputsInterface {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [formInputs, setFormInputs] = useState<FormInputsInterface>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Login Page";
  }, []);

  const handleFormInput = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/api/auth/login", formInputs);
      const { token } = response.data;

      // Save token
      localStorage.setItem("authToken", token);

      Swal.fire({
        title: "Success!",
        text: "Logged in successfully!",
        icon: "success",
      }).then(() => {
        // Redirect to dashboard or home page
        // window.location.href = "/dashboard";
      });

      // Redirect or handle authenticated state
    } catch (error) {
      const { message } = error.response?.data || { message: "Unknown error" };
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
        timer: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-96 flex items-center justify-center bg-gray-100 p-10">
      <form
        onSubmit={formSubmit}
        className="bg-white shadow p-10 md:w-1/2 w-full rounded-lg"
      >
        <h1 className="mb-6 text-2xl">Log In Your Account</h1>
        <hr className="mb-3" />
        <div className="mb-2">
          <label className="text-slate-800" htmlFor="username">
            Username
          </label>
          <input
            required
            onChange={handleFormInput}
            value={formInputs.username}
            className="form-input w-full rounded"
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div className="mb-2 relative">
          <label className="text-slate-800" htmlFor="password">
            Password
          </label>
          <input
            required
            onChange={handleFormInput}
            value={formInputs.password}
            className="form-input w-full rounded"
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
          />
          <i
            onClick={() => setShowPassword(!showPassword)}
            className={
              showPassword
                ? "fa-regular fa-eye-slash absolute right-4 top-1/2 mt-1 cursor-pointer hover:text-slate-600"
                : "fa-regular fa-eye absolute right-4 top-1/2 mt-1 cursor-pointer hover:text-slate-600"
            }
          ></i>
        </div>

        <div className="my-3">
          <button
            className="w-full bg-slate-800 hover:bg-slate-600 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../axiosInstance";

// Inputs Value Interface
interface FormInputsInterface {
  username: string;
  password: string;
}

const Login = () => {
  // Set Inputs Initial Value
  const [formInputs, setFormInputs] = useState<FormInputsInterface>({
    username: "",
    password: "",
  });

  // For show/hide password
  const [showPassword, setShowPassword] = useState(false);


  // Set document title
  useEffect(() => {
    document.title = "Login Page";
  }, []);

  // Form Event Handler
  const formSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    try {
      const response = await api.post("/api/auth/login", formInputs);
    } catch (error) {
      const { message } = error.response.data;
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
        timer: 2000,
      });
    }
  };

  // Inputs Event Handler
  const handleFormInput = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="h-screen flex items-center justify-center bg-blue-400 p-10">
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
            type="password"
            name="password"
            id="password"
          />
          <i className="fa-regular fa-eye absolute right-4 top-1/2 mt-1 cursor-pointer hover:text-slate-600"></i>
        </div>

        <div className="my-3">
          <button className="w-full bg-slate-800 hover:bg-slate-600 text-white py-2 rounded">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

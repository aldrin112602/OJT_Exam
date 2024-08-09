import { ChangeEvent, FormEvent, useEffect, useState } from "react";

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

  useEffect(() => {
    document.title = "Login Page";
  }, []);

  // Form Event Handler
  const formSubmit = (ev: FormEvent) => {
    ev.preventDefault();
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
    <div className="h-screen flex items-center justify-center bg-slate-100 p-10">
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
            onChange={handleFormInput}
            value={formInputs.username}
            className="w-full border py-2 px-3 rounded"
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
            onChange={handleFormInput}
            value={formInputs.password}
            className="w-full border py-2 px-3 rounded"
            type="password"
            name="password"
            id="password"
          />
        </div>

        <div className="mb-2">
          <button className="w-full bg-blue-800 text-white py-2 rounded">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

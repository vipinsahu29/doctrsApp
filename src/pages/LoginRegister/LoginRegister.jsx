// LoginRegister.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUserAPI } from "../../SupaBase/Api";
import useAuthStore from "../../store/authStore";
import { validatePasswords } from "../../utility/util";
import { checkClinicExists } from "../../SupaBase/ClinicTableAPI";
import Store from "../../store/store";
const Input = ({ label, type, value, onChange, placeholder = "", error }) => (
  <div className="mb-4">
    <label className="block text-white mb-1">{label}</label>
    {type === "tel" ? (
      <input
        type="numeric"
        pattern="[0-9]{10}"
        maxLength="10"
        inputMode="numeric"
        placeholder="Enter 10-digit mobile number"
        value={value}
        onChange={onChange}
        required
        className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
    ) : (
      <input
        required
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
    )}
    {error && <label className="block text-red-600 mb-1">{error}</label>}
  </div>
);

const Login = ({ onSwitch }) => {
  const setUID = Store((state) => state.setUID);
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("12345678");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error, data } = await login(email, password);
    if (error) {
      setMessage(error + " invalid username or password.");
      alert("invalid username or password");
    }
    setUID(data?.user?.id);
    const isRegistered = await checkClinicExists(data?.user?.id);
    if (!isRegistered) {
      navigate("/registration");
    } else {

      navigate("/appointment_list");
    }
  };

  return (
    <div className="bg-gray-700 min-h-screen flex items-center justify-center bg-cover bg-center">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-xl shadow-xl w-96"
      >
        <h2 className="text-white text-2xl mb-6 text-center">
          Doctor Clinic Login
        </h2>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-yellow-400 text-black w-full py-2 rounded mt-4 font-semibold hover:bg-yellow-300"
        >
          Login
        </button>
        <p className="text-white text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <button
            onClick={onSwitch}
            className="text-yellow-400 cursor-pointer hover:underline bg-transparent border-none p-0"
          >
            Register
          </button>
        </p>
        {message && (
          <h2 className="text-red-600 cursor-pointer hover:underline text-lg mt-4 text-center">
            {message}
          </h2>
        )}
      </form>
    </div>
  );
};

const Register = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [registerFail, setRegisterFail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleRegister = async (e) => {
    e.preventDefault();

    const error = validatePasswords(password, confirmPassword);
    if (error) {
      setErrorMessage(error);
      return;
    } else {
      setErrorMessage("");
    }

    const result = await registerUserAPI(email, password);
    if (result?.error) {
      setRegisterFail(result?.error);
      return;
    }
    if (result?.uuid) {
      setSuccessMessage("Registration successful! Please click on login now.");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className={`bg-gray-700 min-h-screen flex flex-col items-center justify-center bg-cover bg-center`}>
      <h2 className="text-white text-6xl my-10 text-center top-2">
        Doctor Clinic Register
      </h2>
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-[600px]  gap-8 mb-10"
      >
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={validatePasswords(password, "", true)}
        />
        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={validatePasswords(password, confirmPassword)}
        />
        {errorMessage && (
          <p className="text-red-600 text-center mb-4">{errorMessage}</p>
        )}
        {registerFail && (
          <p className="text-red-600 text-center font-bold mb-4">
            {registerFail}
          </p>
        )}
        <div className="flex flex-col items-center justify-center col-span-2">
          <button
            type="submit"
            className="bg-yellow-400 text-black w-full py-2 rounded font-semibold hover:bg-yellow-300"
          >
            Register
          </button>
          {successMessage && (
            <h2 className="text-green-400 text-2xl my-10 text-center top-2">
              {successMessage}
            </h2>
          )}
          <p className="text-white text-sm mt-4 text-center">
            Already have an account?{" "}
            <span
              onClick={onSwitch}
              className="text-yellow-400 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  return isLogin ? (
    <Login onSwitch={() => setIsLogin(false)} />
  ) : (
    <Register onSwitch={() => setIsLogin(true)} />
  );
};

export default LoginRegister;

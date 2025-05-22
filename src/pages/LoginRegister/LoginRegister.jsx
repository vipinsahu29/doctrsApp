// LoginRegister.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUserAuthAPI, registerUserAPI } from "../../SupaBase/Api";

const Input = ({ label, type, value, onChange, placeholder = "" }) => (
  <div className="mb-4">
    <label className="block text-white mb-2">{label}</label>
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
  </div>
);

const Login = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await loginUserAuthAPI(email, password);

    if (result.error) {
      setMessage(`❌ ${result.error}`);
      console.log("Error:", result.error);
    } else {
      setMessage(`✅ Welcome ${result.user.email}`);
      console.log("Session:", result.session);
      navigate("/book_appointment"); // You can store token if needed
    }
  };

  return (
    <div className="bg-gray-700 min-h-screen flex items-center justify-center bg-[url('/doctor-bg.svg')] bg-cover bg-center">
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
          <span
            onClick={onSwitch}
            className="text-yellow-400 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
        {message && <h2 className="text-red-600 cursor-pointer hover:underline text-lg mt-4 text-center">{message}</h2>}
      </form>
    </div>
  );
};

const Register = ({ onSwitch }) => {
  const [clinicName, setClinicName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const result = await registerUserAPI(email, password, doctorName);
    console.log("dataaaa-,", result);
    console.log("Register:", {
      clinicName,
      specialization,
      doctorName,
      email,
      address,
      password,
      confirmPassword,
    });
  };

  return (
    <div className="bg-gray-700 min-h-screen flex items-center justify-center bg-[url('/doctor-register-bg.svg')] bg-cover bg-center">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-lg"
      >
        <h2 className="text-white text-2xl mb-6 text-center">
          Doctor Clinic Register
        </h2>
        <Input
          label="Clinic Name"
          type="text"
          value={clinicName}
          onChange={(e) => setClinicName(e.target.value)}
        />
        <Input
          label="Specialization"
          type="text"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        />
        <Input
          label="Doctor Name"
          type="text"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Mobile"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Input
          label="Address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-yellow-400 text-black w-full py-2 rounded mt-4 font-semibold hover:bg-yellow-300"
        >
          Register
        </button>
        <p className="text-white text-sm mt-4 text-center">
          Already have an account?{" "}
          <span
            onClick={onSwitch}
            className="text-yellow-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
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

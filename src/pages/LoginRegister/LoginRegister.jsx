// LoginRegister.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Input = ({ label, type, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-white mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
    />
  </div>
);

const Login = ({ onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login:', { email, password });
    // Dummy login success flag
    localStorage.setItem('isAuthenticated', 'true');
    navigate("/book_appointment");
  };

  return (
    <div className="bg-gray-700 min-h-screen flex items-center justify-center bg-[url('/doctor-bg.svg')] bg-cover bg-center">
      <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-xl shadow-xl w-96">
        <h2 className="text-white text-2xl mb-6 text-center">Doctor Clinic Login</h2>
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="bg-yellow-400 text-black w-full py-2 rounded mt-4 font-semibold hover:bg-yellow-300">Login</button>
        <p className="text-white text-sm mt-4 text-center">
          Don’t have an account?{' '}
          <span onClick={onSwitch} className="text-yellow-400 cursor-pointer hover:underline">Register</span>
        </p>
      </form>
    </div>
  );
};

const Register = ({ onSwitch }) => {
  const [clinicName, setClinicName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Register:', {
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
      <form onSubmit={handleRegister} className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-lg">
        <h2 className="text-white text-2xl mb-6 text-center">Doctor Clinic Register</h2>
        <Input label="Clinic Name" type="text" value={clinicName} onChange={(e) => setClinicName(e.target.value)} />
        <Input label="Specialization" type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
        <Input label="Doctor Name" type="text" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} />
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="Address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Input label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <button type="submit" className="bg-yellow-400 text-black w-full py-2 rounded mt-4 font-semibold hover:bg-yellow-300">Register</button>
        <p className="text-white text-sm mt-4 text-center">
          Already have an account?{' '}
          <span onClick={onSwitch} className="text-yellow-400 cursor-pointer hover:underline">Login</span>
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

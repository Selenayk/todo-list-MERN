import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/api';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(username, email, password);
      if (res.status === 201) {
        localStorage.setItem('token', res.data.accessToken);
        navigate('/');
      }
    } catch (error) {
      setError(
        'Registration failed:' + (error.res?.data?.message || error.message)
      );
    } 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="text-l mr-4 block text-gray-700 font-semibold">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <div className="my-5">
            <label className="text-l mr-4 block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <div className="my-5">
            <label className="text-l mr-4 block text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-500 text-white py-2 rounded-lg hover:bg-cyan-600"
          >
            Register
          </button>
        </form>
        <p className="mt-4">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-cyan-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
export default RegisterPage;

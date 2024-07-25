import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });

      if (res.status === 200) {
        localStorage.setItem('accessToken', res.data.accessToken);
        navigate('/todo/lists'); 
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
        <p className="mt-4">
          Do not have an account?{' '}
          <Link to="/auth/register" className="text-cyan-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

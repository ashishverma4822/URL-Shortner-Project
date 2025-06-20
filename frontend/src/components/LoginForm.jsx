import React, { useState } from 'react';
import { loginUser } from '../api/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';

const LoginForm = ({ state }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await loginUser(password, email);
      dispatch(login(data.user));
      navigate({ to: '/dashboard' });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4">
      <div className="w-full max-w-xl relative animate-fade-in-up">
        <div className="absolute -inset-1 bg-gradient-to-br from-purple-500 to-blue-500 blur-xl opacity-20 rounded-3xl"></div>

        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl px-10 py-10">
          <h2 className="text-4xl font-bold text-center text-white mb-8 tracking-wide">
            Login
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md shadow-sm text-sm">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label htmlFor="email" className="block text-sm text-white/80 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm text-white/80 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
              required
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="text-center mt-6">
            <p className="text-sm text-white/70">
              Don’t have an account?{' '}
              <span
                onClick={() => state(false)}
                className="text-blue-400 hover:underline cursor-pointer"
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

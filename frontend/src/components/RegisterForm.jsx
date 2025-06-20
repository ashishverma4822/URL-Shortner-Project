import React, { useState } from 'react';
import { registerUser } from '../api/user.api';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice';
import { useNavigate } from '@tanstack/react-router';

const RegisterForm = ({ state }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await registerUser(name, password, email);
      dispatch(login(data.user));
      navigate({ to: "/dashboard" });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md relative animate-fade-in-up">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 blur-lg opacity-30 rounded-3xl"></div>
        <div className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8">
          <h2 className="text-4xl font-bold text-center text-white mb-8 tracking-wide">
            Create an Account
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md shadow-sm text-sm">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label htmlFor="name" className="block text-sm text-white/80 font-medium mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block text-sm text-white/80 font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block text-sm text-white/80 font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm text-white/80 font-medium mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>

          <div className="text-center mt-6">
            <p className="text-sm text-white/70">
              Already have an account?{' '}
              <span
                onClick={() => state(true)}
                className="text-blue-400 hover:underline cursor-pointer"
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;

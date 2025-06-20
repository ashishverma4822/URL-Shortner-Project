import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slice/authSlice';
import DropdownPortal from './DropdownPortal';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = () => {
    dispatch(logout());
    navigate({ to: '/' });
  };

  const avatarUrl =
    user?.user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.user?.name || 'User'
    )}&background=0f172a&color=fff`;

  // 🔒 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="z-50 backdrop-blur-md bg-gradient-to-r from-[#0f172a] to-[#1e293b] border-b border-white/10 shadow-md">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* App Logo / Title */}
          <Link
            to="/"
            className="text-2xl font-bold text-white tracking-wide hover:scale-105 transition-transform duration-200"
          >
            🔗 Shortify | lost set bit
          </Link>

          {/* Right: Buttons */}
          <div className="flex items-center space-x-4">
            {!isAuthenticated && (
              <>
                <Link
                  to="/"
                  className="px-4 py-1.5 bg-gray-700 hover:bg-gray-800 text-white text-sm rounded-lg shadow transition"
                >
                  Home
                </Link>
                <Link
                  to="/auth"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg shadow transition"
                >
                  Sign In / Up
                </Link>
              </>
            )}

            {isAuthenticated && (
              <div className="relative">
                <img
                  src={avatarUrl}
                  alt="User"
                  className="w-9 h-9 rounded-full border-2 border-white shadow-md cursor-pointer"
                  onClick={() => setShowDropdown((prev) => !prev)}
                />

                {showDropdown && (
                  <DropdownPortal>
                    <div
                      ref={dropdownRef}
                      className="fixed right-4 top-16 w-56 bg-white text-gray-800 rounded-lg shadow-lg z-[9999] border border-gray-200"
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="font-semibold">{user?.user?.name}</p>
                        <p className="text-sm text-gray-600 truncate">{user?.user?.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </DropdownPortal>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

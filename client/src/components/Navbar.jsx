import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="bg-white/70 backdrop-blur-xl border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-full px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition">
              <span className="text-white font-bold">FD</span>
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-blue-600">FakeDoc</span>
              <span className="text-gray-800">Detect</span>
            </span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center space-x-4">

            {/* Search */}
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-9 pr-4 py-2 text-sm bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <svg
                className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Notification */}
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center rounded-full hover:bg-gray-100 p-1 transition"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold">
                  JD
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border py-2">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Settings
                  </Link>
                  <hr className="my-2" />
                  <button
                    onClick={() => navigate("/")}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Scroll Progress */}
      <div className="h-0.5 bg-gray-100">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-200"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </nav>
  );
}
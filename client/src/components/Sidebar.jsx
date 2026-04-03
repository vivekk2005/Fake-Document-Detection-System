import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ to, label, icon, badge }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `group relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
        isActive
          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-200"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`
    }
  >
    {({ isActive }) => (
      <>
        <span
          className={`w-5 h-5 flex-none transition-all ${
            isActive 
              ? "text-white" 
              : "text-gray-400 group-hover:text-blue-600"
          }`}
        >
          {icon}
        </span>
        <span className="flex-1 tracking-wide">{label}</span>
        {badge && (
          <span className={`px-2 py-0.5 text-xs rounded-full ${
            isActive 
              ? "bg-white/20 text-white" 
              : "bg-blue-100 text-blue-600"
          }`}>
            {badge}
          </span>
        )}
        {isActive && (
          <span className="absolute left-0 w-1 h-8 bg-white rounded-r-full" />
        )}
      </>
    )}
  </NavLink>
);

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h8V3H3v10zm10 8h8V11h-8v10zM3 21h18" />
        </svg>
      )
    },
    {
      to: "/upload",
      label: "Document Upload",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-3-3m3 3l3-3M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8" />
        </svg>
      ),
      badge: "New"
    },
    {
      to: "/verification",
      label: "Verification",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      to: "/history",
      label: "History",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      to: "/analytics",
      label: "Analytics",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      )
    },
    {
      to: "/settings",
      label: "Settings",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.074-.04.147-.083.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  return (
    <aside className={`relative h-screen bg-white border-r border-gray-200 hidden md:flex flex-col shadow-sm transition-all duration-300 ${
      isCollapsed ? "w-20" : "w-72"
    }`}>
      
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-9 bg-white border border-gray-200 rounded-full p-1.5 shadow-md hover:shadow-lg transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`w-3 h-3 text-gray-600 transition-transform duration-300 ${
            isCollapsed ? "rotate-180" : ""
          }`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Logo Section */}
      <div className={`px-6 py-8 border-b border-gray-100 ${isCollapsed ? "px-4" : ""}`}>
        {isCollapsed ? (
          <div className="text-2xl font-extrabold text-center">
            <span className="text-blue-600">FD</span>
          </div>
        ) : (
          <>
            <div className="text-2xl font-extrabold tracking-tight">
              <span className="text-blue-600">FakeDoc</span>
              <span className="text-gray-800">Detect</span>
            </div>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              AI-powered document verification
            </p>
          </>
        )}
      </div>

      {/* User Profile Summary */}
      <div className={`px-4 py-4 border-b border-gray-100 ${isCollapsed ? "text-center" : "flex items-center gap-3"}`}>
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
          JD
        </div>
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">John Doe</p>
            <p className="text-xs text-gray-500 truncate">john.doe@example.com</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
        {navigationItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            label={isCollapsed ? "" : item.label}
            icon={item.icon}
            badge={!isCollapsed ? item.badge : undefined}
          />
        ))}
      </nav>

      {/* Premium Plan Card */}
      {!isCollapsed && (
        <div className="px-4 pb-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">✨</span>
              <div>
                <div className="text-xs uppercase tracking-wider opacity-80">
                  Pro Plan
                </div>
                <div className="text-sm font-semibold">
                  Unlimited verifications
                </div>
              </div>
            </div>
            <button className="w-full mt-2 text-xs bg-white/20 hover:bg-white/30 transition-colors px-3 py-2 rounded-lg font-medium">
              Upgrade Now
            </button>
          </div>
        </div>
      )}

      {/* Collapsed Premium Indicator */}
      {isCollapsed && (
        <div className="px-4 pb-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-3 text-center">
            <span className="text-xl">✨</span>
          </div>
        </div>
      )}
    </aside>
  );
}
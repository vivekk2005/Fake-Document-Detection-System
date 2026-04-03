import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function AppLayout() {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      
      {/* Fixed Sidebar */}
      <div className="w-72 h-screen">
        <Sidebar />
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
import React from "react";
import { FiEdit2, FiShield, FiCreditCard, FiLogOut } from "react-icons/fi";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 py-10 px-6">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          
          {/* Top Gradient Section */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

          <div className="px-8 pb-8 -mt-12">
            
            {/* Avatar + Info */}
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center text-2xl font-bold text-blue-600 border-4 border-white">
                JD
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800">
                  Jane Doe
                </h2>
                <p className="text-gray-500">
                  jane.doe@example.com
                </p>
                <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                  Pro Plan
                </span>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <FiEdit2 className="w-4 h-4" />
                Edit Profile
              </button>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-xl p-5 text-center">
                <p className="text-sm text-gray-500">Documents Uploaded</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">124</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 text-center">
                <p className="text-sm text-gray-500">Verifications</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">118</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 text-center">
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">

          <h3 className="text-lg font-semibold text-gray-800">
            Account Settings
          </h3>

          <div className="space-y-4">
            
            <div className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <FiShield className="text-blue-600" />
                <span className="text-gray-700">Security Settings</span>
              </div>
              <button className="text-sm text-blue-600 hover:underline">
                Manage
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <FiCreditCard className="text-blue-600" />
                <span className="text-gray-700">Billing & Subscription</span>
              </div>
              <button className="text-sm text-blue-600 hover:underline">
                View Plan
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-xl hover:bg-red-50 transition">
              <div className="flex items-center gap-3">
                <FiLogOut className="text-red-500" />
                <span className="text-gray-700">Sign Out</span>
              </div>
              <button className="text-sm text-red-600 hover:underline">
                Logout
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
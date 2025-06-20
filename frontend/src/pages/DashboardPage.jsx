import React from 'react';
import UrlForm from '../components/UrlForm';
import UserUrl from '../components/UserUrl';

const DashboardPage = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex flex-col items-center justify-start px-4 sm:px-6 py-6">
      <div className="w-full max-w-5xl space-y-6">

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white tracking-wide">
          🔗 Shortify Dashboard
        </h1>

        {/* URL Form Section */}
        <div className="w-full backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl p-5 sm:p-6">
          <h2 className="text-xl text-white font-semibold mb-4">Shorten a new URL</h2>
          <UrlForm />
        </div>

        {/* User URL List Section */}
        <div className="w-full backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-xl p-5 sm:p-6">
          <h2 className="text-xl text-white font-semibold mb-4">Your Shortened URLs</h2>
          <UserUrl />
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;

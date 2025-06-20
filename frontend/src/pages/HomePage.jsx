import React from 'react';
import UrlForm from '../components/UrlForm';

const HomePage = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-2xl px-6 py-8 animate-fade-in-up">
        <h1 className="text-3xl font-extrabold text-center text-white mb-8 tracking-wide">
          🔗 Welcome to URL Shortener
        </h1>
        <UrlForm />
      </div>
    </div>
  );
};

export default HomePage;

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllUserUrls } from '../api/user.api';

const UserUrl = () => {
  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
  });

  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-200 text-red-800 border border-red-400 p-4 rounded-lg shadow-md text-center">
        Error loading URLs: {error.message}
      </div>
    );
  }

  const links = urls?.urls?.slice().reverse() || [];

  if (links.length === 0) {
    return (
      <div className="text-center text-white/80 my-10 p-6 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-md max-w-xl mx-auto shadow-xl">
        <svg className="w-12 h-12 mx-auto text-white/30 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <p className="text-xl font-semibold">No URLs Found</p>
        <p className="text-sm mt-1">You haven't created any shortened URLs yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="space-y-3 overflow-y-auto max-h-[500px] pr-1 scrollbar-hide">
        {links.map((url) => (
          <div
            key={url._id}
            className="w-full flex items-center justify-between space-x-4 bg-white/5 border border-white/30 rounded-xl px-4 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] backdrop-blur-md relative z-10 overflow-x-auto"
          >
            {/* Full URL */}
            <span
              className="text-white text-sm truncate max-w-[28%]"
              title={url.full_url}
            >
              {url.full_url}
            </span>

            {/* Shortened URL */}
            <a
              href={`http://localhost:3000/${url.short_url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 text-sm truncate max-w-[25%] hover:underline"
            >
              {`localhost:3000/${url.short_url}`}
            </a>

            {/* Click Count */}
            <span className="text-xs bg-blue-600 px-3 py-1 rounded-full text-white whitespace-nowrap">
              {url.clicks} {url.clicks === 1 ? 'click' : 'clicks'}
            </span>

            {/* Copy Button */}
            <button
              onClick={() => handleCopy(`http://localhost:3000/${url.short_url}`, url._id)}
              className={`text-sm px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                copiedId === url._id
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {copiedId === url._id ? 'Copied!' : 'Copy'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserUrl;

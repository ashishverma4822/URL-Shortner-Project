import React, { useState } from 'react';
import { createShortUrl } from '../api/shortUrl.api';
import { useSelector } from 'react-redux';
import { queryClient } from '../main';

const UrlForm = () => {
  const [url, setUrl] = useState('https://www.google.com');
  const [shortUrl, setShortUrl] = useState();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [customSlug, setCustomSlug] = useState('');
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    try {
      const shortUrl = await createShortUrl(url, customSlug);
      setShortUrl(shortUrl);
      queryClient.invalidateQueries({ queryKey: ['userUrls'] });
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-xl p-6 text-white">

        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Shorten a URL</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md shadow-sm text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="url" className="block text-sm font-medium text-white/80 mb-1">
            Enter your URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            required
            className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          />
        </div>

        {isAuthenticated && (
          <div className="mb-4">
            <label htmlFor="customSlug" className="block text-sm font-medium text-white/80 mb-1">
              Custom Slug (optional)
            </label>
            <input
              type="text"
              id="customSlug"
              value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value)}
              placeholder="your-custom-slug"
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Shorten URL
        </button>

        {shortUrl && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Your shortened URL:</h3>
            <div className="flex items-center">
              <input
                type="text"
                readOnly
                value={shortUrl}
                className="flex-1 p-2 rounded-l-xl bg-white/10 border border-white/20 text-white placeholder-white/60"
              />
              <button
                onClick={handleCopy}
                className={`px-4 py-2 rounded-r-xl transition-all duration-200 ${
                  copied
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlForm;

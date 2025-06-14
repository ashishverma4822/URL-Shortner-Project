import React, { useState } from "react";
import axios from "axios";
import { createShortUrl } from "../api/shortUrl.api";

function UrlForm() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const handleSubmit = async () => {
    if (!url.trim()) return;
    try {
      setLoading(true);
      console.log("Sending URL to backend:", url);
      const shortUrl = await createShortUrl(url);
      console.log("Response from backend:", shortUrl);
      setShortUrl(shortUrl);
      setCopied(false);
    } catch (error) {
      console.error("Error while shortening URL:", error); 
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    
    <>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter a long URL (e.g. https://example.com)"
            required
            className="flex-1 p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 text-sm"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Shortening..." : "Shorten"}
          </button>
        </div>

        {shortUrl && (
          <div className="mt-6 bg-gray-700 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-3">
            <span className="text-cyan-300 break-all text-sm">{shortUrl}</span>
            <button
              onClick={handleCopy}
              className="px-4 py-2 text-sm bg-cyan-700 hover:bg-cyan-800 rounded-lg transition-all"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
    </>
  );
}

export default UrlForm;

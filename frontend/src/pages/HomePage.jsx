import UrlForm from "../components/UrlForm";

function HomePage() {
  

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 text-white">
      <div className="w-full max-w-2xl bg-gray-800 shadow-xl rounded-xl p-8 border border-gray-700">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-cyan-400 mb-10">
          🔗 URL Shortener
        </h1>
      <UrlForm/>
    </div>
    </div>
  );
}

export default HomePage;

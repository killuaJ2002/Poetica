import { useState, useEffect } from "react";
import PoemFeed from "../components/PoemFeed";
import Navbar from "../components/Navbar";
import CreatePoemModal from "../components/CreatePoemModal";
const HomePage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/poems");
        const data = await res.json();
        setPoems(data);
      } catch (error) {
        console.log("erro fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoems();
  }, []);

  const onChange = (poem) => {
    setPoems((prev) => [poem, ...prev]);
  };

  return (
    <>
      <Navbar />
      <PoemFeed poems={poems} loading={loading} />
      {/* Floating Action Button */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        onClick={() => setShowCreateModal(true)}
        aria-label="Create new poem"
      >
        {/* Plus Icon */}
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

      {/* Create Poem Modal - You'll need to create this component */}
      {showCreateModal && (
        <CreatePoemModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default HomePage;

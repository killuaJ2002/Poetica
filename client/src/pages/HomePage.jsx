import { useState, useEffect } from "react";
import PoemFeed from "../components/PoemFeed";
import Navbar from "../components/Navbar";
import CreatePoemModal from "../components/CreatePoemModal";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/poems`);
        const data = await res.json();
        setPoems(data.poems);
        setHasMore(data.nextCursor === null ? false : true);
      } catch (error) {
        console.log("error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoems();
  }, []);

  const onChange = (poem) => {
    setPoems((prev) => [poem, ...prev]);
  };

  const handleNextData = async () => {
    try {
      setLoading(true);
      const cursor = poems[poems.length - 1]._id;
      const res = await fetch(`${API_BASE_URL}/poems?cursor=${cursor}`);
      const data = await res.json();
      setPoems((prevPoems) => [...prevPoems, ...data.poems]);
      setHasMore(data.nextCursor === null ? false : true);
    } catch (error) {
      console.log("error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ The return should be INSIDE the component
  return (
    <>
      {/* <Navbar /> */}
      <PoemFeed
        poems={poems}
        loading={loading}
        hasMore={hasMore}
        fetchMorePoems={handleNextData}
      />

      {/* Floating Action Button */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        onClick={() => {
          console.log("Auth status:", isAuthenticated);
          if (isAuthenticated()) {
            setShowCreateModal(true);
          } else {
            navigate("/login");
          }
        }}
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

      {/* Create Poem Modal */}
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

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import PoemView from "../components/PoemView";
import EditPoemModal from "../components/EditPoemModal";
import { toast } from "react-toastify";
const PoemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [poem, setPoem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchPoem = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/poems/${id}`);
        if (!res.ok) throw new Error("Poem not found");
        const data = await res.json();
        setPoem(data);
      } catch (error) {
        console.error("Error fetching poem:", error);
        navigate("/poems");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPoem();
  }, [id, navigate]);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this poem?")) {
      try {
        const res = await fetch(`http://localhost:8000/api/poems/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.ok) {
          toast.success("Poem deleted successfully");
          navigate("/poems");
        }
      } catch (error) {
        console.error("Error deleting poem:", error);
      }
    }
  };

  const isOwner =
    poem &&
    user &&
    (poem.authorId?._id === user.id || poem.authorId === user.id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner loading={loading} />
      </div>
    );
  }

  if (!poem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Poem not found
          </h2>
          <button
            onClick={() => navigate("/poems")}
            className="text-indigo-600 hover:text-indigo-800"
          >
            Back to poems
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <PoemView
        poem={poem}
        isOwner={isOwner}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        navigate={navigate}
      />
      {showEditModal && (
        <EditPoemModal
          poem={poem}
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
};

export default PoemPage;

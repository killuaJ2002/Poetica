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
  const { user, getAuthHeaders } = useAuth();
  const [poem, setPoem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [comments, setComments] = useState([]);

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
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/poems/${id}/comment`,
          {
            method: "GET",
            headers: getAuthHeaders(),
          }
        );
        if (!res.ok) throw new Error("Comments not found");
        const data = await res.json();
        setComments(data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
        navigate("/poems");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPoem();
      fetchComments();
    }
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
        if (!res.ok) {
          throw new Error(data.message || "Failed to delete poem");
        }

        toast.success("Poem deleted successfully");
        navigate("/poems");
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
  const onChange = (title, content) => {
    setPoem((prev) => ({
      ...prev,
      title,
      content,
    }));
  };

  const handleCommentChange = (comment) => {
    setComments((prev) => [comment, ...prev]);
  };

  const handleDeleteComment = async (commentId) => {
    if (!commentId) {
      throw new Error("comment id is required");
    }
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        const res = await fetch(
          `http://localhost:8000/api/poems/comment/${commentId}`,
          {
            method: "DELETE",
            headers: getAuthHeaders(),
            body: JSON.stringify({
              authorId: user.id,
            }),
          }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to delete comment");
        }
        setComments((prevComments) =>
          prevComments.filter((prevComment) => prevComment._id !== commentId)
        );
        console.log(data.message);
      } catch (error) {
        console.log("Error deleting coment ", error);
      }
    }
  };

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
        comments={comments}
        onChange={handleCommentChange}
        onDeleteComment={handleDeleteComment}
      />
      {showEditModal && (
        <EditPoemModal
          poem={poem}
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default PoemPage;

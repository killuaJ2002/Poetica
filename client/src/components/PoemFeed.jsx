import { useState, useEffect } from "react";
import Poem from "./Poem";
import Spinner from "./Spinner";

const PoemFeed = () => {
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

  return (
    <main className="p-6">
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className="columns-1 md:columns-2 gap-6 space-y-6">
          {poems.map((poem) => (
            <div key={poem._id} className="break-inside-avoid mb-6">
              <Poem poem={poem} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default PoemFeed;

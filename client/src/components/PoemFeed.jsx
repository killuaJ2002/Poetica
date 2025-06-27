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
    <>
      <main className="p-6 space-y-6">
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <>
            {poems.map((poem) => (
              <Poem key={poem.id} poem={poem} />
            ))}
          </>
        )}
      </main>
    </>
  );
};

export default PoemFeed;

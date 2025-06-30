import Poem from "./Poem";
import Spinner from "./Spinner";

const PoemFeed = ({ poems, loading }) => {
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

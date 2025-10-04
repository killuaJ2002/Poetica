import Poem from "./Poem";
import Spinner from "./Spinner";

const PoemFeed = ({ poems, loading }) => {
  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className="space-y-6">
          {poems.map((poem) => (
            <Poem key={poem._id} poem={poem} />
          ))}
        </div>
      )}
    </main>
  );
};

export default PoemFeed;

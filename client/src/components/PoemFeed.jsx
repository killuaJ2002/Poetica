import Poem from "./Poem";
import Spinner from "./Spinner";
import useInfiniteScroll from "react-infinite-scroll-hook";
const PoemFeed = ({ poems, loading, hasMore, fetchMorePoems }) => {
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: hasMore,
    onLoadMore: fetchMorePoems,
  });
  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      <div className="space-y-6">
        {poems.map((poem) => (
          <Poem key={poem._id} poem={poem} />
        ))}
        {hasMore && (
          <div ref={sentryRef}>
            <Spinner />
          </div>
        )}
      </div>
    </main>
  );
};

export default PoemFeed;

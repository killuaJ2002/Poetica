import React from "react";

const PoemFeed = () => {
  return (
    <>
      <main className="p-6 space-y-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">The Whispering Wind</h2>
          <p className="mt-2 text-gray-700">
            In the hush of night it flies, / Telling tales beneath the skies...
          </p>
          <p className="mt-1 text-sm text-gray-500">by Aurora Sky</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Echoes of Time</h2>
          <p className="mt-2 text-gray-700">
            Old clocks tick in silence, / Dust of memory, soft defiance...
          </p>
          <p className="mt-1 text-sm text-gray-500">by Eliot Verse</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Moonlit Letters</h2>
          <p className="mt-2 text-gray-700">
            Folded dreams in inked desire, / Sent through stars that never
            tire...
          </p>
          <p className="mt-1 text-sm text-gray-500">by Luna Wells</p>
        </div>
      </main>
    </>
  );
};

export default PoemFeed;

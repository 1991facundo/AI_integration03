
import React from 'react';

export const Results: React.FC = () => {

  const results = 'Your survival chances will be displayed here.';

  return (
    <div className="bg-white p-4 rounded shadow-md mt-4">
      <h2 className="text-2xl font-bold mb-4">Results</h2>
      <p>{results}</p>
    </div>
  );
};


'use client';

import React, { useState } from 'react';

export const DataEntryForm: React.FC = () => {
  const [salary, setSalary] = useState<number | null>(null);
  const [investmentPercentage, setInvestmentPercentage] = useState<number>(0);
  const [unemployed, setUnemployed] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700">Salary</label>
        <input
          type="number"
          value={salary || ''}
          onChange={(e) => setSalary(Number(e.target.value))}
          className="mt-1 block w-full p-2 border rounded"
          disabled={unemployed}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Investment Percentage</label>
        <input
          type="number"
          value={investmentPercentage}
          onChange={(e) => setInvestmentPercentage(Number(e.target.value))}
          className="mt-1 block w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Unemployed</label>
        <input
          type="checkbox"
          checked={unemployed}
          onChange={(e) => setUnemployed(e.target.checked)}
          className="mt-1"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Calculate
      </button>
    </form>
  );
};

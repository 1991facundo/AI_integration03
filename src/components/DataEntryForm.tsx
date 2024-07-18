
'use client';

import React, { useState } from 'react';

export const DataEntryForm: React.FC = () => {
  const [ticketClass, setTicketClass] = useState<string>('thirdClass');
  const [sex, setSex] = useState<number>(0);
  const [age, setAge] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const passengerClass = calculateClass();
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          Pclass: passengerClass, 
          Sex: sex, 
          Age: age, 
          SibSp: 0, 
          Parch: 0, 
          Fare: 0, 
          Embarked: 0 
        }),
      });
      const data = await response.json();
      setResult(`Your survival chance is ${data.survival_chance} and you are in ${ticketClass === 'stowaway' ? 'No Ticket - Stowaway' : ticketClass}`);
    } catch (error) {
      setError('Failed to fetch prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateClass = () => {
    if (ticketClass === 'stowaway') return 3;
    switch (ticketClass) {
      case 'firstClass':
        return 1;
      case 'secondClass':
        return 2;
      case 'thirdClass':
      default:
        return 3;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md text-black">
      <div className="mb-4">
        <label className="block text-gray-700">Ticket Class</label>
        <select value={ticketClass} onChange={(e) => setTicketClass(e.target.value)} className="mt-1 block w-full p-2 border rounded">
          <option value="firstClass">First Class</option>
          <option value="secondClass">Second Class</option>
          <option value="thirdClass">Third Class</option>
          <option value="stowaway">No Ticket - Stowaway</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Sex</label>
        <select value={sex} onChange={(e) => setSex(Number(e.target.value))} className="mt-1 block w-full p-2 border rounded">
          <option value={0}>Male</option>
          <option value={1}>Female</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Age</label>
        <input
          type="number"
          value={age || ''}
          onChange={(e) => setAge(Number(e.target.value))}
          className="mt-1 block w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Calculate
      </button>
      {loading && <p className="mt-4">Calculating...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {result && <p className="mt-4">{result}</p>}
    </form>
  );
};

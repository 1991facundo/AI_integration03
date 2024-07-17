
'use client';

import React, { useState } from 'react';

export const DataEntryForm: React.FC = () => {
  const [salary, setSalary] = useState<number | null>(null);
  const [investmentPercentage, setInvestmentPercentage] = useState<number>(0);
  const [unemployed, setUnemployed] = useState<boolean>(false);
  const [sex, setSex] = useState<number>(0);
  const [age, setAge] = useState<number | null>(null);
  const [sibSp, setSibSp] = useState<number>(0);
  const [parch, setParch] = useState<number>(0);
  const [embarked, setEmbarked] = useState<number>(0);
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
        body: JSON.stringify({ Pclass: passengerClass, Sex: sex, Age: age, SibSp: sibSp, Parch: parch, Fare: calculateFare(passengerClass), Embarked: embarked }),
      });
      const data = await response.json();
      setResult(`Your survival chance is ${data.survival_chance} and you are in ${passengerClass}`);
    } catch (error) {
      setError('Failed to fetch prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateClass = () => {
    if (unemployed) return 3; 
    const investmentAmount = salary ? (salary * (investmentPercentage / 100)) : 0;
    if (investmentAmount >= 4350) return 1;
    if (investmentAmount >= 150) return 1;
    if (investmentAmount >= 60) return 2;
    return 3;
  };

  const calculateFare = (passengerClass: number) => {
    switch (passengerClass) {
      case 1:
        return 150; 
      case 2:
        return 60; 
      case 3:
      default:
        return 35; 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md text-black">
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
      <div className="mb-4">
        <label className="block text-gray-700">SibSp</label>
        <input
          type="number"
          value={sibSp}
          onChange={(e) => setSibSp(Number(e.target.value))}
          className="mt-1 block w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Parch</label>
        <input
          type="number"
          value={parch}
          onChange={(e) => setParch(Number(e.target.value))}
          className="mt-1 block w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Embarked</label>
        <select value={embarked} onChange={(e) => setEmbarked(Number(e.target.value))} className="mt-1 block w-full p-2 border rounded">
          <option value={0}>Cherbourg</option>
          <option value={1}>Queenstown</option>
          <option value={2}>Southampton</option>
        </select>
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


import React from 'react';
import { DataEntryForm } from '../components/DataEntryForm';


const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Titanic Survival Predictor</h1>
      <DataEntryForm />
      
    </div>
  );
};

export default HomePage;

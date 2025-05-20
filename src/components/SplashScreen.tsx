
import React from 'react';
import { Calculator } from 'lucide-react';

const SplashScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-20 h-20 flex items-center justify-center bg-bazaar-500 rounded-lg shadow-lg mb-6">
        <Calculator size={48} className="text-white" />
      </div>
      <h1 className="text-3xl font-bold mb-1 text-bazaar-600">Daily Price</h1>
      <h1 className="text-3xl font-bold text-bazaar-600">Calculator</h1>
    </div>
  );
};

export default SplashScreen;

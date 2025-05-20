
import React from 'react';
import { Calculator } from 'lucide-react';

const SplashScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-20 h-20 flex items-center justify-center bg-bazaar-500 rounded-lg shadow-lg mb-6">
        <Calculator size={48} className="text-white" />
      </div>
      <h1 className="text-3xl font-bold mb-1 text-bazaar-600">BazaarBuddy</h1>
      <p className="text-lg text-bazaar-500 mb-2">Price & Weight Calculator</p>
      <p className="text-sm text-gray-500">For buyers & sellers</p>
    </div>
  );
};

export default SplashScreen;

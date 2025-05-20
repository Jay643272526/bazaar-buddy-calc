
import React from 'react';

const SplashScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-40 h-40 flex items-center justify-center mb-6">
        <img 
          src="/lovable-uploads/de767c39-c688-4309-99bd-3a7979498e6b.png" 
          alt="BazaarBuddy Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      <h1 className="text-3xl font-bold mb-1 text-bazaar-600">BazaarBuddy</h1>
      <p className="text-lg text-bazaar-500 mb-2">Price & Weight Calculator</p>
      <p className="text-sm text-gray-500">For buyers & sellers</p>
    </div>
  );
};

export default SplashScreen;

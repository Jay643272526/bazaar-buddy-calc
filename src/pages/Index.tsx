
import React, { useState, useEffect } from 'react';
import Calculator from '@/components/Calculator';
import ItemList from '@/components/ItemList';
import History from '@/components/History';
import Layout from '@/components/Layout';
import SplashScreen from '@/components/SplashScreen';
import { CalculationProvider } from '@/contexts/CalculationContext';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  
  useEffect(() => {
    // Show splash screen for 2 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (showSplash) {
    return <SplashScreen />;
  }
  
  return (
    <CalculationProvider>
      <Layout
        calculatorContent={<Calculator />}
        itemListContent={<ItemList />}
        historyContent={<History />}
      />
    </CalculationProvider>
  );
};

export default Index;

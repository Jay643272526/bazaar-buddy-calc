
import React, { ReactNode, useState } from 'react';
import { Calculator, ListChecks, Clock } from 'lucide-react';
import AdBanner from './AdBanner';

interface LayoutProps {
  calculatorContent: ReactNode;
  itemListContent: ReactNode;
  historyContent: ReactNode;
}

type TabType = 'calculator' | 'itemList' | 'history';

const Layout = ({ calculatorContent, itemListContent, historyContent }: LayoutProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('calculator');
  
  // AdMob ID from the user
  const adMobId = "2630066452533764/9313704030";
  
  return (
    <div className="app-container">
      <AdBanner adId={adMobId} />
      
      <div className="content-container">
        {activeTab === 'calculator' && calculatorContent}
        {activeTab === 'itemList' && itemListContent}
        {activeTab === 'history' && historyContent}
      </div>
      
      <div className="flex justify-around items-center border-t p-3 bg-white">
        <button 
          className={`flex flex-col items-center p-2 ${activeTab === 'calculator' ? 'text-bazaar-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('calculator')}
        >
          <Calculator size={24} />
          <span className="text-xs mt-1">Calculator</span>
        </button>
        
        <button 
          className={`flex flex-col items-center p-2 ${activeTab === 'itemList' ? 'text-bazaar-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('itemList')}
        >
          <ListChecks size={24} />
          <span className="text-xs mt-1">Item List</span>
        </button>
        
        <button 
          className={`flex flex-col items-center p-2 ${activeTab === 'history' ? 'text-bazaar-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('history')}
        >
          <Clock size={24} />
          <span className="text-xs mt-1">History</span>
        </button>
      </div>
    </div>
  );
};

export default Layout;
